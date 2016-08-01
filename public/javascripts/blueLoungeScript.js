var blueLoungeApp=angular.module("BlueLoungeApp", ["ngRoute","angularUtils.directives.dirPagination"]);

blueLoungeApp.config(function($routeProvider){
	$routeProvider.when("/products", {
		templateUrl: "templates/products.htm",
		controller: "productsController"
	}).when("/frgtpwd", {
		templateUrl: "templates/forgotPwd.htm"
	}).when("/signup", {
		templateUrl: "templates/signup.htm",
		controller: "signupController"
	}).when("/login", {
		templateUrl: "templates/login.htm",
		controller: "loginController"
	}).when("/adminLogin", {
		templateUrl: "templates/admin_login.htm",
		controller:"adminLoginController"
	}).when("/adminPanel", {
		templateUrl: "templates/admin_panel.htm",
		controller:"adminPanelController"
	}).when("/default", {
		templateUrl: "templates/default.htm"
	}).otherwise({
		templateUrl: "templates/default.htm"
	});
});

blueLoungeApp.controller("blueLoungeController",["$scope","$location","$rootScope", function($scope,$location,$rootScope){
	$rootScope.headerUrl = "templates/header.htm";
	$scope.footerUrl = "templates/footer.htm";
	$rootScope.loginCheck = false;
	$rootScope.adminLoginCheck = false;
	$scope.showPage = function(viewName) {
		if (viewName == 'products') {
		  	if($rootScope.loginCheck == true){
		  		$location.url("/products");
		  	}else{
		  		swal("Oops...", "Please login or signup first", "error");
		  		$location.url("/login");
		  	}	
		} else if (viewName == 'frgtpwd') {
			$location.url("/frgtpwd");
		} else if(viewName == 'signup'){
			$location.url("/signup");
		} else if(viewName == 'login'){
			$location.url("/login");
		} else if(viewName == 'adminLogin'){
			$location.url("/adminLogin");
		} else if(viewName == 'adminPanel'){
			if($rootScope.adminLoginCheck == true){
		  		$location.url("/adminPanel");
		  	}else{
		  		swal("Oops...", "Please login as admin", "error");
		  		$location.url("/adminLogin");
		  	}
		} else if(viewName == 'logout'){
			$location.url("/default");
		}
	};

	$scope.ShowAlert = function(){
		swal({
				title: "An Email Sent Successfully!",
				text: "Check your email to resetpassword",
				timer: 1000
			});
	}

	$scope.showLogoutPage = function(viewName){
	    $rootScope.headerUrl = "templates/header.htm";
	    if(viewName == 'logout'){
	    		$rootScope.loginCheck = false;
			$location.url("/");
	    }
	}

	$scope.AdminLogoutPage = function(viewName){
	   $rootScope.headerUrl = "templates/header.htm";
	   if(viewName == 'logout'){
	   	$rootScope.adminLoginCheck = false;
		$location.url("/");
	    }
	}
}]);

