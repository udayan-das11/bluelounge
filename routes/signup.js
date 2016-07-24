var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/signupdata',function(req,res){
var flag=0;
  var userdata = {
	  email:req.body.email,
	  username:req.body.username,
	  password:req.body.password,
	  phonenumber:req.body.phoneNumber
	}
  //console.log(userdata);
	var query = db.query("INSERT INTO userdetails (email,username,password,phoneinteger)  VALUES ($1,$2,$3,$4)",[userdata.email,userdata.username,userdata.password,userdata.phonenumber]);
	query.on('row', function(row){
		flag=1;
	});
	 query.on("end", function (result) {
		console.log("insertion success");
		res.end("success");
	});
});

module.exports = router;
