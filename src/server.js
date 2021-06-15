// imports
require('dotenv').config()
const express = require('express')
const app = express()
const port =  process.env.PORT
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const compression = require('compression')
const mongoose = require('mongoose')
require('./db/mongoose.js')

mongoose.set('useCreateIndex',true);

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(compression({
  level:6,
  threshold: 50*1000,
}))
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
const supportRoute = require('./routes/support')
const pageRoute = require('./routes/pages')



//middleware for routes
app.use('/centers', centerRoute)
app.use('/payments', paymentRoute)
app.use('/contacts',contactUs)
app.use('/newsletter',newsLetter)
app.use('/blogs',blogRoute)
app.use('/supports',supportRoute)
app.use('/page',pageRoute)

app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(port,() => {
    console.log("Listening on port "+ port);
})
