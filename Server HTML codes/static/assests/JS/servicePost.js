var serviceTimings = []
var serviceDays = []
var isDaySelected = false;
var startHour;
var endHour;

var daysCount = -1;

function loadMianervice(mainServiceUrl) {
	$.getJSON(mainServiceUrl, function (data) {})
		.done(function (data) {
			var t = JSON.parse(jsonEscape(data))
			createSelectOptions(t, "main_service_category", "main_item_name", "main_item_id");
			loadSubServiceDetails();
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("main Item load complete");
		});
}

function loadSubServiceDetails() {
	var mainServiceId = document.getElementById("main_service_category").value;

	if (mainServiceId != 0) {

		var subServiceUrl = "/humane/subItemDetails/?main_item=" + mainServiceId + "&isweb=True&callback=?";

		$.getJSON(subServiceUrl, function (data) {})
			.done(function (data) {
				$("#sub-service-category-one").empty();
				document.getElementById("sub-service-category-one").disabled = false;
				var t = JSON.parse(jsonEscape(data))
				console.log(t)
				createSelectOptions(t, "sub-service-category-one", "sub_item_category_one_name", "sub_item_category_one_id");
				loadSubServiceTwoDetails();
			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("sub Item load complete");
			});

	}
}

function loadSubServiceTwoDetails() {
	var subServiceId = document.getElementById("sub-service-category-one").value;
	if (subServiceId != 0) {

		var subServiceTwoUrl = "/humane/subItemDetailsCategoryTwo/?sub_item_category_one=" + subServiceId + "&isweb=True&callback=?";

		$.getJSON(subServiceTwoUrl, function (data) {})
			.done(function (data) {
			
				$("#sub-service-category-two").empty();
				var t = JSON.parse(jsonEscape(data))
				if (t.length == 0) {
					console.log("sub item empty");
					document.getElementById("sub-service-category-two").disabled = true;

				} else {
					document.getElementById("sub-service-category-two").disabled = false;
					createSelectOptions(t, "sub-service-category-two", "sub_item_category_two_name", "sub_item_category_two_id");
				}

			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("sub Item two load complete");
			});
	}

}


function publishService() {
	description = document.getElementById("service-desc").value
	var startDate = document.getElementById("start-date").value
	var endDate = document.getElementById("end-date").value

	if (description == null || description == "")
		return;

	if (startDate == null || startDate == "")
		return;

	if (endDate == null || endDate == "")
		return;

	var serviceTime = {
		start_time: startHour-1,
		end_time: endHour-1
	}

	serviceTimings[0] = serviceTime

	var $radio = $('input[name=optradio]:checked');
	var id = $radio.attr('id');
	switch (id) {
		case "allDays":
			addServiceDaysToList("all-days");
			break;
		case "weekDays":
			addServiceDaysToList("week-days");
			break;
		case "weekEnds":
			addServiceDaysToList("week-ends");
			break;
	}
	if (DifferenceInDays(new Date(startDate), new Date(endDate)) >= 7)
		if (!isDaySelected) {
			alert("select the service days");
			return;
		}
	var subServiceTwoId = document.getElementById("sub-service-category-two").value
	var serviceDetail = {
		service_start_date: startDate,
		service_end_date: endDate,
		main_service: document.getElementById("main_service_category").value,
		sub_service_category_one: document.getElementById("sub-service-category-one").value,
		sub_service_category_two: (subServiceTwoId!="")?subServiceTwoId:undefined,
		service_text_description: description,
		service_requested_time: serviceTimings,
		service_requested_day: serviceDays

	}
	console.log("service detail post data " + JSON.stringify(serviceDetail))
	$.ajax({
		url: '/humane/serviceDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("success");
		},
		data: JSON.stringify(serviceDetail)

	});
}

function DifferenceInDays(firstDate, secondDate) {
	var days = Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
	return days;
}


function addServicesDayslist(selectedRaido) {
	switch (selectedRaido.id) {
		case "allDays":
			unCheckCheckBoxex("week-days", 5);
			unCheckCheckBoxex("week-ends", 2);
			$("#week-days").removeClass("in");
			$("#week-ends").removeClass("in");
			break;
		case "weekDays":
			unCheckCheckBoxex("all-days", 7);
			unCheckCheckBoxex("week-ends", 2);
			$("#all-days").removeClass("in");
			$("#week-ends").removeClass("in");
			break;
		case "weekEnds":
			unCheckCheckBoxex("all-days", 7);
			unCheckCheckBoxex("week-days", 5);
			$("#all-days").removeClass("in");
			$("#week-days").removeClass("in");
			break;

	}
}

function unCheckCheckBoxex(cbID, noOfCb) {
	for (i = 1; i <= noOfCb; i++)
		$('#' + cbID + "-" + i).prop('checked', false);
}

function addServiceDaysToList(checkBox) {

	for (i = 1; i <= 7; i++) {
		if ($('#' + checkBox + "-" + i).is(":checked")) {
			isDaySelected = true;
			var serviceDay = {
				day: $('#' + checkBox + "-" + i).val()
			}
			serviceDays[++daysCount] = serviceDay
		}

	}

}
