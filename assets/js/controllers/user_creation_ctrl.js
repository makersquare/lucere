app.controller("userCreationCtrl", ["$scope", "User", function($scope, User){
  $scope.newUser = {};
  $scope.createUser = function() {
    var newUserObj = new User.User({name: $scope.newUser.name , email: $scope.newUser.email, github: $scope.newUser.githubName});
    newUserObj.$save();
    $scope.newUser = {};
  };
}]);
