var express = require('express');
var router = express.Router();

/* GET users listing. */
//http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//http://localhost:3000/users/abc
router.get('/abc',function(req,res,next){
  res.send("abc");
})

module.exports = router;
