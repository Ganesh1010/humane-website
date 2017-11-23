const REQUEST_TYPE_DONATION = 1;
const REQUEST_TYPE_SERVICE = 2;
const REQUEST_TYPE_THANKYOU_NOTE = 3;
const DONATION_NOTIFICATION_MSG = "You have promised to donate";
const SERVICE_NOTIFICATION_MSG = "You have expressed interest for the service";
const THANK_YOU_NOTIFICATION_MSG = "You have received a thank you note";
const FROM_TEXT = "from";
const TO_TEXT = "to";
const ON_TEXT = "on";
const ITEM_COUNT = 1;

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
	td2.classList.add("col-md-3");
	td2.classList.add("text-center");
	td3.classList.add("col-md-3");
	td3.classList.add("text-center");

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


function promisedDonationProgressBar(value) {
	var promisedDonationProgressBar = document.createElement("div");
	promisedDonationProgressBar.className = "progress-bar";
	promisedDonationProgressBar.setAttribute('role', 'promisedDonationProgressBar');
	promisedDonationProgressBar.setAttribute('aria-valuenow', value);
	promisedDonationProgressBar.setAttribute('style', 'width:' + value + '%');
	promisedDonationProgressBar.innerHTML = +value + "%";
	return promisedDonationProgressBar;
}

function create_single_goods_card(item) {

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
	goodsPanelBody.className = "panel-body";

	var mainItemIcon = getImage(item.main_item_image); // indicates the main item icon
	mainItemIcon.className = "main-item-image";

	var orgName = document.createElement("h5");
	orgName.innerHTML = item.organisation_detail.org_name;

	var orgCity = document.createElement('h6');
	orgCity.innerHTML = item.organisation_detail.city + " - 600001";

	var promisedDonationProgressValue = promisedDonationProgressBar(90); // indicates the promised donation ProgressBar

	var donateButton = document.createElement("button");
	donateButton.classList.add('btn');
	donateButton.classList.add('btn-donor');
	donateButton.classList.add('pull-right');
	donateButton.classList.add("donate-button");
	donateButton.innerHTML = "Donate";

	goodsPanelBody.appendChild(mainItemIcon);
	goodsPanelBody.appendChild(orgName);
	goodsPanelBody.appendChild(orgCity);
	goodsPanelBody.appendChild(promisedDonationProgressValue);
	goodsPanelBody.appendChild(donateButton);
	goodsCardParentDiv.appendChild(goodsPanelHeading);
	goodsCardParentDiv.appendChild(goodsPanelBody);
	goodsCardOuterDiv.appendChild(goodsCardParentDiv);
	goodsCard.appendChild(goodsCardOuterDiv);

	document.getElementById("goodstab").appendChild(goodsCard);
}

function create_single_service_card(service) {

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
	orgCity.innerHTML = service.service_org_detail.city + " - 600001";

	var serviceInterestedUserCount = document.createElement("h5");
	serviceInterestedUserCount.innerHTML = "No. of People Interested : " + 5;

	var serveButton = document.createElement("button");
	serveButton.classList.add('btn');
	serveButton.classList.add('btn-donor');
	serveButton.classList.add('pull-right');
	serveButton.classList.add("serve-button");
	serveButton.innerHTML = "Serve";

	servicePanelBody.appendChild(mainItemIcon);
	servicePanelBody.appendChild(orgName);
	servicePanelBody.appendChild(orgCity);
	servicePanelBody.appendChild(serviceInterestedUserCount);
	servicePanelBody.appendChild(serveButton);
	serviceCardParentDiv.appendChild(servicePanelHeading);
	serviceCardParentDiv.appendChild(servicePanelBody);
	serviceCardOuttertDiv.appendChild(serviceCardParentDiv);
	serviceCard.appendChild(serviceCardOuttertDiv);

	document.getElementById("servicetab").appendChild(serviceCard);
}


