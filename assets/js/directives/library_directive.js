app.directive("libraryDirective", ["Library", "$location", "$route", "Module",function(Library, $location, $route, Module) {
  return {
    templateUrl: "/js/templates/admin_library_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      var id = scope.params.libraryId;
      scope.library = Library.get({id: id});

      scope.createModule = function() {
        var module = new Module({name: scope.name});
        module.$save(function(data) {    
          scope.library.modules.push(data.id);
          scope.library.$save(function(data) {
            scope.name = "";
          });
        });
      };
      
    }
  }
}]);