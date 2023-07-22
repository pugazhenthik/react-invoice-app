import {
  UserCircleIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

function Header({ user }) {
  return (
    <header className="flex items-center justify-between bg-white py-2 md:px-6 px-4 shadow-xl shadow-gray-200/30">
      <div className="m-0">
        <a
          href="#"
          className="text-blue-700 block rounded-md hover:ring hover:ring-blue-200 active:ring active:ring-blue-300"
        >
          <Bars3Icon className="w-8 h-8"></Bars3Icon>
        </a>
      </div>
      <div className="my-1 flex w-2/4 items-center py-1">
        <input
          className="px-2 form-input block w-full rounded-md border-transparent bg-gray-50 py-1.5 focus:border-transparent focus:outline-none focus:ring focus:ring-blue-200"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="-ml-10 rounded-r-md py-2 px-2 text-blue-700"
        >
          <MagnifyingGlassIcon
            className="w-5 h-5"
            strokeWidth={3}
          ></MagnifyingGlassIcon>
        </button>
      </div>
      <div className="flex items-center font-semibold text-slate-500">
        <a href="#" className="md:ml-3 ml-1 hover:text-blue-700">
          <div className="flex items-center">
            <UserCircleIcon className="w-10 h-10"></UserCircleIcon>
            <span className="hidden px-2 md:block">{user.name}</span>
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
