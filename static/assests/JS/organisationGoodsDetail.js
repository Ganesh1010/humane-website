function create_donation_item_details(item, donationlist) {

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
		var promised = getPromisedQuantity(donationlist, goodsItemList[i].goods_item_id);
		var received = getReceivedQuantity(donationlist, goodsItemList[i].goods_item_id);

		if (promised == 0)
			promised = "-";
		else
			promised = getPromisedQuantity(donationlist, goodsItemList[i].goods_item_id) + " (" + goodsItemList[i].unit + ")";
		if (received == 0)
			received = "-";
		else
			received = getReceivedQuantity(donationlist, goodsItemList[i].goods_item_id) + " (" + goodsItemList[i].unit + ")";

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
function loadImagesInSlider(item){
	
			var organisationImages = JSON.parse(jsonEscape(item))
			console.log("Organisation detail", item);
			
			if(organisationImages.length>0){
			var imageSliderDiv = document.createElement("div");
			var slideCount = document.createElement("ol");
			slideCount.addClassName = "carousel-indicators";
			for(i = 0; i < organisationImages.length; i++){
			  var imageList = document.createElement("li");
			  imageList.setAttribute("data-target","#myCarousel");
			  imageList.setAttribute("data-slide-to",i);
			  
			  if(i==0){
			  imageList.addClassName = "active"
			  }
			  slideCount.append(imageList);
	
			}
			
			var imagesDiv = document.createElement("div");
			imagesDiv.addClassName = "carousel-inner";
			imagesDiv.setAttribute("role","listbox");
			imagesDiv.setAttribute("style","width:100%; height: 100% !important;");
			
			for(i =0 ;i<organisationImages.length;i++){
			  var itemImage = document.createElement("div");
			  itemImage.classList.add("item");
			  if(i==0){
			  itemImage.classList.add("active")
			  }
			  
			  var img = getImage(organisationImages.img_url);
			  itemImage.append(img);
			  imagesDiv.append(itemImage);
	
			}
			
	
			imageSliderDiv.append(imagesDiv);		   		
			}else{
				console.log("No images found")
				}
}
