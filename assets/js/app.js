var app = angular.module("Lucere", ["ngResource", "ngRoute", "dndLists"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/team/:teamId", {
        controller: "teamCtrl",
        templateUrl: "/js/templates/team_template.html"
      })
      .when("/team/:teamId/library/:libraryId", {
        controller: "libraryCtrl",
        templateUrl: "/js/templates/library_template.html"
      })
      .when("/team/:teamId/library/:libraryId/module/:moduleId", {
        controller: "moduleCtrl",
        templateUrl: "/js/templates/module_template.html"
      })
      .when("/team/:teamId/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "lessonCtrl",
        templateUrl: "/js/templates/lesson_template.html"
      })
      .otherwise({redirectTo: "/"});
  }]);