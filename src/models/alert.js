const mongoose = require("mongoose");

const alert = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        default:"no data",
    },
    link:{
        type:String,
        required:true,
        default:"no data",
    },
});

module.exports = mongoose.model("Alert",alert);