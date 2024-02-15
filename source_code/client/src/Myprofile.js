import React, { useState } from "react";
import defaultImage from "./dp.jpg";
import { useNavigate } from "react-router-dom";

const Prodemo = () => {
  const [name, setName] = useState("Anitha Reddy Bapathu");
  const [description, setDescription] = useState("Motivated and detail-oriented student with a strong academic record and a passion for learning. Demonstrated ability to effectively manage time and prioritize tasks, resulting in consistently high grades and successful completion of multiple projects. Seeking an internship opportunity to apply knowledge and gain practical experience in the field of Computer Science.");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(defaultImage);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light mb-1" style={{ backgroundColor: 'purple' }}>
        <button
          className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <img src={image} alt="User" className="img-fluid border border-danger-subtle border-1" style={{ width: "300px", height: "300px" }} />
          </div>
          <div className="col-md-9">
            <div className="row no-gutters mb-3">
              <div className="col">
                <input
                  type="text"
                  id="name"
                  className="form-control text-uppercase font-size-lg border border-danger-subtle border-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" style={{ backgroundColor: 'orange'}} onClick={handleSaveClick}>
                      Save Changes
                    </button>
                  </>
                ) : (
                  <div>
                    <p>{description}</p>
                    <button className="btn btn-primary mt-2" style={{ backgroundColor: 'orange'}} onClick={handleEditClick}>
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
