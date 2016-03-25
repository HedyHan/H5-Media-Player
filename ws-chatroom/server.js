var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 3003;

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        wss.broadcast(message);
    });
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });