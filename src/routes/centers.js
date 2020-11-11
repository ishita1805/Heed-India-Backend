const express = require('express')
const router = express.Router()
const Center = require('./../models/centre.js')

router.route('/create').post((req,res)=>{
    const name = req.body.name;
    const about = req.body.about;
    const work = req.body.work;
    const initiative = req.body.initiative;

    const newcenter = new Center({
        name,
        about,
        work,
        initiative
    });

    newcenter.save()
    .then(()=> res.json("added center"))
    .catch((err)=> res.status(400).json("error: "+err));
});

router.route('/find/:name').get((req,res)=>{
    Center.findById(req.params.name)
    .then((center) => res.json(center))
    .catch((err) => res.json(err));
});