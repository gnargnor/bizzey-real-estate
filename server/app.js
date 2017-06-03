var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var index = 'index.js';
var realestate = require('./routes/realestate.js');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");
var mongoURI = "mongodb://moo:worm@ds149800.mlab.com:49800/listings";
// var mongoURI = "mongodb://localhost:27017" - for use on local machines
var MongoDB = mongoose.connect(mongoURI).connection;

//If there is an error connecting to the database, let us know!
MongoDB.on("error", function(err) {
    console.log("Mongo Connection Error :" + err);
});

//If we successfully hooked up to the database, let us know!
MongoDB.once("open", function() {
    console.log("Mongo");
});

app.set('port', port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/realestate', realestate);



app.get('/', function() {
    res.send(index);
});

app.listen(port, function(req, res) {
    console.log('listening on port ', port);
});