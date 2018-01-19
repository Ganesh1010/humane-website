const REQUEST_TYPE_DONATION = 1;
const REQUEST_TYPE_SERVICE = 2;
const REQUEST_TYPE_THANKYOU_NOTE = 3;
const TASK_TYPE_VOLUNTEER_ASSIGNED = 4;
const TASK_TYPE_DONATION_COMPLETED = 5;
const TASK_TYPE_SERVICE_ATTENDED = 6;
const REGISTERED_USER = 2;
const REGISTERED_COORDINATOR = 1;
const DONATION_NOTIFICATION_MSG = "You have promised to donate";
const COORDINATOR_DONATION_NOTIFICATION_MSG = " has promised to donate ";
const COORDINATOR_SERVICE_NOTIFICATION_MSG = " has expressed interest to provide their valuable time for the service ";
const SERVICE_NOTIFICATION_MSG = "You have expressed interest for the service";
const DONATION_MSG = "Your donation";
const DONATION_RECEIVED_MSG = "have been successfully received";
const SERVICE_MSG = "Your service";
const SERVICE_ATTENDED_MSG = "have been satisfied";
const VOLUNTEER_ASSIGNED_MSG = "has been assigned as a volunteer";
const THANK_YOU_NOTIFICATION_MSG = "You have received a thank you note";
const FROM_TEXT = "from";
const TO_TEXT = "to";
const ON_TEXT = "on";
const FOR_TEXT = "for";
const ITEM_COUNT = 1;

var USER_PROFILE;

var commonUserProfile;

var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function convertIntoServerDateTime(date) {
	console.log("converting into server date " + date)
	return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)).toJSON();
}

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
	function deleteCookie(name,value,days)
	{
       if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    }


function createSelectOptions(t, div, name, value, default_text) {
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
			option.innerHTML = t[i][name];
		}

		selectOptionDiv.append(option);
	}
	document.getElementById(div).append(selectOptionDiv);

}


