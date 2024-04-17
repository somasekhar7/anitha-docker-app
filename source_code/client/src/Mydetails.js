import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Details = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const myIS = {
    color: "white",
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "purple" }}
      >
        <button
          className="btn btn-danger mr-3"
          style={{ backgroundColor: "orange", marginLeft: "4px" }}
          onClick={() => navigate("/Home")}
        >
          Home
        </button>
        <div className="container-fluid d-flex justify-content-center">
          <h1 style={myIS}>USER DETAILS PAGE</h1>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-danger mr-3"
            style={{ backgroundColor: "orange", marginRight: "8px" }}
            onClick={() => navigate("/Myprofile")}
          >
            Profile
          </button>
          <button
            className="btn btn-danger ml-2"
            style={{ backgroundColor: "orange", marginRight: "4px" }}
            onClick={() => navigate("/Myadd")}
          >
            Addition
          </button>
          <button
            className="btn btn-danger mr-3"
            style={{ backgroundColor: "orange", marginRight: "8px" }}
            onClick={() => navigate("/MyInventory")}
          >
            Inventory
          </button>
          <button
            className="btn btn-danger mr-3"
            style={{ backgroundColor: "orange", marginRight: "8px" }}
            onClick={() => navigate("/MyAPI")}
          >
            API
          </button>
          <button
            className="btn btn-danger mr-3"
            style={{ backgroundColor: "orange", marginRight: "8px" }}
            onClick={() => navigate("/")}
          >
            SIGNOUT
          </button>
        </div>
      </nav>
      {user && (
        <div style={{ backgroundColor: "purple" }} className="login-container">
          <p style={myIS}>Email: {user.email}</p>
          <p style={myIS}>First Name: {user.firstName}</p>
          <p style={myIS}>Last Name: {user.lastName}</p>
          <p style={myIS}>Date of Birth: {user.dob}</p>
        </div>
      )}
    </div>
  );
};
export default Details;
