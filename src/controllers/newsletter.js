const mongoose = require("mongoose");
const Letter = require('../models/newsletter')


exports.newsLetter = (req,res)=>{

    const email = req.body.email;


    const newletter = new Letter({
        email,
    });

    newletter.save()
    .then(letter=> res.json(letter))
    .catch(()=> res.status(400).json("error"));
}