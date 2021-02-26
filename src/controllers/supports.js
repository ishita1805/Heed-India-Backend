const mongoose = require('mongoose')
const Support = require('../models/support')

exports.post_support = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.bosy.number;

    const newSupport = new Support({
        name,
        email,
        number
    })

    newSupport.save()
    .then((res)=>res.json(res))
    .catch((err)=>res.json(err))
}