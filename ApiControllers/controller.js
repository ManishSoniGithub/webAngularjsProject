var mongoose = require("mongoose");
var student = mongoose.model('students')
var register = mongoose.model("registers")

exports.enter_student_data = function (req, res) {
    console.log(req.body)
    var studentData = new student(req.body);
    studentData.save(function (err, task) {
        if (err)
            res.send(err);
        
        res.json({ message: "success" })
    })
}
exports.get_students_data = function (req, res) {
    student.find({}, function (err, task) {
        if (err)
            res.send(err)
        res.json(task);

    })
}
exports.get_a_student_data = function (req, res) {
    var id = req.params.taskId;
console.log(req.params.taskId)
    student.find({ "_id": id }, function (err, task) {
        if (err)
            res.send(err)
        res.json(task)
    })

}
// exports.update_student_data=function(req,res){
// }
exports.delete_a_student_data = function (req, res) {

    var id= req.params.taskId;
    console.log(id);

    student.findOneAndRemove({_id:id}, function (err, task) {
        if (err)
            res.send(err);
        console.log(task)
        res.json({ message: "deleted" })
    })
}

exports.update_a_student_data = function (req, res) {
    // console.log(req.params.taskId)
    //new:true return the newly updated data
    //$set is not neccessary here
console.log(req.body)
    student.findOneAndUpdate({_id:req.params.taskId},req.body,{new:true}, 
    (err, task) => {
        if (err) 
            res.send(err);
        
    res.json({message:"success"})
        
    });
}
// // user register
exports.user_register = function (req, res) {
    var data = new register(req.body);
  
    data.save(function (err, task) {
        if (err)
            res.send(err)
         res.json({ message: "success" })
    })}
//login
    exports.user_login=function(req,res){
        var user=req.body.user;
        var password=req.body.password;


        register.find({$and:[{"user":user},{"password":password}]},function(err,task){

            if(err)
            res.send(err)
            if(task.length>0){
                console.log(task)
                res.json({message:"success"})
            }
            else{
                res.json({message:"failed"})
            }
           
           

        })
    }