
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/testuser?retryWrites=true&w=majority')

const Schema=mongoose.Schema;

const Registerationdata=new Schema({
  
    Ufirstname:{type:String,required:true},
    Ulasrname:{type:String,required:true},
    Email:{type:String,required:true},
    Phonenumber:{type:String},
    password:{type:String},
    roll:{type:Number}
    
})
var Registerdata=mongoose.model('Register_tb',Registerationdata);
module.exports=Registerdata;
