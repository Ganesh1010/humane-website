function loadOrganisationGoodsDetail(id) {

	$.getJSON("/humane/goodsDetail/" + id + "/?isweb=true&callback=?", function (data) {})
		.done(function (data) {
			$("#org-goods-detail").show();
			getDonationItemDetails(data);
			getDonationDetails(id);
		})
		.fail(function () {
			$(".loader").hide()
			alert("No Goods Detail Found");
			window.location.href = "/html/homePage"
		})
		.always(function () {
			console.log("particular goods item page load complete");
		});
}

function getDonationItemDetails(data) {
			var goodsItemData = $.parseJSON(data)
			var donationList = $.parseJSON(data)['donation_list']
			create_donation_item_details(goodsItemData, donationList);
		}

function getDonationDetails(id) {
	var url = "/humane/donationDetail/?goods=" + id + "&isweb=true&callback=?"
	$.getJSON(url, function (data) {}).done(function (data) {

			var count = $.parseJSON(data)['count']
			console.log("donation count " + count)
			if (parseInt(count) != 0)
				loadPromisedDonationDetails(data);
			else {
				$('.loader').hide();
				$("#promised-donation-card").html("No Donation(s) Made");
			}
			if (count > 10)
				createPagination(count, url, "promised_donation_pagination", "#promised-donation-card", 7);
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("particular goods item page load complete");
		});

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
		for (var i = 0; i < 1; i++) {
			var itemName = donationItemList[i].goods_item_detail.sub_item_category_one;
			var itemQuantity = donationItemList[i].quantity;
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

	promisedCardDiv.addEventListener('click', function () {

		promisedCardDiv.setAttribute("data-toggle", "modal");
		promisedCardDiv.setAttribute("data-target", "#donation-detail-modal");
		orgPromisedDonationCardDetail(item);

	});

	promisedCardDiv.append(cardContentDiv);
	if (!item.is_donation_completed)
		promisedCardDiv.append(receivedButton)
	promisedCardDiv.append(breakLine);
	promisedCardDiv.append(hrline1);

	doc.appendChild(promisedCardDiv);

	document.getElementById("promised-donation-card").appendChild(doc);


}

function orgPromisedDonationCardDetail(itemDetail) {


	$('#user_name').html(itemDetail.donating_user.first_name);
	$('#user_email').html(itemDetail.donating_user.email);
	$('#user_mobile').html(itemDetail.donating_user.country_code + " " + itemDetail.donating_user.mobile);
	$('#donation_id').html("#000" + itemDetail.donation_id);
	$('#user_image').attr("src", itemDetail.donating_user.user_profile_picture);
	var promisedDate = getLocalDateFormat(itemDetail.promised_date)
	$('#user_promised_date').html(promisedDate);

	if (!itemDetail.is_donation_completed)
		$('#received_btn').show()
	else
		$('#received_btn').hide()
	$('#received_btn').click(function () {
		console.log("donation marked as recived id", $('#donation_id').val())
		markDonationReceived(itemDetail.donation_id)
	});


	var donationItemList = itemDetail.donation_item_list;
	var tableContent = [];
	$("#contribution-list").empty();

	if (donationItemList != null) {
		for (var i = 0; i < donationItemList.length; i++) {
			var itemName = donationItemList[i].goods_item_detail.sub_item_category_one;
			var itemcategory = donationItemList[i].goods_item_detail.sub_item_category_two;
			if (itemcategory == null || itemcategory == "")
				itemcategory = "--"
			var quantity = donationItemList[i].quantity;
			tableContent[i] = createRow(itemName, itemcategory, quantity);
			$('#contribution-list').append(tableContent[i]);

		}

	}

	if (itemDetail.is_volunteer_required == true) {
		$('#status').html("Volunteer Required : Yes");
	} else {
		$('#status').html("Volunteer Required : <b>No");
	}

}

function markDonationReceived(donationId) {

	var donationDetailId = {
		donation_id: donationId
	}
	console.log("donation item id", JSON.stringify(donationDetailId));
	$.ajax({
		beforeSend: function () {
			if ($('#donation-detail-modal').is(':visible'))
				$('#donation-detail-modal').modal('toggle');
			$(".loader").show();
		},
		url: '/humane/donationCompletion/',
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
			console.log("response while posting new service " + response)
			$(".loader").hide();

		},
		data: JSON.stringify(donationDetailId)

	});
}

function loadPromisedDonationDetails(data) {
	var t = $.parseJSON(data)['results']
	$('.loader').hide();
	$.each(t, function (key, value) {
		createOrganisationPromisedDonationCard(value);

	});
}

function closeGoods(goodsId) {
	var goodsId = {
		goods_id: goodsId
	}

	$.ajax({
		beforeSend: function () {
			$(".loader").show();
		},
		url: '/humane/needCompletion/',
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
			console.log("response while closing goods " + response)
			$(".loader").hide();

		},
		data: JSON.stringify(goodsId)

	});

}
