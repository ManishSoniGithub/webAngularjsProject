var app=angular.module("myApp",['ngRoute'])
.config(function($routeProvider,$locationProvider){

    $routeProvider
    .when('/addStudent',
    {
        templateUrl:"addStudent.html",
        controller:"addStudentController"
    })
    .when('/studentsView',{
        templateUrl:"studentsView.html",
        controller:"studentsViewController"
    })
    .when("/delStudent/:id",{
templateUrl:"studentsView.html",
    controller:"delStudentController"
})
.when("/updateStudent/:id",{
    templateUrl:"updateStudent.html",
    controller:"updateStudentController"
})

    .when('/singleStudent/:id',{
        templateUrl:"singleStudent.html",
        controller:"singleStudentController"
    })
    .when("/covidData",{
    templateUrl:"covidData.html",
    controller:"covidController"})
    .otherwise({
        templateUrl:"homeScreen.html",
        
    })
  
})
.controller("addStudentController",function($http,$window,$scope,$log){
    $scope.student={};
    console.log($scope.student)
    $scope.submitStudent=function(){

        var successCallBack=function(response){
            var data=response.data.message;
            console.log(data)
            $log.info(response)

            if(data=="success"){
                alert("Data Submitted ")
                // $window.localStorage["student"]=$scope.student.fname;
                $scope.student={};
            }
            else{
                alert("Failed")
            }
            
        }
        var errorCallBack=function(reason){
            var error=reason.data;
        }
        $http({method:"POST",
        url:"http://localhost:4000/studentData",
        data:$scope.student}).then(successCallBack,errorCallBack)
    }

    
})
.controller("studentsViewController",function($http,$scope,$log,$routeParams){

var successCallBack=function(response){
    $scope.stuData=response.data;
    $log.info(response)
}
var errorCallBack=function(reason){
    $scope.error=reason.data;
}
$http({method:"GET",
        url:"http://localhost:4000/studentData"
        }).then(successCallBack,errorCallBack)



})
.controller("singleStudentController",function($http,$scope,$log,$routeParams){

$scope.stuId=$routeParams.id;
console.log($routeParams.id)
var successCallBack=function(response){
    $scope.singleStuDetail=response.data;
$log.info(response);
}
var errorCallBack=function(reason){
    var error=reason.data;
}
$http({method:"GET",
        url:"http://localhost:4000/studentData/"+$routeParams.id
    }).then(successCallBack,errorCallBack)


})

.controller("delStudentController",function($http,$log,$routeParams,$scope,$location){
    var id=$routeParams.id;
    console.log(id)


var successCallBack=function(response){
    $log.info(response);
    $scope.result=response.data.message;
    // alert("Data Deleted")
 $location.url('/studentsView')
}
var errorCallBack=function(reason){
    var error=reason.data;
    
}
$http({method:"DELETE",
url:"http://localhost:4000/studentData/"+$routeParams.id
})
.then(successCallBack,errorCallBack)
})
.controller("updateStudentController",function($scope,$location,$http,$log,$routeParams){
var id=$routeParams.id;
// console.log(id)

var successCallBack=function(response){
   $scope.singleStu=response.data[0];
    $log.info(response);
}
var errorCallBack=function(reason){
    $scope.error=reason.data;
}
$http({method:"GET",url:"http://localhost:4000/studentData/"+$routeParams.id})
.then(successCallBack,errorCallBack)
console.log(id)
console.log($scope.singleStu)

$scope.update=function(){
var successCallBack=function(response){
    $scope.result=response.data.message;
    $log.info(response)
console.log($scope.result)
    
    if($scope.result=="success"){

        alert("Student Data Updated")
        $location.url("/studentsView")
    }
    else{
        alert("Failed")
    }
}
var errorCallBack=function(reason){
    var error=reason.data;
}

$http({method:"PUT",url:"http://localhost:4000/studentData/"+$routeParams.id,

        data:$scope.singleStu}).then(successCallBack,errorCallBack)
    }
})
.controller("covidController",function($http,$log,$scope){
    var successCallBack=function(response){
        $scope.covidData=response.data.statewise;
        $log.info(response)
    }
    var errorCallBack=function(reason){
        var error=reason.data;
    }
    //  $scope.covidData=new Array;
    $http({method:"get",url:"https://api.covid19india.org/data.json"
// ,dataType:"json",
//  contentType:"application/json"
})
    .then(successCallBack,errorCallBack)

})