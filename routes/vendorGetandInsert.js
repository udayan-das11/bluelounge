var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req, res, next) {
    var results = [];
    var query=db.query("select * from vendordetails");
	query.on('row', function(row){
		console.log(row);
		results.push(row);
	});
	query.on("end", function (result) {
	    console.log(JSON.stringify(results));
		res.send(JSON.stringify(results));
	});
});

router.post('/vendorData',function(req,res){
  var flag=0;
  var vendordata = {
	  vid:req.body.vid,
	  vname:req.body.vname,
	  vlocation:req.body.vloc
	}
  //console.log(vendordata);
   var query=db.query("insert into vendordetails (vid, vname, vlocation) VALUES ($1,$2,$3)",[vendordata.vid,vendordata.vname,vendordata.vlocation]);
   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("insertion success");
			res.end("success");
		
	});

});

module.exports = router;
