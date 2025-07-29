// components/Footer.jsx
import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import "../styles/Footer.css";
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

export default function Footer({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setIsLoggedIn(false); // 👈 This will redirect to SignInSignUp
  };

  return (
    <footer className="custom-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/map">India Map</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>

        <div className="footer-description">
          <p>
            Empowering digital experiences with clean UI, intuitive design,
            and scalable tech.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-icons flex gap-4 justify-center items-center">
          <Tilt glareEnable={true} glareMaxOpacity={0.3}>
            <a href="https://www.instagram.com/its_me_shivay21/" target="_blank" rel="noreferrer">
              <FaInstagram size={28} />
            </a>
          </Tilt>
          <Tilt glareEnable={true} glareMaxOpacity={0.3}>
            <a href="https://github.com/itsmeshivay" target="_blank" rel="noreferrer">
              <FaGithub size={28} />
            </a>
          </Tilt>
          <Tilt glareEnable={true} glareMaxOpacity={0.3}>
            <a href="https://www.linkedin.com/in/shivam-sharma-002a68327" target="_blank" rel="noreferrer">
              <FaLinkedin size={28} />
            </a>
          </Tilt>
        </div>
        <p className="footer-copy">© 2025 Code with Shivam. All rights reserved.</p>
      </div>
    </footer>
  );
}
