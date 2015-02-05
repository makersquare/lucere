app.factory("AuthService", ["$http", "$location", function($http, $location) {
  var user = null;

  var logout = function() {
    user = null;
    $location.path("/login");
    $http.get("/logout");
  }

  var login = function(cb) {
    var request = $http({
      method: "GET",
      url: "/user/currentuser"
    });

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

  return {
    login: login,
    logout: logout,

    currentUser: function(cb) {
      if(user) {
        return cb(user);
      }

      login(cb);
    },

    loggedIn: function() {
      return (user ? true : false);
    } 
  };
}]);