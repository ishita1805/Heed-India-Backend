const express = require('express')
const router = express.Router()
const Center = require('../models/center')

router.route('/create').post((req,res)=>{
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
});

router.route('/find/:name').get((req,res)=>{
    Center.findById(req.params.name)
    .then((center) => res.json(center))
    .catch((err) => res.json(err));
});

module.exports = router