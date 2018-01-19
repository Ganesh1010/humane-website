	var goodsItemList;
	
	function getGoodsItemDetails(data) {
			var goodsDetail = JSON.parse(jsonEscape(data))
			goodsItemList = goodsDetail['goods_item_list']
			var donationList = goodsDetail['donation_list']
			$.each(goodsItemList, function(key, value) {
				createGoodsItemDetailCard(donationList, goodsItemList, value);
			});
			$('.loader').hide();
			var organisationDetail = JSON.parse(jsonEscape(data))['organisation_detail']
			document.getElementById("org-name").innerHTML = organisationDetail.org_name;
			document.getElementById("org-address").innerHTML = organisationDetail.city + " - " + organisationDetail.postal_code;
			document.getElementById("org-mobile").innerHTML = organisationDetail.mobile;
			console.log("org_logo " + organisationDetail.org_logo);
			document.getElementById("org-logo").setAttribute("src", organisationDetail.org_logo);
			
			console.log("deadline ",goodsDetail.deadline);
			
			$('#donation-promised-date').datepicker('setEndDate', new Date(goodsDetail.deadline));
			
			var promisedPercentage = promisedDonationProgressBar(getPromisedPercentage(goodsItemList, donationList));
			document.getElementById("promised-donation-percentage").append(promisedPercentage);
			
			document.getElementById("org-logo").onclick = function(){
			console.log("Org detail page");
			var link = "/html/orgDetailPage";
					console.log("on click card", organisationDetail.org_id);

					link += "?id=" + organisationDetail.org_id;
					console.log("url", link);
					window.location.href = link;
		
			};
		}

function createGoodsItemDetailCard(donationlist, goodsItemList, goodsItemDetail) {
	goodsItemDetailDoc = document.createDocumentFragment();

	var goodsItemId = goodsItemDetail.goods_item_id;
	goodsItemDetailCard = document.createElement("div");
	goodsItemDetailCard.classList.add("card");
	goodsItemDetailCard.classList.add("col-md-6");


	goodsItemDetailHeader = document.createElement("div");
	goodsItemDetailHeader.classList.add("col-md-8");
	goodsItemDetailHeader.classList.add("goods-detail");

	var descriptipn = getText("Desc: ");
	var desc = document.createElement("span");
	desc.classList.add("text-success");
	desc.classList.add("table-data-font");

	var desctext = goodsItemDetail.goods_text_description;
	if (desctext == null || desctext=="")
		desctext = "No description available";
	desc.innerHTML = desctext;
	descriptipn.append(desc);

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
	minusButton.setAttribute("id", "decrement" + goodsItemId);
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
	quantityText.setAttribute("id", "donationQuantity" + goodsItemId);
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
	plusButton.setAttribute("id", "increment" + goodsItemId);
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

	var itemCategoryOne = goodsItemDetail.sub_item_category_one;
	var itemCategoryTwo = goodsItemDetail.sub_item_category_two;

	if (itemCategoryTwo != null)
		itemCategoryTwo = " (" + itemCategoryTwo + ")";
	else
		itemCategory = "";
	var itemName = getHeaderText(itemCategoryOne, 4);
	itemName.classList.add("media-heading");
	itemName.setAttribute("id", "itemCategoryOne" + goodsItemId);
	var itemCategory = getHeaderText(itemCategoryTwo, 4);
	itemCategory.classList.add("media-heading");
	itemCategory.setAttribute("id", "itemCategoryTwo" + goodsItemId);

	var requiredQuantity = goodsItemDetail.quantity;
	var receivedQuantity = getReceivedQuantity(donationlist, goodsItemId);
	var required = requiredQuantity + " (" + goodsItemDetail.unit + ")";
	var promised = getPromisedQuantity(donationlist, goodsItemId);
	var received = receivedQuantity;

	if (promised == 0)
		promised = "-";
	else
		promised = getPromisedQuantity(donationlist, goodsItemId) + " (" + goodsItemDetail.unit + ")";
	if (received == 0)
		received = "-";
	else
		received = getReceivedQuantity(donationlist, goodsItemId) + " (" + goodsItemDetail.unit + ")";


	var tableContent = createRow(required, promised, received);
	tableContent.className = "table-data-font";
	itemDetailTableBody.append(tableContent);

	itemDetailTable.append(itemDetailTableBody);

	var br = document.createElement("br");

	goodsItemDetailHeader.appendChild(itemName);
	goodsItemDetailHeader.appendChild(itemCategory);
	goodsItemDetailHeader.appendChild(descriptipn);

	goodsItemDetailCard.append(goodsItemDetailHeader);
	goodsItemDetailCard.append(quantityDiv);
	goodsItemDetailCard.append(br);
	goodsItemDetailCard.append(itemDetailTable);

	goodsItemDetailDoc.append(goodsItemDetailCard);

	document.getElementById("goods-item-card").appendChild(goodsItemDetailDoc);

	document.getElementById("decrement" + goodsItemId).disabled = true;

	var balanceQuantity = Math.abs(requiredQuantity - receivedQuantity);
	console.log(balanceQuantity);

	document.getElementById("increment" + goodsItemId).onclick = function () {
		setDonationQuantity("inc", document.getElementById("donationQuantity" + goodsItemId).value, goodsItemId, balanceQuantity);
		checkIfItemsAdded(goodsItemList);
	};

	document.getElementById("decrement" + goodsItemId).onclick = function () {
		setDonationQuantity("dec", document.getElementById("donationQuantity" + goodsItemId).value, goodsItemId, balanceQuantity);
		checkIfItemsAdded(goodsItemList);
	};

	document.getElementById("donationQuantity" + goodsItemId).addEventListener("keyup", function () {
		setDonationQuantity("", document.getElementById("donationQuantity" + goodsItemId).value, goodsItemId, balanceQuantity);
		checkIfItemsAdded(goodsItemList);
	});

}

