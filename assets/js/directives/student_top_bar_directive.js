app.directive("studentTopBarDirective", ["BarService", function(BarService) {
  return {
    templateUrl: "/js/templates/directives/student_top_bar_template.html",
    link: function(scope, attr, elem) {
      BarService.setLinks(scope, attr, elem);
    }
  };
}]);