import { PlusIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const addInActive =
  'text-blue-200 hover:bg-white p-1 mr-1 ml-2 hover:text-blue-800 rounded-full absolute right-2';
const addActive = addInActive + ' text-blue-500 bg-white ';

const inActiveClass =
  'flex md:flex-row flex-col hover:text-white hover:bg-blue-800 rounded-md items-center md:px-2 px-0 py-2 md:my-1 font-semibold text-sm md:text-base text-blue-200 justify-between w-full';
const activeClass = inActiveClass + ' bg-blue-800 text-white';

export function ParentNav({ to, text, children }) {
  return (
    <li className="mx-2 flex justify-between items-center relative">
      <NavLink
        to={`/${to}`}
        className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
      >
        <div className="flex items-center capitalize">
          {children}
          <span className="md:pl-2 md:p-0 py-1">{text ? text : to}</span>
        </div>
      </NavLink>

      {to !== 'dashboard' && (
        <NavLink
          to={`/${to}/add`}
          className={({ isActive }) => (isActive ? addActive : addInActive)}
        >
          <PlusIcon strokeWidth={2} className="w-4 h-4"></PlusIcon>
        </NavLink>
      )}
    </li>
  );
}
