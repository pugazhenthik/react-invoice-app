import {
  HomeIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  UserGroupIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ParentNav } from '../common/Navs';
import Logo from '../common/Logo';

const links = [
  {
    link: 'organizations',
  },
  {
    link: 'currencies',
  },
  {
    link: 'industries',
  },
  {
    link: 'salespersons',
    text: 'Sales Persons',
  },
  {
    link: 'payment_terms',
    text: 'Payment Terms',
  },
  {
    link: 'business_types',
    text: 'business types',
  },
  {
    link: 'expense_categories',
    text: 'expense categories',
  },
  {
    link: 'units',
  },
  {
    link: 'languages',
  },
  {
    link: 'countries',
  },
  {
    link: 'states',
  },
];

const subMenuInActive =
  'flex md:flex-row md:justify-start capitalize flex-col hover:text-white items-center justify-center md:px-2 px-0 py-2 text-sm md:text-base text-blue-200 w-full';

const subMenuActive = subMenuInActive + ' text-white font-semibold ';

const addSubInactive =
  'text-blue-200 hover:bg-white p-1 mr-1 ml-2 hover:text-blue-800 rounded-full mr-3 ';
const addSubActive = addSubInactive + ' bg-white text-blue-500 ';

function Sidebar() {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = links.filter((l) => {
      return location.pathname.includes(l.link);
    });

    if (currentPath.length > 0) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, []);

  return (
    <div className="min-h-full md:w-64 w-24 bg-blue-700 md:block overflow-auto">
      <Logo />
      <nav>
        <ul>
          <ParentNav to="dashboard">
            <HomeIcon className="h-4 w-4"></HomeIcon>
          </ParentNav>
          <ParentNav to="customers">
            <UserGroupIcon className="h-4 w-4"></UserGroupIcon>
          </ParentNav>
          <ParentNav to="items">
            <CircleStackIcon className="h-4 w-4"></CircleStackIcon>
          </ParentNav>
          <ParentNav to="invoices">
            <ClipboardDocumentListIcon className="h-4 w-4"></ClipboardDocumentListIcon>
          </ParentNav>
          <ParentNav to="expenses">
            <BanknotesIcon className="h-4 w-4"></BanknotesIcon>
          </ParentNav>
          <li className="mx-2 my-2 md:block hidden">
            <button
              className={
                'flex px-2 w-full py-2 text-blue-100 hover:text-white hover:bg-blue-800 rounded-md justify-between items-center' +
                (dropdown ? ' bg-blue-800 ' : '')
              }
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <span className="flex justify-between items-center">
                <Cog6ToothIcon className="h-4 w-4"></Cog6ToothIcon>
                <span className="pl-2">Settings</span>
              </span>
              <span className="pr-2">
                {!dropdown ? (
                  <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
                ) : (
                  <ChevronUpIcon className="w-4 h-4"></ChevronUpIcon>
                )}
              </span>
            </button>
            <ul
              className={
                'text-blue-100 ml-4 ' + (dropdown ? 'block' : 'hidden')
              }
            >
              {links.map((l) => (
                <li
                  key={l.link}
                  className="ml-2 md:my-1 flex justify-between items-center"
                >
                  <NavLink
                    to={l.link}
                    className={({ isActive }) =>
                      isActive ? subMenuActive : subMenuInActive
                    }
                  >
                    {l.text ? l.text : l.link}
                  </NavLink>
                  <NavLink
                    to={`/${l.link}/add`}
                    className={({ isActive }) =>
                      isActive ? addSubActive : addSubInactive
                    }
                  >
                    <PlusIcon strokeWidth={2} className="w-4 h-4"></PlusIcon>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
