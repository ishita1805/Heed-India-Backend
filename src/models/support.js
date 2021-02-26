const mongoose = require('mongoose');

const supSchema = new mongoose.Schema({
    option:{
        type:String,
    },
    name:{
        type:String,
    
    },
    email:{
        type:String,
        
    },
    number:{
        type:Number,
        
    },
    
})

module.exports = mongoose.model('UserSupport', supSchema)
