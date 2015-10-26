app.directive('timelineInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directives/timelineInfo.html' 
  }; 
});