//routes.js
module.exports = [{
//build the routes
  path: "/",
  method: "GET",
  handler: require("./handlers/home")
}, {
  path: "/posts", //duplicate of home path
  method: "GET",
  handler: require("./handlers/home")
}, {//create single page view
  path: "/posts/{slug}",//return name of post
  method: "GET",
  handler: require("./handlers/viewPost")
}, {
  path: "/posts/new",//new post
  method: "GET",
  handler: require("./handlers/addPost")
}, {
  path: "/posts/{slug}/",//edit post
  method: "GET",
  handler: require("./handlers/editPost")
}, {
  path: "/posts/{slug}",//save post
  method: "POST",//post saved
  handler: require("./handlers/savePost")
}, {
  path: "/login",//login
  method: "GET",
  handler: require("./handlers/getLogin")
}, {
  path: "/login",
  method: "POST",
  handler: require("./handlers/postLogin")
}, {
  path: "/assets/{param*}",
  method: "GET",
  handler: {
    directory: {
      path: "public"//changed from ./build, now renders css
    }
  }
}];
