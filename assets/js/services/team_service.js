app.factory("Team", ["$resource", function($resource) {
  var Team = $resource("/team/:id", {id: "@id"}, { update: { method: "PUT" }});
  return Team;
}]);