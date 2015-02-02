app.controller("moduleCtrl", ["$scope", "$route", "Module", function($scope, $route, Module){
  $scope.params = $route.current.params;
  $scope.module = Module.get({id: $scope.params.moduleId}, function(data){
    $scope.test = data.name;
  });

  $scope.createLesson = function(title) {
    // console.log(title);
    var lesson = new Lesson({title: title});
    lesson.$save(function(data) {
      $scope.module.lessons.add(data.id);
      $scope.module.$save();
    });
  };

  $scope.checkName = function(moduleName) {
    if (moduleName === $scope.test) {
      return true;
    } else {
      
      return false;
    }
  };

}]);
