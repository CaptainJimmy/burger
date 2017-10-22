// Dependencies
 var express = require("express");
 var exphbs = require("express-handlebars");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// // Create an instance of the express app.
 var app = express();
//
// // Specify the port.
 var port = 9000;
//
// // Set Handlebars as the default templating engine.
 app.engine("handlebars", exphbs({ 
	 defaultLayout: "layout",
	 layoutsDir: __dirname + "/views"
 }));
app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "handlebars");
//
//
//             // Routes
             app.get("/", function(req, res) {
                         return res.render("burger");
                               });
                                 // Initiate the listener.
                                 app.listen(port);

