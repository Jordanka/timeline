app.controller('TimelineController', ['$scope', 'years', function($scope, years) {
  years.success(function(data) {
    $scope.years = data; 
  });
}]);