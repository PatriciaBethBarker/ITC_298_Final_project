//savePost.js
var db = require("../db");
var Post = require("../models/post");
//this is a post =>grab it from models
module.exports = function(req, reply) {

  var payload = req.payload;
  var model = new Post(payload);
  model.save(function(err) {

    if (err) {
      console.error(err);
    }

    reply.redirect("/");//reload to home page
  });
};
