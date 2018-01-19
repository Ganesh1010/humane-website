var organisationDetail = {}
var bankDetails = {}
function editOrgData(data) {
	alert(data.id);
	
	

	switch (data.id) {
		case "orgName":
			if (orgDetails.org_Name != data.value) {
				var org_name = data.value;
				organisationDetail['org_name']= org_name;
				orgEdited=true;
				console.log("changed org name", data.value)
			}
			break;
		
		case "registrationNumber":
			if (orgDetails.org_reg_no != data.value) {
				var reg_no = data.value;
				organisationDetail['org_reg_no']= reg_no;
				orgEdited=true;
				console.log("changed org reg no", data.value)
			}
			break;
			
		case "orgType":	
			if (orgDetails.org_type != data.value) {
				var org_type = data.value;
			    organisationDetail['org_type']= org_type;
				orgEdited=true;
				console.log("changed org type", data.value)
			}
			break;
		
		case "email":	
			if (orgDetails.org_email != data.value) {
				var org_email = data.value;
				organisationDetail['org_email']= org_email;
				orgEdited=true;
				console.log("changed org email", data.value)
			}
			break;
			
		case "street":	
			if (orgDetails.street != data.value) {
				var street = data.value;
				organisationDetail['street']= street;
				orgEdited=true;
				console.log("changed org street", data.value)
			}
			break;
			
		case "city":	
			if (orgDetails.city != data.value) {
				var city = data.value;
				organisationDetail['city']= city;
				orgEdited=true;
				console.log("changed org city", data.value)
			}
			break;
			
		case "state": 	
			if (orgDetails.state != data.value) {
				var state = data.value;
				organisationDetail['state']= state;
				organisationDetail['city']= $('#city').val();
				orgEdited=true;
				console.log("changed org state", data.value)
				console.log("changed org city",$('#city').val())
			}
			break;
			
		case "postalCode":	
			if (orgDetails.postal_code != data.value) {
				var postal_code = data.value;
				organisationDetail['postal_code']= postal_code;
				orgEdited=true;
				console.log("changed org postal code", data.value)
			}
			break;
			
		case "country":	
			console.log("agfukahghaogjoajojsrojsorjyosryorsjyo",data.value)
			if (orgDetails.country != data.value) {
				console.log("agfukahghaogjoajojsrojsorjyosryorsjyo")
				var country = data.value;
				organisationDetail['country']= country;
				orgEdited=true;
				console.log("changed org country", data.value);
				console.log("changed org state", $('#state').val());
				console.log("changed org city",$('#city').val());
			}
			break;
		
		case "mobile":	
			if (orgDetails.mobile != data.value) {
				var mobile = data.value;
				organisationDetail['mobile']= mobile;
				orgEdited=true;
				console.log("changed org mobile", data.value)
			}
			break;
		
		case "description":
			if (orgDetails.org_desc != data.value) {
				var org_desc = data.value;
				organisationDetail['org_desc']= org_desc;
				orgEdited=true;
				console.log("changed org desc", data.value)
			}
			break;
			
		case "count":	
			if (orgDetails.people_count != data.value) {
				var people_count = data.value;
				organisationDetail['people_count']= people_count;
				orgEdited=true;
				console.log("changed org people count", data.value)
			}
			break;
			
		case "facebookLink":
			if (orgDetails.facebook_link != data.value) {
				var facebook_link = data.value;
				organisationDetail['facebook_link']= facebook_link;
				orgEdited=true;
				console.log("changed org fb", data.value)
			}
			break;
			
		case "officialSite":
			if (orgDetails.official_site != data.value) {
				var official_site = data.value;
				organisationDetail['offical_site']= official_site;
				orgEdited=true;
				console.log("changed org official site", data.value)
			}
			break;
			
		case "twitterId":	
			if (orgDetails.twitter_id != data.value) {
				var twitter_id = data.value;
				organisationDetail['twitter_id']= twitter_id;
				orgEdited=true;
				console.log("changed org twitter", data.value)
			}
			break;
			
		case "annualCost":	
			if (orgDetails.annual_cost_for_running != data.value) {
				var annual_cost_for_running = data.value;
				organisationDetail['annual_cost_for_running']= annual_cost_for_running;
				orgEdited=true;
				console.log("changed org annual", data.value)
			}
			break;

	}
	
	
      
}

