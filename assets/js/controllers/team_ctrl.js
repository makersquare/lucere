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

  $scope.adminsThis = function(thisUserId) {
    var admining = false;
    $scope.team.admins.forEach(function(admin) {
      if(admin.id == thisUserId) {
        admining = true;
      }
    });
    return admining;
  }
  
  // Gets user from server
  // executes successCb or failureCb depending on server response
  var getUser = function(userName, successCb, failureCb) {
    var userPromise = User.UserFindBy.get({github: userName});
    userPromise.$promise.then(
      function(user) {
        if(successCb) {
          successCb(user);
        }
      }, function(response) {
        if(failureCb) {
          failureCb(response);
        }
      }
    );
  }

  $scope.addUser = function() {
    var _this = this;
    var userName = $scope.newUser.name;
    var userFound = function(user) {
      $scope.team.users.push(user);
      $scope.team.$update();
    };
    var userNotFound = function(response) {
      alert(userName + " is not a user yet.\nGo to /admin/user/create || /user/create.")
    };
    getUser(userName, userFound, userNotFound);
    $scope.newUser.name = "";
  };

  $scope.addAdmin = function() {
    var userName = $scope.newAdmin.name;
    var userFound = function(user) {
      $scope.team.users.push(user); // by default, add admin to team users collection
      $scope.team.admins.push(user);
      $scope.team.$update();
    };
    var userNotFound = function(response) {
      alert(userName + " is not a user yet.\nGo to /admin/user/create || /user/create.")
    };
    getUser(userName, userFound, userNotFound);
    $scope.newAdmin.name = "";
  }

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
    $scope.newTeam.name = "";
    var newTeam = new Team({
      name: newTeamName,
      admins: [currentUser],
      users: [currentUser]
    });
    newTeam.$save();
  }
}]);
