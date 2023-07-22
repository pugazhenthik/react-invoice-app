import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axios';
import {
  InputColumn,
  SelectColumn,
  TextareaColumn,
} from '../../components/common/Inputs';
import PageTitle from '../../components/common/PageTitle';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import notify from '../../nofity';

function ItemForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const model = 'items';

  const [units, setUnits] = useState([]);

  let { id } = useParams();
  const navigation = useNavigate();

  const types = [{ id: 'Goods', name: 'Goods' }, { id: 'Service', name: 'Service' }];

  const onSubmit = async (data) => {
    if (id) {
      await axiosClient
        .put(`/${model}/${id}`, data)
        .then(() => { notify('updated', 'success'); navigation(`/${model}`) })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axiosClient
        .post(`/${model}`, data)
        .then(() => { notify('created', 'success'); navigation(`/${model}`) })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    async function getUnits() {
      await axiosClient
        .get(`/dropdown/units`)
        .then(({ data }) => {
          setUnits(data.data);
          getItem();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUnits();

    async function getItem() {
      if (id) {
        await axiosClient
          .get(`/${model}/${id}`)
          .then(({ data }) => {
            const newData = data.data;
            setValue('name', newData.name);
            setValue('type', newData.type);
            setValue('sku', newData.sku);
            setValue('price', newData.price);
            setValue('unit_id', newData.unit_id);
            setValue('description', newData.description);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  return (
    <>
      <PageTitle title="Item" id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width="w-full">
        <FormCols cols={2}>
          <SelectColumn
            name={'type'}
            options={types}
            required={true}
            register={register}
            label={'Type'}
            errors={errors}
          />
          <InputColumn
            name={'name'}
            required={true}
            register={register}
            errors={errors}
          />
          <SelectColumn
            name="unit_id"
            label={'Unit'}
            options={units}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'sku'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'price'}
            required={true}
            register={register}
            errors={errors}
          />
        </FormCols>
        <FormCols cols={2}>
          <TextareaColumn name={'description'} register={register} />
        </FormCols>
        <FormFooter to={model} />
      </FormWrapper>
    </>
  );
}

export default ItemForm;
