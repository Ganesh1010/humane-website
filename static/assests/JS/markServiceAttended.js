function loadServiceDetail(service) {
	var serviceName = service.sub_service_category_one
	var serviceCategory = service.sub_service_category_two
	if (serviceCategory != null)
		serviceName = serviceName + (" (" + serviceCategory + ")")
	$("#main-service-name").html(serviceName);
	$("#service-start-date").html(new Date(service.service_start_date).toDateString())
	$("#service-end-date").html(new Date(service.service_end_date).toDateString());

	var serviceRequestedTime = service.service_requested_time

	var serviceTimeings = getHourPeriod(serviceRequestedTime[0].start_time) + " to " + getHourPeriod(serviceRequestedTime[0].end_time)
	$("#service-time").html(serviceTimeings);

	var serviceRequestedDay = service.service_requested_day
	if (serviceRequestedDay.length > 0) {
		var serviceDays = "";
		for (i = 0; i < serviceRequestedDay.length; i++) {
			var serviceDayObject = serviceRequestedDay[i]
			serviceDays = serviceDays + days[parseInt(serviceDayObject.day) - 1] + ","
		}
		$("#service-days-value").html(serviceDays);
	} else {
		$("#service-days").hide();
		$("#service-days-value").hide();
	}

	document.getElementById("main-service-icon").setAttribute("src", service.main_service_icon);
}

function loadOrganisationServiceDetail(url,id) {

	$.getJSON(url, function (data) {})
		.done(function (data) {

			var serviceData = $.parseJSON(data)
			
			$("#org-service-detail").show();
			loadServiceDetail(serviceData);
			getServiceInterestedDetails(id);

		})
		.fail(function () {
			$(".loader").hide()
			alert("No Service Detail Found");
			window.location.href = "/html/homePage"
		})
		.always(function () {
			console.log("Service interest details load complete");
		});
}

function getServiceInterestedDetails(id) {
	var url = "/humane/serviceInterestedDetail/?service=" + id + "&isweb=True&callback=?"
	$.getJSON(url, function (data) {})
		.done(function (data) {

			var count = $.parseJSON(data)['count']
			console.log("service count " + count)
			if (parseInt(count) != 0)
				loadServiceInterestExpressedDetails(data);
			else {
				$('.loader').hide();
				$("#service-interest-expressed-card").html("No Interested Detail(s) Found");

			}
			if (count > 10)
				createPagination(count, url, "service_interest_pagination", "#service-interest-expressed-card", 6);
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("Service interest details load complete");
		});
}


function createServiceInterestCard(item) {

	doc = document.createDocumentFragment();

	var serviceInterestCardDiv = document.createElement("div");
	serviceInterestCardDiv.classList.add("card");
	serviceInterestCardDiv.classList.add("col-md-4");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");

	var serviceDateDiv = document.createElement("div");
	serviceDateDiv.className = "pull-right";
	var interestedDateText = getText("Interested Date");

	interestedDateText.setAttribute('style', 'margin-bottom:0px;')
	var interestedDateString = item.service_interest_expressed_date;
	var interestedDate = getLocalDateFormat(interestedDateString);
	interestedDate.className = "text-center";


	var userImgDiv = document.createElement("div");
	userImgDiv.classList.add("media-left");
	userImgDiv.classList.add("media-middle");
	var userIcon = getImage(item.service_user_detail.user_profile_picture);
	userIcon.classList.add("media-object");
	userIcon.classList.add("thumbnail");


	var userDetailDiv = document.createElement("div");
	userDetailDiv.classList.add("media-body");

	var userName = getHeaderText(item.service_user_detail.first_name, 4);
	userName.classList.add("media-heading");

	var mainService = getHeaderText(item.service_detail.main_service, 4);

	var serviceId = document.createElement("h5");
	serviceId.innerHTML = "#000" + item.service_detail.service_id;

	var userEmail = document.createElement("h5");
	userEmail.innerHTML = item.service_user_detail.email;

	var servicingTimeLabel = getText("Servicing time");
	var servicingTimeText = getHourPeriod(item.service_interest_expressed_start_time) + " to " + getHourPeriod(item.service_interest_expressed_end_time);
	var servicingTime = getText(servicingTimeText);



	var attendedButton = document.createElement("button");
	attendedButton.classList.add("btn");
	attendedButton.classList.add("btn-success");
	attendedButton.classList.add("pull-right");
	attendedButton.setAttribute("type", "button");
	attendedButton.setAttribute("data-toggle", "tool-tip");
	attendedButton.setAttribute("title", "Click to mark it as attended");
	attendedButton.setAttribute("data-target", "#");
	attendedButton.innerHTML = "Attended";

	var breakLine = document.createElement("br");
	var startLine = document.createElement("hr");
	var endLine = document.createElement("hr");


	serviceInterestCardDiv.addEventListener('click', function () {

		serviceInterestCardDiv.setAttribute("data-toggle", "modal");
		serviceInterestCardDiv.setAttribute("data-target", "#service-interest-detail-modal");
		orgServiceInterestDetail(item);

	});

	serviceInterestCardDiv.append(startLine);
	serviceDateDiv.append(interestedDateText);
	serviceDateDiv.append(interestedDate);

	userImgDiv.append(userIcon);

	userDetailDiv.append(userName);
	userDetailDiv.append(mainService);
	userDetailDiv.append(serviceId);
	userDetailDiv.append(userEmail);
	userDetailDiv.append(servicingTime)


	cardContentDiv.append(serviceDateDiv);
	cardContentDiv.append(userImgDiv);
	cardContentDiv.append(userDetailDiv);


	serviceInterestCardDiv.append(cardContentDiv);
	if (!item.is_interest_expressed_satisfied)
		serviceInterestCardDiv.append(attendedButton);
	serviceInterestCardDiv.append(breakLine);
	serviceInterestCardDiv.append(endLine);

	doc.appendChild(serviceInterestCardDiv);

	document.getElementById("service-interest-expressed-card").appendChild(doc);


}


