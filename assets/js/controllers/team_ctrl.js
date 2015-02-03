app.controller("teamCtrl", ["$scope", "$routeParams", "Team", "User", "AuthService", function($scope, $routeParams, Team, User, AuthService){
  var teamId = parseInt($routeParams.teamId);
  $scope.team = Team.get({id: teamId});
  $scope.newUser = {};
  $scope.isAdmin = false;
  var currentUser;
  AuthService.currentUser(function(user) {
    currentUser = user;
    $scope.isAdmin = user.administrating.reduce(function(a, b) {
      return a || b.id === teamId;
    }, false);
  });
  
  $scope.add = function() {
    var userPromise = User.UserFindBy.get({github: $scope.newUser.name});
    userPromise.$promise.then(function(user) {
      $scope.team.users.push(user);
      $scope.team.$update();
    });
  };

  $scope.remove = function(userId) {
    $scope.team.users = $scope.team.users.filter(function(v) {
      if(v.id !== userId) {
        return v;
      }
    });
    $scope.team.$update();
  };

}]);
