var goodsItemList = [];
var count = -1;

function loadMianItems(mainItemUrl) {
	$.getJSON(mainItemUrl, function (data) {})
		.done(function (data) {
			var t = JSON.parse(jsonEscape(data))
			createSelectOptions(t, "goods-main-item-category", "main_item_name", "main_item_id");
			loadSubItemDetails();
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("main Item load complete");
		});
}

function loadSubItemDetails() {
	var mainItemId = document.getElementById("goods-main-item-category").value;

	var subItemUrl = "/humane/subItemDetails/?main_item=" + mainItemId + "&isweb=True&callback=?";

	$.getJSON(subItemUrl, function (data) {})
		.done(function (data) {
			$("#goods-sub-item-one-category").empty();
			var t = JSON.parse(jsonEscape(data))
			console.log(t)
			createSelectOptions(t, "goods-sub-item-one-category", "sub_item_category_one_name", "sub_item_category_one_id");
			loadSubItemCategoryTwoDetails();
			loadAllowedUnitDetails();
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("sub Item load complete");
		});

}

function loadSubItemCategoryTwoDetails() {
	var subItemId = document.getElementById("goods-sub-item-one-category").value;
	console.log("sub item id " + subItemId)
	var subItemTwoUrl = "/humane/subItemDetailsCategoryTwo/?sub_item_category_one=" + subItemId + "&isweb=True&callback=?";

	$.getJSON(subItemTwoUrl, function (data) {})
		.done(function (data) {


			$("#goods-sub-item-two-category").empty();
			var t = JSON.parse(jsonEscape(data))
			if (t.length == 0) {
				console.log("sub item empty");
				document.getElementById("goods-sub-item-two-category").disabled = true;

			} else {
				document.getElementById("goods-sub-item-two-category").disabled = false;
				createSelectOptions(t, "goods-sub-item-two-category", "sub_item_category_two_name", "sub_item_category_two_id");
			}

		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("sub Item two load complete");
		});

}

function loadAllowedUnitDetails() {
	var subItemId = document.getElementById("goods-sub-item-one-category").value;
	console.log("sub item id in unit lookup " + subItemId)
	var allowedUnitUrl = "/humane/allowedUnitDetails/?sub_item=" + subItemId + "&isweb=True&callback=?";

	$.getJSON(allowedUnitUrl, function (data) {})
		.done(function (data) {
			$("#goods-unit").empty();
			var t = JSON.parse(jsonEscape(data))
			createSelectOptions(t, "goods-unit", "unit_name", "unit");
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("allowed unit load complete");
		});

}

function addItemsTotable() {
	var deadline = document.getElementById("deadline");
	deadline.required = false;

	var addItemBtn = document.getElementById("add-new-item");

	var subItemOneId = document.getElementById("goods-sub-item-one-category").value
	var subItemTwoId = document.getElementById("goods-sub-item-two-category").value;
	var quantity = $("#quantity").val();

	var subItemOne = $("#goods-sub-item-one-category option:selected").text();
	var subItemTwo = $("#goods-sub-item-two-category option:selected").text();


	if (quantity == "" || quantity <= 0) {
		addItemBtn.removeAttribute("data-toggle");
		addItemBtn.removeAttribute("data-target");
		return;
	}

	var ifItemExists = checkIfItemExists(subItemOneId, subItemTwoId, quantity);

	if (ifItemExists) {
		if (quantity != "" || quantity >= 0) {
			console.log("quantity valid " + quantity + "f");
			var existingQuantity = parseInt(document.getElementById("item3" + subItemOne).innerHTML);
			document.getElementById("item3" + subItemOne).innerHTML = existingQuantity + parseInt(quantity);
		} else
			console.log("quantity invalid")

	} else {

		if (subItemTwo == "" || subItemTwo == "Select Sub Item Two")
			subItemTwo = "--";

		console.log("sub item two " + subItemTwo)
		var tableContent = createRow(subItemOne, subItemTwo, quantity);

		var removeItem = document.createElement("td");
		removeItem.className = "text-center";
		var removeButtonIcon = document.createElement("span");
		removeButtonIcon.classList.add("glyphicon");
		removeButtonIcon.classList.add("glyphicon-remove-circle");
		removeButtonIcon.classList.add("color-red");
		removeItem.append(removeButtonIcon);
		removeItem.addEventListener("click", function () {
			removeItemsFromtable(this)
		});
		tableContent.append(removeItem)

		removeItem.setAttribute("id", subItemOneId + " " + subItemTwoId);
		document.getElementById("goods-item-list").append(tableContent);



		var goodsItem = {
			quantity: quantity,
			goods_text_description: $("#goods-desc").val(),
			sub_item_category_one: document.getElementById("goods-sub-item-one-category").value,
			sub_item_category_two: (subItemTwoId != "" ? subItemTwoId : undefined),
			unit: document.getElementById("goods-unit").value
		}
		goodsItemList[++count] = goodsItem;
		document.getElementById("goods-main-item-category").disabled = true;
	}

	addItemBtn.setAttribute("data-toggle", "collapse");
	addItemBtn.setAttribute("data-target", "#demo");
	showHideAddBtn(true);
	document.getElementById("goods-item-table").classList.remove("hidden");
	document.getElementById("publish-div").classList.remove("hidden");

}

