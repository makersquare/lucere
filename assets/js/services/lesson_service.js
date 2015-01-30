app.factory("Lesson", ["$resource", function($resource) {
  return $resource("/lesson/:id", {id: "@id"}, {update: {method: "PUT"}});
}]);