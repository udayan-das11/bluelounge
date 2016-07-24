var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/logindata',function(req,res){
  var flag=0;
  var username=req.body.username;
  var password=req.body.password;
  //console.log(username);
  var userDetails = {};
  var query = db.query("select username,password from userdetails WHERE username = $1 and password = $2",[username,password]);
  query.on('row', function(row) {
    console.log(row);
	userDetails.data = row;
    flag=1;	
  });
  query.on("end", function (result) {
    	if(flag==0){
			console.log("Invalid creds");
			res.end("fail");
		} else {
            console.log("Valid creds!");
			res.end("success");
		}
	});
});
module.exports = router;
