import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';
import router from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </ContextProvider>
  // </React.StrictMode>
);
