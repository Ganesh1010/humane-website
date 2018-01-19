function createOrgCard(item){
	
	var doc = document.createDocumentFragment();

	var orgCardDiv = document.createElement("div");
	orgCardDiv.classList.add("card");
	orgCardDiv.classList.add("col-md-4");

	var cardContentDiv = document.createElement("div");
	cardContentDiv.classList.add("media");
	cardContentDiv.classList.add("history-card-padding")

	var orgLogoDiv = document.createElement("div");
	orgLogoDiv.classList.add("media-left");
	orgLogoDiv.classList.add("media-middle");
	var orgLogo = getImage(item.org_logo);
	orgLogo.classList.add("media-object");
	orgLogo.classList.add("thumbnail");
	
		
	var orgDetailDiv = document.createElement("div");
	orgDetailDiv.classList.add("media-body");

	
	var orgName = getHeaderText(item.org_name,4);
	var orgEmail = getHeaderText(item.org_email,5);
	var orgMobile = getHeaderText(item.mobile,5);
	
	orgCardDiv.addEventListener('click', function (){
		console.log("on click marker in map",item.org_id);
		var link = "/html/orgDetailPage";
					console.log("on click marker in map",item.org_id);

					link += "?id=" +item.org_id;
					console.log("url", link);
					window.location.href = link;
	});

	
	orgLogoDiv.append(orgLogo);

	
	orgDetailDiv.append(orgName);

	orgDetailDiv.append(orgEmail);
	orgDetailDiv.append(orgMobile);

	cardContentDiv.append(orgLogoDiv);
	cardContentDiv.append(orgDetailDiv);

	orgCardDiv.append(cardContentDiv);

	doc.appendChild(orgCardDiv);

	document.getElementById("org_card").appendChild(doc);


	
}

function setMarker(data){
	console.log("city list size",data.latitude)
	 
}