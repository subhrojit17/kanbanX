import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa"; // Importing the icons

const LoginForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Username === "hubbah" && Password === "huehuehue") {
      setIsLoggedIn(true);
      setError("");
      console.log("Login Successful!", { Username, Password });

      navigate("/dashboard");
    } else {
      setIsLoggedIn(false);
      setError("Please enter valid credentials");
    }
  };

  return (
    <div className="login-container">
      {!IsLoggedIn ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {Error && <p className="error-message">{Error}</p>}

          <div className="form-group">
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                value={Username}
                placeholder=""
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="floating-label">Username</label>
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                value={Password}
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="floating-label">Password</label>
            </div>
          </div>

          <button className="login-button" type="submit">
            Login to KanbanX <FaArrowRight className="button-icon"/>
          </button>
        </form>
      ) : (
        <h2>Welcome, {Username}!</h2>
      )}
    </div>
  );
};

export default LoginForm;
