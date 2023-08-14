import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='d-flex flex-column flex-md-row justify-content-center align-items-center' style={{ minHeight: "100vh", background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className='text-center text-md-start' style={{ flex: "1", padding: "5rem"}}>
        <h2 className='pb-3 text-success fs-sm-4 fs-md-3'>Track And Grow</h2>
        <h4 style={{ fontSize: "2rem", fontWeight: "600" }}><span className='fst-italic text-white'>Track</span> your spending habits</h4>
        <p className='pt-3 fs-4 pb-2'>Try our expense tracker to see where your money goes.</p>
        <button className='btn btn-success ps-4 pe-4'><Link style={{ textDecoration: "none" }} className='text-white' to="/signup">Go</Link></button>
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        <img src="/images/manage_money.jpg" className="img-fluid" alt="Manage Money" />
      </div>
    </div>
  );
};

export default Home;
