app.directive("lucereTopbar", ["Module", "AuthService", function(Module, AuthService) {
  return {
    templateUrl: "/js/templates/directives/topbar.html",
    link: function(scope, attr, elem) {
      scope.AuthService = AuthService;
    }
  };
}]);