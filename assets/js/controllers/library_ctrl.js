app.controller("LibraryCtrl", ["$scope", "Library", "$routeParams", function($scope, Library, $routeParams) {
  $scope.library = Library.get({id: $routeParams.libraryId});
}]);
