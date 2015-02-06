module.exports = function(argument) {
  var crypto = require("crypto");
  var state;

  var generateRandomString = function() {
    var currentDate = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    state = crypto.createHash("sha1").update(currentDate + random).digest("hex");
    return state;
  };

  var checkState = function(req, res) {
    var returnState = req.query.state;
    return (returnState === state);
  };

  return {
    generateState: generateRandomString,
    checkState: checkState
  };
};