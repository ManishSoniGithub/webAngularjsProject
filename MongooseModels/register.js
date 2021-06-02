var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var registerSchema=new Schema({

user:{
    type:String,
    required:"Please enter the user name"
},
address:{
    type:String,
    required:'Please enter the address',
},
email:{
    type:String,
    required:"Please enter the email"
},

institute:{type:String
},

password:{type:String,
required:"please enter the password"
}    
})

module.exports=mongoose.model("registers",registerSchema)