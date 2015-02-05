app.directive("studentLibraryDirective", ["Library", "$route", function(Library, $route) {
  return {
    templateUrl: "/js/templates/directives/student_library_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      var id = scope.params.libraryId;
      scope.library = Library.get({id: id});
    }
  };
}]);