function createOrganisationPromisedDonationCard(item) {

	var doc = document.createDocumentFragment();

	var promisedCardDiv = document.createElement("div");
	promisedCardDiv.classList.add("card");
	promisedCardDiv.classList.add("col-md-4");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");
	cardContentDiv.classList.add("padding");

	var promisedDateDiv = document.createElement("div");
	promisedDateDiv.className = "pull-right";

	var promisedDateText = getText("Promised Date");
	promisedDateText.innerHTML = "Promised Date"
	promisedDateText.classList.add("promised-date-padding");
	var promisedDateString = item.promised_date;

	var promisedDate = getLocalDateFormat(promisedDateString);
	promisedDate.className = "text-center";

	var userImgDiv = document.createElement("div");
	userImgDiv.classList.add("media-left");
	userImgDiv.classList.add("media-top");
	var userIcon = getImage(item.donating_user.user_profile_picture);
	userIcon.classList.add("media-object");
	userIcon.classList.add("thumbnail");
	console.log(userIcon);

	var userDetailDiv = document.createElement("div");
	userDetailDiv.classList.add("media-body");

	var userName = getHeaderText(item.donating_user.first_name, 4);
	userName.classList.add("media-heading");

	var donationId = document.createElement("h5");
	donationId.innerHTML = "#000" + item.donation_id;

	var userEmail = document.createElement("h5");
	userEmail.innerHTML = item.donating_user.email;


	var status = document.createElement("h5");
	if (item.is_donation_completed == false) {
		status.innerHTML = "Waiting";
	} else {
		status.innerHTML = "Received";
	}

	var itemTable = document.createElement("table");
	itemTable.classList.add("table");
	itemTable.classList.add("table-hover");
	itemTable.classList.add("table-responsive");
	itemTable.classList.add("table-bottom-padding")

	var tableHeader = createRow("Item Name", "Quantity", "Unit");
	var tableBody = document.createElement("tbody");
	tableBody.append(tableHeader);
	var tableContent = [];

	var donationItemList = item.donation_item_list;

	var donationItemListSize = donationItemList.length;

	if (donationItemListSize > ITEM_COUNT) {
		console.log("more buton created");
		var moreButton = document.createElement("button");
		moreButton.setAttribute("id", "moreButtonId");
		moreButton.classList.add("btn-link");
		moreButton.classList.add("pull-right");
		moreButton.innerHTML = "click to see full details";
	}

	if (donationItemList != null) {
		//          if (document.getElementById("moreButtonId"))
		//              donationItemListSize = donationItemList.length;
		//          else
		//              donationItemListSize = 1;
		//          console.log(document.getElementById("moreButtonId"));
		for (var i = 0; i < 1; i++) {
			var itemName = donationItemList[i].goods_item_detail.sub_item_category_one;
			var itemQuantity = donationItemList[i].goods_item_detail.quantity;
			var itemUnit = donationItemList[i].goods_item_detail.unit;
			tableContent[i] = createRow(itemName, itemQuantity, itemUnit);
			tableBody.append(tableContent[i]);


		}
	}

	var receivedButton = document.createElement("button");
	receivedButton.classList.add("btn");
	receivedButton.classList.add("btn-success");
	receivedButton.classList.add("pull-right");
	receivedButton.setAttribute("type", "button");
	receivedButton.setAttribute("data-toggle", "tool-tip");
	receivedButton.setAttribute("title", "Click to mark it as received");
	receivedButton.setAttribute("data-target", "#");
	receivedButton.innerHTML = "Received";



	var breakLine = document.createElement("br");
	var hrline = document.createElement("hr");
	var hrline1 = document.createElement("hr");


	cardContentDiv.append(hrline);
	promisedDateDiv.append(promisedDateText);
	promisedDateDiv.append(promisedDate);


	userImgDiv.append(userIcon);

	userDetailDiv.append(userName);
	userDetailDiv.append(donationId);
	userDetailDiv.append(userEmail);
	userDetailDiv.append(status);


	itemTable.append(tableBody);

	cardContentDiv.append(promisedDateDiv);
	cardContentDiv.append(userImgDiv);
	cardContentDiv.append(userDetailDiv);
	cardContentDiv.append(itemTable);



	if (donationItemListSize > 1) {
		cardContentDiv.append(moreButton);
	}


	promisedCardDiv.append(cardContentDiv);
	promisedCardDiv.append(receivedButton);
	promisedCardDiv.append(breakLine);
	promisedCardDiv.append(hrline1);

	doc.appendChild(promisedCardDiv);

	document.getElementById("promised-donation-card").appendChild(doc);


}


