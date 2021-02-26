mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Supports', supportSchema)
