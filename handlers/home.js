//home.js
var db = require("../db");

module.exports = function (req, reply) {
  db.getAllPosts(function (err, posts) {
    posts.forEach(function (post) {
      post.truncated = post.content.substr(0, 150);//shorten the content
    });

    //  if (!req.state.user) {
    //    return reply.redirect("/login");
    //  }

    reply.view("index", {
      posts: posts,
      title: "Home",
    });
  })
};
