// LoginGuard.js
import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const LoginGuard = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  console.log("LoginGuard: "+ username);
  if (username.length > 0) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default LoginGuard;
