import {
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

function Dashboard() {
  return (
    <>
      <h2 className="mb-6 text-2xl text-gray-700">Dashboard</h2>
      <div className="mb-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <span className="text-2xl text-gray-600">121</span>
            <p className="mt-2 px-1 text-gray-500">New Users</p>
          </div>
          <div className="rounded-full bg-emerald-50 p-4 text-emerald-300">
            <ArrowTrendingUpIcon
              className="h-10 w-10"
              strokeWidth={2}
            ></ArrowTrendingUpIcon>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow">
          <div>
            <span className="text-2xl text-gray-600">5342</span>
            <p className="mt-2 px-1 text-gray-500">Total Users</p>
          </div>
          <div className="rounded-full bg-indigo-50 p-4 text-indigo-300">
            <UsersIcon className="h-10 w-10" strokeWidth={2}></UsersIcon>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow">
          <div>
            <span className="text-2xl text-gray-600">10.2k</span>
            <p className="mt-2 px-1 text-gray-500">Last 30 Days Sales</p>
          </div>
          <div className="rounded-full bg-green-50 p-4 text-green-300">
            <CurrencyDollarIcon
              className="h-10 w-10"
              strokeWidth={2}
            ></CurrencyDollarIcon>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow">
          <div>
            <span className="text-2xl text-gray-600">100.8k</span>
            <p className="mt-2 px-1 text-gray-500">Total Sales</p>
          </div>
          <div className="rounded-full bg-rose-50 p-4 text-rose-300">
            <BanknotesIcon
              className="h-10 w-10"
              strokeWidth={2}
            ></BanknotesIcon>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
