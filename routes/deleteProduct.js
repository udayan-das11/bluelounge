var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/deleteProductDataById',function(req,res){
  //console.log(req);
  var pid=req.body.pid;
  
   var query=db.query("DELETE FROM products WHERE pid = $1",[pid]);
   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("deletion success");
			res.end("success");
		
	});
});

module.exports = router;