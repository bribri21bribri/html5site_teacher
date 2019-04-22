//https://www.npmjs.com/package/websocket
//https://gist.github.com/martinsik/2031681

var WebSocketServer = require('websocket').server,
    http = require('http'),
    clients = [],  //記錄所有連線的client
    users = [];    //記錄所有連線的使用者

//建立webserver
var server = http.createServer(function (request, response) {
    
});
//聽8080port  ws://....:8080
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

//將socket server掛著一個web server上
wsServer = new WebSocketServer({
    httpServer: server,
    
});

//使用者連線到socket server會觸發request事件
wsServer.on('request', function (request) {  
    //將client端的資訊存到connection變數中 
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    //console.log(connection);
    //將這次的連線client端存到clients陣列中
    clients.push(connection);

    var userName = "guest"
        index = 0;

        //接收client傳過來的資料
    connection.on('message', function (message) {
        //console.log('Received Message: ' + message.utf8Data);

         var data = JSON.parse(message.utf8Data);
         //todo 將資料寫進資料庫 
         
         var json = "";
         //判斷傳過來的資料，有無使用者的姓名
        if(data["name"] != null){
            userName = data["name"]; 
            console.log((new Date()) + userName + " 登入");
            json= {time:(new Date()).getTime(),text: userName + " 登入",name:userName};
        }else{
            console.log((new Date()) + " " + userName + " 說：" +  data["message"]);

            json = {time:(new Date()).getTime(),text:data["message"],name:userName};

        }


            //廣播給所有人
            for(var i=0,max=clients.length;i<max;i++){
              clients[i].sendUTF(JSON.stringify(json));
            }
        
       

        
        //connection.sendUTF(JSON.stringify(users));
    });
    connection.on('close', function (reasonCode, description) {
        users.splice(index, 1);  //splice(開始位置,刪除幾筆)刪除陣列中的元素
        console.log((new Date()) + userName + connection.remoteAddress + ' disconnected.');
    });
});