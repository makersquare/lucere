app.factory("AuthService", ["$resource", "$http", function($resource, $http) {
  var user = null;

  return {

    logout: function() {
      user = null;
      // call logout on server
    },

    currentUser: function(cb) {
      if(user) {
        cb(user);
      }

      var request = $http({
        method: "GET",
        url: "/user/currentuser",
      });

      request.then(function(userData) {
        user = userData.data;
        cb(user);
      });
    }
  }
}]);