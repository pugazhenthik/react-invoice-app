import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="text-3xl">404 Not Found</div>
      <Link to="/" className="mt-4 text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}

export default Login;
