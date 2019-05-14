var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

var axios = require('axios')

app.get('/jobs', function(req, res) {
  axios.get('https://jobs.github.com/positions.json?description=javascript&location=remote')
    .then(response => {
      res.json({
        success: 'get call succeed!',
        url: req.url,
        jobs: response.data
      });
    })
    .catch(err => {
      res.json({
        error: 'error calling api',
      });
    })
})

app.post('/crypto', function(req, res) {
  res.json({
    success: 'successfully hit API!',
    body: req.body
  });
})

app.get('/crypto', function(req, res) {
  axios.get('https://api.coinlore.com/api/tickers/')
    .then(response => {
      res.json({
        success: 'get call succeed!',
        url: req.url,
        crypto: response.data
      });
    })
    .catch(err => {
      res.json({
        error: 'api call failed'
      });
    }) 
})

app.get('/people', function(req, res) {
  axios.get('https://swapi.co/api/people/')
    .then(response => {
      res.json({
        success: 'get call succeed!',
        url: req.url,
        people: response.data.results
      });
    })
    .catch(err => {
      res.json({
        error: 'api call failed'
      });
    }) 
});

app.get('/items', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/items', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example post method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3001, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
