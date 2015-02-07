app.controller("UserViewCtrl", ["$scope", "User", "AuthService", function($scope, User, AuthService){
  $scope.admin = AuthService.currentUser && (AuthService.currentUser.administrating.length !== 0);
}]);