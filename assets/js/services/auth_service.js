app.factory("AuthService", ["$http", function($http) {
  var user = null;

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
      return cb(null)
    });

  };

  return {
    login: login,

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