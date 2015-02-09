app.factory("TeamManager", ["Team", "User", function(Team, User) {
  var service = {};

  service.addUserByName = function(username, team) {
    User.UserFindBy.get({github: username}).$promise
      .then(function(user) {
        team.users.push(user);
        team.$update();
      }, function(err) {
        alert(userName + " is not a user yet. Go to /admin/user/create || /user/create.");
      });
  };

  service.removeUserById = function(userId, team) {
    team.users = $scope.team.users.filter(function(v) {
      if(v.id !== userId) {
        return v;
      }
    });
    team.$update();
  };

  service.addAdminByName = function(username, team) {
    var userPromise = User.UserFindBy.get({github: userName}).$promise;
    userPromise.then(function(user) {
      team.users.push(user);
      team.admins.push(user);
      team.$update();
    }, function(err) {
      alert(userName + " is not a user yet.\nGo to /admin/user/create || /user/create.")
    });
  };

  return service;
}]);