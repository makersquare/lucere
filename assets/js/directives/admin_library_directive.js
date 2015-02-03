app.directive("adminLibraryDirective", ["Library", "$route", "Module", function(Library, $route, Module) {
  return {
    templateUrl: "/js/templates/admin_library_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      var id = scope.params.libraryId;
      scope.library = Library.get({id: id});

      scope.createModule = function() {
        var module = new Module({name: scope.moduleName.name});
        module.$save(function(data) {    
          scope.library.modules.push(data.id);
          scope.library.$save(function(data) {
            scope.moduleName = "";
          });
        });
      };
      
    }
  }
}]);