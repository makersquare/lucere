app.controller("ModuleCtrl", ["$scope", "Module", "$routeParams", function($scope, Module, $routeParams) {
  $scope.module = Module.get({id: $routeParams.moduleId});
}]);
