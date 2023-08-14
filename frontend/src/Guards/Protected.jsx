import { Navigate } from "react-router-dom";

import { useSelector } from 'react-redux';

const Protected = ({ children }) => {

  const {username} = useSelector((state) => state.auth);
  if (username === "") {
    return <Navigate to="/login" />;
  }
  return children;
};
export default Protected;