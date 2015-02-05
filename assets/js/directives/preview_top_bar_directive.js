app.directive("previewTopBarDirective", ["$location", "$route", function($location, $route) {
  return {
    templateUrl: "/js/templates/directives/preview_top_bar_template.html",
    link: function(scope, attr, elem) {
      scope.back = function() {
        var id = $route.current.params.libraryId;
        $location.path("/admin/library/" + id);
      };
    }
  };
}]);