function create_donation_item_details(item) {

	var goodsItemList = item.goods_item_list

	for (var i = 0; i < goodsItemList.length; i++) {

		var itemsNeeded = document.createDocumentFragment();

		var itemDetailOuterDiv = document.createElement("div");
		itemDetailOuterDiv.className = "media";

		var itemDetailParentDiv = document.createElement("div");
		itemDetailParentDiv.className = "media-body";

		var itemDetailTable = document.createElement("table")
		itemDetailTable.classList.add("table");
		itemDetailTable.classList.add("table-padding");
		itemDetailTable.classList.add("table-hover");
		itemDetailTable.classList.add("table-responsive");

		var itemDetailTableBody = document.createElement("tbody")
		var tableHeader = createRow("Required", "Promised", "Received");
		tableHeader.className = "table-header-color";

		itemDetailTableBody.append(tableHeader);
		var tableContent = [];

		var itemCategory = goodsItemList[i].sub_item_category_two;
		if (itemCategory != null)
			itemCategory = "(" + itemCategory + ")";
		else
			itemCategory = "";
		var itemName = getHeaderText(goodsItemList[i].sub_item_category_one + itemCategory, 4);
		itemName.classList.add("media-heading");
		itemName.classList.add("text-center");
		var required = goodsItemList[i].quantity + " (" + goodsItemList[i].unit + ")";
		var promised = goodsItemList[i].quantity + " (" + goodsItemList[i].unit + ")";
		var received = goodsItemList[i].quantity + " (" + goodsItemList[i].unit + ")";

		tableContent[i] = createRow(required, promised, received);
		tableContent[i].className = "table-data-font";
		itemDetailTableBody.append(tableContent[i]);

		itemDetailTable.append(itemDetailTableBody);
		itemDetailParentDiv.append(itemName);
		itemDetailParentDiv.append(itemDetailTable);
		itemDetailOuterDiv.append(itemDetailParentDiv);

		itemsNeeded.appendChild(itemDetailOuterDiv);

		document.getElementById("itemsRequired").appendChild(itemsNeeded);

	}
	//A new Commnet By ganesh for test
	var postedDate = getLocalDateFormat(item.posted_date);
	var deadline = getLocalDateFormat(item.deadline);
	document.getElementById("postedDate").innerHTML = postedDate;
	document.getElementById("deadline").innerHTML = deadline;
	document.getElementById("main-item-name").innerHTML = item.main_item;
	document.getElementById("main-item-image").setAttribute("src", item.main_item_image);
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

function createHistoryCard(item) {
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

	document.getElementById("history-card").appendChild(doc);

}

function createDonationDetails(donationItem) {
	donationDetailCard = document.createDocumentFragment();

	donationDetailParentdiv = document.createElement("div");
	donationDetailParentdiv.classList.add("donation-card");
	donationDetailParentdiv.classList.add("media");
	donationDetailParentdiv.classList.add("padding");

	donorImageDiv = document.createElement("div");
	donorImageDiv.classList.add("media-left");
	donorImageDiv.classList.add("media-middle");

	donorImage = getImage(donationItem.donating_user.user_profile_picture);
	donorImage.classList.add("media-object");
	donorImage.classList.add("thumbnail");
	donorImage.setAttribute("style", "width:80px");

	donorImageDiv.append(donorImage);

	donationDetailDiv = document.createElement("div");
	donationDetailDiv.className = "media-body";

	donorName = getHeaderText(donationItem.donating_user.first_name, 4);
	donorName.classList.add("media-heading");
	donorName.classList.add("text-center");

	donationDetailDiv.append(donorName);

	donationTable = document.createElement("table");
	donationTable.classList.add("table");
	donationTable.classList.add("table-hover");
	donationTable.classList.add("table-responsive");

	var promisedDate = getLocalDateFormat(donationItem.promised_date);
	donationTableBody = document.createElement("tbody");
	tableHeader = createRowWithTwoColumns("Status", "Promised Date");
	tableContent = createRowWithTwoColumns("Promised", promisedDate);
	tableContent.className = "table-data-font"

	donationTableBody.appendChild(tableHeader);
	donationTableBody.appendChild(tableContent);

	donationTable.append(donationTableBody);
	donationDetailDiv.append(donationTable);

	receivedButton = document.createElement("button");
	receivedButton.classList.add("btn");
	receivedButton.classList.add("btn-success");
	receivedButton.classList.add("pull-right");
	receivedButton.setAttribute("type", "button");
	receivedButton.innerHTML = "Received";

	donationDetailDiv.append(receivedButton);

	var hr = document.createElement('hr');

	donationDetailParentdiv.append(donorImageDiv);
	donationDetailParentdiv.append(donationDetailDiv);
	donationDetailParentdiv.append(hr);
	donationDetailCard.append(donationDetailParentdiv);

	document.getElementById('donation-detail').appendChild(donationDetailCard);

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

function createGoodsItemDetailCard(goodsItemDetail) {
	goodsItemDetailDoc = document.createDocumentFragment();

	goodsItemDetailCard = document.createElement("div");
	goodsItemDetailCard.classList.add("card");
	goodsItemDetailCard.classList.add("col-md-6");


	goodsItemDetailHeader = document.createElement("div");
	goodsItemDetailHeader.classList.add("col-md-8");
	goodsItemDetailHeader.classList.add("goods-detail");

	goodsItemname = getHeaderText(goodsItemDetail.sub_item_category_one, 4);

	var descriptipn = getText("Desc: ");
	var desc = document.createElement("span");
	desc.classList.add("text-success");
	desc.classList.add("table-data-font");

	var desctext = goodsItemDetail.goods_text_description;
	if (desctext == null)
		desctext = "No description available";
	desc.innerHTML = desctext;
	descriptipn.append(desc);

	var receivedText = getHeaderText("Received", 5);
	receivedText.className = "goods";

	var receivedProgressValue = promisedDonationProgressBar(100);

	goodsItemDetailHeader.appendChild(goodsItemname);
	goodsItemDetailHeader.appendChild(descriptipn);
	goodsItemDetailHeader.appendChild(receivedText);
	goodsItemDetailHeader.appendChild(receivedProgressValue);

	var quantityDiv = document.createElement("div");
	quantityDiv.classList.add("col-md-3");
	quantityDiv.classList.add("goods-detail");

	var quantityParentDiv = document.createElement("div");
	quantityParentDiv.classList.add("row");
	quantityParentDiv.classList.add("goods-item-card");
	quantityParentDiv.classList.add("input-group");

	var minusQuantitySpan = document.createElement("span");
	minusQuantitySpan.className = "input-group-btn";

	var minusButton = document.createElement("button");
	minusButton.classList.add("btn");
	minusButton.classList.add("btn-danger");
	minusButton.classList.add("btn-number");
	minusButton.setAttribute("type", "button");
	minusButton.setAttribute("data-type", "minus");
	minusButton.setAttribute("data-field", "quant[2]");

	var minusButtonIcon = document.createElement("span");
	minusButtonIcon.classList.add("glyphicon");
	minusButtonIcon.classList.add("glyphicon-minus");

	minusButton.append(minusButtonIcon);
	minusQuantitySpan.append(minusButton);

	var quantityText = document.createElement("input");
	quantityText.classList.add("form-control");
	quantityText.classList.add("text-center");
	quantityText.classList.add("input-number");
	quantityText.setAttribute("type", "text");
	quantityText.setAttribute("name", "quant[2]");
	quantityText.setAttribute("value", "0");
	quantityText.setAttribute("min", "1");
	quantityText.setAttribute("max", "100");


	var plusQuantitySpan = document.createElement("span");
	plusQuantitySpan.className = "input-group-btn";

	var plusButton = document.createElement("button");
	plusButton.classList.add("btn");
	plusButton.classList.add("btn-success");
	plusButton.classList.add("btn-number");
	plusButton.setAttribute("type", "button");
	plusButton.setAttribute("data-type", "plus");
	plusButton.setAttribute("data-field", "quant[2]");

	var plusButtonIcon = document.createElement("span");
	plusButtonIcon.classList.add("glyphicon");
	plusButtonIcon.classList.add("glyphicon-plus");

	plusButton.append(plusButtonIcon);
	plusQuantitySpan.append(plusButton);

	quantityParentDiv.append(minusQuantitySpan);
	quantityParentDiv.append(quantityText);
	quantityParentDiv.append(plusQuantitySpan);

	quantityDiv.append(quantityParentDiv);

	var itemDetailTable = document.createElement("table")
	itemDetailTable.classList.add("table");
	itemDetailTable.classList.add("table-padding");
	itemDetailTable.classList.add("table-hover");
	itemDetailTable.classList.add("table-responsive");

	var itemDetailTableBody = document.createElement("tbody")
	var tableHeader = createRow("Required", "Promised", "Received");
	tableHeader.className = "table-header-color";

	itemDetailTableBody.append(tableHeader);

	var itemCategory = goodsItemDetail.sub_item_category_two;
	if (itemCategory != null)
		itemCategory = "(" + itemCategory + ")";
	else
		itemCategory = "";
	var itemName = getHeaderText(goodsItemDetail.sub_item_category_one + itemCategory, 4);
	itemName.classList.add("media-heading");
	itemName.classList.add("text-center");

	var required = goodsItemDetail.quantity + " (" + goodsItemDetail.unit + ")";
	var promised = goodsItemDetail.quantity + " (" + goodsItemDetail.unit + ")";
	var received = goodsItemDetail.quantity + " (" + goodsItemDetail.unit + ")";

	var tableContent = createRow(required, promised, received);
	tableContent.className = "table-data-font";
	itemDetailTableBody.append(tableContent);

	itemDetailTable.append(itemDetailTableBody);

	var br = document.createElement("br");
	goodsItemDetailCard.append(goodsItemDetailHeader);
	goodsItemDetailCard.append(quantityDiv);
	goodsItemDetailCard.append(br);
	goodsItemDetailCard.append(itemDetailTable);

	goodsItemDetailDoc.append(goodsItemDetailCard);

	document.getElementById("goods-item-card").appendChild(goodsItemDetailDoc);


}

function createNotificationCard(item) {

	var doc = document.createDocumentFragment();

	var notificationCardContainer = document.createElement("div");
	notificationCardContainer.className = "container";
	var notificationCardDiv = document.createElement("div");
	notificationCardDiv.classList.add("card");
	notificationCardDiv.classList.add("col-md-3");



	var cardContentDiv = document.createElement("div");
	cardContentDiv.className = "media";

	var itemImageDiv = document.createElement("div");
	itemImageDiv.classList.add("media-left");
	itemImageDiv.classList.add("media-middle");
	var itemImage = getImage(item.main_item_icon);
	itemImage.classList.add("notification-card-img-padding");
	itemImage.classList.add("media-object");
	itemImage.classList.add("thumbnail");

	var notificationContentDiv = document.createElement("div");
	notificationContentDiv.classList.add("media-body");
	notificationContentDiv.classList.add("media-middle");

	var orgName = item.organisation.org_name;

	var mainItem = item.main_item;

	var date = getLocalDateFormat(item.actioned_time);

	var notification_type = item.task_type;

	if (notification_type == REQUEST_TYPE_DONATION) {
		var notificationMsg = getText(DONATION_NOTIFICATION_MSG + " " + mainItem + " " + TO_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
		cardContentDiv.append(itemImageDiv);
		cardContentDiv.append(notificationContentDiv);
	} else if (notification_type == REQUEST_TYPE_SERVICE) {
		var notificationMsg = getText(SERVICE_NOTIFICATION_MSG + " " + mainItem + " " + TO_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
		cardContentDiv.append(notificationContentDiv);
		cardContentDiv.append(itemImageDiv);
	} else {
		var notificationMsg = getText(THANK_YOU_NOTIFICATION_MSG + " " + mainItem + " " + FROM_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
		cardContentDiv.append(notificationContentDiv);
		cardContentDiv.append(itemImageDiv);
	}

	itemImageDiv.append(itemImage);
	notificationContentDiv.append(notificationMsg);

	notificationCardDiv.append(cardContentDiv);

	notificationCardContainer.append(notificationCardDiv);

	doc.appendChild(notificationCardContainer);

	document.getElementById("notification-card-id").appendChild(doc);


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
