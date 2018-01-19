	function getAddress() {
		
	
		var address = $("#address").val();
		alert(address);
		
		var latitude = $("#latitude").val();
		var longitude = $('#longitude').val();
		if(address!=""){
		var addressArray = address.split(",")
		
		var country = addressArray[addressArray.length-1];
		$('#country').val(country);
		
		var countryCaps = $.trim($("#country").val().toUpperCase());
		console.log("country",countryCaps);
	
		var stateCode = addressArray[addressArray.length-2];
		var stateArray = stateCode.split(" ");
		var stateName;
		var postalCode;
		console.log("state",stateArray);
		var isPostalCode = stateArray.pop();
			console.log("is postal code",isPostalCode);
		if((/\d/.test(isPostalCode))){
		   postalCode = isPostalCode;
		   stateName = stateCode.substring(0,stateCode.lastIndexOf(" "));
		   }
		else{
		   stateName = stateCode.substring(0,stateCode.lastIndexOf(" "))+" "+isPostalCode;
		}
		console.log("state name",stateName);
		console.log("postal code",postalCode);
		
		$('#state').val(stateName);
		var stateCaps = $.trim($("#state").val().toUpperCase());
		console.log("state Name",stateCaps);
		
		
		var cityName = addressArray[addressArray.length-3]
		$('#city').val(cityName);
		var cityCaps  =  $.trim($("#city").val().toUpperCase());
		console.log("city Name",cityCaps);
		
		for(var i=0; i<3;i++)
			addressArray.pop();
		
		var street =  addressArray.join();
		console.log("street",street);
		console.log("address array ",addressArray);
		
		$('#street').val(street);
		$('#postalCode').val(postalCode);
		$('#latitude').val(latitude);
		$('#longitde').val(longitude);
		
	
		if (countryCaps != "INDIA" || stateCaps != "TAMIL NADU" || cityCaps != "CHENNAI"){
			alert("Service is currently available in Chennai, India");
			
			$('#address').val(" ");
			$('#searchAddress').val(" ");
			
			$('#location').addClass("hidden");
			
		}else{
		
			$('#location').removeClass("hidden");
		}
		}
		
	}



function postOrganisationRegisteredDetails() {
 	var orgName = $('#orgName').val();
 	var orgRegNo = $('#registrationNumber').val();
 	var orgType = $('#orgType').val();
 	var orgEmail = $('#email').val();
	var latitude = $('#latitude').val();
	var longitude = $('#longitude').val();
 	var street = $('#street').val();
 	var city = $('#city').val();
 	var state = $('#state').val();
 	var postalCode = $('#postalCode').val();
 	var country = $('#country').val();
 	var mobile = $('#mobile').val();
 	var orgDesc = $('#description').val();
 	var bankName = $('#bankName').val();
 	var accountNumber = $('#accountNumber').val();
 	var ifscCode = $('#ifscCode').val();
 	var branchCode = $('#branchCode').val();
 	var branchName = $('#branchName').val();
 	var merchantId = $('#merchantId').val();
 	var salt = $('#salt').val();
 	var key = $('#key').val();
 	var orgPeopleCount = $('#count').val();
 	var officialSite = $('#officialSite').val();
 	var facebookLink = $('#facebookLink').val();
 	var twitterId = $('#twitterId').val();
 	var annualCost = $('#annualCost').val();
 	var name = $('#personName').val();
 	var personEmail = $('#personEmail').val();
 	var personMobile = $('#personMobile').val();

  	var bankDetails = [];
	
 	var bankAccountCount = -1;
	
 	var bankAccountDetails = {
 		ifsc_code: ifscCode,
 		bank_name: bankName,
 		branch_name: branchName,
 		account_number: accountNumber,
 		branch_code: branchCode,
 		merchant_id: merchantId,
 		salt: salt,
 		key: key,
 	}
		bankDetails[++bankAccountCount] = bankAccountDetails;

 	var userDetails = [];
 	var userCount = -1;
	
  
 	var orgUserDetails = {
 		first_name: name,
 		email: personEmail,
 		mobile: personMobile,
 	}

 	userDetails[++userCount] = orgUserDetails;
	
 	
	var orgDetails = {
		
		org_reg_no:orgRegNo,
		org_name:orgName,
		org_email:orgEmail,
		mobile:mobile,
		org_type:orgType,
		org_desc:orgDesc,
		latitude:latitude,
		longitude:longitude,
		state:state,
		street:street,
		city:city,
		country:country,
		postal_code:postalCode,
		people_count:orgPeopleCount, 
		offical_site:officialSite,
		facebook_link:facebookLink,
		twitter_id:twitterId,
	    annual_cost_for_running:(annualCost == null ? annualCost : undefined),
		bank_detailss:bankDetails,
		users:userDetails,
		}
 	
	console.log("org details",JSON.stringify(orgDetails));
	
	
 	$.ajax({
 		url: '/humane/orgDetailRegister/',
 		type: 'post',
 		headers: {
 			"X-CSRFToken": getCookie("csrftoken")
 		},
 		dataType: 'json',
		contentType: "application/json; charset=utf-8",
 		success: function (data) {
			$('#personEmail').removeClass("redBorder");
 			alert("success");
 		},
		error:function(response){
var error = jQuery.parseJSON(response.responseText)

$('#person-detail-panel-hidden').show();
$('#personEmail').attr("placeholder",error.Error);
$('#personEmail').val('');
$('#personEmail').addClass("redBorder");
$('#personEmail').focusin();
   alert("Message: " + error.Error+" .Register with new user email !");
},
		fail:function(data){
		 console.log("fail data",data);
		},
 		
 		data:  JSON.stringify(orgDetails)
	
 	});
 }