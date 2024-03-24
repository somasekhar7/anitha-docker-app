
require('dotenv').config();
const multer=require('multer');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios=require('axios');
const AWS = require('aws-sdk');
const port = 3001;
const host=process.env.HOSTNAME ||'http://localhost:';
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'Public')))
var corsOptions={
  origin:["http://localhost:3000"],
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.post('/api/calculate', (req,res)=>{
  const{int1, int2}=req.body;
  const parsedNum1=parseInt(int1);
  const parsedNum2=parseInt(int2);
  

  const sum=parsedNum1+parsedNum2;
  res.json({sum});
});



// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));
// Define schema and model
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const storage= multer.memoryStorage();
const upload = multer({storage: storage});
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  imageUrl: String,
  // Add other fields as needed
});

const Item = mongoose.model('Item', itemSchema);


// API endpoint to add an item with image upload
app.post('/api/addItem', upload.single('image'),async(req, res) => {
  console.log(req.body);
  try {
      const { name, quantity} = req.body;
      const image = req.file; // Access uploaded file data

      if (!image) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      // Upload image to S3
      const uploadParams = {
          Bucket: 'new-se3-images',
          Key: `${Date.now()}_${image.originalname}`, // Generate a unique key for the image
          Body: image.buffer,
          ACL:"public-read", // Assuming image is received as a buffer
      };
    
      const s3Data = await s3.upload(uploadParams).promise();
      const imageUrl = s3Data.Location;

      

      // Create a new item document
      const newItem = new Item({
          name,
          quantity,
          imageUrl,
          // Add other fields as needed
      });

      // Save the new item to the database
      await newItem.save();

      res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/deleteItem/:itemId', async (req, res) => {
  try {
    // Find the item by ID and delete it
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/renderItems', async (req, res) => {
  try {
    // Fetch all inventory items from the database
    const items = await Item.find();
    res.json(items); // Send the fetched items as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Handle error
  }
});
app.post('/api/updateItem/:itemId', async (req, res) => {
  console.log(req.body);
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.itemId);


    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update item properties
    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity ;
    console.log(item.name+' '+item.quantity);

    // Save the updated item
    // await updatedItem.save();
    await item.save();

    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getItem/:itemId', async (req, res) => {
  try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
          return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('api/weather', async (req, res) => {
  const { city, state, country } = req.query;
  let queryParam = city;
  if (state) queryParam += `,${state}`;
  if (country) queryParam += `,${country}`;

  try {
      const apiKey = process.env.WEATHERBIT_API_KEY;
      // Adjust the API request URL based on whether state and country are provided.
      const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(queryParam)}&key=${apiKey}`;
      const response = await axios.get(url);
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching weather data from Weatherbit' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});