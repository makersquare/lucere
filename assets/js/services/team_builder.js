app.factory("TeamBuilder", ["Team", function(Team) {


  var createTeam = function(name, cb) {
    var team = new Team({name: name});
    team.$save(cb);
  };

  var team = function(id) {
    return Team.get({id: id});
  };

  var addUser = function(teamId, user, cb) {
    var team = Team.get({id: teamId}, function(data) {
      data.users.push(user);
      data.$update(cb);
    });
  };

  var addAdmin = function(teamId, user, cb) {
    var team = Team.get({id: teamId}, function(data) {
      data.admins.push(user);
      data.users.push(user);
      data.$update(cb);
    });
  };

  return: {
    createTeam: createTeam,
    team: team, 
    addUser: addUser, 
    addAdmin: addAdmin
  }
}]);