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
    donateButton.innerHTML = "Donate";;l

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

