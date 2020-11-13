const mongoose = require("mongoose");
const Center = require('../models/center')


exports.create_center = (req,res)=>{
    const name = req.body.name;
    const about = req.body.about;
    const work = req.body.work;
    const initiatives = req.body.initiatives;

    const newcenter = new Center({
        name,
        about,
        work,
        initiatives
    });

    newcenter.save()
    .then(()=> res.json("added center"))
    .catch((err)=> res.status(400).json("error: "+err));
}

exports.find_center = (req,res)=>{
    Center.findById(req.params.name)
    .then((center) => res.json(center))
    .catch((err) => res.json(err));
}