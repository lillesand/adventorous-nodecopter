var express = require('express');
var drone = require('ar-drone');

var app = express();
var client  = drone.createClient();
var prev = '';


app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, PUT, GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
})

app.get('/start', function(req, res) {
  prev = 'start';
  console.log('start')

  client.takeoff();
  return res.send('yes, starting')
});

app.get('/land', function(req, res) {
  prev = 'not start';
  console.log('land')
  client.land();
  return res.send('yes, landing')
});

app.get('/front', function(req, res) {
  prev = 'not start';
  console.log('front')
  client.stop();
  client.front(0.1);
  return res.send('front')
});

app.get('/back', function(req, res) {
  prev = 'not start';
  console.log('back')
  client.stop();
  client.back(0.1);
  return res.send('back')
})

app.get('/right', function(req, res) {
  prev = 'not start';
  console.log('r')
  client.stop();
  client.right(0.1);
  return res.send('right')
})

app.get('/left', function(req, res) {
  prev = 'not start';
  console.log('l')
  client.stop();
  client.left(0.1);
  return res.send('left')
})

app.get('/tilt/:up/:down/:left/:right/', function(req, res) {
  prev = 'not start';

  var up = req.param('up')
  var down = req.param('down')
  var left = req.param('left')
  var right = req.param('right')

  client.stop();

  client.left(parseFloat(left));
  client.right(parseFloat(right));
  client.front(parseFloat(up));
  client.back(parseFloat(down));

  console.log('tilting: front(' + up + ') back(' + down + ') left(' + left + ') right(' + right + ') ');

  res.send('tilting')

});

app.get('/stop', function(req, res) {
  client.stop();
  return res.send('stop')
})


app.listen(8000, function() {
  console.log('We are running');
});
