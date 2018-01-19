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

	var thankYouVideoIcon = getImage("/static/assests/Images/thank-you-video-icon.png");
	thankYouVideoIcon.classList.add("media-object");
	thankYouVideoIcon.classList.add("img-circle");
	thankYouVideoIcon.classList.add("small-img");
	thankYouVideoIcon.setAttribute("data-toggle", "tooltip");
	thankYouVideoIcon.setAttribute("title", "click to see the thank you video");

	if (donationDetail.is_thank_you_video_posted){
		thankYouVideoDiv.append(thankYouVideoIcon);
	   
	}

	var volunteerDiv = document.createElement("div");
	volunteerDiv.classList.add("media-right");
	volunteerDiv.classList.add("media-top");

	var volunteerIcon = getImage("/static/assests/Images/volunteer.png");
	volunteerIcon.classList.add("media-object");
	volunteerIcon.classList.add("img-circle");
	volunteerIcon.classList.add("small-img");
	volunteerIcon.setAttribute("data-toggle", "tooltip");
	volunteerIcon.setAttribute("title", "You have asked for the volunteer");

	if (donationDetail.is_volunteer_required){
		volunteerDiv.append(volunteerIcon);
		
		
	}


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
	var servicingTimeText = getHourPeriod(item.service_interest_expressed_start_time) + " to " + getHourPeriod(item.service_interest_expressed_end_time);
	var servicingTime = getText(servicingTimeText);
	console.log(servicingTime);

	var servicingDate = getLocalDateFormat(item.service_interest_expressed_date);

	var thankYouVideoIconDiv = document.createElement("div");
	thankYouVideoIconDiv.classList.add("media-right");
	thankYouVideoIconDiv.classList.add("media-top");

	var thankYouVideoIcon = getImage("/static/assests/Images/thank-you-video-icon.png");
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

function loadUserServiceInterestedDetails(data) {
			var t = $.parseJSON(data)['results']
			
			$.each(t, function(key, value) {
				userServiceInterestCard(value);

			});
			
			$('#service-interested-loader').hide();
		}

		function getPromisedDonationDetails(data) {
			var t = $.parseJSON(data)['results']
			//  var t =data['results'];
			
			$.each(t, function(key, value) {
				//console.log(value)
				createPromisedDonationcard(value);

			});
			$('#donation-loader').hide();
			
		}