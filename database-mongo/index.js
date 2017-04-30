var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', function() {
  console.log('mongoose connection error');
});
db.once('open', function() {
  console.log('mongoose connected successfully');
});

// connect to database
var xkcdSchema = mongoose.Schema({
  url: {type: String, unique: true, dropDups: true},
  title: String,
  transcript: String,
  num: Number,
  safe_title: String,
  alt: String,
  year: String,
  month: String,
  day: String
}) 

var Item = mongoose.model('Item', xkcdSchema);

module.exports = Item;


////////////////////////////////////// below is old code ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var db = mongoose.connection;
// db.on('error', function() {
//   console.log('mongoose connection error');
// });
// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });
// var itemSchema = mongoose.Schema({
//   url: {type: String, unique: true, dropDups: true},
//   title: String,
//   description: String
// });
// var Item = mongoose.model('Item', itemSchema);
// // var selectAll = function(callback) {
// //   Item.find({}, function(err, items) {
// //     if(err) {
// //       callback(err, null);
// //     } else {
// //       callback(null, items);
// //     }
// //   });
// // };
// //module.exports.selectAll = selectAll;
// module.exports = Item;