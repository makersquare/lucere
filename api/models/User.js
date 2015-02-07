/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true
    },
    email: {
      type: "email",
      required: true
    },
    github: {
      type: "string",
      required: true
    },
    twitter: {
      type: "string"
    },
    teams: {
      collection: "team",
      via: "users"
    },
    administrating: {
      collection: "team",
      via: "admins"
    }
  }
};
