const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"no data",
    },
    email:{
        
        type:String,
        required:true,
        default:"no data",
    },
    number:{
        type:Number,
        required:true,
        default:0,
    },
    message:{
        type:String,
        required:true,
        default:"no data",
    },

});

module.exports = mongoose.model("ContactUs",contactSchema);