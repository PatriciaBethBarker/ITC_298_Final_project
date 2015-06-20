//home.js
var db = require("../db");
var Post = require("../models/post");

module.exports = function (req, reply) {
  db.getAllPosts(function (err, posts) {
    posts.forEach(function (post) {
      post.truncated = post.content.substr(0, 125);//shorten the content
    });

    reply.view("index", {
      posts: posts,
      title: "Home",
    });
  })
};
