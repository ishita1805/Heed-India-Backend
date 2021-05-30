const { json } = require('express')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const mongoose = require("mongoose");
const Payment = require('../models/payment')

const instance = new Razorpay({
    key_id: 'rzp_test_PsxGKItWtb7jwL',
    key_secret: 'uvzcqRHvKhxjFVPQ0hgZupvX',
});


exports.make_payment = async (req, res, next) => {
    try{
        console.log(req.body.data)
       const options= {
        payment_capture: 1,
        amount : req.body.data.amt,
        currency : 'INR',
        receipt : shortid.generate()
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
                createdAt: resp.created_at
            })

            pay.save()
            .then((response)=>{
                res.json({ response });
            })
            .catch(()=>{
             res.json({
                 error:"mongoDB error"
                });
            })

        })
        
    }
    catch(e){
        res.json({message:'something went wrong'});
    }
   
}


exports.verification = (req, res) => {
    
}