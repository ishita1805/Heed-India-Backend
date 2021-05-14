const mongoose = require('mongoose');
const Stat = require('../models/stats');
const Page = require('../models/page');

exports.createStat = (req, res) => {
    let data = req.body;
    data._id = mongoose.Types.ObjectId();
    const newStat = new Stat(data);
    newStat.save()
    .then((resp) => {
        Page.findByIdAndUpdate(req.body.id, { $push: { stats: data._id } })
        .then(() => {
            res.status(200).json({resp})
        })
        .catch((e) => {
            res.status(500).json({e})
        })
    })
    .catch((e) => {
        res.status(500).json({e})
    })
}

exports.updateStat = (req, res) => {
    let data = req.body;
    Stat.updateOne({_id:req.body._id}, data)
    .then((resp)=>{
        console.log(resp);
        res.status(200).json({resp});
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({e})
    })
}

exports.deleteStat = (req, res) => {
    Stat.deleteOne({ _id: req.body._id })
    .then(() => {
        Page.findByIdAndUpdate(req.body.id, { $pull: { stats: req.body._id } })
        .then((resp) => {
            res.status(200).json({resp})
        })
        .catch((e) => {
            res.status(500).json({e})
        })
    })
}