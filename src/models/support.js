const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    name:{
        type:String,
    
    },
    email:{
        type:String,
        
    },
    number:{
        type:Number,
        
    },
    option:{
        tyep:String,
        default:"hello"
    },
})

module.exports = mongoose.model('UserSupport', supportSchema)
