app.controller("teamCtrl", ["$scope", "$routeParams", "Team", "User", "AuthService", function($scope, $routeParams, Team, User, AuthService){
  var teamId = parseInt($routeParams.teamId);
  $scope.team = Team.get({id: teamId});
  $scope.newUser = {};
  $scope.newTeam = {};
  $scope.isAdmin = false;
  $scope.isCore  = teamId === 1;
  var currentUser;

  var getAdminStatus = function() {
    AuthService.currentUser(function(user) {
      currentUser = user;
      $scope.isAdmin = user.administrating.reduce(function(a, b) {
        return a || b.id === teamId;
      }, false);
    });
  }

  getAdminStatus();
  
  $scope.addUser = function() {
    var userName = $scope.newUser.name;
    var userPromise = User.UserFindBy.get({github: userName});
    $scope.newUser.name = " ";
    userPromise.$promise.then(
      function(user) {
        $scope.team.users.push(user);
        $scope.team.$update();
      }, function(response) {
        alert(userName + " is not a user yet.\nWe also don't have a page for this yet.")
      }
    );
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
    var newTeamName = $scope.newTeam.name;
    $scope.newTeam.name = " ";
    var newTeam = new Team({
      name: newTeamName,
      admins: [currentUser],
      users: [currentUser]
    });
    newTeam.$save();
  }

}]);