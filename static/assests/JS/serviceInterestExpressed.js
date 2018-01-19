var startHour;
var endHour;

function getServiceDetails(data) {

	var serviceDetails = JSON.parse(jsonEscape(data))
	console.log("Service detail", data);
	var organisationDetail = JSON.parse(jsonEscape(data))['service_org_detail']
	document.getElementById("org-name").innerHTML = organisationDetail.org_name;
	document.getElementById("service-desc").innerHTML = serviceDetails.service_text_description;
	document.getElementById("org-address").innerHTML = organisationDetail.city + " - " + organisationDetail.postal_code;
	document.getElementById("org-contact").innerHTML = organisationDetail.mobile;
	document.getElementById("org-logo").setAttribute("src", organisationDetail.org_logo);

	document.getElementById("main-service-img").setAttribute("src", serviceDetails.main_service_icon);
	var mainService = serviceDetails.sub_service_category_one;
	if (serviceDetails.sub_service_category_two != null)
		mainService = mainService + " (" + serviceDetails.sub_service_category_two + ")";

	document.getElementById("main-service-name").innerHTML = mainService;
	document.getElementById("service-date").innerHTML = serviceDetails.service_start_date + " to " + serviceDetails.service_end_date;

	$('#interest-expressed-date').datepicker('setStartDate', serviceDetails.service_start_date);
	$('#interest-expressed-date').datepicker('setEndDate', serviceDetails.service_end_date);

	var serviceTime = JSON.parse(jsonEscape(data))['service_requested_time'];

	$.each(serviceTime, function (key, value) {
		var startTime = value.start_time
		var endTime = value.end_time

		initializeRangeBar(parseInt(startTime), parseInt(endTime))
		document.getElementById("service-time").innerHTML = getHourPeriod(startTime) + " to " + getHourPeriod(endTime);
	});
	
	var serviceRequestedDay =JSON.parse(jsonEscape(data))['service_requested_day'];
		if (serviceRequestedDay.length > 0) {
			var serviceDays = "";
			for (i = 0; i < serviceRequestedDay.length; i++) {
				var serviceDayObject = serviceRequestedDay[i]
				serviceDays = serviceDays + days[parseInt(serviceDayObject.day) - 1] + ","
			}
			$("#service-days-value").html(serviceDays);
		}
		else{
			$("#service-days").hide();
			$("#service-days-value").hide();
		}

	$('.loader').hide();

}

function postServiceInterestExpressedDetail(service_interest_expressed_date, serviceId) {

	if (service_interest_expressed_date == null || service_interest_expressed_date == "")
		return;

	if (startHour == endHour) {
		$("#time-error").removeClass("hidden");
		return;
	}

	var serviceInterestExpressedDetail = {
		service: serviceId,
		service_interest_expressed_date: service_interest_expressed_date,
		service_interest_expressed_start_time: startHour - 1,
		service_interest_expressed_end_time: endHour - 1
	}

	console.log("data " + JSON.stringify(serviceInterestExpressedDetail));
	$.ajax({
		beforeSend: function () {
			$("#interest-expressed-btn").prop('disabled', true);
			$(".loader").show();

		},
		url: '/humane/serviceInterestedDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			window.location.href = "/html/thankYouPage/";
		},
		error: function (response) {
			console.log("response expressing service interest " + response)
			$("#interest-expressed-btn").prop('disabled', false);
			$(".loader").hide();
		},
		data: JSON.stringify(serviceInterestExpressedDetail)

	});
}

function initializeRangeBar(startTime, endTime) {
	var startHourPeriod;
	var endHourPeriod;

	$("#input").slider({

		// the id of the slider element
		id: "",

		// minimum value
		min: startTime,

		// maximum value
		max: endTime,

		// increment step
		step: 1,

		// the number of digits shown after the decimal.
		precision: 0,

		// 'horizontal' or 'vertical'
		orientation: 'horizontal',

		// initial value
		value: startTime,

		// enable range slider
		range: true,

		// selection placement. 
		// 'before', 'after' or 'none'. 
		// in case of a range slider, the selection will be placed between the handles
		selection: 'before',

		// 'show', 'hide', or 'always'
		tooltip: 'show',

		// show two tooltips one for each handler
		tooltip_split: false,

		// 'round', 'square', 'triangle' or 'custom'
		handle: 'round',

		// whether or not the slider should be reversed
		reversed: false,

		// whether or not the slider is initially enabled
		enabled: true,

		// callback
		formatter: function formatter(val) {
			var tempStartHour, tempEndHour;
			if (Array.isArray(val)) {
				startHour = val[0];
				endHour = val[1];
				tempStartHour = startHour;
				tempEndHour = endHour;

				if (tempStartHour > 12) {
					tempStartHour -= 12
					startHourPeriod = " PM";
				} 
				else if (tempStartHour == 12)
					startHourPeriod = " PM";
				else
					startHourPeriod = " AM";

				if (tempEndHour > 12) {
					tempEndHour -= 12
					endHourPeriod = " PM";
				} 
				else if (tempEndHour == 12)
					endHourPeriod = " PM";
				else
					endHourPeriod = " AM";
				if ($("#time-error").is(":visible"))
					$("#time-error").addClass("hidden");

				return tempStartHour + startHourPeriod + "  to  " + tempEndHour + endHourPeriod;
			} else {
				return val;
			}
		},

		// The natural order is used for the arrow keys. 
		// Arrow up select the upper slider value for vertical sliders, arrow right the righter slider value for a horizontal slider - no matter if the slider was reversed or not. 
		// By default the arrow keys are oriented by arrow up/right to the higher slider value, arrow down/left to the lower slider value.
		natural_arrow_keys: false,

		// Used to define the values of ticks. 
		// Tick marks are indicators to denote special values in the range. 
		// This option overwrites min and max options.
		ticks: [],

		// Defines the positions of the tick values in percentages. 
		// The first value should always be 0, the last value should always be 100 percent.
		ticks_positions: [],

		// Defines the labels below the tick marks. Accepts HTML input.
		ticks_labels: [],

		// Used to define the snap bounds of a tick. 
		// Snaps to the tick if value is within these bounds.
		ticks_snap_bounds: 0,

		// Used to allow for a user to hover over a given tick to see it's value.
		ticks_tooltip: false,

		// Position of tooltip, relative to slider. 
		// Accepts 'top'/'bottom' for horizontal sliders and 'left'/'right' for vertically orientated sliders. 
		// Default positions are 'top' for horizontal and 'right' for vertical slider.
		tooltip_position: null,

		// Set to 'logarithmic' to use a logarithmic scale.
		scale: 'linear',

		// Focus the appropriate slider handle after a value change.
		focus: false,

		// ARIA labels for the slider handle's, Use array for multiple values in a range slider.
		labelledby: null,

		// Defines a range array that you want to highlight
		rangeHighlights: []

	});

}
