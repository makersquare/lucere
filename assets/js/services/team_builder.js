app.factory("TeamBuilder", ["Team", function(Team) {

  var createTeam = function(name, cb) {
    var team = new Team({name: name});
    team.$save(cb);
  };

  var team = function(id) {
    return Team.get({id: id});
  };

  var addUser = function(team, user, cb) {
    team.users.push(user);
    team.$update(cb);
  };

  var addAdmin = function(teamId, user, cb) {
    team.users.push(user);
    team.admins.push(user);
    team.$update(cb);
  };

  return: {
    createTeam: createTeam,
    team: team, 
    addUser: addUser, 
    addAdmin: addAdmin
  };
}]);