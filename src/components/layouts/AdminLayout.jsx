import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ReactNotifications } from 'react-notifications-component'
import Header from './Header';
import { useStateContext } from '../../contexts/ContextProvider';
import { useEffect } from 'react';
import axiosClient from '../../axios';
import 'react-notifications-component/dist/theme.css'


function AdminLayout() {
  const { setUser, user, token } = useStateContext();

  useEffect(() => {
    if (token)
      axiosClient.get('user').then(({ data }) => {
        setUser(data);
      });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar></Sidebar>
      <ReactNotifications />
      <div className="flex w-full flex-1 flex-col overflow-auto bg-slate-50">
        <div className="z-10">
          <Header user={user}></Header>
        </div>
        <div className="overflow-y-auto">
          <div className="mx-6 my-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