function setDonationQuantity(action, quantity, goodsItemId, balanceQuantity) {
	quantity = parseInt(quantity);

	if (action == "inc")
		quantity = quantity + 1;

	else if (action == "dec")
		quantity = quantity - 1;

	if (quantity < 0)
		quantity = 0;

	else if (quantity == 0)
		document.getElementById("decrement" + goodsItemId).disabled = true;


	if (quantity > balanceQuantity)
		quantity = balanceQuantity;

	else if (quantity == balanceQuantity)
		document.getElementById("increment" + goodsItemId).disabled = true;

	console.log("quantity " + quantity);
	if (isNaN(quantity))
		quantity = 0;

	if (quantity > 0)
		document.getElementById("decrement" + goodsItemId).disabled = false;
	else
		document.getElementById("decrement" + goodsItemId).disabled = true;

	if (quantity < balanceQuantity)
		document.getElementById("increment" + goodsItemId).disabled = false;
	else
		document.getElementById("increment" + goodsItemId).disabled = true;

	$("#donationQuantity" + goodsItemId).val(quantity);
}

function getDonatedItemDetails() {
	donationItemlist = document.createDocumentFragment();
	var tableContent = [];

	for (i = 0; i < goodsItemList.length; i++) {
		goodsItemId = goodsItemList[i].goods_item_id;
		console.log("goods item id", goodsItemId)
		if (parseInt(document.getElementById("donationQuantity" + goodsItemId).value) != 0) {
			var itemname = document.getElementById("itemCategoryOne" + goodsItemId).innerHTML;
			var itemCategory = document.getElementById("itemCategoryTwo" + goodsItemId).innerHTML;
			if (itemCategory == "")
				itemCategory = "--";
			tableContent[i] = createRow(itemname, itemCategory, document.getElementById("donationQuantity" + goodsItemId).value);
			donationItemlist.appendChild(tableContent[i]);
		}
	}

	$("#contribution-list").empty();
	document.getElementById("contribution-list").append(donationItemlist);

	console.log("user name " + USER_PROFILE.first_name)
	console.log("user email " + USER_PROFILE.email)

	document.getElementById("user-first-name").innerHTML = USER_PROFILE.first_name
	document.getElementById("user-email").innerHTML = USER_PROFILE.email
}