function publishGoods() {
	var deadline = document.getElementById("deadline")
	var localFormatDate = deadline.value
	if (localFormatDate == "" || localFormatDate == null) {
		console.log("date null")
		deadline.required = true;
		return;
	} else
		deadline.required = false;

	var date = new Date(localFormatDate)
	console.log("date " + date)
	var serverFormatDate = convertIntoServerDateTime(date);

	console.log("deadline local " + localFormatDate);
	console.log("deadline server " + serverFormatDate);

	var goodsDetail = {
		goods_item_list: goodsItemList,
		deadline: (serverFormatDate != null ? serverFormatDate : convertIntoServerDateTime(date)),
		main_item: document.getElementById("goods-main-item-category").value
	}
	console.log("goods detail post data " + JSON.stringify(goodsDetail))
	$.ajax({
		url: '/humane/goodsDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("success");
		},
		data: JSON.stringify(goodsDetail)

	});
}

function showHideAddBtn(visibility) {
	if (visibility)
		document.getElementById("add-new-item-btn").classList.remove("hidden");
	else
		document.getElementById("add-new-item-btn").classList.add("hidden");
}


function removeItemsFromtable(row) {
	var parentRowIndex = row.parentNode.rowIndex;
	document.getElementById("goods-item-table").deleteRow(parentRowIndex);

	var rowId = row.id;
	ids = rowId.split(" ");
	subItemOneId = ids[0];
	subItemTwoId = ids[1];

	for (var ke in goodsItemList) {
		if (goodsItemList.hasOwnProperty(ke)) {
			console.log("has key " + goodsItemList[ke])
			if (goodsItemList[ke].sub_item_category_one == subItemOneId) {
				console.log("subItemOneId matched")
				if (subItemTwoId == "" || goodsItemList[ke].sub_item_category_two == subItemTwoId) {
					console.log("subIteTwoeId matched")
					delete goodsItemList[ke]
					break;
				}
			}

		}
	}

	--count;
	goodsItemList = filter_array(goodsItemList)
	if (goodsItemList.length <= 0) {
		document.getElementById("goods-item-table").classList.add("hidden");
		document.getElementById("publish-div").className = "hidden"
		showHideAddBtn(false);
		document.getElementById("demo").className = "in"

		document.getElementById("goods-main-item-category").disabled = false;
	}
	console.log("goods item list " + goodsItemList.length)
}

function filter_array(jsonArray) {
	return jsonArray.filter(function (x) {
		return x !== null
	});
}

function checkIfItemExists(subItemOneId, subItemTwoId, quantity) {
	var itemExists = false;
	for (var ke in goodsItemList) {
		if (goodsItemList.hasOwnProperty(ke)) {
			if (goodsItemList[ke].sub_item_category_one == subItemOneId) {
				if (subItemTwoId == "" || goodsItemList[ke].sub_item_category_two == subItemTwoId) {
					var quant = goodsItemList[ke].quantity;
					console.log("quantity " + quant)
					quant = parseInt(quant) + parseInt(quantity)
					goodsItemList[ke].quantity = quant;
					if ($("#goods-desc").val() != "")
						goodsItemList[ke].goods_text_description = $("#goods-desc").val()
					console.log("quantity after addition " + goodsItemList[ke].quantity);
					itemExists = true;
					break;
				}
			}
		}
	}
	console.log("item exists " + itemExists);
	return itemExists;
}
