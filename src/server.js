// imports
const express = require('express')
const app = express()
const port =  process.env.PORT || 3001
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./db/mongoose.js')
mongoose.set('useCreateIndex',true);

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});


// Routes
const paymentRoute = require('./routes/payments')


//middleware for routes
app.use('/payments', paymentRoute)



app.listen(port,() => {
    console.log("Listening on port "+ port);
})
