var app = angular.module("Lucere", ["ngResource", "ngRoute", "dndLists"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "/js/templates/views/login.html"
      })
      .when("/admin/user/create", {
        controller: "UserCreationCtrl",
        templateUrl: "/js/templates/views/user_create.html"
      })
      .when("/admin/user/:userId", {
        controller: "UserCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .when("/admin/team/:teamId", {
        controller: "TeamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .when("/admin/library/:libraryId", {
        controller: "LibraryCtrl",
        templateUrl: "/js/templates/views/admin_library.html"
      })
      .when("/admin/library/:libraryId/module/:moduleId", {
        controller: "ModuleCtrl",
        templateUrl: "/js/templates/views/admin_module.html"
      })
      .when("/admin/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "LessonCtrl",
        templateUrl: "/js/templates/views/admin_lesson.html"
      })
      .when("/user/:userId", {
        controller: "UserCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .when("/team/:teamId", {
        controller: "TeamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .when("/library/:libraryId", {
        controller: "LibraryCtrl",
        templateUrl: "/js/templates/views/student_library.html"
      })
      .when("/library/:libraryId/module/:moduleId", {
        controller: "ModuleCtrl",
        templateUrl: "/js/templates/views/student_module.html"
      })
      .when("/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "LessonCtrl",
        templateUrl: "/js/templates/views/student_lesson.html"
      })
      .when("/error", {
        templateUrl: "/js/templates/views/no_user_error.html"
      })
      .otherwise({redirectTo: "/login"});
    }])
  .run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function(e) {
      if(!AuthService.loggedIn()) {
        AuthService.login(function(user) {
          if(user.teams.length === 0 && user.administrating.length === 0) {
            $location.path("/user/"+user.id);
          }
        });    
      }
    });
  }]);