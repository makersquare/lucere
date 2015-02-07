app.factory("Library", ["$resource", function($resource) {
  return $resource("/library/:id", {id: "@id"}, {update: {method: "PUT"}});
}]);