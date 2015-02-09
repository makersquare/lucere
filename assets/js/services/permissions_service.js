app.factory("Permissions", ["AuthService", function(AuthService) {
  var service = {};
  var viewAsEnabled = false;
  var viewingAsTeam;

  service.viewAsButton = function() {
    AuthService.isAdmin();
  }

  service.teamView = function(teamId) {
    return AuthService.isTeamMember(teamId);
  };

  service.teamEdit = function(teamId) {
    var teamRights = AuthService.isTeamAdmin(teamId);
    return teamRights && !viewAsEnabled;
  };

  service.libraryView = function(libraryId) {
    if (viewAsEnabled) {
      return AuthService.isLibraryMember(libraryId);
    } else {
      return AuthService.isLibraryMember(libraryId, viewingAsTeam);
    }
  };

  service.libraryEdit = function(libraryId) {
    var libraryRights = AuthService.isLibraryAdmin(libraryId);
    return libraryRights && !viewAsEnabled;
  };

  service.showAdminLinks = function() {
    return AuthService.isAdmin() && !viewAsEnabled
  };

  service.viewAsTeam = function(teamId) {
    if (AuthService.isAdmin() && AuthService.isTeamMember(teamId)) {
      viewAsEnabled = true;
      viewAsTeam = teamId;
      return true;
    }
    return false;
  };

  service.viewAsAdmin = function() {
    if (AuthService.isAdmin()) {
      viewAsEnabled = false;
      viewingAsTeam = undefined;
      return true;
    }
    return false;
  };

  return service;
}]);