function orgServiceInterestDetail(itemDetail) {
	$('#user_name').html(itemDetail.service_user_detail.first_name);
	$('#user_email').html(itemDetail.service_user_detail.email);
	$('#main_service').html(itemDetail.service_detail.main_service);
	$('#sub_category_one').html(itemDetail.service_detail.sub_service_category_one);
	$('#sub_category_two').html(itemDetail.service_detail.sub_service_category_two);
	$('#user_mobile').html(itemDetail.service_user_detail.country_code + " " + itemDetail.service_user_detail.mobile);
	$('#service_id').html("#000" + itemDetail.service_detail.service_id);
	$('#user_image').attr("src", itemDetail.service_user_detail.user_profile_picture);
	var promisedDate = getLocalDateFormat(itemDetail.service_interest_expressed_date);
	$('#user_interest_expressed_date').html(promisedDate);

	var servicingTimeText = getHourPeriod(itemDetail.service_interest_expressed_start_time) + " to " + getHourPeriod(itemDetail.service_interest_expressed_end_time);
	var servicingTime = getText(servicingTimeText);

	$('#servicing_time').html(servicingTime);

	if (!itemDetail.is_interest_expressed_satisfied) {

		$('#attended_btn').show();
		$('#attended_btn').click(function () {
			console.log("service interest marked as attended id", itemDetail.service_interested_id)
			makeServiceAttended(itemDetail.service_interested_id)
		});
	} else
		$('#attended_btn').hide();
}

function makeServiceAttended(serviceInterestId) {
	var serviceInterestedId = {
		service_interested_id: serviceInterestId
	}
	console.log("donation item id", JSON.stringify(serviceInterestedId));
	$.ajax({
		beforeSend: function () {
			if ($('#service-interest-detail-modal').is(':visible'))
				$('#service-interest-detail-modal').modal('toggle');

			$(".loader").show();
		},
		url: '/humane/satisfyServiceInterestExpressed/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			location.reload();
		},
		error: function (response) {
			console.log("response while making service satisfied " + response)

		},
		data: JSON.stringify(serviceInterestedId)

	});
}

function loadServiceInterestExpressedDetails(data) {
	var t = $.parseJSON(data)['results']
	$.each(t, function (key, value) {
		createServiceInterestCard(value);
		$(".loader").hide()
	});
}

function closeService(serviceId) {
	var serviceId = {
		service_id: serviceId
	}

	$.ajax({
		beforeSend: function () {
			$(".loader").show();
		},
		url: '/humane/serviceCompletion/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			window.location.href = "/html/homePage";
		},
		error: function (response) {
			console.log("response while closing service " + response)
			$(".loader").hide();

		},
		data: JSON.stringify(serviceId)

	});

}
