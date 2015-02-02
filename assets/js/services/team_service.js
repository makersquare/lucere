app.factory("Team", ["$resource", function($resource) {
  var Team = $resource("/team/:id", {id: "@id"}, { update: { method: "PATCH" }});
  return Team;
}]);