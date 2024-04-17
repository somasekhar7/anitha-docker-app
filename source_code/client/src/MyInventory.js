import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_ENDPOINT } from "./constants";

const Indemo = () => {
  const navigate = useNavigate();
  const myIS = {
    color: "white",
  };
  const [isInv, setIsInv] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isModale, setIsModale] = useState(false);
  const [iName, setIName] = useState("");
  const [iQuantity, setIQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [updatedItemName, setUpdatedItemName] = useState("");
  const [updatedItemQuantity, setUpdatedItemQuantity] = useState("");

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [nameError, setNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleModalClose = () => {
    setIsModal(false);
    resetFormFields();
  };
  const resetFormFields = () => {
    setIName("");
    setIQuantity("");
    setImage(null);
    setNameError("");
    setQuantityError("");
    setImageError("");
  };
  useEffect(() => {
    if (isModal) {
      resetFormFields();
    }
  }, [isModal]);

  const handleRenderItems = async (e) => {
    try {
      const response = await fetch(`${BACKEND_API_ENDPOINT}/api/renderItems`);
      if (!response.ok) {
        throw new Error("Failed to get inventory items");
      }
      const data = await response.json();
      setInventoryItems(data);
      console.log(data);
      setIsInv(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddItem = async (e) => {
    setNameError("");
    setQuantityError("");
    setImageError("");

    let hasError = false;
    if (!iName) {
      setNameError("Please enter item name");
      hasError = true;
    }
    if (!iQuantity) {
      setQuantityError("Please enter item quantity");
      hasError = true;
    }
    if (!image) {
      setImageError("Please upload item image");
      hasError = true;
    }

    if (hasError) return;
    try {
      const formData = new FormData();
      formData.append("name", iName);
      formData.append("quantity", iQuantity);
      formData.append("image", image);

      const res = await fetch(`${BACKEND_API_ENDPOINT}/api/addItem`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Item added successfully");
        setIsModal(false);
        resetFormFields();
        handleRenderItems();
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}/api/deleteItem/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");

        handleRenderItems();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateButtonClick = async (itemId) => {
    setSelectedItemId(itemId);
    setIsModale(true);
    try {
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}/api/getItem/${itemId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch item details");
      }
      const data = await response.json();
      setUpdatedItemName(data.name);
      setUpdatedItemQuantity(data.quantity.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpdateName = (e) => {
    setUpdatedItemName(e.target.value);
  };

  const handleUpdateQuantity = (e) => {
    setUpdatedItemQuantity(e.target.value);
  };

  const handleUpdateItem = async (e) => {
    try {
      const updatedData = {
        name: updatedItemName,
        quantity: updatedItemQuantity,
      };
      console.log(selectedItemId);

      const res = await fetch(
        `${BACKEND_API_ENDPOINT}/api/updateItem/${selectedItemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        console.log("Item updated successfully");
        setIsModale(false);
        handleRenderItems();
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <h1 style={myIS}>INVENTORY PAGE</h1>
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
            className="btn btn-danger mr-3"
            style={{ backgroundColor: "orange", marginRight: "8px" }}
            onClick={() => navigate("/Mydetails")}
          >
            User Details
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

      {isModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Item Name"
                      onChange={(e) => setIName(e.target.value)}
                      required
                    />
                    {nameError && <p className="text-danger">{nameError}</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      onChange={(e) => setIQuantity(e.target.value)}
                      required
                    />
                    {quantityError && (
                      <p className="text-danger">{quantityError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control-file"
                      placeholder="Upload item image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                    {imageError && <p className="text-danger">{imageError}</p>}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ backgroundColor: "orange" }}
                  data-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ backgroundColor: "orange" }}
                  onClick={handleAddItem}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModale && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="updatedName"
                      placeholder="Item Name"
                      value={updatedItemName}
                      onChange={handleUpdateName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="updatedNumber"
                      placeholder="Quantity"
                      value={updatedItemQuantity}
                      onChange={handleUpdateQuantity}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ backgroundColor: "orange" }}
                  onClick={() => setIsModale(false)}
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ backgroundColor: "orange" }}
                  data-dismiss="modal"
                  onClick={handleUpdateItem}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="container mt-4">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-2 text-center">
            <button
              className="btn btn-danger mr-3"
              style={{ backgroundColor: "orange", marginRight: "8px" }}
              data-toggle="modal"
              data-target="#addItemModal"
              onClick={() => setIsModal(true)}
            >
              ADD ITEM
            </button>
          </div>
          <div class="col-2 text-center">
            <button
              className="btn btn-danger mr-3"
              style={{ backgroundColor: "orange", marginRight: "8px" }}
              onClick={handleRenderItems}
            >
              VIEW ITEMS
            </button>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
      {isInv && (
        <div class="container mt-4">
          <div className="row">
            {inventoryItems.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card">
                  {/* Item image */}
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    {/* Item name */}
                    <h5 className="card-title">{item.name}</h5>
                    {/* Item quantity */}
                    <p className="card-text">Quantity: {item.quantity}</p>
                    {/* Buttons for updating and deleting item */}
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ backgroundColor: "orange" }}
                        onClick={() =>
                          handleUpdateButtonClick(
                            item._id,
                            item.name,
                            item.quantity
                          )
                        }
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ backgroundColor: "orange" }}
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Indemo;
