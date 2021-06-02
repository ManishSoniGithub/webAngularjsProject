var app = angular.module("myModule", [])
    .controller("userController", function ($scope,$window, $log, $window, $location, $http) {

        $scope.student = {};

        console.log($scope.student)
        $scope.signup = function () {

            var successCallBack = function (response) {

                $scope.data = response.data.message;
                if ($scope.data == "success") {
                    alert("Registration success")

                    $scope.student = {};
                }
                else if ($scope.data == "failed") {
                    alert("failed")
                    // $log.info(response)
                }
            }
            var errorCallBack = function (reason) {
                $scope.error = reason.data;
            }
            $http({
                method: "POST",
                url: "http://localhost:4000/userRegister",
                data: $scope.student
            }).then(successCallBack, errorCallBack)


        }
        //user login function
        $scope.loginObj = {};
        console.log($scope.loginObj)
        $scope.login = function () {
            var successCallBack = function (response) {
                $scope.data = response.data.message;
                $log.info(response)
                if ($scope.data == "success") {
                    alert("login successs")
                    $window.location.href="/home.html";
                    // $location.href("/home.html")
                    window.localStorage["username"]=$scope.loginObj.user;
                }
                else {
                    alert("User name or Password Mismatch")
                }
            }
                var errorCallBack = function (reason) {
                    $scope.error = reason.data;

                }

                $http({
                    method: "POST",
                    url: "http://localhost:4000/userLogin",
                    data: $scope.loginObj
                }).then(successCallBack, errorCallBack)
         



        }


    })