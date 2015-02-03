app.controller("teamCtrl", ["$scope", "$routeParams", "Team", "User", "AuthService", function($scope, $routeParams, Team, User, AuthService){
  var teamId = parseInt($routeParams.teamId);
  $scope.team = Team.get({id: teamId});
  $scope.newUser = {};
  $scope.newTeam = {};
  $scope.isAdmin = false;
  $scope.isCore  = teamId === 1;
  var currentUser;
  AuthService.currentUser(function(user) {
    currentUser = user;
    $scope.isAdmin = user.administrating.reduce(function(a, b) {
      return a || b.id === teamId;
    }, false);
  });
  
  $scope.addUser = function() {
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

  $scope.addTeam = function() {
    var newTeam = new Team({
      name: $scope.newTeam.name,
      admins: [currentUser],
      users: [currentUser]
    });
    newTeam.$save();
  }

}]);
