import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex w-full flex-1 flex-col overflow-auto bg-slate-50">
        <div className="overflow-y-auto">
          <div className="mx-6 my-6">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
              <Link
                to="/"
                className="flex uppercase items-center mb-6 text-2xl font-semibold text-blue-700"
              >
                Ammu
              </Link>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestLayout;
