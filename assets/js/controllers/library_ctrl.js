app.controller("LibraryCtrl", ["$scope", "$routeParams", "Module", "StateTracker", function($scope, $routeParams, Module, StateTracker) {
  $scope.library = StateTracker.loadLibrary($routeParams.libraryId);

  $scope.createModule = function() {
    var module = new Module({name: $scope.moduleName.name});
    module.$save(function(data) {
      $scope.library.modules.push(data.id);
      $scope.library.$save(function(data) {
        $scope.moduleName = "";
        StateTracker.refreshLibrary();
      });
    });
  };
}]);
