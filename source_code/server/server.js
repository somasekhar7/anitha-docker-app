const express = require('express');
const cors = require('cors');
const port = 8000;
const host=process.env.HOSTNAME ||'http://ec2-3-15-32-113.us-east-2.compute.amazonaws.com';
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'Public')))


app.use(bodyParser.json());
app.use(cors());
app.post('/api/calculate', (req,res)=>{
  const{int1, int2}=req.body;
  const parsedNum1=parseInt(int1);
  const parsedNum2=parseInt(int2);
  

  const sum=parsedNum1+parsedNum2;
  res.json({sum});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
