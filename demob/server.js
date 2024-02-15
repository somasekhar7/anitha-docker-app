const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.post('/api/calculate', (req,res)=>{
  const{num1, num2}=req.body;
  const parsedNum1=parseInt(num1);
  const parsedNum2=parseInt(num2);
  

  const result=parsedNum1+parsedNum2;
  res.json({result});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
