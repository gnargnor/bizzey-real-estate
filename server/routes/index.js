var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

app.get('/', function(req, res){
  res.send('index.html');
});
