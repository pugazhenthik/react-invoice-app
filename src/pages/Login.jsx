import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider.jsx';

function Login() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post('login', payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
      <div className="p-6 space-y-4 md:space-y-6">
        <h1 className="text-xl text-center font-semibold text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
          <div>{message}</div>
          <div>
            <label htmlFor="email" className="block mb-2 text-slate-800">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="bg-slate-50 border border-slate-200 text-gray-800 rounded focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-slate-200 rounded bg-slate-50 focus:ring-3 focus:ring-gray-300"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="remember" className="text-gray-600">
                  Remember me
                </label>
              </div>
            </div>
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded px-4 py-2 text-center"
            >
              Login
            </button>
            <Link
              className="text-gray-800 hover:underline px-4 py-2"
              to="/register"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
