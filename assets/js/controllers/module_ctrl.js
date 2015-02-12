app.controller("ModuleCtrl", ["$scope", "Module", "$routeParams", "StateTracker", "Lesson", function($scope, Module, $routeParams, StateTracker, Lesson) {
  var moduleId = $routeParams.moduleId;
  $scope.module = Module.get({id: moduleId});

  $scope.createLesson = function(title) {
    var lesson = new Lesson({title: title});

    lesson.$save(function(data) {
      $scope.module.lessons.push(data.id);
      $scope.module.$save()
        .then(function() {
          StateTracker.refreshLibrary();
        });
      $scope.newLessonTitle = "";
    });
  };

  $scope.updateName = function() {
    $scope.module.$update(function() {
      StateTracker.refreshLibrary();
    });
  };
}]);
