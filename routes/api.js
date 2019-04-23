var express = require('express');
var request = require('request');
var zlib = require('zlib')
var multer  = require('multer');
var router = express.Router();
//var upload = multer({ dest: 'public/uploads/' })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

/* GET users listing. */
//http://localhost:3000/api
router.get('/', function(req, res, next) {
  res.send('api');
});
//http://localhost:3000/api/events
router.get('/events', function(req, res, next) {
    // res.set('Content-Type', 'text/event-stream');
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache'
    })
    setInterval(function(){
        res.write('data:' + (new Date()).toLocaleTimeString() + '\n\n');
    },1000)
    res.write('data:' + (new Date()).toLocaleTimeString() + '\n\n' );
});

//http://localhost:3000/api/youbike
router.get('/youbike',function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache'
    })
    setInterval(function(){
        request('http://data.taipei/youbike',{'encoding':null},function(error,response,body){
            zlib.gunzip(body,function(error, datas){
               res.write('data:' + datas.toString() + '\n\n');
              
            })  
        })
    },60000);

    request('http://data.taipei/youbike',{'encoding':null},function(error,response,body){
        zlib.gunzip(body,function(error, datas){
            res.write('data:' + datas.toString() + '\n\n');
        })  
    })
})
//http://localhost:3000/api/upload
router.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send(req.file);
  })





module.exports = router;