// Dependencies
 var express = require("express");
 var exphbs = require("express-handlebars");
var path = require('path');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var mysql = require('mysql');
var DBPASSWORD = process.env.DBPASSWORD;
var connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: DBPASSWORD,
	    database: 'burgers_db'
});
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//
//
//             // Routes
app.get("/", function(req, res) {
			connection.query("SELECT * FROM ready WHERE ?",{is_eaten: 0},(error,notEaten) => {
			if (error) throw error;
			connection.query("SELECT * FROM ready WHERE ?",{is_eaten: 1},(error,isEaten) => {
			if (error) throw error;
			console.log(JSON.stringify(notEaten));
			 console.log(JSON.stringify(isEaten));
			return res.render("burger",{
			title: "Boogers, Not Burgers",	
			notEaten: notEaten,
			isEaten: isEaten});
			})
});                           


    });


	app.post("/", (req,res,error) => {

	//	if(error) throw error;
		var newBurger=req.body;
		console.log(newBurger)
		connection.query("INSERT INTO ready (burger_name) VALUES (?)",[newBurger], function(err, result) {	
//	connection.query("INSERT INTO ready (burger_name,user_created,date_created) VALUES (?)",{burger_name: newBurger.burger_name, user_created: newBurger.user_created,date_created: newBurger.date_created}, function(err, result) {
  		  if (err) {throw err
   		   //return res.status(500).end();
    			}
//	res.json(result);
	console.log(result);
    // Send back the ID of the new todo
   // res.json({ id: result.insertId });
    //console.log({ id: result.insertId });
  });
		

});
        app.post("/eatburger/:id", (req,res,error) => {

                if(error) throw error;
                var eatBurger=req.params.id;
		var timeStamp=moment().format();
		connection.query("UPDATE ready SET ? WHERE ?",{is_eaten:1,date_eaten: timeStamp},{is_eaten:0,id: eatBurger},(error,results)=> {
			if (error) throw error;
			else {
			return res.redirect("/");
}			
	//put sql here DUH

});
});
                                 // Initiate the listener.
                                 app.listen(port);

