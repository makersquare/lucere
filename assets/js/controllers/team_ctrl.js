app.controller("TeamCtrl", ["$scope", "$routeParams", "Team", "AuthService", "Permissions", function($scope, $routeParams, Team, AuthService, Permissions){
  var teamId = parseInt($routeParams.teamId);
  $scope.team = Team.get({id: teamId});
  $scope.newUser = {};
  $scope.newTeam = {};
  $scope.newAdmin = {};
  $scope.AuthService = AuthService;
  
  $scope.addUser = function() {
    TeamManager.addUserByName($scope.newUser.name, $scope.team);
    $scope.newUser = {};
  };

  $scope.addAdmin = function() {
    TeamManager.addAdminByName($scope.newAdmin.name, $scope.team);
    $scope.newAdmin = {};
  }

  $scope.remove = function(userId) {
    TeamManager.removeUserById(userId, $scope.team);
  };

  $scope.addTeam = function() {
    var newTeamName = $scope.newTeam.name;
    var newTeam = new Team({
      name: $scope.newTeam.name,
      admins: [AuthService.currentUser],
      users: [AuthService.currentUser]
    });
    newTeam.$save();
    $scope.newTeam = {};
  }
}]);
