app.factory("AuthService", ["$http", "$location", function($http, $location) {
  var service = {};
  var user = null;

  var authorizeStudent = function(cb) {
    return request.success(function(data) {
      if (!data) {
        $location.path("/login");
      } else if(cb) {
        cb(data);
      }
    })
    .error(function() {
      $location.path("/login");
    });
  };

  var authorizeAdmin = function() {
    return authorizeStudent(function(data) {
      if (!data.administrating || !data.administrating.length) {
        $location.path("/user/" + data.id);
      }
    })
  };

  var request;

  var setUserRequest = function() {
    request = $http({
      method: "GET",
      url: "/user/currentuser"
    });
    request.success(function(data) {
      service.currentUser = data;
    });
  }

  var logout = function() {
    user = null;
    //reset this http request
    setUserRequest();
    service.currentUser = null;
    $location.path("/login");
    $http.get("/logout");
  }

  var login = function(cb) {

    request.success(function(userData) {
      user = userData;
      if(cb) {
        return cb(user);
      }
    })
    .error(function() {
      return cb(null);
    });
  };

  var userData = function() {
    return request;
  };

  var loggedIn = function() {
    return (user ? true : false);
  };

  var isAdmin = function() {
    return currentUser.administrating.length > 0;
  }

  setUserRequest();

  service.login = login;
  service.logout = logout;
  service.userData = userData;
  service.loggedIn = loggedIn;
  service.authorizeStudent = authorizeStudent;
  service.authorizeAdmin = authorizeAdmin;
  return service;
}]);