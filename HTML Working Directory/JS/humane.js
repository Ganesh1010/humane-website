
function getImage(src) {
        var icon = document.createElement("img");
        icon.setAttribute("src", src);
        icon.className = "main-item-image";
        icon.alt = "icon";
        return icon;
    }
    
     function createRow(itemName, quantity, unit) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        td1.appendChild(document.createTextNode(itemName));
        td2.appendChild(document.createTextNode(quantity));
        td3.appendChild(document.createTextNode(unit));

        row.append(td1);
        row.append(td2);
        row.append(td3);

        return row;
    }

function create_single_goods_card(item) {
    
    function promisedDonationProgressBar(value) {
        var promisedDonationProgressBar = document.createElement("div");
        promisedDonationProgressBar.className = "progress-bar";
        promisedDonationProgressBar.setAttribute('role', 'promisedDonationProgressBar');
        promisedDonationProgressBar.setAttribute('aria-valuenow', value);
        promisedDonationProgressBar.setAttribute('style', 'width:' + value + '%');
        promisedDonationProgressBar.innerHTML = +value + "%";
        return promisedDonationProgressBar;
    }

    function getMainIconImaga(src) {
        var icon = document.createElement("img");
        icon.setAttribute("src", src);
        icon.className = "main-item-image";
        icon.alt = "icon";
        return icon;
    }

    var goodsCard = document.createDocumentFragment();

    var goodsCardOuterDiv = document.createElement("div");
    goodsCardOuterDiv.className = "col-sm-3";

    var goodsCardParentDiv = document.createElement("div");
    goodsCardParentDiv.classList.add('panel');
    goodsCardParentDiv.classList.add('panel-primary');
    goodsCardParentDiv.classList.add('goods-box');

    var goodsPanelHeading = document.createElement("div");
    goodsPanelHeading.className = "panel-heading";

    var goodsPanelBody = document.createElement("div");
    goodsPanelBody.className = "panel-body";

    var mainItemIcon = getMainIconImaga(item.main_item_image); // indicates the main item icon

    var orgName = document.createElement("h5");
    orgName.innerHTML = item.organisation_detail.org_name;

    var orgCity = document.createElement('h6');
    orgCity.innerHTML = item.organisation_detail.city + " - 600001";

    var promisedDonationProgressBar = promisedDonationProgressBar(90); // indicates the promised donation ProgressBar

    var donateButton = document.createElement("button");
    donateButton.classList.add('btn');
    donateButton.classList.add('btn-donor');
    donateButton.classList.add('pull-right');
    donateButton.classList.add("donate-button");
    donateButton.innerHTML = "Donate";

    goodsPanelBody.appendChild(mainItemIcon);
    goodsPanelBody.appendChild(orgName);
    goodsPanelBody.appendChild(orgCity);
    goodsPanelBody.appendChild(promisedDonationProgressBar);
    goodsPanelBody.appendChild(donateButton);
    goodsCardParentDiv.appendChild(goodsPanelHeading);
    goodsCardParentDiv.appendChild(goodsPanelBody);
    goodsCardOuterDiv.appendChild(goodsCardParentDiv);
    goodsCard.appendChild(goodsCardOuterDiv);

    document.getElementById("goodstab").appendChild(goodsCard);
}

function create_single_service_card(service) {


    function getMainIconImaga(src) {
        var icon = document.createElement("img");
        icon.setAttribute("src", src);
        icon.className = "main-item-image";
        icon.alt = "icon";
        return icon;
    }

    var goodsCard = document.createDocumentFragment();

    var outtertDiv = document.createElement("div");
    outtertDiv.className = "col-sm-3";

    var parentDiv = document.createElement("div");
    parentDiv.classList.add('panel');
    parentDiv.classList.add('panel-primary');
    parentDiv.classList.add('goods-box');

    var panelHeading = document.createElement("div");
    panelHeading.className = "panel-heading";

    var panelBody = document.createElement("div");
    panelBody.className = "panel-body";

    var mainItemIcon = getMainIconImaga(service.main_service_icon); // indicates the main item icon

    var orgName = document.createElement("h5");
    orgName.innerHTML = service.service_org_detail.org_name;

    var orgCity = document.createElement('h6');
    orgCity.innerHTML = service.service_org_detail.city + " - 600001";

    var serviceInterestedUserCount = document.createElement("h5");
    serviceInterestedUserCount.innerHTML = service.service_org_detail.org_name;

    var donateButton = document.createElement("button");
    donateButton.classList.add('btn');
    donateButton.classList.add('btn-donor');
    donateButton.classList.add('pull-right');
    donateButton.classList.add("donate-button");
    donateButton.innerHTML = "Donate";;


    panelBody.appendChild(mainItemIcon);
    panelBody.appendChild(orgName);
    panelBody.appendChild(orgCity);
    panelBody.appendChild(donateButton);
    parentDiv.appendChild(panelHeading);
    parentDiv.appendChild(panelBody);
    outtertDiv.appendChild(parentDiv);
    goodsCard.appendChild(outtertDiv);

    document.getElementById("servicetab").appendChild(goodsCard);
}


function createOrganisationPromisedDonationCard(item) {


    function getPromisedDate(dateText) {
        var promisedDate = document.createElement("p");
        promisedDate.innerHTML = dateText;
        return promisedDate;
    }

    function userImage(imgSrc) {

        var icon = document.createElement("img");
        icon.setAttribute("src", imgSrc);
        icon.classList.add("media-object");
        icon.classList.add("thumbnail");
        icon.setAttribute('style', 'width:80px;margin-bottom:5px;')

        return icon;
    }

    function createRow(itemName, quantity, unit) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        td1.appendChild(document.createTextNode(itemName));
        td2.appendChild(document.createTextNode(quantity));
        td3.appendChild(document.createTextNode(unit));

        row.append(td1);
        row.append(td2);
        row.append(td3);

        return row;
    }


    var promisedCardDiv = document.createElement("div");
    promisedCardDiv.classList.add("card");
    promisedCardDiv.classList.add("col-md-4");

    var cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("media");
    cardContentDiv.classList.add("padding");

    var promisedDateDiv = document.createElement("div");
    promisedDateDiv.className = "pull-right";

    var promisedDateText = getPromisedDate("Promised Date");
    promisedDateText.innerHTML = "Promised Date"

    promisedDateText.setAttribute('style', 'margin-botom:0px;');

    //    var promisedDate = promisedDate(item.promised_date);   
    var promisedDate = getPromisedDate("04 Nov 2016");

    promisedDateText.classList.add("promised-date-padding");
    var promisedDate = getPromisedDate(item.promised_date);

    promisedDateText.className = "text-center";

    var userImgDiv = document.createElement("div");
    userImgDiv.classList.add("media-left");
    userImgDiv.classList.add("media-top");
    var userIcon = userImage(item.donating_user.user_profile_picture);
    console.log(userIcon);

    var userDetailDiv = document.createElement("div");
    userDetailDiv.classList.add("media-body");

    var userName = document.createElement("h4");
    userName.innerHTML = item.donating_user.first_name;
    userName.classList.add("media-heading");

    var donationId = document.createElement("h5");
    donationId.innerHTML = item.donation_id;

    var userEmail = document.createElement("h5");
    userEmail.innerHTML = item.donating_user.email;


    var status = document.createElement("h5");
    if (item.is_donation_completed == false) {
        status.innerHTML = "Waiting";
    }

    var itemTable = document.createElement("table");
    itemTable.classList.add("table");
    itemTable.classList.add("table-hover");
    itemTable.classList.add("table-responsive");

    var tableHeader = createRow("Item Name", "Quantity", "Unit");
    var tableBody = document.createElement("tbody");
    tableBody.append(tableHeader);
    var tableContent = [];

    var donationItemList = item.donation_item_list;
    console.log(donationItemList)

    for (var i = 0; i < donationItemList.length; i++) {
        var itemName = donationItemList[i].goods_item_detail.goods_item_id;
        var itemQuantity = donationItemList[i].goods_item_detail.sub_item_category_one;
        var itemUnit = donationItemList[i].goods_item_detail.unit;
        tableContent[i] = createRow(itemName, itemQuantity, itemUnit);
        tableBody.append(tableContent[i]);
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
    var line = document.createElement("hr");


    cardContentDiv.append(line);
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


    promisedCardDiv.append(cardContentDiv);
    promisedCardDiv.append(receivedButton);



    doc.appendChild(promisedCardDiv);

    document.getElementById("promised-donation-card").appendChild(doc);

}

function create_donation_item_details(item)
    {
        
    var itemsNeeded = document.createDocumentFragment();
    var tableContent = [];

    var donationItemList = item.donation_item_list;
    console.log(donationItemList)

    for (var i = 0; i < donationItemList.length; i++) {
        var itemName = donationItemList[i].goods_item_detail.goods_item_id;
        var itemQuantity = donationItemList[i].goods_item_detail.sub_item_category_one;
        var itemUnit = donationItemList[i].goods_item_detail.unit;
        tableContent[i] = createRow(itemName, itemQuantity, itemUnit);
        tableBody.append(tableContent[i]);
    }
        itemsNeeded.appendChild(promisedCardDiv);
    }
