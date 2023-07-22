import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios';
import { useForm } from 'react-hook-form';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import PageTitle from '../../components/common/PageTitle';
import { InputColumn } from '../../components/common/Inputs';

function LanguageForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const model = 'languages';

  let { id } = useParams();
  const navigation = useNavigate();

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
          setValue('language_code', newData.language_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <PageTitle title={'Language'} id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width="w-1/2">
        <FormCols cols={1}>
          <InputColumn
            name={'name'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'language_code'}
            label={'Language Code'}
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

export default LanguageForm;
