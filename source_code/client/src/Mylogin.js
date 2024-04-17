import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { BACKEND_API_ENDPOINT } from "./constants";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const myIS = {
    color: "white",
  };
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_API_ENDPOINT}/api/userLogin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.status === 200) {
        const responseData = response.data;
        const errorMessage = responseData.error || "Login failed";
        throw new Error(errorMessage);
      }

      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/Home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "purple" }} className="login-container">
      <header className="App-header">
        <h1 align="center" style={myIS}>
          USER LOGIN
        </h1>
      </header>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={myIS}>{error}</p>}
      <button
        className="btn btn-danger mr-3"
        style={{ backgroundColor: "orange", marginRight: "8px" }}
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="btn btn-danger mr-3"
        style={{ backgroundColor: "orange", marginRight: "8px" }}
        onClick={() => navigate("/Mysignup")}
      >
        Signup
      </button>
    </div>
  );
};
export default Login;
