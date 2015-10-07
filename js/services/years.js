app.factory('years', ['$http', function($http) { 
  return $http.get('/timeline/js/services/years.json') 
    .success(function(data) {
      return data; 
    }) 
    .error(function(err) {
      return err; 
    }); 
}]);