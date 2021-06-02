var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var autoIncrement=require("mongoose-auto-increment")
var studentSchema=new Schema({

    fname:{
        type:String,
        required:"Please enter first name"
    },
    lname:{
        type:String,
        required:"Please enter the last name"
    },

    course:{
        type:String,
        required:"Please enter course"
    },
    fees:{
        type:Number,
        required:"Please enter the fees"
       
    },
    address:{
        type:String,
        required:"Please enter the adddress"

    },
    mobileno:{
        type:String,
        required:"Please the mobile no"
    },
    age:{
        type:String
    },
    rollno:{
        type:String,
        required:"Please enter the roll no"
    },

    student_id:{
        type:Number,
        
    }



})
studentSchema.plugin(autoIncrement.plugin,{

    model:"students",
    field:"student_id",
    startAt:1001,
    incrementBy:1

})
module.exports=mongoose.model("students",studentSchema);