function checkIfItemsAdded(goodsItemList) {
	var itemsAdded = false;

	for (i = 0; i < goodsItemList.length; i++) {
		goodsItemId = goodsItemList[i].goods_item_id;
		if (parseInt(document.getElementById("donationQuantity" + goodsItemId).value) != 0)
			itemsAdded = true;
	}
	if (itemsAdded)
		$("#donation-detail-btn").show();
	else
		$("#donation-detail-btn").hide();
}

function postDonationDetail(goodsId) {
	var localFormatDate = document.getElementById("promised-date").value
	if (localFormatDate == null || localFormatDate == "")
		return;

	var time = document.getElementById("promised-time")
	var street = document.getElementById("street")
	var pincode = document.getElementById("pincode")
	var flat = document.getElementById("flat")
	var country  = document.getElementById("country")
	var state = document.getElementById("state")
	var city = document.getElementById("city")

	var count = -1;
	var itemList = [];
	for (i = 0; i < goodsItemList.length; i++) {
		goodsItemId = goodsItemList[i].goods_item_id;
		console.log("quantity ", parseInt(document.getElementById("donationQuantity" + goodsItemId).value))
		if (parseInt(document.getElementById("donationQuantity" + goodsItemId).value) != 0) {

			var item = {
				goods_item: goodsItemId,
				quantity: parseInt(document.getElementById("donationQuantity" + goodsItemId).value)
			}
			itemList[++count] = item
		}
	}

	var volunteerRequired;
	if ($('#volunteer').is(":checked")) {
		volunteerRequired = true;
		time.required = true;
		street.required = true;
		pincode.required = true;
		flat.required = true;
		city.required = true;
		state.required = true;
		country.required = true;
		

	} else {
		volunteerRequired = false;
		time.required = false;
		street.required = false;
		pincode.required = false;
		flat.required = false;
		country.required = false;
		state.required = false;
		city.required = false;
	}
	
	var date = new Date(localFormatDate)
	var time = $("#promised-time").val().split(":");
	var dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1], 0, 0);
	var promisedDateTime = new Date(dateTime.getTime() - (dateTime.getTimezoneOffset() * 60000)).toJSON();
	var serverFormatDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)).toJSON();
	
	console.log("data " + JSON.stringify(donationDetail));
	console.log("volunteerRequired " + volunteerRequired)

	if ($('#volunteer').is(":checked")) {
		pickupAddress = {
			door_no: $("#flat").val(),
			street: $("#street").val(),
			pincode: $("#pincode").val(),
			city: $("#city").val(),
			state: $("#state").val(),
			country: $("#country").val(),
		}
		if ($("#flat").val() == "" || $("#street").val() == "" || $("#pincode").val() == "" || $("#promised-time").val()=="")
			return;
		else
			pickupAddress = {
				door_no: $("#flat").val(),
				street: $("#street").val(),
				pincode: $("#pincode").val(),
				city: $("#city").val(),
				state: $("#state").val(),
				country: $("#country").val(),
			}

	}

	
	var donationDetail = {
		goods: goodsId,
		promised_date: ($('#volunteer').is(":checked")) ? promisedDateTime : serverFormatDate,
		is_volunteer_required: volunteerRequired,
		donation_item_list: itemList,
		pickup_address: ($('#volunteer').is(":checked")) ? pickupAddress : undefined
	}

	$.ajax({
		beforeSend: function () {
			$("#donate-btn").prop('disabled', true);
			$('#donate-modal').modal('toggle');
			$(".loader").show();
			
		},
		url: '/humane/donationDetail/',
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
			console.log("response while donatoion " + response)
			$("#donate-btn").prop('disabled', false);
			$(".loader").hide();
		},

		data: JSON.stringify(donationDetail)
	});
}
