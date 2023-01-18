const express=require('express')
const cartRouter=express.Router();



const cart=require('../model/cart')
const Checkauth=require('../middleware/check_auth');
const objectId = require('mongodb').ObjectId

cartRouter.post('/addtocart',Checkauth,(req,res)=>{
    var cartitems={
        login_id:req.userData.userId,
        P_id:req.body._id,
        qty:req.body.qty,
        Prize:req.body.prize
    }
    cart(cartitems).save().then((items)=>{
        res.status(200).json({
            values: items,
            message: "product add cart",
            success: true,
            error: false
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: false,
        })
    })
})

 cartRouter.get('/view_cart',Checkauth,(req,res)=>{
    const id=req.userData.userId;
    cart.aggregate([
        {
          '$lookup': {
            'from': 'register_tbs', 
            'localField': 'login_id', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$lookup': {
            'from': 'product_tbs', 
            'localField': 'P_id', 
            'foreignField': '_id', 
            'as': 'pro'
          }
        },
        {
         '$unwind':'$user'
        },
        {
         '$unwind':'$pro'
        },
        {
            '$match':{
                'login_id':objectId(id)
            }
        },
        {
            '$group':{
                '_id':'$_id',
                'username':{'$first':'$user.Ufirstname'},
                'productname':{'$first':'$pro.Productname'},
                'qnt':{'$first':'$qty'},
                
            }
        }
      ])
    
    .then((data)=>{
        res.status(200).json({
            values:data,
            message:"all cart item get",
            success:true,
            error:false,
        })
    }).catch((erroe)=>{
        res.status(400).json({
            error: erroe.message,
            message: "something went wrong",
            success: false,
        })
    })
 })

cartRouter.delete('/deletefromcart/:_id',Checkauth,(req,res)=>{
    cart.deleteOne({_id:req.params._id}).then((cartitem)=>{
        res.status(200).json({
            values:cartitem,
            message:"item delete sucessfully",
            success:true,
            error:false,
        })
    }).catch((error)=>{
        res.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: false,  
        })
    })
})


cartRouter.delete('/delete_all_cartitem',Checkauth,(req,res)=>{
    cart.remove().then((data)=>{
        res.status(200).json({
            values:data,
            message:"cart clear sucessfully",
            success:true,
            error:false,
        })
    }).then((error)=>{
        res.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: false,  
        })
    })
})





module.exports=cartRouter
