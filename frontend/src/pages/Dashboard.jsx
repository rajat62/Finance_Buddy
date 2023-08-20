import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {  useSelector , useDispatch} from "react-redux";
import "./styles/dashboard.css";
import CalenderComponent from "../components/CalenderComponent";
import Sidebar from "../components/Sidebar";
import { AiFillGithub, AiOutlineMenu } from "react-icons/ai";
import AddTransaction from "../components/AddTransaction";
import { Link, Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/auth";
import { GrAdd } from "react-icons/gr";

const Dashboard = () => {

  // const success = () => toast.success("Loggedin successfully!");
  // useEffect(() => {
  //   success();
  // }, []);

  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  console.log(username);
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = ()=>{
    dispatch(logoutUser());
  }
  // const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sidebarWidth = windowWidth === 992 ? '100%' : (isOpen ? '12%' : '0');
  const centralDivWidth = windowWidth === 992 ? '100%' : (isOpen ? '63%' : '80%');

  return (
    <div className="mainStyle d-flex flex-column flex-lg-row">
      
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        className={isOpen ? 'open' : 'close'}
        style={{
          width: sidebarWidth,
          minWidth: isOpen && windowWidth !== 992 ? '20%' : '0',
        }}
      />

      {/* Central Div */}
      <div
        style={{
          minWidth: centralDivWidth,
          width: windowWidth === 992 ? '100%' : (isOpen ? '100%' : centralDivWidth),
          backgroundColor: 'rgb(236, 244, 247)',
          height:"auto"
        }}
        className="d-flex flex-column p-4 gap-4"
      >

        {/* Above division */}
        <div className="d-flex justify-content-between align-items-center">
          <h4 style={
            {
              fontSize:"clamp(18px ,1.8vw, 20px)"
            }
          }>There you go,  {username.toUpperCase()}</h4>
          <div className="d-flex flex-row gap-3 align-items-center">
            <Link to="/dashboard/customize" style={{border:"none"}}><GrAdd className="fs-3" /></Link>
            {/* <AiFillGithub className="fs-1" /> */}
            <button className="btn btn-success" onClick={handleToggle}>
              <AiOutlineMenu />
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <Outlet />

        
      </div>
      <div
        style={{ minWidth: "25%", height: "100%" }}
        className="d-flex flex-column align-items-center  gap-5 pt-5 pb-5"
      >
        <CalenderComponent />
        <AddTransaction/>
      </div>
    </div>
  );
};

export default Dashboard;
