/**
* Team.js
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
    users: {
      collection: "user",
      via: "teams"
    },
    library: {
      model: "library"
    },
    admins: {
      collection: "user",
      via: "administrating"
    }
  }
};

if(process.env !== "production") {
  module.exports.attributes.id = {
    primaryKey: true,
    type: "integer",
    required: true
  }
}