function editBankData(data) {
	alert(data.id);
	
	

	switch (data.id) {
		case "bankName":
			if (orgDetails.bank_name != data.value) {
				var bank_name = data.value;
				bankDetails['bank_name']= bank_name;
				bankEdited=true;
				console.log("changed bank name", data.value)
			}
			break;
		
		case "ifscCode":
			if (orgDetails.ifsc_code != data.value) {
				var ifsc_code = data.value;
				bankDetails['ifsc_code']= ifsc_code;
				bankEdited=true;
				console.log("changed ifsc_code", data.value)
			}
			break;
			
		case "accountNumber":	
			if (orgDetails.account_number != data.value) {
				var account_number = data.value;
			    bankDetails['account_number']= account_number;
				bankEdited=true;
				console.log("changed account_number", data.value)
			}
			break;
		
		case "branchCode":	
			if (orgDetails.branch_code != data.value) {
				var branch_code = data.value;
				bankDetails['branch_code']= branch_code;
				bankEdited=true;
				console.log("changed branch_code", data.value)
			}
			break;
			
		case "branchName":	
			if (orgDetails.branch_name != data.value) {
				var branch_name = data.value;
				bankDetails['branch_name']= branch_name;
				bankEdited=true;
				console.log("changed branch_name", data.value)
			}
			break;
			
		case "merchantId":	
			if (orgDetails.merchant_id != data.value) {
				var merchant_id = data.value;
				bankDetails['merchant_id']= merchant_id;
				bankEdited=true;
				console.log("changed merchant_id", data.value)
			}
			break;
			
		case "salt": 	
			if (orgDetails.salt != data.value) {
				var salt = data.value;
				bankDetails['salt']= salt;
				bankEdited=true;
				console.log("changed salt", data.value)
			
			}
			break;
			
		case "key":	
			if (orgDetails.key != data.value) {
				var key = data.value;
				bankDetails['key']= postal_code;
				bankEdited=true;
				console.log("changed key", data.value)
			}
			break;
			
		
	}
	
	
      
}

function uploadOrgLogo(){
	
	
 	var formData = new FormData();

 	var file = $('input[name="orgLogo"]').get(0).files[0];
	formData.append("organisation_logo",file);
	
	$.ajax({
		url: '/humane/orgLogo/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		success: function (data) {
			alert("success");
		},
		data: formData,
		contentType: false,
 		processData: false,

	});
}

function loadOrgDetails(){
		$.getJSON("/humane/organisationbankdetail/12/?isweb=true&callback=?", function(data) {

			}).done(function(data) {
				console.log("loaded organisation details", data);
				orgDetails = JSON.parse(jsonEscape(data))


				orgName.val(orgDetails.org_name);
				orgRegNo.val(orgDetails.org_reg_no);
				orgEmail.val(orgDetails.org_email);
				street.val(orgDetails.street);
				city.val(orgDetails.city);
				state.val(orgDetails.state);
				postalCode.val(orgDetails.postal_code);
				country.val(orgDetails.country);
				mobile.val(orgDetails.mobile);
				orgDesc.val(orgDetails.org_desc);
				orgPeopleCount.val(orgDetails.people_count);
				officialSite.val(orgDetails.offical_site);
				facebookLink.val(orgDetails.facebook_link);
				twitterId.val(orgDetails.twitter_id);
				annualCost.val(orgDetails.annual_cost_for_running);

				
				for (var i = 0; i < orgDetails.bank_details.length; i++) {
					accountNumber.val(orgDetails.bank_details[i].account_number);
					ifscCode.val(orgDetails.bank_details[i].ifsc_code);
					bankName.val(orgDetails.bank_details[i].bank_name);
					branchName.val(orgDetails.bank_details[i].branch_name);
					branchCode.val(orgDetails.bank_details[i].branch_code);
					//					merchantId.val(orgDetails.bank_details[i].merchant_id);
					//					salt.val(orgDetails.bank_details[i].salt);
					//					key.val(orgDetails.bank_details[i].key);
					//					

				}

			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("Loaded Organisation list");
			});
		}

function updateOrgDetails(){
	
       	organisationDetail['state']= $('#state').val();
				organisationDetail['city']= $('#city').val();
		console.log("edited org data " + JSON.stringify(organisationDetail));
	$.ajax({
		url: '/humane/editOrganisationDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("success");
		},
		data: JSON.stringify(organisationDetail)

	});
	}

function updateBankDetails(){
	
		console.log("edited  bank data " + JSON.stringify(bankDetails));
	$.ajax({
		url: '/humane/bankDetails/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("success");
		},
		data: JSON.stringify(bankDetails)

	});
	}
