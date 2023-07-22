import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
      <div className="p-6 space-y-4 md:space-y-6">
        <h1 className="text-xl font-bold text-gray-700">Create Account</h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-800">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-slate-50 border border-gray-200 text-gray-800 rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Your name"
              required=""
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-50 border border-gray-200 text-gray-800 rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="bg-slate-50 border border-gray-200 text-gray-800 rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="********"
              className="bg-slate-50 border border-gray-200 text-gray-800 rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required=""
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded px-4 py-2 text-center"
            >
              Create
            </button>
            <Link
              className="text-gray-800 hover:underline px-4 py-2"
              to="/login"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
