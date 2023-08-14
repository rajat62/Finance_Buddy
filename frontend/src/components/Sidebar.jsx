import React from 'react'
import { Link } from 'react-router-dom';
import "./styles/sidebar.css"
import {
      AiFillCreditCard,
      AiFillDashboard,
      AiFillBank,
      AiFillDollarCircle,
    } from "react-icons/ai";
    
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
const Sidebar = ({isOpen}) => {

      const links = [
            { name: "Dashboard", icon: <AiFillDashboard className="icons"/>, link:"/dashboard" },
            { name: "Income", icon: <FiTrendingUp className="icons" /> , link: "/dashboard/income"},
            { name: "Expense", icon: <FiTrendingDown className="icons" /> , link:"/dashboard/expense"},
            { name: "Online", icon: <AiFillCreditCard className="icons" /> , link: "/dashboard/online"},
            { name: "Cash", icon: <AiFillDollarCircle className="icons" /> , link: "/dashboard/cash"},
            { name: "History", icon: <AiFillBank className="icons" /> , link: "/dashboard/history"},
      ];

  return (
    <div>
      <nav className={isOpen ? "open sidebar" : "close"}>
        <ul className="pt-4 navbar-links m-0 ps-0">
          {links.map((item) => {
            return (
              <li className="fs-5 pb-2 list-styling">
                <Link to={item.link}>{item.icon}</Link>
                <Link className="showName icons pt-3" to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar