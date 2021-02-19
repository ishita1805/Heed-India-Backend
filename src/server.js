// imports
const express = require('express')
const app = express()
const port =  process.env.PORT || 3001
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose')
require('./db/mongoose.js')
mongoose.set('useCreateIndex',true);

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}));
app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://heed-india.herokuapp.com");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
//     return res.status(200).json({});
//   }
//   next();
// });


// Routes
const paymentRoute = require('./routes/payments')
const blogRoute = require('./routes/blogs')
const centerRoute = require('./routes/centers')
const contactUs = require('./routes/contacts')
const newsLetter = require('./routes/newsletter')



//middleware for routes
app.use('/centers', centerRoute)
app.use('/payments', paymentRoute)
app.use('/contacts',contactUs)
app.use('/newsletter',newsLetter)
app.use('/blogs',blogRoute)





app.listen(port,() => {
    console.log("Listening on port "+ port);
})
