import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/auth";

const Signup = () => {
  const notify = () => toast.warn("Passwords does not match!");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const outerDiv = {
    height: "100vh",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "18px",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password == formData.confirmpassword) {
      dispatch(register({ formData, navigate, toast }));
    } else {
      notify();
    }
  };

  return (
    <div>
      <div className="d-flex flex-column flex-lg-row w-100" style={outerDiv}>
        {/* left div */}

        <div
          className="w-100 w-lg-50 d-flex flex-column  align-items-center"
          style={{
            background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)", minHeight: "35%",
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
            style={{fontSize:" clamp(22px, 5.5vw, 60px)", width: "60%", height: "70%" }}
            className="text-white d-flex align-items-center flex-column justify-content-center"
          >
            Digital platform for{" "}
            <span className="text-black fst-italic pt-2">expense management</span>
          </h6>
        </div>

        {/* Right div */}

        <div className="w-100 w-lg-50" style={{minHeight: "65%"}}>
          <div
            className=" d-flex h-100 justify-content-center align-items-center flex-column w-100"
          >
            <h5 className="fs-3 text-start w-75" style={{ width: "60%" }}>
              Let's Start
            </h5>
            <p className="w-75 text-start">Start your journey from here!</p>

            <form
              className="d-flex w-75 flex-column gap-4 pt-4 "
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
                <label className="me-2 w-25 w-lg-100">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control w-75"
                />
              </div>
              <div className="d-flex flex-row flex-lg-column gap-2 w-100">
                <label className="me-2 w-25">Confirm Password*</label>
                <input
                  type="password"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  required
                  className="form-control w-75 w-lg-100"
                />
              </div>

              <button
                type="submit"
                className=" form-control btn btn-primary btn-rounded w-25 w-lg-75"
              >
                Signup
              </button>
            </form>

            <p className="pt-5 w-75 text-start">
              Have a account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
