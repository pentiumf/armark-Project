var armackApp = angular.module("Armack", ["ngRoute"]);

armackApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
    templateUrl: "views/home.html",
    controller: "homeController"
    })
    .when('/print', {
        templateUrl: "views/prints.html",
        controller: "homeController"
    })
    .otherwise({
        redirectTo: '/'
    })
});

armackApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'yy-mm-dd',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});




armackApp.controller("homeController", function($scope, $http, $route, $timeout, armackData) {
    
    $scope.getStudents = function() {
        armackData.getstudents().success(function(data) {
        $scope.result = data; 
        $scope.students = $scope.result[0].students;
        $scope.total = $scope.result[0].total;
      })
    }
    
    
    $scope.addStudents = function() {
        $scope.addASudent = {
            name: $scope.addASudent.name,
            grade: $scope.addASudent.grade,
            menu: $scope.addASudent.menu,
            duration: $scope.addASudent.duration
        };
        
        $http({
            method: 'POST',
            url : 'backend/addStudent.php',
            data: $scope.addASudent
        })
        .then(function(response) {
            $scope.getStudents();
            $scope.sucessfull();
            
        }, function(response){
            console.log(response.data, response.status);
        })
        $route.reload();
    }
    
    
    $scope.editStudents = function(student) {
        $scope.editStudent = student;
    }
    
    
    $scope.updateStudents = function(id) {
        $http({
            method: 'POST',
            url: 'backend/updateStudent.php',
            data: {
                updatedStudent: id,
                name: $scope.editStudent.name,
                grade: $scope.editStudent.grade,
                menu: $scope.editStudent.menu,
                duration: $scope.editStudent.duration
            }
        })
        .then(function(response) {
            $scope.getStudents();
            $scope.updated();
            
        }, function(response){
            console.log(response.data, response.status);
        })
        //$route.reload();
        closePopup();
    }
    
    $scope.deleteStudent = function(id) {
        if (confirm('Are You Sure You Want to Delete This Student ?') == true) {
            $http({
            method: 'POST',
            url: 'backend/deleteStudent.php',
            data: {studentId: id}
        })
        .then(function(response) {
            $scope.getStudents();
            $scope.stddeleted();
        }, function(response){
            console.log(response.data, response.status);
        })
        }
        
    }
    
    $scope.sucessfull = function() {
        $("#succesmsg").fadeIn();
        $timeout(function() {
            $("#succesmsg").fadeOut(200);
        }, 1000);
    
    }
    
    $scope.updated = function() {
        $("#updatemsg").fadeIn();
        $timeout(function() {
            $("#updatemsg").fadeOut(200);
        }, 1000);
    
    }
    
    $scope.stddeleted = function() {
        $("#delmsg").fadeIn();
        $timeout(function() {
            $("#delmsg").fadeOut(200);
        }, 1000);
    
    }
    
    $scope.getTimeRemaining = function(endtime) {
          var t = Date.parse(endtime) - Date.parse(new Date());
          var seconds = Math.floor( (t/1000) % 60 );
          var minutes = Math.floor( (t/1000/60) % 60 );
          var hours = Math.floor( (t/(1000*60*60)) % 24 );
          var days = Math.floor( t/(1000*60*60*24) );

          return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
          };
    }
    
    $scope.initializeClock = function(id, endtime) {
          var clock = document.getElementById(id);

          function updateClock() {
            var t = $scope.getTimeRemaining(endtime);
              t.days++;
            t.hours = t.hours + 8;
            t.minutes = t.minutes + 60;
            t.seconds = t.seconds + 60;
//              console.log(t.days)
//              console.log(t.hours)
//              console.log(t.minutes)
//              console.log(t.seconds)

              

            clock.innerHTML = t.days + " Days Left";
            clock.style.color = "#4CAF50";
             
            if (t.days < 0) {
                clock.innerHTML = "Expired";
                clock.style.color = "red";
            }  
            
              
//            if (t.total <= 0) {
//              clearInterval(timeInterval);
//                clock.innerHTML = "Expired"
//            }
          }
          updateClock();
          var timeInterval = setInterval(updateClock, 1000);
    }
    
    
    angular.element(document).ready(function() {
        
        $(".tbl-content").on("click", ".homeUpdateBtn", function() {
            openPopup();
        })

        $("#modal-close-button").click(function() {
        closePopup();	
        });

        $("#over-lay-bg").click(function() {
            closePopup();
        });

        $(window).resize(function() {
        updatePopup();
        });  

        
    })
    
    
    //UPDATE
    function openPopup() {
        $("#pop-up-content").fadeIn();
        $("#over-lay-bg").fadeIn();
        updatePopup();
    }

    function closePopup() {
        //$("#modal-open-button").fadeIn();
        $("#pop-up-content").fadeOut(200);
        $("#over-lay-bg").fadeOut(200);
    }

    function updatePopup() {
        var popUpContent = $("#pop-up-content");
        var top = "130px"; //center vertical
        var left = ($(window).width() - popUpContent.outerWidth()) / 2;  //center horizontal

        $("#pop-up-content").css({
            'top' : top,
            'left' : left
        })

    }
    

    $scope.getStudents();
    
    
});

 

    
    









