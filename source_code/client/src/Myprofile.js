import React, { useState } from "react";
import img from "./profilepic.jpeg";
import { useNavigate } from "react-router-dom";

const Prodemo = () => {
  const [name, setName] = useState("Anitha Reddy Bapathu");
  const [description, setDescription] = useState("I am a student at Suny Albany pursuing my masters in Computer Science.I am a motivated and detail-oriented student with a strong academic record and a passion for learning. I have finished my undergraduation in Computer Science from Vasireddy Venkatadri Institute of Technology.After that i have done internship on manual Testing for two months at Cognizant.I am very passionate about programming and would love to solve problems by finding the logic.");
  const [isMod, setIsMod] = useState(false);
  const navigate = useNavigate();
  const myIS = {
    color: "white",
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'purple' }}>
        <button
          className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginLeft: '4px' }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="container-fluid d-flex justify-content-center">
          <h1 style={myIS}>PROFILE PAGE</h1>
        </div>
        <div className="d-flex">
        <button
              className="btn btn-danger ml-2" style={{ backgroundColor: 'orange' ,marginRight: '4px' }}
              onClick={() => navigate("/Myadd")}
            >
              Addition
            </button>
          <button className="btn btn-danger ml-2" style={{ backgroundColor: 'orange' ,marginRight: '4px' }} onClick={() => navigate("/MyInventory")}>
            Inventory
          </button>
          <button className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }} onClick={() => navigate("/MyAPI")}>
            API
          </button>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <img src={img} alt="User" className="img-fluid border border-danger-subtle " style={{ width: "300px", height: "300px" }} />
          </div>
          <div className="col-8" >
            <div className="row mb-4">
                <input
                  type="text"
                  id="name"
                  className="form-control text-uppercase fs-3 font-weight-bolder border border-danger-subtle border-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isMod}
                />
            </div>
            <div className="row mb-4">
              <div className="col">
                {isMod ? (
                  <>
                    <input
                      type="text"
                      id="description"
                      className="form-control border border-danger-subtle border-1"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="btn btn-danger mt-2" style={{ backgroundColor: 'orange'}} onClick={()=>setIsMod(false)}>
                      Save Changes
                    </button>
                  </>
                ) : (
                  <div>
                    <p className = "text-justify">{description}</p>
                    <button className="btn btn-danger mt-2" style={{ backgroundColor: 'orange'}} onClick={()=>setIsMod(true)}>
                      Edit
                    </button>
                  </div>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prodemo;
