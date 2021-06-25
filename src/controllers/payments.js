const Razorpay = require('razorpay')
const shortid = require('shortid')
const mongoose = require("mongoose");
const Payment = require('../models/payment')
const {email} = require('./email')
const crypto = require('crypto');
const e = require('express');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.REAZORPAY_SECRET,
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
                address: req.body.data.address,
                name: req.body.data.name,
                contact: req.body.data.contact,
                receipt: resp.receipt,
                status: resp.status,
                createdAt: new Date().toDateString()
            })
            pay.save()
            .then((response)=>{
                res.json({ 
                    response,
                    key:  process.env.RAZORPAY_KEY
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
        // change status and
        Payment.find().sort({"receipt":-1}).limit(1)
        .then((res)=>{
            console.log(res);
            var receipt = 0;
            if(res.length!=0)
            {
                receipt = res.data.receipt +1
            }
            else{
                receipt = 0;
            }
            Payment.updateOne({ offerId: req.body.payload.payment.entity.order_id }, { status: req.body.payload.payment.entity.status },{receipt: receipt})
            .then((data) => {
                console.log('verification triggered')
                email(res.data)
                return res.status(200).json({'status':'ok'})  
            })
            .catch(() => {
                res.status(500).json({
                    error:"mongodb error"
                });
            })
        })
    } else {
        res.status(500).json({'status':'ok'})  
    }
}

exports.payments = (req, res) => {
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