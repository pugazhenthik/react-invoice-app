import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axios';
import PageTitle from '../../components/common/PageTitle';
import { FormCols, FormWrapper } from '../../components/common/Forms';
import { SelectColumn, TextareaColumn } from '../../components/common/Inputs';
import { InputColumn } from '../../components/common/Inputs';

function CustomerForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [billingCountries, setBillingCountries] = useState([]);
  const [shippingCountries, setShippingCountries] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const model = 'customers';
  const types = [{ id: 'Business', name: 'Business' }, { id: 'Indivudual', name: 'Indivudual' }];

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

  async function getBillingStates(id) {
    await axiosClient
      .get(`/dropdown/states?country_id=${id}`)
      .then(({ data }) => {
        setBillingStates(data.data);
        // setValue('billing.state_id');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getShippingStates(id) {
    await axiosClient
      .get(`/dropdown/states?country_id=${id}`)
      .then(({ data }) => {
        setShippingStates(data.data);
        // setValue('shipping.state_id');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axiosClient
      .get(`/dropdown/languages`)
      .then(({ data }) => {
        setLanguages(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosClient
      .get(`/dropdown/payment_terms`)
      .then(({ data }) => {
        setPaymentTerms(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosClient
      .get(`/dropdown/countries`)
      .then(({ data }) => {
        setBillingCountries(data.data);
        setShippingCountries(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    async function getCurrencies() {
      await axiosClient
        .get(`/dropdown/currencies`)
        .then(({ data }) => {
          setCurrencies(data.data);
          getCustomer();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // axiosClient
    //   .get(`/states?count_id=${id}`)
    //   .then(({ data }) => {
    //     setBillingStates(data.data);
    //     setValue('billing.state_id');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axiosClient
    //   .get(`/states?country_id=${id}`)
    //   .then(({ data }) => {
    //     setShippingStates(data.data);
    //     setValue('shipping.state_id');
    //     getCustomer();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    getCurrencies();

    function getCustomer() {
      if (id) {
        axiosClient
          .get(`/${model}/${id}`)
          .then(({ data }) => {
            const newData = data.data;
            setValue('primary_contact', newData.primary_contact);
            setValue('display_name', newData.display_name);
            setValue('type', newData.type);
            setValue('company_name', newData.company_name);
            setValue('email', newData.email);
            setValue('work', newData.work);
            setValue('mobile', newData.mobile);
            setValue('website', newData.website);
            setValue('twitter', newData.twitter);
            setValue('facebook', newData.facebook);
            setValue('remarks', newData.remarks);
            setValue('currency_id', newData.currency_id);
            setValue('language_id', newData.language_id);
            setValue('payment_term_id', newData.payment_term_id);
            // billing
            setValue('billing.id', newData.billing.id);
            setValue('billing.name', newData.billing.name);
            setValue('billing.address', newData.billing.address);
            setValue('billing.city', newData.billing.city);
            setValue('billing.phone', newData.billing.phone);
            setValue('billing.zip_code', newData.billing.zip_code);
            setValue('billing.fax', newData.billing.fax);
            setValue('billing.country_id', newData.billing.country_id);
            getBillingStates(newData.billing.country_id);

            setValue('billing.state_id', newData.billing.state_id);

            // shipping
            setValue('shipping.id', newData.shipping.id);
            setValue('shipping.name', newData.shipping.name);
            setValue('shipping.address', newData.shipping.address);
            setValue('shipping.city', newData.shipping.city);
            setValue('shipping.phone', newData.shipping.phone);
            setValue('shipping.zip_code', newData.shipping.zip_code);
            setValue('shipping.fax', newData.shipping.fax);
            setValue('shipping.country_id', newData.shipping.country_id);
            getShippingStates(newData.shipping.country_id);
            setValue('shipping.state_id', newData.shipping.state_id);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  return (
    <>
      <PageTitle title="Customer" id={id} />
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
            name={'primary_contact'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'display_name'}
            label={'Display Name'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'company_name'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            type={'email'}
            name={'email'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'work'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn
            name={'mobile'}
            required={true}
            register={register}
            errors={errors}
          />
          <InputColumn name={'facebook'} register={register} />
          <InputColumn name={'twitter'} register={register} />
          <InputColumn name={'website'} register={register} />
        </FormCols>
        <FormCols cols={1}>
          <TextareaColumn name={'remarks'} register={register} />
        </FormCols>
        <FormCols cols={2}>
          <SelectColumn
            name={'currency_id'}
            options={currencies}
            register={register}
            label={'Currency'}
          />
          <SelectColumn
            name={'language_id'}
            options={languages}
            register={register}
            label={'Language'}
          />
          <SelectColumn
            name={'payment_term_id'}
            options={paymentTerms}
            register={register}
            label={'Payment Term'}
          />
        </FormCols>
        <div className="text-xl">Addresses</div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-6">
            <InputColumn
              name={'billing.name'}
              required={true}
              register={register}
              errors={errors}
              label={'Name'}
            />
            <InputColumn
              name={'billing.address'}
              required={true}
              register={register}
              errors={errors}
              label={'Address'}
            />
            <SelectColumn
              name={'billing.country_id'}
              options={billingCountries}
              required={true}
              register={register}
              label={'Country'}
              errors={errors}
              onChange={(e) => getBillingStates(e.target.value)}
            />
            <SelectColumn
              name={'billing.state_id'}
              options={billingStates}
              required={true}
              register={register}
              label={'State'}
              errors={errors}
            />
            <InputColumn
              name={'billing.city'}
              required={true}
              register={register}
              errors={errors}
              label={'City'}
            />
            <InputColumn
              name={'billing.zip_code'}
              required={true}
              register={register}
              errors={errors}
              label={'Zip code'}
            />
            <InputColumn
              name={'billing.phone'}
              required={true}
              register={register}
              errors={errors}
              label={'Phone'}
            />
            <InputColumn
              name={'billing.fax'}
              required={true}
              register={register}
              errors={errors}
              label={'Fax'}
            />
          </div>
          <div className="grid gap-6">
            <InputColumn
              name={'shipping.name'}
              required={true}
              register={register}
              errors={errors}
              label={'Name'}
            />
            <InputColumn
              name={'shipping.address'}
              required={true}
              register={register}
              errors={errors}
              label={'Address'}
            />
            <SelectColumn
              name={'shipping.country_id'}
              options={shippingCountries}
              required={true}
              register={register}
              label={'Country'}
              errors={errors}
              onChange={(e) => getShippingStates(e.target.value)}
            />
            <SelectColumn
              name={'shipping.state_id'}
              options={shippingStates}
              required={true}
              register={register}
              label={'State'}
              errors={errors}
            />
            <InputColumn
              name={'shipping.city'}
              required={true}
              register={register}
              errors={errors}
              label={'City'}
            />
            <InputColumn
              name={'shipping.zip_code'}
              required={true}
              register={register}
              errors={errors}
              label={'Zip code'}
            />
            <InputColumn
              name={'shipping.phone'}
              required={true}
              register={register}
              errors={errors}
              label={'Phone'}
            />
            <InputColumn
              name={'shipping.fax'}
              required={true}
              register={register}
              errors={errors}
              label={'Fax'}
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          <Link
            to={'/customers'}
            className="px-2 py-1 ml-4 rounded bg-gray-500 text-white hover:bg-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-2 py-1 ml-4 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </FormWrapper>
    </>
  );
}

export default CustomerForm;
