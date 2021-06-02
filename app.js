var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
autoIncrement=require("mongoose-auto-increment");


mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/admissions",{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true});
var db=mongoose.connection;
    autoIncrement.initialize(db);
 db.once("open",function(){
     console.log("database created")
 })   

 
//js file of route folder
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var admissionSchema=require('./MongooseModels/admission')
var registerSchema=require('./MongooseModels/register')
 var admissionController=require("./ApiControllers/controller");
const { route } = require('./routes/index');
var app = express();


//allow cross domain policy
var allowCrossDomain=function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Method','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Header','Content-Type');
    next();
    }
app.use(allowCrossDomain);

//this line add manually
app.use(express.static(__dirname + '/views'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//However, the path that you provide to the express.static function is
//relative to the directory from where you launch your node process. If you 
//run the express app from another directory, it’s safer to use the absolute
//  path of the directory that you want to serve:
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname,'node_modules')))

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.route("/studentData")
.post(admissionController.enter_student_data)
.get(admissionController.get_students_data);


app.route("/studentData/:taskId")
.get(admissionController.get_a_student_data)
.delete(admissionController.delete_a_student_data)
.put(admissionController.update_a_student_data);

//user register
app.route('/userRegister')
.post(admissionController.user_register);

app.route("/userLogin")
.post(admissionController.user_login);
module.exports = app;
