import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Ademo = (props) => {
  const navigate = useNavigate();
  const [int1, setInt1] = useState('');
  const [int2, setInt2] = useState('');
  const [sresult,setSresult] =useState(null);
  const [cresult, setCresult] = useState(null);
  const myIS = {
    color: "white",
  };

  const handleCalculate =async(e) => {
   e.preventDefault();
   try {
    const response = await fetch('http://ec2-3-143-230-247.us-east-2.compute.amazonaws.com/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        int1,
        int2,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const op = await response.json();
    setSresult(op.sum); 
  } catch (error) {
    console.error('Error:', error);
  }
  const clresult = parseFloat(int1) + parseFloat(int2);
    setCresult(clresult);
  

}; 
return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light mb-1" style={{ backgroundColor: 'purple' }}>
        <button
          className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginLeft: '4px' }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="container-fluid d-flex justify-content-center">
          <h1 style={myIS}>ADDITION PAGE</h1>
        </div>
        <button
              className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '4px' }}
              onClick={() => navigate("/Myprofile")}
            >
              Profile
            </button>
      </nav>
      <div className="container mt-5">
        <form className="mt-4">
          <div className="row mb-3">
            <label className="col-2 col-form-label">Enter First Number:</label>
            <div className="col-8">
            <input
              type="number"
              className="form-control"
              id="int1"
              value={int1}
              onChange={(e) => setInt1(e.target.value)}
            />
            </div>
          </div>

          <div className="row mb-4">
            <label className="col-2 col-form-label">Enter Second Number:</label>
            <div className="col-8">
            <input
              type="number"
              className="form-control"
              id="int2"
              value={int2}
              onChange={(e) => setInt2(e.target.value)}
            />
            </div>
          </div>

          <button type="button" className="btn btn-danger" style={{backgroundColor: 'orange'}} onClick={handleCalculate}>Submit</button>
        </form>
      </div>
      {sresult !== null && (
        <div className="mt-4 mb-3">
          <h4 class="ms-4">Your Addition Result(from server) is: {sresult}</h4>
          
        </div>
      )}
      {cresult !== null && (
        <div className="mt-4">
          <h4 class="ms-4">Your Addition Result(from ReactJS) is: {cresult}</h4>
        </div>
      )}
      </div>
    </>
    
  );
};
export default Ademo;
