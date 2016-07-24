var express = require('express');
var router = express.Router();
var db = require('./db');

router.post('/getProductDataById',function(req,res){
    var pid=req.body.pid;			
    var results = [];
    var query=db.query("select * from products WHERE pid = $1",[pid]);
	query.on('row', function(row){
		console.log(row);
		var myTemp = row;
		myTemp.productimage = new Buffer(row.productimage).toString();
		results.push(myTemp);
	});
	query.on("end", function (result) {
		res.send(JSON.stringify(results[0]));
	});			
			
});

router.post('/updateProductDataById',function(req,res){
  var productdata = {
      productid:req.body.pid,
	  productname:req.body.pname,
	  productcategory:req.body.pcategory,
	  productvendor:req.body.pvendor,
	  productprice:req.body.price,
	  productmanufacture:req.body.pmanufacture,
	  productdescription:req.body.pdescription,
	  productimage:req.body.editImage
   };
	var query = db.query('UPDATE products SET productname=$1,productcategory=$2,productvendor=$3,productprice=$4,productmanufacture=$5,productdescription=$6,productimage=$7 WHERE pid=$8', [productdata.productname,productdata.productcategory,productdata.productvendor,productdata.productprice,productdata.productmanufacture,productdata.productdescription,productdata.productimage,productdata.productid]);
	   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("update success");
			res.end("success");
		
	});	

});

module.exports = router;