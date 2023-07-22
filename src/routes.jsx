import { Navigate, createBrowserRouter } from 'react-router-dom';
import GuestLayout from './components/layouts/GuestLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/organizations/Organizations';
import OrganizationForm from './pages/organizations/OrganizationForm';
import Industries from './pages/industries/Industries';
import IndustryForm from './pages/industries/IndustryForm';
import BusinessTypes from './pages/BusinessTypes/BusinessTypes';
import BusinessTypeForm from './pages/BusinessTypes/BusinessTypeForm';
import Currencies from './pages/currencies/Currencies';
import CurrencyForm from './pages/currencies/CurrencyForm';
import Languages from './pages/languages/Languages';
import LanguageForm from './pages/languages/LanguageForm';
import SalesPersons from './pages/salespersons/Salespersons';
import SalespersonForm from './pages/salespersons/SalespersonForm';
import Units from './pages/units/Units';
import UnitForm from './pages/units/UnitForm';
import ExpenseCategories from './pages/ExpenseCategories/ExpenseCategories';
import ExpenseCategoryForm from './pages/ExpenseCategories/ExpenseCategoryForm';
import Countries from './pages/countries/Countries';
import CountryForm from './pages/countries/CountryForm';
import States from './pages/states/States';
import StateForm from './pages/states/StateForm';
import PaymentTerms from './pages/PaymentTerms/PaymentTerms';
import PaymentTermForm from './pages/PaymentTerms/PaymentTermForm';
import Items from './pages/items/Items';
import ItemForm from './pages/items/ItemForm';
import Customers from './pages/customers/Customers';
import CustomerForm from './pages/customers/CustomerForm';
import Expenses from './pages/expenses/Expenses';
import ExpenseForm from './pages/expenses/ExpensesForm';
import Invoices from './pages/invoices/Invoices';
import InvoiceForm from './pages/invoices/InvoiceForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/organizations" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/items',
        element: <Items />,
      },
      {
        path: '/items/add',
        element: <ItemForm />,
      },
      {
        path: '/items/edit/:id',
        element: <ItemForm />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/customers/add',
        element: <CustomerForm />,
      },
      {
        path: '/customers/edit/:id',
        element: <CustomerForm />,
      },
      {
        path: '/organizations',
        element: <Organizations />,
      },
      {
        path: '/organizations/add',
        element: <OrganizationForm />,
      },
      {
        path: '/organizations/edit/:id',
        element: <OrganizationForm />,
      },
      {
        path: '/currencies',
        element: <Currencies />,
      },
      {
        path: '/currencies/add',
        element: <CurrencyForm />,
      },
      {
        path: '/currencies/edit/:id',
        element: <CurrencyForm />,
      },
      {
        path: '/industries',
        element: <Industries />,
      },
      {
        path: '/industries/add',
        element: <IndustryForm />,
      },
      {
        path: '/industries/edit/:id',
        element: <IndustryForm />,
      },
      {
        path: '/business_types',
        element: <BusinessTypes />,
      },
      {
        path: '/business_types/add',
        element: <BusinessTypeForm />,
      },
      {
        path: '/business_types/edit/:id',
        element: <BusinessTypeForm />,
      },
      {
        path: '/payment_terms',
        element: <PaymentTerms />,
      },
      {
        path: '/payment_terms/add',
        element: <PaymentTermForm />,
      },
      {
        path: '/payment_terms/edit/:id',
        element: <PaymentTermForm />,
      },
      {
        path: '/languages',
        element: <Languages />,
      },
      {
        path: '/languages/add',
        element: <LanguageForm />,
      },
      {
        path: '/languages/edit/:id',
        element: <LanguageForm />,
      },
      {
        path: '/salespersons',
        element: <SalesPersons />,
      },
      {
        path: '/salespersons/add',
        element: <SalespersonForm />,
      },
      {
        path: '/salespersons/edit/:id',
        element: <SalespersonForm />,
      },
      {
        path: '/units',
        element: <Units />,
      },
      {
        path: '/units/add',
        element: <UnitForm />,
      },
      {
        path: '/units/edit/:id',
        element: <UnitForm />,
      },
      {
        path: '/expense_categories',
        element: <ExpenseCategories />,
      },
      {
        path: '/expense_categories/add',
        element: <ExpenseCategoryForm />,
      },
      {
        path: '/expense_categories/edit/:id',
        element: <ExpenseCategoryForm />,
      },
      {
        path: '/expenses',
        element: <Expenses />,
      },
      {
        path: '/expenses/add',
        element: <ExpenseForm />,
      },
      {
        path: '/expenses/edit/:id',
        element: <ExpenseForm />,
      },
      {
        path: '/invoices',
        element: <Invoices />,
      },
      {
        path: '/invoices/add',
        element: <InvoiceForm />,
      },
      {
        path: '/invoices/edit/:id',
        element: <InvoiceForm />,
      },
      {
        path: '/countries',
        element: <Countries />,
      },
      {
        path: '/countries/add',
        element: <CountryForm />,
      },
      {
        path: '/countries/edit/:id',
        element: <CountryForm />,
      },
      {
        path: '/states',
        element: <States />,
      },
      {
        path: '/states/add',
        element: <StateForm />,
      },
      {
        path: '/states/edit/:id',
        element: <StateForm />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
