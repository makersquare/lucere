var app = angular.module("Lucere", ["ngResource", "ngRoute", "dndLists"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "/js/templates/views/login.html"
      })
      .when("/admin/user/create", {
        controller: "userCreationCtrl",
        templateUrl: "/js/templates/views/user_create.html"
      })
      .when("/admin/user/:userId", {
        controller: "userCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .when("/admin/team/:teamId", {
        controller: "teamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .when("/admin/library/:libraryId", {
        controller: "libraryCtrl",
        templateUrl: "/js/templates/views/admin_library.html"
      })
      .when("/admin/library/:libraryId/module/:moduleId", {
        controller: "moduleCtrl",
        templateUrl: "/js/templates/views/admin_module.html"
      })
      .when("/admin/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "lessonCtrl",
        templateUrl: "/js/templates/views/admin_lesson.html"
      })
      .when("/user/:userId", {
        controller: "userCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .when("/team/:teamId", {
        controller: "teamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .when("/library/:libraryId", {
        controller: "libraryCtrl",
        templateUrl: "/js/templates/views/student_library.html"
      })
      .when("/library/:libraryId/module/:moduleId", {
        controller: "moduleCtrl",
        templateUrl: "/js/templates/views/student_module.html"
      })
      .when("/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "lessonCtrl",
        templateUrl: "/js/templates/views/student_lesson.html"
      })
      .otherwise({redirectTo: "/"});
  }]);