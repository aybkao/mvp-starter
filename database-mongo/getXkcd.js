// save 100 xkcd comics into mongodb
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

for (var i=600; i<900; i++) {
  var reqUrl = 'https://xkcd.com/' + i + '/info.0.json';
  request(reqUrl, function(error, response, body) {
    if (error) throw error;
    var jsonXkcd = JSON.parse(response.body)
    var oneComic = new Item({ 
      url: jsonXkcd.img,
      title: jsonXkcd.title,
      transcript: jsonXkcd.transcript,
      num: jsonXkcd.num,
      safe_title: jsonXkcd.safe_title,
      alt: jsonXkcd.alt,
      year: jsonXkcd.year,
      month: jsonXkcd.month,
      day: jsonXkcd.day
    });
    // save one comic 
    oneComic.save(function(err, data){})
  })
}




