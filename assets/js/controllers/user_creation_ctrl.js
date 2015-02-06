app.controller("UserCreationCtrl", ["$scope", "User", function($scope, User) {
  $scope.newUser = {};
  $scope.users = [];
  
  $scope.createUser = function() {
    var newUserObj = new User.User({name: $scope.newUser.name , email: $scope.newUser.email, github: $scope.newUser.githubName});
    newUserObj.$save();
    $scope.users.push(newUserObj);
    $scope.newUser = {};
  };

  $scope.remove = function(userId) {
    User.User.delete({id: userId});
    $scope.users = $scope.users.filter(function(user) {
      if(user.id !== userId) {
        return user;
      }
    });
  };
}]);