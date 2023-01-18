const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/testuser?retryWrites=true&w=majority')
const Schema=mongoose.Schema

const LoginTable=new Schema({
   username:String,
   password:String,

})

var Logindata=mongoose.model('Login_table',LoginTable)
module.exports=Logindata;
