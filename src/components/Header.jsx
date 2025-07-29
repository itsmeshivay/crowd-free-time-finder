import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="text-2xl md:text-3xl font-extrabold typewriter">
          Crowd-Free Time Finder
        </h1>
      </div>

      <nav className="nav-links">
         <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/map" >India Map</Link>
           
      </nav>
    </header>
  );
};

export default Header;
