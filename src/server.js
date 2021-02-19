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
