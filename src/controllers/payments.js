const Razorpay = require('razorpay')
const shortid = require('shortid')
const mongoose = require("mongoose");
const Payment = require('../models/payment')
const email = require('./email')
const crypto = require('crypto');
const e = require('express');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_DEV,
    key_secret: process.env.REAZORPAY_SECRET_DEV,
});


exports.make_payment = (req, res, next) => {
       const options= {
        amount : req.body.data.amt,
        currency : 'INR',
        receipt : shortid.generate(),
        payment_capture: 1,
       }
        instance.orders.create(options)
        .then((resp)=>{
            const pay = new Payment({
                _id:mongoose.Types.ObjectId(),
                offerId:resp.id,
                amount: resp.amount/100,
                currency: resp.currency,
                pan:req.body.data.pan,
                address: req.body.data.state,
                state: req.body.data.state,
                city: req.body.data.city,
                pincode:req.body.data.pincode,
                remarks: req.body.data.remarks,
                name: req.body.data.name,
                contact: req.body.data.contact,
                receipt: 0,
                email: req.body.data.email,
                status: resp.status,
                createdAt: new Date().toDateString()
            })
            pay.save()
            .then((response)=>{
                res.json({ 
                    response,
                    key:  process.env.RAZORPAY_KEY_DEV
                 });
            })
            .catch(()=>{
             res.json({
                 error:"mongoDB error"
                });
            })
        })
        .catch(()=>{
            res.json({
                error:"razorpay error"
            });
        })
}


exports.verification = (req, res) => {
    const SECRET = process.env.VERIFICATION_SECRET
    const shasum = crypto.createHmac('sha256', SECRET)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest === req.headers['x-razorpay-signature'])
    if(digest === req.headers['x-razorpay-signature']) {
        Payment.find().sort({'_id':-1}).limit(2)
        .then((resp)=>{
            var receipt = 0;
            if(resp.length>1)
            {
                receipt = parseInt(resp[1].receipt) +1
            }
            else{
                receipt = 0;
            }
            Payment.updateOne({ offerId: req.body.payload.payment.entity.order_id }, { status: req.body.payload.payment.entity.status, receipt })
            .then(() => {
                email(resp[0])
                return res.status(200).json({
                    'status':'ok'
                })  
            })
            .catch(() => {
                res.status(200).json({
                    error:"mongodb error"
                });
            })
        })
        .catch(() => {
            res.status(200).json({
                error:"mongodb error"
            });
        })
    } else {
        res.status(200).json({'status':'ok'})  
    }
}

exports.payments = (req, res) => {
    console.log("hello");
   Payment.find({ status:'captured' })
   .then((resp) => {
       res.status(200).json(resp)
   })
   .catch((e) => {
    res.status(200).json({
        message:'mongodb error'
    })
   })
}