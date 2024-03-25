
require('dotenv').config();
const multer=require('multer');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios=require('axios');
const AWS = require('aws-sdk');
const port = 9000;
const host=process.env.HOSTNAME ||'http://ec2-35-153-46-21.compute-1.amazonaws.com:';
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'Public')))
var corsOptions={
  origin:["http://ec2-35-153-46-21.compute-1.amazonaws.com:9000"],
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




mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

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
  
});

const Item = mongoose.model('Item', itemSchema);



app.post('/api/addItem', upload.single('image'),async(req, res) => {
  console.log(req.body);
  try {
      const { name, quantity} = req.body;
      const image = req.file; 

      if (!image) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      
      const uploadParams = {
          Bucket: 'new-se3-images',
          Key: `${Date.now()}_${image.originalname}`, 
          Body: image.buffer,
          ACL:"public-read",
      };
    
      const s3Data = await s3.upload(uploadParams).promise();
      const imageUrl = s3Data.Location;

      

      
      const newItem = new Item({
          name,
          quantity,
          imageUrl,
          
      });

     
      await newItem.save();

      res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/deleteItem/:itemId', async (req, res) => {
  try {
    
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
    
    const items = await Item.find();
    res.json(items); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
});
app.post('/api/updateItem/:itemId', async (req, res) => {
  console.log(req.body);
  try {
    
    const item = await Item.findById(req.params.itemId);


    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    
    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity ;
    console.log(item.name+' '+item.quantity);

    
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


const OPENWEATHER_API_KEY = '28b4b6abaa66eaa8ed93d255168e4a9f';

app.get('/weather', async (req, res) => {
    const { city, country } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OpenWeather API:', error);
        res.status(500).json({ message: 'Error fetching data', error: error.response.data });
    }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});