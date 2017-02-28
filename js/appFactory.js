armackApp.factory('armackData', function($http) {
    var data = {};
    
    data.getstudents = function() {
        return $http.get('backend/getStudents.php');
    }
    
    return data;
    
})