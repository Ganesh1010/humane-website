(function() {
	'use strict';

	if (window.FormData) {
		FormData.prototype.appendObject = function (obj, namespace) {

			// EXAMPLE:
			// var person = { name: 'some name', age: 87 };
			// var fd = new FormData();
			// fd.appenObject(obj, 'person');

			// This appends the keys of the object like this:
			// fd.append('person[name]', 'some name');
			// fd.append('person[age]', 87);

			var keyName;
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					keyName = [namespace, '[', key, ']'].join('');
					this.append(keyName, obj[key]);
				}
			}
		}
		
	}
})();
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	console.log("csrf token " + cookieValue)
	return cookieValue;
}

function createSelectOptions(t, div , name, value) {
selectOptionDiv = document.createDocumentFragment();

for (i=0;i<t.length;i++){
var option = document.createElement("option");
option.setAttribute("value",t[i][value]);
option.innerHTML = t[i][name];

selectOptionDiv.append(option);
}
document.getElementById(div).append(selectOptionDiv);

}


function getDropDownList(list,selectId,id,text){
	
	
	for(var i=0;i<list.length;i++){
		var option = document.createElement('option');
		option.setAttribute("value",list[i][id]);
		console.log("list id method",list[i][id]);
		option.text = list[i][text];
		console.log("list text method",list[i][text]);
		document.getElementById(selectId).appendChild(option);
		
	}
}

function getStateList(){
        var countryId = document.getElementById("country").value;
		
		$.getJSON("/humane/stateDetail/?country_id="+countryId+"&isweb=true&callback=?", function(data) {

				}).done(function(data) {
				console.log("data",data);
								console.log("select country id",countryId);
								var stateList =  JSON.parse(jsonEscape(data))
								console.log("select state list and  id",stateList);
					$('#state').empty();

					getDropDownList(stateList,'state','state_id','state_name');
					getCityList();
					
					
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("Loaded country detail list");
				});
		
}

function getCityList(){
	var stateId = document.getElementById("state").value;
	$('#city').empty();
	if(stateId!=""){
		$.getJSON("/humane/cityDetail/?state_id="+stateId+"&isweb=true&callback=?", function(data) {

				}).done(function(data) {
				console.log("data",data);
								console.log("select state id ",stateId +"sgsr");
								var cityList =  JSON.parse(jsonEscape(data));
								console.log("city list",cityList);
								
					getDropDownList(cityList,'city','city_id','city_name');
					
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("Loaded city detail list");
				});
	}
}

function getCountryList(){
		$.getJSON("/humane/countryCodeDetails/?isweb=true&callback=?", function(data) {

				}).done(function(data) {
				console.log("data",data);
								
								var countryList =  JSON.parse(jsonEscape(data));
								$('#country').empty();
								getDropDownList(countryList,'country','country_code_id','country_name');
								getStateList();
					//getCountryList(countryList,selectCountryId,'country_code_id','country_code','country_name','country_flag');
					
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("Loaded country detail list");
				});
		}

function postOrganisationRegisteredDetails() {
 	var orgName = $('#orgName').val();
 	var orgRegNo = $('#registrationNumber').val();
 	var orgType = $('#orgType').val();
 	var orgEmail = $('#email').val();
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
		org_type:orgType,
		org_desc:orgDesc,
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
			
 			alert("success");
 		},
		fail:function(data){
		 console.log("fail data",data);
		},
 		
 		data:  JSON.stringify(orgDetails)
	
 	});
 }