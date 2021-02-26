const mongoose = require('mongoose')
const Support = require('../models/support')

exports.post_support = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const option = req.body.val;

    const newSupport = new Support({
        name,
        email,
        number,
        option,
    })

    newSupport.save()
    .then(data=>res.json(data))
    .catch((err)=>res.json(err))
}

exports.get_support = (req,res)=>{
    Support.find()
    .then(data=>res.json(data))
    .catch((err)=>res.json(err))
}