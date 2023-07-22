import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios';
import { useForm } from 'react-hook-form';
import { InputColumn, SelectColumn } from '../../components/common/Inputs';
import PageTitle from '../../components/common/PageTitle';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';

function StateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const model = 'states';

  const [countries, setCountries] = useState([]);

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
    getCountries();
  }, []);

  async function getCountries() {
    await axiosClient
      .get(`/dropdown/countries`)
      .then(({ data }) => {
        setCountries(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/${model}/${id}`)
        .then(({ data }) => {
          const newData = data.data;
          setValue('name', newData.name);
          setValue('country_id', newData.country.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <PageTitle title="State" id={id} />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width="w-1/2">
        <FormCols cols={1}>
          <SelectColumn
            name="country_id"
            label={'Country'}
            options={countries}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name="name"
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

export default StateForm;
