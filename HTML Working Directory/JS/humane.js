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

    function getMainIconImage(src) {
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
    goodsPanelHeading.classList.add("panel-heading");
    goodsPanelHeading.classList.add("card-panel-heading");

    var goodsPanelBody = document.createElement("div");
    goodsPanelBody.className = "panel-body";

    var mainItemIcon = getMainIconImage(item.main_item_image); // indicates the main item icon

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


    function getMainIconImage(src) {
        var icon = document.createElement("img");
        icon.setAttribute("src", src);
        icon.className = "main-item-image";
        icon.alt = "icon";
        return icon;
    }

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

    var mainItemIcon = getMainIconImage(service.main_service_icon); // indicates the main item icon

    var orgName = document.createElement("h5");
    orgName.innerHTML = service.service_org_detail.org_name;

    var orgCity = document.createElement('h6');
    orgCity.innerHTML = service.service_org_detail.city + " - 600001";

    var serviceInterestedUserCount = document.createElement("h5");
    serviceInterestedUserCount.innerHTML = "No. of People Interested : "+5;

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