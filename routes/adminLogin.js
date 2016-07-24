var express = require('express');
var router = express.Router();
var db = require('./db');


router.post('/adminLoginData',function(req,res){
  var flag=0;
  var adminname=req.body.adminname;
  var password=req.body.password;
  var adminDetails = {};
  var query=db.query("select adminname,password from admin WHERE adminname = $1 and password = $2",[adminname,password]);
  query.on('row', function(row) {
    console.log(row);
	adminDetails.data = row;
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
