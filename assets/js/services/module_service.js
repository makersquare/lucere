app.factory("Module", ["$resource", function($resource) {
  return $resource("/module/:id", {id: "@id"}, { update: { method: "PUT" }});
}]);