function jsonEscape(str) {
	return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

function getImage(src) {
	var icon = document.createElement("img");
	icon.setAttribute("src", src);
	icon.alt = "icon";
	return icon;
}

function getText(text) {
	var paragraph = document.createElement("p");
	paragraph.innerHTML = text;
	return paragraph;
}

function getLocalDateFormat(dateString) {
	var date = new Date(dateString);
	var dateText = date.toDateString();
	return dateText;
}

function getHeaderText(text, textSize) {
	var header = document.createElement("h" + textSize);
	header.innerHTML = text;
	return header;
}

function createRow(itemName, quantity, unit) {
	var row = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');

	td1.classList.add("col-md-3");
	td1.classList.add("text-center");
	td1.setAttribute("id", "item1" + itemName);
	td2.classList.add("col-md-3");
	td2.classList.add("text-center");
	td2.setAttribute("id", "item2" + itemName);
	td3.classList.add("col-md-3");
	td3.classList.add("text-center");
	td3.setAttribute("id", "item3" + itemName);

	td1.appendChild(document.createTextNode(itemName));
	td2.appendChild(document.createTextNode(quantity));
	td3.appendChild(document.createTextNode(unit));

	row.append(td1);
	row.append(td2);
	row.append(td3);

	return row;
}

function createRowWithTwoColumns(string1, string2) {
	var row = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');

	td1.classList.add("media-heading");
	td1.classList.add("text-center");

	td2.classList.add("media-heading");
	td2.classList.add("text-center");

	td1.appendChild(document.createTextNode(string1));
	td2.appendChild(document.createTextNode(string2));

	row.append(td1);
	row.append(td2);

	return row;
}

function successAlert(title,text,type,link){

				swal({
				title:title,
				text: text,
				type: type
				},function() {
				// Redirect the user
			//	window.location.href = "/html/homePage";
				window.location.replace(link);
				
				
				});
			}

function getPromisedQuantity(donationlist, goodsItemId) {
	var totalPromisedItemQuantity = 0;
	if (donationlist != null) {
		$.each(donationlist, function (key, value) {
			var donationDetail = value;
			var donationItemDetailArrayList = donationDetail.donation_item_list;

			for (i = 0; i < donationItemDetailArrayList.length; i++) {
				donationItemDetail = donationItemDetailArrayList[i];
				if (donationItemDetail.goods_item == goodsItemId) {
					if (!donationDetail.is_donation_completed)
						totalPromisedItemQuantity += donationItemDetail.quantity;
				}
			}
		});
	}
	return totalPromisedItemQuantity;
}

function getReceivedQuantity(donationlist, goodsItemId) {
	var totalReceivedItemQuantity = 0;
	if (donationlist != null) {
		$.each(donationlist, function (key, value) {
			var donationDetail = value;
			var donationItemDetailArrayList = donationDetail.donation_item_list;

			for (i = 0; i < donationItemDetailArrayList.length; i++) {
				donationItemDetail = donationItemDetailArrayList[i];
				if (donationItemDetail.goods_item == goodsItemId) {
					if (donationDetail.is_donation_completed)
						totalReceivedItemQuantity += donationItemDetail.quantity;
				}
			}
		});
	}
	return totalReceivedItemQuantity;
}

function promisedDonationProgressBar(value) {
	var promisedDonationProgressBar = document.createElement("div");
	promisedDonationProgressBar.className = "progress-bar";
	promisedDonationProgressBar.setAttribute('role', 'promisedDonationProgressBar');
	if (value < 100)
		promisedDonationProgressBar.setAttribute('style', 'width:100%');

	promisedDonationProgressBar.setAttribute('aria-valuenow', value);
	promisedDonationProgressBar.setAttribute('style', 'width:' + value + '%');
	promisedDonationProgressBar.innerHTML = +value + "%";
	return promisedDonationProgressBar;
}

function create_single_goods_card(item, commonUserProfile = null) {

	var goodsCard = document.createDocumentFragment();

	var goodsCardOuterDiv = document.createElement("div");
	goodsCardOuterDiv.className = "col-sm-3";

	var goodsCardParentDiv = document.createElement("div");
	goodsCardParentDiv.classList.add('panel');
	goodsCardParentDiv.classList.add('panel-primary');
	goodsCardParentDiv.classList.add('goods-box');

	var goodsPanelHeading = document.createElement("div");
	goodsPanelHeading.classList.add("panel-heading");
	goodsPanelHeading.classList.add("card-panel-heading");

	var goodsPanelBody = document.createElement("div");
	goodsPanelBody.classList.add("panel-body");
	goodsPanelBody.classList.add("card-panel");

	var mainItemIcon = getImage(item.main_item_image); // indicates the main item icon
	mainItemIcon.className = "main-item-image";

	var orgName = document.createElement("h5");
	orgName.innerHTML = item.organisation_detail.org_name;

	var orgCity = document.createElement('h6');
	orgCity.innerHTML = item.organisation_detail.city + " - " + item.organisation_detail.postal_code;


	var progressBarDiv = document.createElement("div");
	progressBarDiv.classList.add("promised-donation-progressbar");
	var promisedDonationProgressValue = promisedDonationProgressBar(getPromisedPercentage(item.goods_item_list, item.donation_list));
	var br = document.createElement("br");

	progressBarDiv.append(promisedDonationProgressValue);
	var donateButton = document.createElement("button");
	donateButton.classList.add('btn');
	donateButton.classList.add('btn-success');
	donateButton.classList.add('btn-donor');
	donateButton.classList.add('pull-right');
	donateButton.classList.add("donate-button");
	donateButton.innerHTML = "Donate";

	goodsCardOuterDiv.addEventListener('click', function () {

		
		if (commonUserProfile != null) {

			if (commonUserProfile.role == REGISTERED_COORDINATOR) {
				var id = item.goods_id;
				var link = "/html/organisationGoodsDetailPage";
				console.log("on click card", id);

				link += "?id=" + id;
				console.log("url", link);
				window.location.href = link;

			} else if (commonUserProfile.role == REGISTERED_USER) {
				var id = item.goods_id;
				var link = "/html/goodsDetailPage";
				console.log("on click card", id);

				link += "?id=" + id;
				console.log("url", link);
				window.location.href = link;
			}
		} else {
			var id = item.goods_id;
			var link = "/html/goodsDetailPage";
			console.log("on click card", id);

			link += "?id=" + id;
			console.log("url", link);
			window.location.href = link;
		}

	});

	goodsPanelBody.appendChild(mainItemIcon);
	goodsPanelBody.appendChild(orgName);
	goodsPanelBody.appendChild(orgCity);
	goodsPanelBody.appendChild(progressBarDiv);
	goodsPanelBody.appendChild(br);

	
	if(commonUserProfile!=null){
		if (commonUserProfile.role != REGISTERED_COORDINATOR)
			goodsPanelBody.appendChild(donateButton);
	}
	else
	
		goodsPanelBody.appendChild(donateButton);
	
	goodsCardParentDiv.appendChild(goodsPanelHeading);
	goodsCardParentDiv.appendChild(goodsPanelBody);
	goodsCardOuterDiv.appendChild(goodsCardParentDiv);
	goodsCard.appendChild(goodsCardOuterDiv);
	document.getElementById("goodstab").appendChild(goodsCard);
	$('#goods-loader').hide();
}

function create_single_service_card(service, commonUserProfile = null) {

	var serviceCard = document.createDocumentFragment();

	var serviceCardOuttertDiv = document.createElement("div");
	serviceCardOuttertDiv.className = "col-sm-3";

	var serviceCardParentDiv = document.createElement("div");
	serviceCardParentDiv.classList.add('panel');
	serviceCardParentDiv.classList.add('panel-primary');
	serviceCardParentDiv.classList.add('goods-box');

	var servicePanelHeading = document.createElement("div");
	servicePanelHeading.className = "panel-heading";
	servicePanelHeading.classList.add("card-panel-heading");

	var servicePanelBody = document.createElement("div");
	servicePanelBody.className = "panel-body";

	var mainItemIcon = getImage(service.main_service_icon); // indicates the main item icon
	mainItemIcon.className = "main-item-image";

	var orgName = document.createElement("h5");
	orgName.innerHTML = service.service_org_detail.org_name;

	var orgCity = document.createElement('h6');
	orgCity.innerHTML = service.service_org_detail.city + " - " + service.service_org_detail.postal_code;

	var serviceInterestedUserCount = document.createElement("h5");
	var count = service.service_interest_expressed.length;
	if (count == 0)
		count = "-";
	serviceInterestedUserCount.innerHTML = "No. of People Interested : " + count;

	var serveButton = document.createElement("button");
	serveButton.classList.add('btn');
	serveButton.classList.add('btn-success');
	serveButton.classList.add('btn-donor');
	serveButton.classList.add('pull-right');
	serveButton.classList.add("serve-button");
	serveButton.innerHTML = "Express Interest";

	servicePanelBody.appendChild(mainItemIcon);
	servicePanelBody.appendChild(orgName);
	servicePanelBody.appendChild(orgCity);
	servicePanelBody.appendChild(serviceInterestedUserCount);
	if (commonUserProfile != null) {
		if (commonUserProfile.role != REGISTERED_COORDINATOR)
			servicePanelBody.appendChild(serveButton);
	}
	else
		servicePanelBody.appendChild(serveButton);
	serviceCardParentDiv.appendChild(servicePanelHeading);
	serviceCardParentDiv.appendChild(servicePanelBody);
	serviceCardOuttertDiv.appendChild(serviceCardParentDiv);
	serviceCard.appendChild(serviceCardOuttertDiv);

	serviceCardOuttertDiv.addEventListener('click', function () {

		if (commonUserProfile != null) {
			if (commonUserProfile.role == REGISTERED_COORDINATOR) {
				var id = service.service_id;
				console.log("on click service card", id);
				var link = "/html/organisationServiceDetailPage";
				link += "?id=" + id;
				console.log("url", link);
				window.location.href = link;
			} else if (commonUserProfile.role == REGISTERED_USER) {
				var id = service.service_id;
				console.log("on click service card", id);
				var link = "/html/serviceInterestExpressed";
				link += "?id=" + id;
				console.log("url", link);
				window.location.href = link;
			}
		} else {
			var id = service.service_id;
			console.log("on click service card", id);
			var link = "/html/serviceInterestExpressed";
			link += "?id=" + id;
			console.log("url", link);
			window.location.href = link;
		}

	});

	document.getElementById("servicetab").appendChild(serviceCard);
	$('#service-loader').hide();
}

function getGoodsHistoryDetail(data) {

	var t = JSON.parse(jsonEscape(data))['results']

	$.each(t, function (key, value) {
		createGoodsHistoryCard(value);
	});
	$('#goods-history-loader').hide();
}

function getServiceHistoryDetail(data) {
	
	var t = JSON.parse(jsonEscape(data))['results']
	$.each(t, function (key, value) {
		createServiceHistoryCard(value);
	});
	$('#service-history-loader').hide();
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
	console.log(userIcon);

	var userDetailDiv = document.createElement("div");
	userDetailDiv.classList.add("media-body");

	var userName = getHeaderText(item.service_user_detail.first_name, 4);
	userName.classList.add("media-heading");

	var serviceId = document.createElement("h5");
	serviceId.innerHTML = "#000" + item.service_detail.service_id;

	var userEmail = document.createElement("h5");
	userEmail.innerHTML = item.service_user_detail.email;

	var servicingTimeLabel = getText("Servicing time");
	var servicingTimeText = item.service_interest_expressed_start_time + "to" + item.service_interest_expressed_end_time;
	var servicingTime = getText(servicingTimeText);
	console.log(servicingTime);


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

	serviceInterestCardDiv.append(startLine);
	serviceDateDiv.append(interestedDateText);
	serviceDateDiv.append(interestedDate);

	userImgDiv.append(userIcon);

	userDetailDiv.append(userName);
	userDetailDiv.append(serviceId);
	userDetailDiv.append(userEmail);
	userDetailDiv.append(servicingTime)


	cardContentDiv.append(serviceDateDiv);
	cardContentDiv.append(userImgDiv);
	cardContentDiv.append(userDetailDiv);


	serviceInterestCardDiv.append(cardContentDiv);
	serviceInterestCardDiv.append(attendedButton);
	serviceInterestCardDiv.append(breakLine);
	serviceInterestCardDiv.append(endLine);

	//Test Comment added By Ganesh

	doc.appendChild(serviceInterestCardDiv);

	document.getElementById("service-interest-expressed-card").appendChild(doc);


}

function createGoodsHistoryCard(item) {
	var doc = document.createDocumentFragment();

	var historyCardDiv = document.createElement("div");
	historyCardDiv.classList.add("card");
	historyCardDiv.classList.add("col-md-6");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");
	cardContentDiv.classList.add("history-card-padding");

	var itemImageDiv = document.createElement("div");
	itemImageDiv.classList.add("media-left");
	itemImageDiv.classList.add("media-middle");
	var itemImage = getImage(item.main_item_image);
	itemImage.classList.add("media-object");
	itemImage.classList.add("thumbnail");

	var itemDetailDiv = document.createElement("div");
	itemDetailDiv.classList.add("media-body");

	var breakLine = document.createElement("br");

	var id = getHeaderText("#000" + item.goods_id, 5);
	id.className = "text-center";

	var itemName = getHeaderText(item.main_item, 4);
	itemName.classList.add("media-heading");
	itemName.classList.add("text-center");

	var dateTable = document.createElement("table");
	dateTable.classList.add("table");
	//dateTable.classList.add("table-hover");
	dateTable.classList.add("table-responsive");
	dateTable.classList.add("history-table-padding");

	var tableBody = document.createElement("tbody");
	var tableHeader = createRowWithTwoColumns("Posted Date", "DeadLine Date");


	var postedDateString = item.posted_date;
	var deadLineDateString = item.deadline;
	var postedDate = getLocalDateFormat(postedDateString);
	var deadLineDate = getLocalDateFormat(deadLineDateString);
	var tableContent = createRowWithTwoColumns(postedDate, deadLineDate);

	tableBody.append(tableHeader);
	tableBody.append(tableContent);

	itemImageDiv.append(breakLine);
	itemImageDiv.append(itemImage);

	dateTable.append(tableBody);
	itemDetailDiv.append(id);

	itemDetailDiv.append(itemName);
	itemDetailDiv.append(dateTable);

	cardContentDiv.append(itemImageDiv);
	cardContentDiv.append(itemDetailDiv);

	historyCardDiv.append(cardContentDiv);

	doc.appendChild(historyCardDiv);

	document.getElementById("goods-history-card").appendChild(doc);

}

function createServiceHistoryCard(item) {
	var doc = document.createDocumentFragment();

	var historyCardDiv = document.createElement("div");
	historyCardDiv.classList.add("card");
	historyCardDiv.classList.add("col-md-6");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");
	cardContentDiv.classList.add("history-card-padding");

	var itemImageDiv = document.createElement("div");
	itemImageDiv.classList.add("media-left");
	itemImageDiv.classList.add("media-middle");
	var itemImage = getImage(item.main_service_icon);
	itemImage.classList.add("media-object");
	itemImage.classList.add("thumbnail");

	var itemDetailDiv = document.createElement("div");
	itemDetailDiv.classList.add("media-body");

	var breakLine = document.createElement("br");

	var id = getHeaderText("#000" + item.service_id, 5);
	id.className = "text-center";

	var itemName = getHeaderText(item.main_service, 4);
	itemName.classList.add("media-heading");
	itemName.classList.add("text-center");

	var dateTable = document.createElement("table");
	dateTable.classList.add("table");
	//dateTable.classList.add("table-hover");
	dateTable.classList.add("table-responsive");
	dateTable.classList.add("history-table-padding");

	var tableBody = document.createElement("tbody");
	var tableHeader = createRowWithTwoColumns("Start Date", "End Date");


	var serviceStartDateString = item.service_start_date;
	var serviceEndDateString = item.service_end_date;
	var startDate = getLocalDateFormat(serviceStartDateString);
	var endDate = getLocalDateFormat(serviceEndDateString);
	var tableContent = createRowWithTwoColumns(startDate, endDate);

	tableBody.append(tableHeader);
	tableBody.append(tableContent);

	itemImageDiv.append(breakLine);
	itemImageDiv.append(itemImage);

	dateTable.append(tableBody);
	itemDetailDiv.append(id);

	itemDetailDiv.append(itemName);
	itemDetailDiv.append(dateTable);

	cardContentDiv.append(itemImageDiv);
	cardContentDiv.append(itemDetailDiv);

	historyCardDiv.append(cardContentDiv);

	doc.appendChild(historyCardDiv);

	document.getElementById("service-history-card").appendChild(doc);

}


function userServiceInterestCard(item) {

	var doc = document.createDocumentFragment();

	var serviceInterestCardDiv = document.createElement("div");
	serviceInterestCardDiv.classList.add("card");
	serviceInterestCardDiv.classList.add("col-md-4");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");

	var orgImgDiv = document.createElement("div");
	orgImgDiv.classList.add("media-left");
	orgImgDiv.classList.add("media-middle");
	var orgIcon = getImage(item.service_detail.service_org_detail.org_logo);
	orgIcon.classList.add("media-object");
	orgIcon.classList.add("thumbnail");
	orgIcon.classList.add("service-interest-org-logo");
	console.log(orgIcon);

	var serviceDetailDiv = document.createElement("div");
	serviceDetailDiv.classList.add("media-body");

	var orgName = getHeaderText(item.service_detail.service_org_detail.org_name, 4);
	orgName.classList.add("media-heading");
	var mainServiceName = getHeaderText(item.service_detail.main_service, 5);
	var subServiceName = getHeaderText(item.service_detail.sub_service_category_one, 5);
	var servicingTimeText = item.service_interest_expressed_start_time + "to" + item.service_interest_expressed_end_time;
	var servicingTime = getText(servicingTimeText);
	console.log(servicingTime);

	var servicingDate = getLocalDateFormat(item.service_interest_expressed_date);

	var thankYouVideoIconDiv = document.createElement("div");
	thankYouVideoIconDiv.classList.add("media-right");
	thankYouVideoIconDiv.classList.add("media-top");

	var thankYouVideoIcon = getImage("Images/thank-you-video-icon.png");
	thankYouVideoIcon.classList.add("video-icon");
	thankYouVideoIcon.setAttribute("data-toggle", "tool-tip");
	thankYouVideoIcon.setAttribute("title", "Click to see the thank you video");

	var breakLine = document.createElement("br");
	var startLine = document.createElement("hr");
	startLine.className = "hr-padding"
	var endLine = document.createElement("hr");
	endLine.className = "hr-padding"

	serviceInterestCardDiv.append(startLine);

	orgImgDiv.append(orgIcon);

	serviceDetailDiv.append(orgName);
	serviceDetailDiv.append(mainServiceName);
	serviceDetailDiv.append(subServiceName);
	serviceDetailDiv.append(servicingTime);
	serviceDetailDiv.append(servicingDate);

	thankYouVideoIconDiv.append(thankYouVideoIcon);

	cardContentDiv.append(orgImgDiv);
	cardContentDiv.append(serviceDetailDiv);

	if (item.is_thank_you_video_posted)
		cardContentDiv.append(thankYouVideoIconDiv)


	serviceInterestCardDiv.append(cardContentDiv);
	serviceInterestCardDiv.append(endLine);

	doc.appendChild(serviceInterestCardDiv);

	document.getElementById("user-service-interest-expressed-card").appendChild(doc);

}


function createPromisedDonationcard(donationDetail) {
	promisedDonationDoc = document.createDocumentFragment();

	var donationOuterDiv = document.createElement("div");
	donationOuterDiv.classList.add("card");
	donationOuterDiv.classList.add("col-md-4");

	var donationParentDiv = document.createElement("div");
	donationParentDiv.classList.add("media");
	donationParentDiv.classList.add("padding");

	var hrStartLine = document.createElement("hr");
	hrStartLine.className = "hr-padding";
	var hrEndLine = document.createElement("hr");
	hrEndLine.className = "hr-padding"

	var orgLogoDiv = document.createElement("div");
	orgLogoDiv.classList.add("media-left");
	orgLogoDiv.classList.add("media-top");

	orgLogo = getImage(donationDetail.organisation.org_logo);
	orgLogo.classList.add("media-object");
	orgLogo.classList.add("thumbnail");
	orgLogo.classList.add("icon");

	orgLogoDiv.append(orgLogo);

	var orgDetailDiv = document.createElement("div");
	orgDetailDiv.classList.add("media-body");

	var orgName = getHeaderText(donationDetail.organisation.org_name, 4);
	var itemName = getHeaderText(donationDetail.main_item, 5);
	var promisedDate = getHeaderText(getLocalDateFormat(donationDetail.promised_date), 5);

	orgDetailDiv.appendChild(orgName);
	orgDetailDiv.appendChild(itemName);
	orgDetailDiv.appendChild(promisedDate);

	var thankYouVideoDiv = document.createElement("div");
	thankYouVideoDiv.classList.add("media-right");
	thankYouVideoDiv.classList.add("media-top");

	var thankYouVideoIcon = getImage("Images/thank-you-video-icon.png");
	thankYouVideoIcon.classList.add("media-object");
	thankYouVideoIcon.classList.add("img-circle");
	thankYouVideoIcon.classList.add("small-img");
	thankYouVideoIcon.setAttribute("data-toggle", "tooltip");
	thankYouVideoIcon.setAttribute("title", "click to see the thank you video");

	if (donationDetail.is_thank_you_video_posted)
		thankYouVideoDiv.append(thankYouVideoIcon);

	var volunteerDiv = document.createElement("div");
	volunteerDiv.classList.add("media-right");
	volunteerDiv.classList.add("media-top");

	var volunteerIcon = getImage("Images/volunteer.png");
	volunteerIcon.classList.add("media-object");
	volunteerIcon.classList.add("img-circle");
	volunteerIcon.classList.add("small-img");
	volunteerIcon.setAttribute("data-toggle", "tooltip");
	volunteerIcon.setAttribute("title", "You have asked for the volunteer");

	if (donationDetail.is_volunteer_required)
		volunteerDiv.append(volunteerIcon);


	var itemDetailTable = document.createElement("table")
	itemDetailTable.classList.add("table");
	itemDetailTable.classList.add("donation-item-table-padding");
	itemDetailTable.classList.add("table-hover");
	itemDetailTable.classList.add("table-responsive");

	var itemDetailTableBody = document.createElement("tbody")
	var tableHeader = createRow("Item Name", "Sub Item Name", "Quantity");
	tableHeader.className = "table-header-color";

	itemDetailTableBody.append(tableHeader);

	var donationItemList = donationDetail.donation_item_list;

	var tableContent = [];
	var size;

	if (donationItemList.length > 1)
		size = 1
	else
		size = donationItemList.length

	if (donationItemList.length > 1) {
		console.log("more buton created");
		var moreButton = document.createElement("button");
		moreButton.setAttribute("id", "moreButtonId");
		moreButton.classList.add("btn-link");
		moreButton.classList.add("pull-right");
		moreButton.innerHTML = "click to see full details";
	}
	for (i = 0; i < size; i++) {
		goodsItemDetail = donationItemList[i].goods_item_detail;

		var itemName = goodsItemDetail.sub_item_category_one;
		var subItemName = goodsItemDetail.sub_item_category_two;
		if (subItemName == null)
			subItemName = "-"
		var quantity = donationItemList[i].quantity + " (" + donationItemList[i].unit + ")";
		tableContent[i] = createRow(itemName, subItemName, quantity);
		//tableContent[i].className = "table-data-font";
		itemDetailTableBody.append(tableContent[i]);
	}

	itemDetailTable.append(itemDetailTableBody);

	donationParentDiv.append(hrStartLine);
	donationParentDiv.append(orgLogoDiv);
	donationParentDiv.append(orgDetailDiv);
	donationParentDiv.append(thankYouVideoDiv);
	donationParentDiv.append(volunteerDiv);
	donationParentDiv.append(itemDetailTable);


	if (donationItemList.length > 1) {
		donationParentDiv.append(moreButton);
	}
	var br = document.createElement("br");
	donationParentDiv.append(br);
	donationParentDiv.append(hrEndLine);

	donationOuterDiv.append(donationParentDiv);

	promisedDonationDoc.append(donationOuterDiv);
	document.getElementById("promised_donation").append(promisedDonationDoc);

}


function createPagination(count, urlToLoad, paginationDiv, parentDiv, pageToLoad) {

	var maxPages;
	var currentpage;
	var page = 1;
	var url = urlToLoad;

	currentpage = page;

	var paginationNav = document.createDocumentFragment();

	var pagination = document.createElement("ul");
	pagination.className = "pagination"

	var previousPage = document.createElement("li");
	previousPage.classList.add("page-item");
	previousPage.classList.add("disabled");
	previousPage.setAttribute("id", "previous" + paginationDiv);

	var previousPageLink = document.createElement("a");
	previousPageLink.classList.add("page-link");
	previousPageLink.addEventListener("click", function () {
		loadNewPage(this, "previous");
	}, false);

	var previousPageLinkSpan = document.createElement("span");
	previousPageLinkSpan.setAttribute("aria-hidden", "true");
	previousPageLinkSpan.innerHTML = "&laquo;";

	previousPageLink.append(previousPageLinkSpan);
	previousPage.append(previousPageLink);

	pagination.append(previousPage);

	while (count > 0) {

		console.log("page no.", page)
		var newPage = document.createElement("li");
		newPage.classList.add("page-item");
		newPage.setAttribute("id","newPage"+page)
		
		if(page==1)
			newPage.classList.add("active");

		var newPageLink = document.createElement("a");
		newPageLink.className = "page-link"
		newPageLink.addEventListener("click", function () {
			loadNewPage(this, "new");
		}, false);
		newPageLink.innerHTML = page;

		newPage.append(newPageLink);

		pagination.append(newPage);
		count = count - 10;
		page++;
	}

	maxPages = page - 1;
	console.log("max page " + maxPages)

	var nextPage = document.createElement("li");
	nextPage.className = "page-item";
	nextPage.setAttribute("id", "next" + paginationDiv);

	var nextPageLink = document.createElement("a");
	nextPageLink.className = "page-link";
	nextPageLink.addEventListener("click", function () {
		loadNewPage(this, "next");
	}, false);
	var nextPageLinkSpan = document.createElement("span");
	nextPageLinkSpan.setAttribute("aria-hidden", "true");
	nextPageLinkSpan.innerHTML = "&raquo;";

	nextPageLink.append(nextPageLinkSpan);
	nextPage.append(nextPageLink);
	pagination.append(nextPage);

	paginationNav.appendChild(pagination);

	document.getElementById(paginationDiv).appendChild(paginationNav);

	var previousPage;
	
	function loadNewPage(callingElement, toLoad) {

		if (toLoad == "previous"){
			currentpage = parseInt(currentpage) - 1;
			$("#newPage"+(parseInt(currentpage)+1)).removeClass("active")
			
		}
		else if (toLoad == "next"){
			currentpage = parseInt(currentpage) + 1;
			$("#newPage"+(parseInt(currentpage)-1)).removeClass("active")
		}
		else if (toLoad == "new"){
			$("#newPage"+parseInt(previousPage)).removeClass("active")
			currentpage = callingElement.innerHTML;
			previousPage = currentpage;
		}

		if (parseInt(currentpage) == 1) {
			document.getElementById("previous" + paginationDiv).classList.add("disabled");

			console.log("previous is disabled in " + paginationDiv);
		} else {
			document.getElementById("previous" + paginationDiv).classList.remove("disabled");
			console.log("previous is enabled in " + paginationDiv);
		}


		if (parseInt(currentpage) == maxPages) {
			document.getElementById("next" + paginationDiv).classList.add("disabled");
			console.log("next is disabled in " + paginationDiv);
		} else {
			document.getElementById("next" + paginationDiv).classList.remove("disabled");
			console.log("next is enabled in " + paginationDiv);
		}

		url = urlToLoad + "&page=" + currentpage;
		console.log("url to load " + url)
		$(parentDiv).empty();
		
		$("#newPage"+(parseInt(currentpage)-1)).removeClass("active")
		$("#newPage"+parseInt(currentpage)).addClass("active");

		loadMoreData(pageToLoad, url);

	}

}


function loadMoreData(pageToLoad, url) {
	switch (pageToLoad) {
		case 1:
			console.log("loading the new goods page");
			$('#goods-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					getGoodsdetail(data, commonUserProfile);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});
			break;

		case 2:
			console.log("loading the new service page");
			$('#service-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					getServiceDetail(data, commonUserProfile);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});

			break;
		case 3:
			console.log("loading goods history page details");
			$('#goods-history-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					getGoodsHistoryDetail(data);
				})
				.fail(function () {
					console.log("error");
					$('#goods-history-loader').hide();
				})
				.always(function () {

				});
			break;
			
		case 4:
			console.log("loading service history details");
			$('#service-history-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					getServiceHistoryDetail(data);
				})
				.fail(function () {
					console.log("error");
					$('#service-history-loader').hide();
				})
				.always(function () {

				});
			break;
			
		case 5:
			console.log("loading the new vol donation page");
			$('.loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					loadvolRequiredDetails(data);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});
			break;
		case 6:
			console.log("loading the service interest expressed page");
			$('.loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					loadServiceInterestExpressedDetails(data);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});

			break;

		case 7:
			console.log("loading the promised donation page");
			$('.loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					loadPromisedDonationDetails(data);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});

			break;
			
		case 8:
			console.log("loading the user promised donation page");
			$('#donation-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					getPromisedDonationDetails(data);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});

			break;
		
		case 9:
			console.log("loading the servivce interested  page");
			$('#service-interested-loader').show();
			$.getJSON(url, function (data) {})
				.done(function (data) {
					loadUserServiceInterestedDetails(data);
				})
				.fail(function () {
					console.log("error");
					$('.loader').hide();
				})
				.always(function () {

				});

			break;

	}
}

function getGoodsdetail(data, commonUserProfile = null) {
	var t = JSON.parse(jsonEscape(data))['results']
	$.each(t, function (key, value) {
		create_single_goods_card(value, commonUserProfile);
	});
	$('#goods-loader').hide();
}

function getServiceDetail(serviceData, commonUserProfile = null) {
	console.log("service detail befor parse " + jsonEscape(serviceData))
	var t = JSON.parse(jsonEscape(serviceData))['results']
	$.each(t, function (key, value) {
		create_single_service_card(value, commonUserProfile);
	});
	$('#service-loader').hide();
}

function getPromisedPercentage(goodsItemList, donationlist) {
	var promisedPercentage = 0;
	var promisedDonationsItemQuantity = 0;
	var requestedGoodsItemQuantity = 0;
	var receivedQuantity = 0;

	var goodsItemId;
	$.each(goodsItemList, function (key, value) {

		var goodsItemDetail = value;
		if (goodsItemDetail != null) {
			goodsItemId = goodsItemDetail.goods_item_id;
			requestedGoodsItemQuantity += goodsItemDetail.quantity;
			promisedDonationsItemQuantity += getPromisedQuantity(donationlist, goodsItemId);
			receivedQuantity += getReceivedQuantity(donationlist, goodsItemId);
		}

	});

	//			console.log("promised quantity " + promisedDonationsItemQuantity);
	//			console.log("received quantity " + receivedQuantity);

	if (requestedGoodsItemQuantity != 0) {
		promisedPercentage = ((promisedDonationsItemQuantity + receivedQuantity) * 100) / requestedGoodsItemQuantity;
		//				console.log("promised percentage " + promisedPercentage);
	}
	if (promisedPercentage > 100) {
		promisedPercentage = 100;
	}

	return parseInt(promisedPercentage);
}

function loadUserDetail(userDetailURL, functionTocall = null) {
	$.getJSON(userDetailURL, function (data) {})
		.done(function (data) {

			var userProfile = JSON.parse(jsonEscape(data))

			if (userProfile != null) {
				console.log("userProfile home page" + userProfile.mobile)
				USER_PROFILE = userProfile;
			}

			if (functionTocall != null)
				functionTocall();
			console.log("commom user profile in home page " + USER_PROFILE.mobile);
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("goods detail load complete");
		});
}

function getCountryList() {
	$.getJSON("/humane/countryCodeDetails/?isweb=true&callback=?", function (data) {

		}).done(function (data) {
			console.log("data", data);

			var countryList = JSON.parse(jsonEscape(data));
			getDropDownList(countryList, 'country', 'country_code_id', 'country_name', "Select Country");

		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("Loaded country detail list");
		});
}

function getStateList() {
	var countryId = document.getElementById("country").value;
	if (countryId != 0 || countryId != "") {
		$.getJSON("/humane/stateDetail/?country_id=" + countryId + "&isweb=true&callback=?", function (data) {

			}).done(function (data) {
				console.log("data", data);



				$("#state").empty();
				$("#city").empty();

				$("#state").prop("disabled", false);
				$("#city").prop("disabled", true);


				console.log("select country id", countryId);
				var stateList = JSON.parse(jsonEscape(data))
				console.log("select state list and  id", stateList);
				$('#state').empty();
				if (stateList.length != 0) {
					$('#state').prop('disabled', false);
					getDropDownList(stateList, 'state', 'state_id', 'state_name', "Select state");
					//getCityList();
				} else {
					alert("Sorry!Service in this place is currently not available");
				}


			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("Loaded country detail list");
			});
	}

}

function getCityList() {
	var stateId = document.getElementById("state").value;
	$('#city').empty();
	if (stateId != 0 || stateId != "") {
		$.getJSON("/humane/cityDetail/?state_id=" + stateId + "&isweb=true&callback=?", function (data) {

			}).done(function (data) {
				console.log("data city", data);

				$("#city").empty();

				$("#city").prop("disabled", false);

				console.log("select state id ", stateId);
				var cityList = JSON.parse(jsonEscape(data));
				console.log("city list", cityList);
				if (cityList.length != 0) {
					$('#city').prop('disabled', false);
					getDropDownList(cityList, 'city', 'city_id', 'city_name', "Select City");
				} else {
					alert("Sorry!Service in this place is currently not available");
				}


			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("Loaded city detail list");
			});
	}
}

function getDropDownList(list, selectId, id, text, defaultValue) {
	console.log("select id ", selectId)
	for (var i = -1; i < list.length; i++) {
		var option = document.createElement('option');
		if (i == -1) {
			option.setAttribute("value", "");
			option.text = defaultValue;
			option.setAttribute("selected", "selected")
			option.disabled = true;
		} else {
			option.setAttribute("value", list[i][id]);
			console.log("option ", option);
			console.log("list id method", list[i][id]);
			option.text = list[i][text];
			console.log("list text method", list[i][text]);
		}
		document.getElementById(selectId).appendChild(option);

	}
}

function getHourPeriod(time) {
	var startHoutPeriod = " AM"
	var endHoutPeriod = " PM"
	time = parseInt(time);
	if (time > 12) {
		time -= 12
		return time + endHoutPeriod
	} else if (time == 12)
		return time + endHoutPeriod
	else if (time < 12)
		return time + startHoutPeriod
}

function loadNewGoodsServicePost() {
	var activeTab = $(".tab-content").find(".active");
	var id = activeTab.attr('id');

	switch (id) {
		case "goodstab":
			window.location.href = "/html/newGoodsPost";
			break;

		case "servicetab":
			window.location.href = "/html/newServicePost";
			break;
	}
}
