app.factory("User", ["$resource", function($resource) {
  var User =  $resource("/user/:id", {id: "@id"}, { update: { method: "PUT" }});
  var UserFindBy = $resource("/user/findby/github/:github", {github: "@github"}, { update: { method: "PUT" }});

  return {
    User: User,
    UserFindBy: UserFindBy
  }
}]);