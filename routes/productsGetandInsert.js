var express = require('express');
var router = express.Router();
//var multer = require('multer');
//var upload = multer({dest: 'uploads/'});
var db = require('./db');

router.get('/', function(req, res, next) {

    var results = [];
    var query=db.query("select * from products");
	query.on('row', function(row){
		console.log(row);
		var myTemp=row;
		myTemp.productimage = new Buffer(row.productimage).toString();
		results.push(myTemp);
	});
	query.on("end", function (result) {
	    console.log(JSON.stringify(results));
		res.send(JSON.stringify(results));
	});
});

router.post('/productsData',function(req,res){
  var productdata = {
	  productname:req.body.pname,
	  productcategory:req.body.pcategory,
	  productvendor:req.body.pvendor,
	  productprice:req.body.price,
	  productmanufacture:req.body.pmanufacture,
	  productdescription:req.body.pdescription,
	  productimage:req.body.pImage
   };
   var seqName = 'productSequence';
   console.log('$$$$$$$$$'+productdata);
   var query=db.query("insert into products (productname, productcategory, productvendor,productprice,productmanufacture,productdescription,productimage) VALUES ($1,$2,$3,$4,$5,$6,$7)",[productdata.productname,productdata.productcategory,productdata.productvendor,productdata.productprice,productdata.productmanufacture,productdata.productdescription,productdata.productimage]);
   query.on('row', function(row){
		flag=1;
	});
    query.on("end", function (result) {
			console.log("insertion success");
			res.end("success");
		
	});
});

module.exports = router;