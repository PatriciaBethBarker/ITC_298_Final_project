//blog.js
var Backbone = require("backbone");
var db = require("../db");
var moment = require("moment");
//models with key-value binding and custom events
var LOAD = "SELECT * FROM posts WHERE slug = $slug;";
var SAVE_NEW = "INSERT INTO posts (slug, title, author, content, created_at, formatted) VALUES ($slug, $title, $author, $content, datetime('now'), $formatted);";
var UPDATE = "UPDATE posts SET title = $title, author = $author, content = $content WHERE slug = $slug;";
var LAST = "SELECT last_insert_rowid() AS rowid FROM posts;";

//Backbone models are observable
module.exports = Backbone.Model.extend({
  defaults: {
    name: "Untitled Post",
    title: "",
    content: "",
    author: "", //leave empty
    //created_at: "",
    slug: "new"
  },//they fire events when their properties are changed
  load: function (done) {  //load
    var self = this;
    var query = db.connection.prepare(LOAD);
    var data = this.toJSON();
    query.get({
      $slug: data.slug
    }, function(err, loaded) {
      self.set(loaded);
      done(err);
    });
  },
  save: function (done) { //save
    var self = this;
    //if statement
    if (this.get("slug") == "new") {
      var query = db.connection.prepare(SAVE_NEW);//fix the db err
      var data = this.toJSON();
      var slug = this.get("title").toLowerCase();
      // console.log(data);
      var space = /\s/g;
      slug = slug.replace(space, "-");

        query.run({
          $title: data.title,
          $content: data.content,
          $author: data.author,
          $formatted: moment().format("MMMM Do YYYY, h:mm:ss a"),
          $slug: slug
        }, done);

      } else { //update
      var query = db.connection.prepare(UPDATE);//fix the db err
      var data = this.toJSON();

        query.run({
          $title: data.title,
          $content: data.content,
          $author: data.author,
          $slug: data.slug
        }, done);
      }
  }
});
