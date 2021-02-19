const mongoose = require("mongoose");

const userip = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userIp:{
        type:String,
        required:true,
    },
})

module.exports =  mongoose.model('UserIP', userip);