blueLoungeApp.controller("signupController",["$scope","$http","$location","$rootScope",function($scope,$http,$location,$rootScope){
	$scope.SubmitUserData = function(){
		$scope.userData = {
			email:$scope.email,
			username:$scope.username,
			password:$scope.password,
			phoneNumber:$scope.phoneNumber
		};
		$scope.loader = true;
		$http({
		        url: '/signup/signupdata',
		        method: "POST",
		        data: $scope.userData
		    })
		    .then(function(data) {
		    	//console.log(data.data);
		    	$scope.loader = false;
		          if(data.data == 'success')
				  {
				  	$scope.loader = false;
					swal({
						  title: "Registration Successfull!",
						  text: "Please login to continue shopping",
						  timer: 1000
						});
					$location.url("/login");

				}else if(data.data=='fail'){
					$scope.loader = false;
					swal("Oops...", "Registration Unsuccessfull", "error");
				}  
		    }, 
		    function(error) {
		    		$scope.loader = false;
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
	}
}]);

blueLoungeApp.controller("loginController",["$scope","$http","$location","$rootScope",function($scope,$http,$location,$rootScope){
	$scope.loginAuth = function(){
		$rootScope.userData = {
			username:$scope.username,
			password:$scope.password
		};
		$scope.loader = true;
		 $http({
		        url: '/login/logindata',
		        method: "POST",
		        data: $rootScope.userData
		    })
		    .then(function(data) {
		    	$scope.loader = false;
		    	//console.log(data.data+"test");
		          if(data.data == 'success')
				{
					$rootScope.loginCheck = true;
					$rootScope.loggedUser = $scope.username;
					console.log($rootScope.loggedUser);
					swal("Good job!", "Login Successfull!", "success");
		  			
		  			console.log("url changed");
		  			$rootScope.headerUrl="templates/loginHeader.htm";
					$location.url("/products");

				}else if(data.data=='fail'){
					swal("Oops...", "Invalid username & password", "error");
				}  
		    }, 
		    function(error) {
		    		$scope.loader = false;
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
	}
}]);


blueLoungeApp.controller("productsController",["$scope","$http","$location","$rootScope",function($scope,$http,$location,$rootScope){
	$scope.productsData="";
	$scope.getAllProducts = function(){
		$scope.loader = true;
		$http.get('/userProducts').success(function (data){
				console.log(data);
        		$scope.productsData = data;
        		console.log($scope.productsData.length);
				$scope.loader = false;
				$scope.categoryMenu = true;
				$scope.productDisplay = true;
				$scope.category = false;
    		});
	}

    $scope.ShowDetails = function(pid){
		$scope.ProductItemDetails = [];
		$scope.productDisplay = false;
		$scope.category = false;
		$scope.ProductDetails = true;
		$scope.index = 0;
		
		for(var i=0;i<$scope.productsData.length;i++){
			if($scope.productsData[i].pid == pid){
				$scope.ProductItemDetails[$scope.index] = $scope.productsData[i];
				$scope.index++;
			}
		}
		console.log($scope.ProductItemDetails);
	}	
	
	$scope.ShowCategory = function(category){
		$scope.ProductCategory = category;
		$scope.productDisplay = false;
		$scope.category = true;
		$scope.ProductDetails = false;
		$scope.FilterData = [];
		$scope.index = 0;
		$scope.DataErr = false;
		$scope.DataSuccess = false;
		for(var i=0;i<$scope.productsData.length;i++){
			if($scope.productsData[i].productcategory == category){
				$scope.FilterData[$scope.index] = $scope.productsData[i];
				$scope.index++;
			}
		}
		if($scope.FilterData.length<=0){
			$scope.DataErr = true;;
			$scope.NoData="Sorry No Products Available for "+category+" :(";
		}else{
			$scope.DataSuccess = true;
		}
		//console.log($scope.FilterData);
	}
	$scope.Back = function(){
		$scope.productDisplay = true;
		$scope.category = false;
		$scope.ProductDetails = false;
		$scope.getAllProducts();
	}
	
}]);

blueLoungeApp.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('data-zoom-image',attrs.zoomImage);
      $(element).elevateZoom();
    }
  };
});

$( document ).ready(function() {
    $('#native').elevateZoom();
});

