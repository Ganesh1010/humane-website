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
      promisedDateText.classList.add("promised-date-padding");
      var promisedDateString = item.promised_date;
      var date = new Date(promisedDateString);
      console.log(date.toLocaleDateString());
      var promisedDate = getPromisedDate(date.toDateString());

      promisedDate.className = "text-center";

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

      if (donationItemListSize > 1) {
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
              var itemName = donationItemList[i].goods_item_detail.goods_item_id;
              var itemQuantity = donationItemList[i].goods_item_detail.sub_item_category_one;
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
          var itemName = document.createElement("h4");
          itemName.classList.add("media-heading");
          itemName.classList.add("text-center");
          itemName.innerHTML = goodsItemList[i].sub_item_category_one + itemCategory;
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
      var postedDate = new Date(item.posted_date);
      var deadline = new Date(item.deadline);
      document.getElementById("postedDate").innerHTML = postedDate.toDateString();
      document.getElementById("deadline").innerHTML = deadline.toDateString();
      document.getElementById("main-item-name").innerHTML = item.main_item;
      document.getElementById("main-item-image").setAttribute("src", item.main_item_image);
  }


  function createServiceInterestCard(item) {

      doc = document.createDocumentFragment();

      function getText(text) {
          var paragraph = document.createElement("p");
          paragraph.innerHTML = text;
          return paragraph;
      }

      function createRow(string1, string2) {
          var row = document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');

          td1.appendChild(document.createTextNode(string1));
          td2.appendChild(document.createTextNode(string2));

          row.append(td1);
          row.append(td2);


          return row;
      }

      function userImage(imgSrc) {

          var icon = document.createElement("img");
          icon.setAttribute("src", imgSrc);
          icon.classList.add("media-object");
          icon.classList.add("thumbnail");
          icon.classList.add("icon");
          icon.setAttribute('style', 'width:80px;margin-bottom:5px;')

          return icon;
      }


      var serviceInterestCardDiv = document.createElement("div");
      serviceInterestCardDiv.classList.add("card");
      serviceInterestCardDiv.classList.add("col-md-4");

      var cardContentDiv = document.createElement("div");
      cardContentDiv.classList.add("media");

      var serviceDateDiv = document.createElement("div");
      serviceDateDiv.className = "pull-right";
      var interestedDateText = getText("Interested Date");

      interestedDateText.setAttribute('style', 'margin-bottom:0px;')
      var interestedDateString = item.service_interest_action_performed_date;
      var date = new Date(interestedDateString);
      console.log(date.toLocaleDateString());
      var interestedDate = getText(date.toDateString());
      interestedDate.className = "text-center";


      var userImgDiv = document.createElement("div");
      userImgDiv.classList.add("media-left");
      userImgDiv.classList.add("media-middle");
      var userIcon = userImage(item.service_user_detail.user_profile_picture);
      console.log(userIcon);

      var userDetailDiv = document.createElement("div");
      userDetailDiv.classList.add("media-body");

      var userName = document.createElement("h4");
      userName.innerHTML = item.service_user_detail.first_name;
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
