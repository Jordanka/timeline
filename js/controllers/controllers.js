app.controller('TimelineController', ['$scope', 'years', function($scope, years) {
  years.success(function(data) {
  	console.log(data);
    $scope.years = data; 
  });
}]);