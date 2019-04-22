var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];
var server = http.createServer(function (request, response) {

});

server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,

});


wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');


    var index = clients.push(connection) - 1;
    connection.on('message', function (message) {
        console.log(message);
        for (var i = 0, max = clients.length; i < max; i++) {
            clients[i].sendUTF(message.utf8Data);
        }

    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});







