

var express  = require('express');
var app = express();
var mongodb = require('mongodb');
var port = 80;
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json

app.delete('/', function(req, res) {
  mongodb.MongoClient.connect('mongodb://db:27017/sample-app-1', function(err, db) {
    if (err) {
      console.log('Failed connection to MongoDB', err);
    } else {
      db.collection('contenu').drop();
      db.collection('contenu').insert({"_id":"total", "value":1}, function(error, result) {
        if (error) {
          console.log(error);
          res.status(400);
          res.send(error);
        } else {
          res.status(200).end();
        }
      });
    }
  });
});

app.post('/', function(req, res) {
  mongodb.MongoClient.connect('mongodb://db:27017/sample-app-1', function (err, db) {
    if (err) {
      console.log('Failed connection to MongoDB', err);
    } else {
      db.collection('contenu').findOne({"_id":"total"}, function(error, result) {
        if (error) {
          console.log(error);
          res.status(400);
          res.send(error);
        } else {
          db.collection('contenu').update({}, { $inc: { value: 1 } });
          res.status(200);
          res.send('Incrementation : OK\n');
        }
      });
    }
  });
});

app.get('/', function(req, res) {
  mongodb.MongoClient.connect('mongodb://db:27017/sample-app-1', function (err, db) {
    if (err) {
      console.log('Failed connection to MongoDB', err);
    } else {
      db.collection('contenu').findOne({"_id":"total"}, function(error, result) {
        if (error) {
          console.log(error);
          res.status(400);
          res.send(error);
        } else {
          res.status(200);
          res.send('\Result='+result.value.toString()+'\n');
        }
      });
    }
  });
});

app.listen(port);
console.log("App listening on port " + port);

