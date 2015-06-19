//postLogin.js
var db = require("../db");
var crypto = require("crypto");

module.exports = function (req, reply) { //create hash varible
  var hash = crypto.createHash("sha1");

  //get password/username from payload, add connection
  db.connection.get("SELECT * FROM users WHERE username = $username", {
    $username: req.payload.name
  }, function(err, expected) {  //match the password from db

      console.log(req.payload, expected, err);
        //if, else statement

        if (expected && req.payload.password == expected.password) {
          //set cookies
          var response = reply.redirect("/");//send home
          var id = req.payload.name + Date.now();
          hash.update(id);
          id = hash.digest("hex");
          response.state("user", req.payload.name);
          response.state("session", id);
          console.log(req.payload.name, id);

          //make the db connection
          db.connection.run("UPDATE users SET session = $session WHERE username = $user", {
            $user: req.payload.name,
            $session: id
          });
        } else {
    //redirect if not
            reply.redirect("/login");
        }
    });
};//end module exports
