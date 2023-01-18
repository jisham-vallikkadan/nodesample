const express=require('express')
const checkoutroter=express.Router();

const chekot=require('../model/checkout');
const Checkauth=require('../middleware/check_auth');

checkoutroter.post('/addtocheckout',(req,res)=>{
    var chekout={
        User_id:req.userData.userId,
        P_id:req.body._id,
        Cart_id:req.body._id,
        ststus:req.body.status,
    }
    chekot(chekout).save().then((data)=>{
        res.status(200).json({
            values: data,
            message: "checkout sucess",
            success: true,
            error: false
        })
    }).catch((error)=>{
        res.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: false,
        })
    })

})

module.exports=chekot

