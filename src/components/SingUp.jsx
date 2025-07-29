import React, { useState } from "react";
import "../styles/SingUp.css";
import bg from "../assets/bg.jpg";

const SignInSignUp = ({ setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Sign Up successful!");
      setIsSignUp(false);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser?.email === formData.email &&
        storedUser?.password === formData.password
      ) {
        localStorage.setItem("authUser", JSON.stringify({ email: formData.email }));
        alert("Sign In successful!");
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials!");
      }
    }
  };

  return (
    <div
      className="container-1"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // ✅ full screen height
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="container-2">
        <h2 className="heading">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form className="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p className="agreement">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInSignUp;
