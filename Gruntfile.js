//Gruntfile.js
module.exports = function(grunt) {
  //create a task and add them in order

  //locate all JS files inside src.js
  //  "src/js/**/*.js"
  //will find:
  //  src/js/Lib/share.min.js
  //  src/js/min.js
  //will not find:
  //  src/js/index.html
  //  src/404.js


  grunt.registerTask("hello",
  function() {//provide an array of other task names
    console.log("Hello, I'm using grunt!");
    grunt.file.write("build/test.txt", "This file is written sync");//this creates the folders and the file -
    //directory is written here
  });

  //good to call up assets

  //ie, less css files, autoprefixer, in sequence
  grunt.registerTask("default",
  ["autoprefixer", "concurrent"]);
    //Autoprefixer parses CSS
    //adds vendor-prefixed CSS properties
    //using the Can I Use database
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");

  grunt.registerTask("default", ["autoprefixer", "concurrent"]);

  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ["watch", "nodemon"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: "index.js" //tell what scripts to run
      }//target
    },//object key
    watch: {
        options: {
          livereload: true
        },
      prefix: {
        files: "src/css/**/*.css",  //use globbing pattern
        tasks: ["autoprefixer"]
      },
      template: {
        files: "**/*.html",//2 targets within watch
        tasks: ["hello"]
      }
    }, //end of object, comma btwn array and object properties
    autoprefixer: {
      dev: {
        expand: true,
        flatten: true,
        src: "public/css/**/*.css",
        dest: "build/css/"
      }
    }

  });

};  //end autoprefixer
