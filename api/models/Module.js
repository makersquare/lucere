/**
* Module.js
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
    lessons: {
      collection: "lesson",
      via: "module"
    },
    library: {
      model: "library"
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