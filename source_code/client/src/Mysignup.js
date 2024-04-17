import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { BACKEND_API_ENDPOINT } from "./constants";

const Signupdemo = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const myIS = {
    color: "white",
  };

  const handleSignup = async () => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !dob ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_API_ENDPOINT}/api/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          dob,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up");
    }
  };

  return (
    <div style={{ backgroundColor: "purple" }} className="login-container">
      <header className="App-header">
        <h1 align="center" style={myIS}>
          SIGN UP
        </h1>
      </header>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <div>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setPasswordVisible(!passwordVisible)}>
          {passwordVisible ? "👁️" : "🔒"}
        </span>
      </div>
      <div>
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          {confirmPasswordVisible ? "👁️" : "🔒"}
        </span>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={{ backgroundColor: "orange" }} onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};
export default Signupdemo;
