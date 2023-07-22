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
import {
  Input,
  InputColumn,
  SelectColumn,
  TextareaColumn,
} from '../../components/common/Inputs';
// #TODO items validation is pending
function InvoiceForm() {
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
      quantity: 1,
      name: null,
      description: null,
    },
  ]);

  const [customers, setCustomers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const model = 'invoices';

  let { id } = useParams();
  const navigation = useNavigate();

  const addItems = () => {
    setItems([
      ...items,
      {
        id: 0,
        price: 0,
        quantity: 1,
        name: null,
        description: null,
      },
    ]);
  };

  const removeItems = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setInvoiceItems(newItems);
  };

  const onSubmit = (data) => {
    if (id) {
      axiosClient
        .put(`/${model}/${id}`, data)
        .then(() => navigation(`/${model}`))
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosClient
        .post(`/${model}`, data)
        .then(() => navigation(`/${model}`))
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
          getInvoice();
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
          getInvoice();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getCustomers();

    async function getSalespersons() {
      await axiosClient
        .get(`/dropdown/salespersons`)
        .then(({ data }) => {
          setSalespersons(data.data);
          getInvoice();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getSalespersons();

    setValue('invoice_date', '2022-03-23');
    setValue('type', 'invoice');

    function getInvoice() {
      if (id) {
        axiosClient
          .get(`/${model}/${id}`)
          .then(({ data }) => {
            const newData = data.data;
            setValue('organization_id', newData.organization_id);
            setValue('invoice_date', newData.invoice_date);
            setValue('due_date', newData.due_date);
            setValue('customer_id', newData.customer_id);
            setValue('invoice_no', newData.invoice_no);
            setValue('salesperson_id', newData.salesperson_id);
            setValue('notes', newData.notes);
            setValue('subject', newData.subject);
            setInvoiceItems(newData.items);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  const setInvoiceItems = (items) => {
    const invoiceItems = [];
    setValue('items', []);

    items.map((item, index) => {
      let amount = 0;
      setValue(`items.${index}.name`, item.name);
      setValue(`items.${index}.price`, item.price);
      setValue(`items.${index}.quantity`, item.quantity);
      amount = item.price * item.quantity;
      invoiceItems.push({
        id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        amount: amount,
        description: item.description,
      });
    });
    setItems(invoiceItems);
  };

  return (
    <>
      <PageTitle title="Invoice" id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width={'w-full'}>
        <input {...register('type')} type="hidden" />
        <FormCols cols={2}>
          <SelectColumn
            name={'organization_id'}
            options={organizations}
            required={true}
            register={register}
            label={'Organization'}
            errors={errors}
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
            name={'invoice_no'}
            required={true}
            register={register}
            errors={errors}
            label={'Invoice No.'}
          />
        </FormCols>
        <FormCols cols={3}>
          <InputColumn
            name={'invoice_date'}
            required={true}
            register={register}
            errors={errors}
            label={'Invoice date'}
          />
          <InputColumn
            name={'due_date'}
            required={true}
            register={register}
            errors={errors}
            label={'Due date'}
          />
        </FormCols>
        <FormCols cols={2}>
          <SelectColumn
            name={'salesperson_id'}
            options={salespersons}
            required={true}
            register={register}
            label={'Sales person'}
            errors={errors}
          />
        </FormCols>
        <FormCols cols={2}>
          <TextareaColumn name={'subject'} register={register} />
        </FormCols>
        <div className="rounded relative mt-6">
          <table className="w-full border border-collapse text-gray-600">
            <thead className="divide-y bg-slate-100 text-right">
              <tr>
                <th className="px-2 py-1 text-sm font-semibold border text-left">
                  Item
                </th>
                <th className="px-2 py-1 text-sm font-semibold border w-32">
                  Quantity
                </th>
                <th className="px-2 py-1 text-sm font-semibold border w-36">
                  Rate
                </th>
                <th className="px-2 py-1 text-sm font-semibold border">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-3 border">
                    <Input
                      name={`items.${index}.name`}
                      required={true}
                      register={register}
                      id={`items.${index}.name`}
                    />
                    {errors.items && (
                      <span className="text-red-400 text-sm">
                        This field is required
                      </span>
                    )}
                  </td>
                  <td className="p-3 border w-32">
                    <Input
                      name={`items.${index}.quantity`}
                      required={true}
                      register={register}
                      id={`items.${index}.quantity`}
                    />
                    {errors.items && (
                      <span className="text-red-400 text-sm">
                        This field is required
                      </span>
                    )}
                  </td>
                  <td className="p-3 border">
                    <Input
                      name={`items.${index}.price`}
                      required={true}
                      register={register}
                      id={`items.${index}.price`}
                    />
                    {errors.items?.[index].price && (
                      <span className="text-red-400 text-sm">
                        This field is required
                      </span>
                    )}
                  </td>
                  <td className="text-right">
                    <span className="pr-4">{item.amount}</span>
                    <button
                      className="bg-red-500 text-white py-1 px-1 mx-1 rounded-md hover:bg-red-700"
                      type="button"
                      onClick={() => removeItems(index)}
                    >
                      <TrashIcon className="w-4 h-4"></TrashIcon>
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-1 mx-1 rounded-md hover:bg-blue-700"
                      type="button"
                      onClick={addItems}
                    >
                      <PlusIcon className="w-4 h-4"></PlusIcon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FormCols cols={2}>
          <TextareaColumn name={'notes'} register={register} />
        </FormCols>
        <FormFooter to={model} />
      </FormWrapper>
    </>
  );
}

export default InvoiceForm;
