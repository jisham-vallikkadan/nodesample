const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/testuser?retryWrites=true&w=majority')
const Schema= mongoose.Schema

const Productdata= new Schema({
 
    Productname:{type:String,required:true},
    Productdiscription:{type:String},
    ProductPrice:{type:Number,required:true},
    Productimage:{type:String,},
   
    


})
var ProductData=mongoose.model('Product_tb',Productdata)
module.exports=ProductData;