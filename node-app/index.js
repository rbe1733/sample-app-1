var express  = require('express');
var app = express();
var mongodb = require('mongodb');
var port = 80;

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json

app.post('/', function(req, res) {
  mongodb.MongoClient.connect('mongodb://db:27017/sample-app-1', function (err, db) {
    if (err) {
      console.log('Failed connection to MongoDB', err);
    } else {
      db.collection('contenu').insert(req.body, function (err, result) {
        if (err) {
          console.log(err);
          res.status(400);
        } else {
          console.log('Success !');
          res.status(201);
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
      res.body = db.collection('contenu').find(function(error, result) {
        res.contentType('application/json');
        res.status(200);
        res.json(result);
      });
    }
  });
});

app.listen(port);
console.log("App listening on port " + port);
