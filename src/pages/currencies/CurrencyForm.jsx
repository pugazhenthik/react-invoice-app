import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios';
import { useForm } from 'react-hook-form';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import { InputColumn } from '../../components/common/Inputs';
import PageTitle from '../../components/common/PageTitle';

function CurrencyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const model = 'currencies';

  let { id } = useParams();
  const navigation = useNavigate();

  const onSubmit = (data) => {
    if (id) {
      axiosClient
        .put(`${model}/${id}`, data)
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
    if (id) {
      axiosClient
        .get(`/${model}/${id}`)
        .then(({ data }) => {
          const newData = data.data;
          setValue('name', newData.name);
          setValue('currency_code', newData.currency_code);
          setValue('symbol', newData.symbol);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <PageTitle title="Currency" id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width={'w-1/2'}>
        <FormCols cols={1}>
          <InputColumn
            name={'name'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'currency_code'}
            label={'Currency code'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'symbol'}
            required={true}
            register={register}
            errors={errors}
          />
        </FormCols>
        <FormFooter to={model} />
      </FormWrapper>
    </>
  );
}

export default CurrencyForm;
