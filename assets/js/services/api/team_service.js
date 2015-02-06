app.factory("Team", ["$resource", function($resource) {
  return $resource("/team/:id", {id: "@id"}, {update: {method: "PUT"}});
}]);