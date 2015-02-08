var app = angular.module("Lucere", ["ngResource", "ngRoute", "dndLists"])
  .config(["$routeProvider", function($routeProvider) {

    var addLibraryResolves = function(resolve) {
      resolve.libraryState = function(StateTracker) {
        return StateTracker.setLibraryState();
      }
    };

    $routeProvider.whenAuth = function(url, options) {
      options.resolve = options.resolve || {};
      options.resolve.authorize = function(AuthService) {
        return AuthService.authorizeStudent();
      }

      addLibraryResolves(options.resolve);

      return this.when(url, options);
    };

    $routeProvider.whenAdmin = function(url, options) {
      options.resolve = options.resolve || {};
      options.resolve.authorize = function(AuthService) {
        return AuthService.authorizeAdmin();
      }

      addLibraryResolves(options.resolve);
      return this.when(url, options);
    };

    $routeProvider
      .when("/login", {
        templateUrl: "/js/templates/views/login.html"
      })
      .whenAdmin("/admin/user/create", {
        controller: "UserCreationCtrl",
        templateUrl: "/js/templates/views/user_create.html"
      })
      .whenAdmin("/admin/user/:userId", {
        controller: "UserCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .whenAdmin("/admin/team/:teamId", {
        controller: "TeamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .whenAdmin("/admin/library/:libraryId", {
        controller: "LibraryCtrl",
        templateUrl: "/js/templates/views/admin_library.html"
      })
      .whenAdmin("/admin/library/:libraryId/module/:moduleId", {
        controller: "ModuleCtrl",
        templateUrl: "/js/templates/views/admin_module.html"
      })
      .whenAdmin("/admin/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "LessonCtrl",
        templateUrl: "/js/templates/views/admin_lesson.html"
      })
      .whenAuth("/user/:userId", {
        controller: "UserCtrl",
        templateUrl: "/js/templates/views/user_profile.html"
      })
      .whenAuth("/team/:teamId", {
        controller: "TeamCtrl",
        templateUrl: "/js/templates/views/team.html"
      })
      .whenAuth("/library/:libraryId", {
        controller: "LibraryCtrl",
        templateUrl: "/js/templates/views/student_library.html"
      })
      .whenAuth("/library/:libraryId/module/:moduleId", {
        controller: "ModuleCtrl",
        templateUrl: "/js/templates/views/student_module.html"
      })
      .whenAuth("/library/:libraryId/module/:moduleId/lesson/:lessonId", {
        controller: "LessonCtrl",
        templateUrl: "/js/templates/views/student_lesson.html"
      })
      .when("/error", {
        templateUrl: "/js/templates/views/no_user_error.html"
      })
      .otherwise({redirectTo: "/login"});
    }]);