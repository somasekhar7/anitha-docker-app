import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Ademo = (props) => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result,setResult] =useState(null);
  const [resultFromClient, setResultFromClient] = useState(null);

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
    setResult(data.result); 
  } catch (error) {
    console.error('Error:', error);
  }
  const clientResult = parseFloat(num1) + parseFloat(num2);
    setResultFromClient(clientResult);

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
      </nav>
      <div className="container mt-5">
        <form className="mt-4" onSubmit={handleCalculate}>
          <div className="row mb-3">
            <label htmlFor="num1" className="col-sm-4 col-form-label">Enter First Number:</label>
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

          <div className="row mb-3">
            <label htmlFor="num2" className="col-sm-4 col-form-label">Enter Second Number:</label>
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
      {result !== null && (
        <div className="mt-4">
          <h4>Result from Server:</h4>
          <p>{result}</p>
        </div>
      )}
      {resultFromClient !== null && (
        <div className="mt-4">
          <h4>Result from react:</h4>
          <p>{resultFromClient}</p>
        </div>
      )}
      </div>
    </>
    
  );
};
export default Ademo;