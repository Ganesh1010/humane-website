function loadVolunteerDonationDetails(url) {
    $('.loader').show();
    $.getJSON(url, function (data) {})
        .done(function (data) {

            var count = $.parseJSON(data)['count']
            console.log("service count " + count)
            if (parseInt(count) != 0)
                loadvolRequiredDetails(data);
            else {
                $('.loader').hide();
                //document.getElementById("servicetab").innerHTML = "No Service Found";
            }
            if (count > 10)
                createPagination(count, url, "donation-pagination", "#vol-donation-table", 5);
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("vol donation detail load complete");
        });

}
var count = -1;
var donationIdList = []

function loadvolRequiredDetails(data) {
    var t = JSON.parse(jsonEscape(data))['results']
    $.each(t, function (key, value) {
        var donationId = value.donation_id
        donationIdList[++count] = donationId
        var donorName = value.donating_user.first_name
        var promisedDate = value.promised_date
        var orgNameAddress = value.organisation.org_name + ", " + value.organisation.city
        var address = value.pickup_address
        console.log("address.street " + address)
        var pickupAddress = address.door_no + ", " + address.street + ", " + address.city + ", " + address.state + ", " + address.country + "- " + address.pincode
        var country_code = value.donating_user.country_code
        var mobile = value.donating_user.mobile
        var donorMobile = ((country_code != null && country_code != "") ? country_code : "") + " " + ((mobile != null && mobile != "") ? mobile : "-")
        var donorEmail = value.donating_user.email
        var date = new Date(promisedDate).toDateString();
        var orgMobile = value.organisation.mobile

        var row = createPickupLocationRow(donationId, donorName, donorEmail, donorMobile, orgNameAddress, orgMobile, date, pickupAddress);
        console.log("row " + date);

        var tableContent = document.createDocumentFragment();
        tableContent.appendChild(row);
        document.getElementById("vol-donation-table").append(tableContent);
	
    });
	
	 var volunteerDetailUrl = "/appAdmin/volunteerDetail/?callback=?";
        loadVolunteerDetail(volunteerDetailUrl);
}

function loadVolunteerDetail(url) {
    $.getJSON(url, function (data) {})
        .done(function (data) {
            console.log(data)
            loadVolunteerDropdown(data)
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("vol donation detail load complete");
        });

}


function createPickupLocationRow(string1, string2, string3, string4, string5, string6, string7, string8) {
    var row = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');

    td1.classList.add("media-heading");
    td1.classList.add("text-center");

    td2.classList.add("media-heading");
    td2.classList.add("text-center");

    td3.classList.add("media-heading");
    td3.classList.add("text-center");

    td4.classList.add("media-heading");
    td4.classList.add("text-center");

    td5.classList.add("media-heading");
    td5.classList.add("text-center");

    td6.classList.add("media-heading");
    td6.classList.add("text-center");

    td7.classList.add("media-heading");
    td7.classList.add("text-center");

    td8.classList.add("media-heading");
    td8.classList.add("text-center");

    td9.classList.add("text-center");

    var volDiv = document.createElement("select");
    volDiv.setAttribute("id", string1)
    volDiv.setAttribute("name", "vol" + string1)
    volDiv.addEventListener("change", function () {
		
		var r=confirm("Assign Volunteer? ");
		if (r==true)
		{
			assignVolunteer(this)
			//alert("You pressed OK!");
		}
		else
		{
			$("#new-goods-form")[0].reset()
			//alert("You pressed Cancel!");
		}
      
    })

    td1.appendChild(document.createTextNode(string1));
    td2.appendChild(document.createTextNode(string2));
    td3.appendChild(document.createTextNode(string3));
    td4.appendChild(document.createTextNode(string4));
    td5.appendChild(document.createTextNode(string5));
    td6.appendChild(document.createTextNode(string6));
    td7.appendChild(document.createTextNode(string7));
    td8.appendChild(document.createTextNode(string8));
    td9.appendChild(volDiv);

    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
    row.append(td5);
    row.append(td6);
    row.append(td7);
    row.append(td8);
    row.append(td9);

    return row;
}

function loadVolunteerDropdown(volunteers) {
    console.log("donation id length " + donationIdList.length)
    var t = JSON.parse(jsonEscape(volunteers))
    for (k = 0; k < donationIdList.length; k++) {
        console.log("donationIdList[i] ", donationIdList[k])

        createVolSelectOptions(t, donationIdList[k], "volunteer", "volunteer_id", "Select Volunteer");

    }
    $(".loader").hide()
}


function createVolSelectOptions(t, div, name, value, default_text) {
    selectOptionDiv = document.createDocumentFragment();

    for (i = -1; i < t.length; i++) {
        var option = document.createElement("option");
        if (i == -1) {
            option.setAttribute("value", "");
            option.innerHTML = default_text;
            option.setAttribute("selected", "selected")
            option.disabled = true;

        } else {
            option.setAttribute("value", t[i][value]);
            option.innerHTML = t[i][name].email;
        }

        selectOptionDiv.append(option);
    }
    document.getElementById(div).append(selectOptionDiv);

}

function assignVolunteer(id) {
    var selectedDonationId = id.id
    var donationId = parseInt(selectedDonationId)
    var volunteerId = parseInt(id.value);


    var data = {
        "volunteer": volunteerId,
        "donation": donationId
    }
    
    console.log("data to post ",JSON.stringify(data))
   
    $.ajax({
		beforeSend: function () {
		},
		url: '/appAdmin/volDonationAssignedDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			
			alert("success")
			location.reload();
		},
		error: function (response) {
			console.log("response while assigning vol " + response.error)
			
		},
		data: JSON.stringify(data)

	});
}
