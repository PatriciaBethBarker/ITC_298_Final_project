//index.js
var hapi = require("hapi");
//move the db require below server connection
var server = new hapi.Server( {
  //add connection settings, remove trailing slash in url
  connections: {
    router: {
      //isCaseSensitive: true,
      stripTrailingSlash: false
    }
  }
});

// Start the server
server.connection({ port: 8000 });//listen using the connection function
var db = require("./db");
  db.init(function(err) { //this is the ready function
  //if error statement
    if (err) {
      return console.error("db err", err);
    }
    // console.log("Database ready, start server.");
    server.start(function() {
      console.log("Server Ready");
    });
});

server.views({
//register the templates
  engines: {
    html: require("handlebars")

  },
  path: "views/templates", //"templates",
  layoutPath: "views",//
  layout: "default",
  //add partials path here
    //partialsPath: "views/templates/partials",//
  isCached: false
});
//register the routes, once matched, I want a response

server.route(require("./routes"));
