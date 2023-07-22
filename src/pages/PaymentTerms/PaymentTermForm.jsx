import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios';
import { useForm } from 'react-hook-form';
import PageTitle from '../../components/common/PageTitle';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import { InputColumn } from '../../components/common/Inputs';

function PaymentTermForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let { id } = useParams();
  const navigation = useNavigate();

  const model = 'payment_terms';

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
    if (id) {
      axiosClient
        .get(`/${model}/${id}`)
        .then(({ data }) => {
          const newData = data.data;
          setValue('name', newData.name);
          setValue('term', newData.term);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <PageTitle title={'Payment Term'} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width={'w-1/2'}>
        <FormCols cols={1}>
          <InputColumn
            name={'name'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'term'}
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

export default PaymentTermForm;
