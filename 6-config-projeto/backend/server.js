var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


const cors = require('cors')

var corsOptions = {
	// colocar o domínio de origem, no caso de testes locais: 'http://localhost:<porta>'
   origin: 'http://localhost:3000',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))


app.get('/task', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});   
   const resp = '{ "list": [' 
   + '{ "id": 0, "titulo": "Live cycle & State", "categoria": "Done", "texto": "texto 1" },'
   + '{ "id": 1, "titulo": "Events", "categoria": "Done", "texto": "texto 2" }'
+']}';
res.end(resp);
});

app.post('/task', function (req, res) {
   console.log(req.body);
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('ok');
});

var server = app.listen(3003, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
});

