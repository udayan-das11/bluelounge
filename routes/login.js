var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/logindata',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  //console.log(username);
  var userDetails = {};
  db.query("select username,password from userdetails WHERE username = ? and password = ?",[username,password], function(err, rows){
	userDetails.data = rows;
	if(userDetails.data.length < 1){
		console.log("Invalid user");
		res.send("fail");
	}else{
		console.log("Valid user!");
		res.send("success");
	}
 });	
});
module.exports = router;
