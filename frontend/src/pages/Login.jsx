import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../redux/slices/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const outerDiv = {
    height: "100vh",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "18px",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUser({ formData, navigate, toast }));
  };
  return (
    <div className="d-flex flex-column flex-lg-row w-100" style={outerDiv}>
      {/* left div */}

      <div
        className="w-100 w-lg-50 d-flex flex-column  align-items-center"
        style={{
          background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
          height: "100%" , minHeight: "35%"
        }}
      >
        <Link
            className="pt-3 ps-3 text-start text-black"
            style={{ height: "10%", width: "100%" , fontSize: "clamp(14px , 2vw, 26px)", textDecoration:"none", cursor:"pointer"}}
            to="/"
          >
          <span>.</span> Track And Grow
        </Link>
        <h6
          style={{ fontSize:" clamp(22px, 5.5vw, 60px)", width: "60%", height: "70%" }}
          className="text-white d-flex align-items-center flex-column justify-content-center "
        >
          Digital platform for{" "}
          <span className="text-black fst-italic">expense management</span>
        </h6>
      </div>

      {/* Right div */}

      <div className="w-100 w-lg-50" style={{minHeight: "65%"}}>
        <div
          className="h-100 d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100%" }}
        >
          <h5 className="fs-3 text-start w-75" style={{ width: "60%" }}>
            Welcome Back
          </h5>
          <p className="text-start w-75">
            Welcome back! Please enter your details.
          </p>

          <form
            className="d-flex w-75 flex-column gap-4 pt-4 align-items-start"
            
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-row flex-lg-column gap-2 w-100">
              <label className="me-2 w-25">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control w-75"
              />
            </div>

            <div className="d-flex flex-row flex-lg-column gap-2 w-100">
              <label className="me-2 w-25">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control w-75"
              />
            </div>

            <button
              type="submit"
              className=" form-control btn btn-primary btn-rounded w-25 w-lg-75"
            >
              Login
            </button>
          </form>

          <p className="pt-5 w-75 text-start">
            Don't have a account?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
