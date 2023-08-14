import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Income from "../pages/Income";
import Expense from "../pages/Expense";
import Online from "../pages/Online";
import Cash from "../pages/Cash";

const Routes = () => {
  const router = createBrowserRouter([
    { path: "/dashborad/income", element: <Income /> },
    { path: "/dashborad/expense", element: <Expense /> },
    { path: "/dashborad/online", element: <Online /> },
    { path: "/dashborad/cash", element: <Cash /> },
    { path: "/dashborad/history", element: <History /> },
  ]);

  return <div>
      <RouterProvider router={router} /> 
  </div>;
};

export default Routes;
