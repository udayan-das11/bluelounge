var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/getVendorDataById',function(req,res){
  var vid=req.body.vid;	
  var results = [];
    var query=db.query("select * from vendordetails WHERE vid = $1",[vid]);
	query.on('row', function(row){
		console.log(row);
		results.push(row)
	});
	query.on("end", function (result) {
		res.send(JSON.stringify(results[0]));
	});
  //console.log(vid);
});

router.post('/updateVendorDataById',function(req,res){
	var query = db.query('UPDATE vendordetails SET vname=$1,vlocation=$2 WHERE vid=$3', [req.body.vname,req.body.vlocation,req.body.vid]);
	   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("update success");
			res.end("success");
		
	});	
});

router.post('/deleteVendorDataById',function(req,res){
  var vid=req.body.vid;
  var vendordata = {
	  vid:req.body.vid,
	  vname:req.body.vname,
	  vlocation:req.body.vloc
	}
  //console.log(vendordata);
   var query=db.query("DELETE FROM vendordetails WHERE vid = $1",[vid]);
   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("deletion success");
			res.end("success");
		
	});
  
});

module.exports = router;
