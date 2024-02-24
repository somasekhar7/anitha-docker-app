import React from "react";
import { useNavigate } from "react-router-dom";


const Person = (props) => {
  const navigate = useNavigate();
  const myIS = {
    color: "white",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light mb-1" style={{ backgroundColor: 'purple' }}>
        <div className="container-fluid d-flex justify-content-center">
          <h1 style={myIS}>ANITHA REDDY BAPATHU</h1>
        </div>
        <div className="d-flex">
            <button
              className="btn btn-info mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }}
              onClick={() => navigate("/Myprofile")}
            >
              Profile
            </button>
            <button
              className="btn btn-danger ml-2" style={{ backgroundColor: 'orange' ,marginRight: '4px' }}
              onClick={() => navigate("/Myadd")}
            >
              Addition
            </button>
          </div>
      </nav>
    </>
  );
};
export default Person;