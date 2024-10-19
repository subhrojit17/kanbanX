import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
const LoginForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [RememberMe, setRememberMe] = useState(false);
  const [Error, setError] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Username === "hubbah" && Password === "huehuehue") {
      setIsLoggedIn(true);
      setError("");
      console.log("Login Successful!", { Username, Password, RememberMe });

      navigate("/dashboard")
    } else {
      setIsLoggedIn(false);
      setError("Please enter valid credentials");
    }
  };
  return (
    <div className="login-container">
      {!IsLoggedIn ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h1>Login</h1>
            {Error && <p className="error-message">{Error}</p>}
            <label>Username:</label>
            <input
              type="text"
              value={Username}
              placeholder="Enter your Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={Password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot">
            <a href="" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      ) : (
        <h2>Welcome, {Username}!</h2>
      )}
    </div>
  );
};

export default LoginForm;
