import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Ademo = (props) => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sresult,setSresult] =useState(null);
  const [cresult, setCresult] = useState(null);
  const myIS = {
    color: "white",
  };

  const handleCalculate =async(e) => {
   e.preventDefault();
   try {
    const response = await fetch('http://localhost:8000/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        num1,
        num2,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setSresult(data.result); 
  } catch (error) {
    console.error('Error:', error);
  }
  const clresult = parseFloat(num1) + parseFloat(num2);
    setCresult(clresult);

}; 
return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light mb-1" style={{ backgroundColor: 'purple' }}>
        <button
          className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="container-fluid d-flex justify-content-center">
          <h1 style={myIS}>ADDITION PAGE</h1>
        </div>
        <button
              className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }}
              onClick={() => navigate("/Myprofile")}
            >
              Profile
            </button>
      </nav>
      <div className="container mt-5">
        <form className="mt-4" onSubmit={handleCalculate}>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Enter First Number:</label>
            <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="num1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
            </div>
          </div>

          <div className="row mb-4">
            <label htmlFor="num2" className="col-sm-2 col-form-label">Enter Second Number:</label>
            <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="num2"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{backgroundColor: 'orange'}}>Submit</button>
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