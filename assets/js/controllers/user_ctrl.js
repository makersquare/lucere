app.controller("userCtrl", ["$scope", "$routeParams", "User", "AuthService", function($scope, $routeParams, User, AuthService){
  var userId  = parseInt($routeParams.userId);
  $scope.user = User.User.get({id: userId});
  $scope.isOwn = false;
  var currentUser;
  AuthService.currentUser(function(user) {
    $scope.isOwn = userId === user.id;
  });

}]);
