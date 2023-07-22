import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios';
import { useForm } from 'react-hook-form';
import {
  FormCols,
  FormFooter,
  FormWrapper,
} from '../../components/common/Forms';
import { InputColumn, SelectColumn } from '../../components/common/Inputs';

function OrganizationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [industries, setIndustries] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  let { id } = useParams();
  const navigation = useNavigate();

  const model = 'organizations';

  useEffect(() => {
    axiosClient
      .get('/dropdown/industries')
      .then(({ data }) => {
        setIndustries(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get('/dropdown/business_types')
      .then(({ data }) => {
        setBusinesses(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get('/dropdown/countries')
      .then(({ data }) => {
        setCountries(data.data);
      })
      .catch((error) => {
        console.log('request ' + error);
      });
  }, []);

  const onCountryChange = async (id) => {
    let countryId = id;
    await axiosClient
      .get(`/dropdown/states?country_id=${countryId}`)
      .then(({ data }) => {
        setStates(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    if (id) {
      axiosClient
        .put(`/${model}/${id}`, data)
        .then(() => navigation(`/${model}`))
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error);
          } else {
            console.log(error);
          }
        });
    } else {
      axiosClient
        .post(`/${model}`, data)
        .then(() => navigation(`/${model}`))
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error);
          } else {
            console.log(error);
          }
        });
    }
  };

  const getOrganization = async () => {
    await axiosClient
      .get(`/${model}/${id}`)
      .then(({ data }) => {
        const newData = data.data;
        setValue('name', newData.name);
        setValue('street_1', newData.street_1);
        setValue('street_2', newData.street_2);
        setValue('business_type_id', newData.business_type_id);
        setValue('industry_id', newData.industry_id);
        setValue('country_id', newData.country_id);
        onCountryChange(newData.country_id);
        setValue('state_id', newData.state_id);
        setValue('city', newData.city);
        setValue('phone', newData.phone);
        setValue('fax', newData.fax);
        setValue('website', newData.website);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getOrganization();
    }
  }, [id]);

  return (
    <>
      <h2 className="mb-6 text-2xl text-gray-700">Add Organization</h2>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} width={'w-full'}>
        <FormCols cols={2}>
          <InputColumn
            name={'name'}
            required={true}
            register={register}
            errors={errors}
          />
          <SelectColumn
            name={'industry_id'}
            options={industries}
            required={true}
            register={register}
            label={'Industry'}
            errors={errors}
          />
          <SelectColumn
            name={'business_type_id'}
            options={businesses}
            required={true}
            register={register}
            label={'Business Type'}
            errors={errors}
          />
          <InputColumn
            name={'street_1'}
            label={'Street 1'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'street_2'}
            label={'Street 2'}
            register={register}
          />
          <InputColumn
            name={'city'}
            required={true}
            register={register}
            errors={errors}
          />
          <SelectColumn
            onChange={(e) => {
              setValue('country_id', e.target.value);
              onCountryChange(e.target.value);
            }}
            name={'country_id'}
            options={countries}
            required={true}
            register={register}
            label={'Country'}
            errors={errors}
          />
          <SelectColumn
            onChange={(e) => {
              setValue('state_id', e.target.value);
            }}
            name={'state_id'}
            options={states}
            required={true}
            register={register}
            label={'State'}
            errors={errors}
          />
          <InputColumn name={'phone'} register={register} />
          <InputColumn name={'fax'} register={register} />
        </FormCols>
        <FormCols cols={1}>
          <InputColumn name={'website'} register={register} />
        </FormCols>
        <FormFooter to={model} />
      </FormWrapper>
    </>
  );
}

export default OrganizationForm;
