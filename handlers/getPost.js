//getPost.js
var Post = require("../models/post");//get the post

module.exports = function(req, reply) {
  var id = req.params.id;
  var model = new Post({//yikes!
    id: id
  });
  //new Blogs do not need to load from the db
  if (id == "new") {
    return reply.view("project", {
      title: "New Post",
      post: model.JSON()
    });
  }//get model detail and then return the page

  model.set("id", id);
  model.load(function(err) {
    var data;
    if (err) {
      console.log(err);
    } else {
      data = model.toJSON();
    }

    reply.view("post", {
      title: data.name,
      post: data
    });
  });
};
