app.controller("userViewCtrl", ["$scope", "User", "AuthService", function($scope, User, AuthService){
  AuthService.currentUser(function(user) {
    $scope.admin = (user.administrating.length !== 0);
  });
}]);