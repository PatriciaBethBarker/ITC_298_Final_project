//getLogin.js
var db = require("../db");

module.exports = function(req, reply) {
    reply.view("login", {
      title: "Login" //add the title
    });
};
