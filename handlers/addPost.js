var db = require("../db");
var Post = require("../models/post");

module.exports = function (req, reply) {
  console.log(req.state);
  //if statement required here
  if (!req.state.user){
    return reply.redirect("/login");
  }

  reply.view("post", {
      title: "Add Post",
      post: {
          slug: "new"
      }
  });
};
