const mongoose = require("mongoose");

const donor = new mongoose.Schema({
    url:{
        type:String,
        required:true,
        default:"no data",
    },
    pid:{
        type:String,
        required:true,
        default:"no data",
    },
});

module.exports = mongoose.model("Donor",donor);