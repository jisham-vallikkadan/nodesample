const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/testuser?retryWrites=true&w=majority')
const Schema=mongoose.Schema


const cartData=new Schema({

    login_id:{type:Schema.Types.ObjectId,ref:"Register_tb"},
    P_id:{type:Schema.Types.ObjectId,ref:'Product_tb'},
    qty:{type:String},
    Prize:{type:Number,required:true}
})


var cartdata=mongoose.model('cart_tb',cartData);
module.exports=cartdata;