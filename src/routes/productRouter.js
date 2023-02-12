const express = require('express')
const productRouter = express.Router()
const product = require('../model/products')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,   uniqueSuffix + '-' + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

productRouter.post('/addproduct',upload.single('Pimage'), (req, res) => {
    var products = {
        Productname: req.body.Pname,
        Productdiscription: req.body.Pdiscription,
        ProductPrice: req.body.Pprice,
        Productimage: req.file.filename,
    }
    console.log(products);
    product(products).save().then((data) => {
        res.status(200).json({
            values: data,
            message: "product added",
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

productRouter.get('/view-products', (req, res) => {
    product.find().then((data) => {
        res.status(200).json({
            values: data,
            message: "product added  get",
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

productRouter.get('/view_singel_product/:Pid', (req, res) => {
    const id = req.params.Pid
    console.log(id);
    product.findOne({ _id: id }).then((proucts) => {
        res.status(200).json({
            values: proucts,
            message: "product added  get",
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

productRouter.delete('/delete_singel_product/', (req, res) => {
    const id = req.body.pid
    console.log(id)
    product.deleteOne({ _id: id }).then((product) => {
        res.status(200).json({
            values: product,
            message: "product delete sucessfully",
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

productRouter.delete('/delete_allproduct', (req, res) => {
    product.remove().then((data) => {
        res.status(200).json({
            values: data,
            message: "all product delete sucessfully",
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

productRouter.post('/update',(req,res)=>{
    const id=req.body.id
    var products = {
        Productname: req.body.Pname,
        Productdiscription: req.body.Pdiscription,
        ProductPrice: req.body.Pprice,
    }
    product.updateOne({_id: id},{$set:products}).then((updatevalue)=>{
        res.status(200).json({
            values:updatevalue,
            message: "update sucessfully",
            success: true,
            error: false
        }).catch((error)=>{
            res.status(400).json({
                 error: error.message,
            message: "something went wrong",
            success: false,
            })
        })
    })

})



module.exports = productRouter