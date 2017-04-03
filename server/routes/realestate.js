var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var ListingSchema = mongoose.Schema({
  sqft: Number,
  city: String,
  rent: Number,
  cost: Number
});

var Listings = mongoose.model('Listings', ListingSchema);

// var SellerSchema = mongoose.Schema({
//   sqft: Number,
//   city: String,
//   rent: Number
// });

router.get('/get', function(req, res){
  Listings.find(function(err, allListings){
     if(err){
       console.log('error: ', err);
       res.sendStatus(500);
     }
     var rentals = [];
     var forSale = [];
     for (var i = 0; i < allListings.length; i++){
       var thisListing = allListings[i];
       if (thisListing.rent === undefined){
         forSale.push(thisListing);
       } else {
         rentals.push(thisListing);
       }
     }

     res.send([forSale, rentals]);

  });
});

router.post('/post', function(req, res){
  console.log('post realestate hit ', req.body);
  var listing = new Listings();
  listing.city = req.body.city;
  listing.sqft = req.body.sqft;
  if (listing.type === 'rental') {
    listing.rent = req.body.price;
  } else {
    listing.cost = req.body.price;
  }
  console.log(listing);
  listing.save(function(err, newProperty){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    });
  res.send(newProperty);
});

module.exports = router;
