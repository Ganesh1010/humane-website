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

function postServiceInterestExpressedDetail(service_interest_expressed_date, serviceId, service_interest_expressed_start_time, service_interest_expressed_end_time) {


	var serviceInterestExpressedDetail = {
		service: serviceId,
		service_interest_expressed_date: service_interest_expressed_date,
		service_interest_expressed_start_time: service_interest_expressed_start_time,
		service_interest_expressed_end_time: service_interest_expressed_end_time
	}

	console.log("data " + JSON.stringify(serviceInterestExpressedDetail));
	$.ajax({
		url: '/humane/serviceInterestedDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("success");
		},
		data: JSON.stringify(serviceInterestExpressedDetail)

	});
}
