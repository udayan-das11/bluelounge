var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req, res, next) {
	var results = [];
    var query=db.query("select * from products");
	query.on('row', function(row){
		//console.log(row);
		var myTemp=row;
		myTemp.productimage = new Buffer(row.productimage).toString();
		results.push(myTemp);
	});
	query.on("end", function (result) {
	    //console.log(JSON.stringify(results));
		res.send(JSON.stringify(results));
	});
});

module.exports = router;