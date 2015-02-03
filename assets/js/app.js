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
      .when("/user/create", {
        controller: "userCreationCtrl",
        templateUrl: "/js/templates/user_create_template.html"
      })
      .when("/user/:userId", {
        controller: "userCtrl",
        templateUrl: "/js/templates/user_profile_template.html"
      })
      .when("/login", {
        templateUrl: "/js/templates/login_template.html"
      })
      .otherwise({redirectTo: "/"});
  }]);