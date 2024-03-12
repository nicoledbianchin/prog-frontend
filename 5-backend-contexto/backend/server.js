var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.get('/task', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   const resp = '{ "list": [' 
      + '{ "id": 1, "title": "Live cycle & State", "category": "Done" },'
      + '{ "id": 2, "title": "Events", "category": "Done" }'
   +']}';
   res.end(resp);
});


app.post('/task', function (req, res) {
   console.log(req.body);
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('ok');
});



var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});

