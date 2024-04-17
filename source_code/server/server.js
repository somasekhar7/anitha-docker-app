const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const AWS = require("aws-sdk");
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Configuration
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// AWS Configuration
AWS.config.update({
  accessKeyId: "AKIAQ3EGQ7C4XFS7MFFA",
  secretAccessKey: "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",
});
const s3 = new AWS.S3();

// Multer Storage Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB Schemas
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  imageUrl: String,
});
const Item = mongoose.model("Item", itemSchema);

const logincredSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  dob: Date,
  password: String,
});
const User = mongoose.model("User", logincredSchema);

app.post("/api/calculate", (req, res) => {
  const { int1, int2 } = req.body;
  const parsedNum1 = parseInt(int1);
  const parsedNum2 = parseInt(int2);

  const sum = parsedNum1 + parsedNum2;
  res.json({ sum });
});

// Routes
app.post("/api/addUser", async (req, res) => {
  try {
    const { email, firstName, lastName, dob, password } = req.body;
    const newUser = new User({
      email,
      firstName,
      lastName,
      dob,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getUserDetails/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/userLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/addItem", upload.single("image"), async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const uploadParams = {
      Bucket: "new-se3-images",
      Key: `${Date.now()}_${image.originalname}`,
      Body: image.buffer,
      ACL: "public-read",
    };

    const s3Data = await s3.upload(uploadParams).promise();
    const imageUrl = s3Data.Location;

    const newItem = new Item({
      name,
      quantity,
      imageUrl,
    });

    await newItem.save();

    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/api/deleteItem/:itemId", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/renderItems", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/updateItem/:itemId", async (req, res) => {
  console.log(req.body);
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;
    console.log(item.name + " " + item.quantity);

    await item.save();

    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getItem/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const OPENWEATHER_API_KEY = "28b4b6abaa66eaa8ed93d255168e4a9f";

app.get("/weather", async (req, res) => {
  const { city, country } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from OpenWeather API:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
