import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axios';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import PageTitle from '../../components/common/PageTitle';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import { InputColumn, SelectColumn } from '../../components/common/Inputs';

function ExpenseForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [items, setItems] = useState([
    {
      id: 0,
      price: 0,
      expense_category_id: null,
      notes: null,
    },
  ]);
  const [customers, setCustomers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const model = 'expenses';

  let { id } = useParams();
  const navigation = useNavigate();

  const addItems = () => {
    setItems([
      ...items,
      {
        id: 0,
        price: 0,
        expense_category_id: null,
        notes: null,
      },
    ]);
  };

  const removeItems = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItemValue(newItems);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (id) {
      axiosClient
        .put(`/expenses/${id}`, data)
        .then(() => navigation('/expenses'))
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosClient
        .post('/expenses', data)
        .then(() => navigation('/expenses'))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    async function getOrganizations() {
      await axiosClient
        .get(`/dropdown/organizations`)
        .then(({ data }) => {
          setOrganizations(data.data);
          getExpense();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getOrganizations();

    async function getCustomers() {
      await axiosClient
        .get(`/dropdown/customers`)
        .then(({ data }) => {
          setCustomers(data.data);
          getExpense();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getCustomers();

    async function getCategories() {
      await axiosClient
        .get(`/dropdown/expense_categories`)
        .then(({ data }) => {
          setExpenseCategories(data.data);
          getExpense();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getCategories();

    setValue('expense_date', '2022-03-23');

    function getExpense() {
      if (id) {
        axiosClient
          .get(`/expenses/${id}`)
          .then(({ data }) => {
            const newData = data.data;
            setValue('organization_id', newData.organization_id);
            setValue('expense_date', newData.expense_date);
            setValue('customer_id', newData.customer_id);
            setValue('reference_no', newData.reference_no);
            setItemValue(newData.items);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  const setItemValue = (items) => {
    const expenseItems = [];
    setValue('items', []);
    items.map((item, index) => {
      setValue(`items.${index}.notes`, item.notes);
      setValue(`items.${index}.expense_category_id`, item.expense_category_id);
      setValue(`items.${index}.price`, item.price);
      expenseItems.push({
        price: item.price,
        expense_category_id: item.expense_category_id,
        notes: item.notes,
      });
    });
    setItems(expenseItems);
  };

  return (
    <>
      <PageTitle title="Expense" id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width="w-full">
        <FormCols cols={2}>
          <SelectColumn
            name={'organization_id'}
            options={organizations}
            required={true}
            register={register}
            label={'Organization'}
            errors={errors}
          />
          <InputColumn
            name={'expense_date'}
            required={true}
            register={register}
            errors={errors}
            label={'Expense date'}
          />
          <SelectColumn
            name={'customer_id'}
            options={customers}
            required={true}
            register={register}
            label={'Customer'}
            errors={errors}
          />
          <InputColumn
            name={'reference_no'}
            required={true}
            register={register}
            errors={errors}
          />
        </FormCols>
        {items.map((item, index) => (
          <div className="grid md:grid-cols-3 gap-6 mt-6" key={item.id}>
            <SelectColumn
              options={expenseCategories}
              name={`items.${index}.expense_category_id`}
              required={true}
              register={register}
              errors={errors}
              label={`Category`}
              id={`expense_category_id_${index}`}
            />
            <InputColumn
              name={`items.${index}.notes`}
              required={true}
              register={register}
              errors={errors}
              label={`notes`}
              id={`notes_${index}`}
            />
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <InputColumn
                  name={`items.${index}.price`}
                  required={true}
                  register={register}
                  errors={errors}
                  label={`price`}
                  id={`price_${index}`}
                />
              </div>
              <div className="flex justify-between w-1/4 ml-4 mt-8">
                <button
                  className="bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-700"
                  type="button"
                  onClick={() => removeItems(index)}
                >
                  <TrashIcon className="w-4 h-4"></TrashIcon>
                </button>

                <button
                  className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-700"
                  type="button"
                  onClick={addItems}
                >
                  <PlusIcon className="w-4 h-4"></PlusIcon>
                </button>
              </div>
            </div>
          </div>
        ))}
        <FormFooter to={model} />
      </FormWrapper>
    </>
  );
}

export default ExpenseForm;
