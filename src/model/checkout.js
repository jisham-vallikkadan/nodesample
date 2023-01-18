const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/testuser?retryWrites=true&w=majority')
const Schema=mongoose.Schema


const  checkOutdata=new Schema({
   User_id:{type:Schema.Types.ObjectId,ref:"Register_tb"},
   P_id:{type:Schema.Types.ObjectId,red:'Product_tb'},
   Cart_id:{type:Schema.Types.ObjectId,ref:'cart_tb'},
   ststus:{type:String}

})

var checkoutdata=mongoose.model('check_out_tb',checkOutdata);
module.exports=checkoutdata;