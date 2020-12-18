const mongoose = require("mongoose");
const Query = require('../models/contacts')


exports.create_query = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const message = req.body.message;

    const newquery = new Query({
        name,
        email,
        number,
        message
    });

    newquery.save()
    .then(query=> res.json(query))
    .catch(()=> res.status(400).json("error"));
}