blueLoungeApp.controller("adminLoginController",["$scope","$http","$location","$rootScope",function($scope,$http,$location,$rootScope){
	$scope.adminLoginAuth = function(){
		$scope.adminData = {
			adminname:$scope.admin_name,
			password:$scope.admin_password
		};
		$scope.loader = true;
		$http({
		        url: '/adminLogin/adminLoginData',
		        method: "POST",
		        data: $scope.adminData
		    })
		    .then(function(data) {
		    	//console.log(data.data);
		    	$scope.loader = false;
		          if(data.data == 'success')
				 {
					$rootScope.adminLoginCheck = true;
					$rootScope.loggedAdmin = $scope.admin_name;
					swal("Good job!", "Login Successfull!", "success");
					$rootScope.headerUrl="templates/AdminLoginHeader.htm";
					$location.url("/adminPanel");

				}else if(data.data=='fail'){
				     $scope.loader = false;
					swal("Oops...", "Invalid Credintials", "error");
				}else if(data.data=='connectionFail'){
					swal("Oops...", "Error while communicating with the server", "error");
				}  
		    }, 
		    function(error) {
		    		$scope.loader = false;
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
	}
}]);

blueLoungeApp.controller("adminPanelController",["$scope","$http",function($scope,$http){
	$(".dashBoardContainer").tabs({
				active: 0,
				event: "click",
				show: {"effect": "slideDown", duration: 500},
				hide: {"effect": "slideUp", duration: 500}
	});
	$scope.addVendor = true;
	$scope.allVendors = false;
	$scope.addProduct = true;
	$scope.allProducts = false;
	$scope.InsertVendor = function(){
		$scope.vendorData = {
			vid:$scope.vendorID,
			vname:$scope.vendorName,
			vloc:$scope.vendorLoc
		};
		$.post("/vendor/vendorData",$scope.vendorData, function(data){
				//console.log(data);
				if(data=='success')
				{
					$scope.vendorID="";
					$scope.vendorName="";
					$scope.vendorLoc="";
					swal({
						  title: "Vendor Added Successfully!",
						  text: "Check the vendor list",
						  timer: 1000
						});
					ShowVendor();

				}else if(data=='fail'){
					swal("Oops...", "Something went wrong please try again", "error");
				}
		});
	}

	$scope.ShowVendor = function(){
		$scope.addVendor=false;
		$scope.loader = true;
		$scope.allVendors=false;
		$scope.editVendor = false;
		$http.get('/vendor').success(function (data){
			console.log(data.length);
			    $scope.loader = false;
				$scope.allVendors=true;
        		$scope.vendorData = data;
        		var len = $scope.vendorData.length;
        		var height = (len*90+160);
        		height = parseInt(height);
				if(height<650){
					$(".mainContainer").css("height","650px");
				}else{
					$(".mainContainer").css("height",height);
				}
        		//console.log("success");
    		});
	}

	$scope.GetVendor = function(){
		$http.get('/vendor').success(function (data){
        		$scope.vendorData = data;
        		//console.log("success");
    		});
		$(".mainContainer").css("height","800px");	
	}

	$scope.EditVendor = function(vid){
			$scope.allVendors=false;
			$scope.editVendor = true;
			$(".mainContainer").css("height","650px");
			$scope.editVendorDataById = {};
			$scope.editVendorDataById.vid = vid;
			$http({
			        url: '/editvendor/getVendorDataById',
			        method: "POST",
			        data: $scope.editVendorDataById
			    })
			    .then(function(data) {
			        $scope.editVendorData = data.data; 
			        //console.log($scope.editVendorData);
			        $scope.EditvendorID = $scope.editVendorData.vid;
			        $scope.EditvendorName = $scope.editVendorData.vname;
			        $scope.EditvendorLoc = $scope.editVendorData.vlocation;
			    }, 
			    function(error) {
			            swal("Oops...", "Error while communicating with the server", "error");
			    });

	}

	$scope.SaveEditVendor = function(vid){
		$scope.updateVendorData = {};
		$scope.updateVendorData.vid = vid;
		$scope.updateVendorData.vname = $scope.EditvendorName;
		$scope.updateVendorData.vlocation = $scope.EditvendorLoc;
		//console.log($scope.updateVendorData);
		$.post("/editvendor/updateVendorDataById",$scope.updateVendorData, function(data){
				//console.log(data);
				if(data=='success')
				{		
					swal({
						  title: "Product Updated Successfully!",
						  text: "Check the vendor list",
						  timer: 1000
						});

				}else if(data=='fail'){
					swal("Oops...", "Something went wrong please try again", "error");
				}
		});
	}

	$scope.DeleteVendor = function(vid){
			//console.log(vid);
		swal({
		  title: "Are you sure?",
		  text: "You want to delete this vendor!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: false
		},
		function(){
		  $scope.deleteVendorDataById = {};
		  $scope.deleteVendorDataById.vid = vid;
		  $http({
		        url: '/editvendor/deleteVendorDataById',
		        method: "POST",
		        data: $scope.deleteVendorDataById
		    })
		    .then(function(data) {
		    	console.log(data);
		    	if(data.data =="success"){
		    		swal("Deleted!", "Vendor has been deleted!.", "success");
		    		$scope.ShowVendor();
		    	}else{
		    		swal("Oops...", "Unable to delete this product", "error");
		    	}
		    }, 
		    function(error) {
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
		});
	}

	$scope.Back = function(){
		$(".mainContainer").css("height","650px");
		$scope.addVendor=true;
		$scope.allVendors=false;
		$scope.editVendor = false;
	}

	$scope.productData = {};
	$("#pImage").on("change",function(){
		  var preview = document.querySelector('.ProductsContainer img');
		  var file    = document.querySelector('input[type=file]').files[0];
		  var reader  = new FileReader();

		  reader.addEventListener("load", function () {
		    preview.src = reader.result;
		    $(".mainContainer").css("height","800px");
		    //console.log(reader.result);
		    $scope.productData.pImage = reader.result;
		  }, false);

		  if (file) {
		    reader.readAsDataURL(file);
		  }
	});
	$scope.AddProduct = function(){
		$scope.productData.pname = $scope.productName;
		$scope.productData.pcategory = $scope.productCategory;
		$scope.productData.pvendor = $scope.productVendor;
		$scope.productData.price = $scope.ProductPrice;
		$scope.productData.pmanufacture = $scope.ProductManufacture;
		$scope.productData.pdescription = $scope.ProductDescription;
		console.log($scope.productData);
		$.post("/products/productsData",$scope.productData, function(data){
				console.log(data);
				if(data=='success')
				{
					$scope.productName="";
					$scope.productCategory="";
					$scope.productVendor="";
					$scope.ProductPrice="";
					$scope.ProductManufacture="";
					$scope.ProductDescription="";
					$("#pImage").val("");
					$("Preview").src = "noImg.jpg";
					swal({
						  title: "Product Added Successfully!",
						  text: "Check the products table",
						  timer: 1000
						});

				}else if(data=='fail'){
					swal("Oops...", "Something went wrong please try again", "error");
				}
		});
	}

	$scope.ViewAllProducts = function(){
		$scope.addProduct = false;
		$scope.editProduct = false;
		$scope.loader = true;
		$http.get('/products').success(function (data){
        		$scope.productsData = data;
        		console.log($scope.productsData.length);
        		var len = $scope.productsData.length;
        		var height = (len*100+160);
        		height = parseInt(height);
        		if(height<650){
					$(".mainContainer").css("height","650px");
				}else{
					$(".mainContainer").css("height",height);
				}
        		$scope.allProducts = true;
				$scope.loader = false;
        		//console.log("products render success");
    		});
	}
	$scope.EditProduct = function(pid){
		$scope.addProduct = false;
		$scope.allProducts = false;
		$scope.editProduct = true;
		//console.log(pid);
		var preview = document.querySelector('.EditProductsContainer img');
		$scope.editProductDataById = {};
		$scope.editProductDataById.pid = pid;
		$http({
		        url: '/editproduct/getProductDataById',
		        method: "POST",
		        data: $scope.editProductDataById
		    })
		    .then(function(data) {
		    	$(".mainContainer").css("height","800px");
		        $scope.editProductData = data.data;
		        $scope.epid = $scope.editProductData.pid;
		        $scope.editProductName = $scope.editProductData.productname;
		        $scope.editProductCategory = $scope.editProductData.productcategory;
		        $scope.editProductVendor = $scope.editProductData.productvendor;
		        $scope.editProductPrice = $scope.editProductData.productprice;
		        $scope.editProductManufacture = $scope.editProductData.productmanufacture;
		        $scope.editProductDescription = $scope.editProductData.productdescription;
		        preview.src = $scope.editProductData.productimage;
		    }, 
		    function(error) {
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
	}

	$scope.updateProductData = {};
	$("#editImage").on("change",function(){
		  var preview = document.querySelector('.EditProductsContainer #eImg');
		  var file    = document.querySelector('.EditProductsContainer input[type=file]').files[0];
		  var reader  = new FileReader();
		  console.log("image changed");
		  preview.src = "";
		  reader.addEventListener("load", function () {
		  	$(".mainContainer").css("height","800px");
		    preview.src = reader.result;
		    //console.log(reader.result);
		    $scope.updateProductData.editImage = reader.result;
		  }, false);

		  if (file) {
		    reader.readAsDataURL(file);
		  }
	});

	$scope.SaveEditProduct = function(epid){
		//console.log(epid);
		$scope.updateProductData.pid = epid;
		$scope.updateProductData.pname = $scope.editProductName;
		$scope.updateProductData.pcategory = $scope.editProductCategory;
		$scope.updateProductData.pvendor = $scope.editProductVendor;
		$scope.updateProductData.price = $scope.editProductPrice;
		$scope.updateProductData.pmanufacture = $scope.editProductManufacture;
		$scope.updateProductData.pdescription = $scope.editProductDescription;
		if(!$scope.updateProductData.editImage){
			var preview = document.querySelector('.EditProductsContainer #eImg');
			$scope.updateProductData.editImage = preview.src;
		}
		//console.log($scope.updateProductData);
		$.post("/editproduct/updateProductDataById",$scope.updateProductData, function(data){
				//console.log(data);
				if(data=='success')
				{	
					$("#eImg").src="noImg.jpg";
					swal({
						  title: "Product Updated Successfully!",
						  text: "Check the products table",
						  timer: 1000
						});

				}else if(data=='fail'){
					swal("Oops...", "Something went wrong please try again", "error");
				}
		});
	}
	$scope.DeleteProduct = function(pid){
		//console.log(pid);
		swal({
		  title: "Are you sure?",
		  text: "You want to delete this product!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: false
		},
		function(){
		  $scope.deleteProductDataById = {};
		  $scope.deleteProductDataById.pid = pid;
		  $http({
		        url: '/deleteproduct/deleteProductDataById',
		        method: "POST",
		        data: $scope.deleteProductDataById
		    })
		    .then(function(data) {
		    	//console.log(data);
		    	if(data.data =="success"){
		    		swal("Deleted!", "Product has been deleted!.", "success");
		    		$scope.ViewAllProducts();
		    	}else{
		    		swal("Oops...", "Unable to delete this product", "error");
		    	}
		    }, 
		    function(error) {
		            swal("Oops...", "Error while communicating with the server", "error");
		    });
		});
	}
	$scope.BackProducts = function(){
		$scope.addProduct = true;
		$scope.allProducts = false;
		$scope.editProduct = false;
		$(".mainContainer").css("height","650px");
		$("#eImg").src="noImg.jpg";
		$("#Preview").src="noImg.jpg";
	}
}]);