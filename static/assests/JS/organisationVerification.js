function loadVerificationOrgDetails(url) {
	$('.loader').show();
	$.getJSON(url, function (ogListData) {})
		.done(function (ogListData) {
		console.log("ogListData ",ogListData)
			var t = JSON.parse(jsonEscape(ogListData))
			$.each(t, function (key, value) {
				createSingleOrganisationCard(value);
			});
		$(".loader").hide();
		})
		.fail(function () {
			console.log("error");
		})
		.always(function () {
			console.log("org list detail load complete");
		});
}

function createSingleOrganisationCard(orgDetail)
{
	var orgCard = document.createDocumentFragment();
	
	var orgcardDiv = document.createElement("div");
	orgcardDiv.classList.add("card");
	orgcardDiv.classList.add("padding");
	orgcardDiv.classList.add("col-md-4");
	
	var orgLogoDiv = document.createElement("div");
	orgLogoDiv.classList.add("media-left");
	orgLogoDiv.classList.add("media-top");
	
	orgLogo = getImage(orgDetail.org_logo);
	orgLogo.classList.add("media-object");
	orgLogo.classList.add("thumbnail");
	orgLogo.classList.add("org-logo-img");
	orgLogoDiv.append(orgLogo);
	
	orgDetailDiv = document.createElement("div");
	orgDetailDiv.classList.add("media-body");
	
	var orgname = getHeaderText(orgDetail.org_name,3);
	orgname.classList.add("media-body");
	orgname.classList.add("no-padding");
	
	var orgCity = getHeaderText(orgDetail.city+","+orgDetail.postal_code,5);
	orgCity.className="no-padding";
	var orgEmail= getHeaderText(orgDetail.org_email,5);
	orgEmail.className="no-padding";
	var orgRegNo= getHeaderText("REG No. "+orgDetail.org_reg_no,5);
	orgRegNo.className="no-padding";
	
	orgDetailDiv.append(orgname);
	orgDetailDiv.append(orgCity);
	orgDetailDiv.append(orgEmail);
	orgDetailDiv.append(orgRegNo);
	
	orgcardDiv.appendChild(orgLogoDiv);
	orgcardDiv.appendChild(orgDetailDiv);
	
	orgCard.append(orgcardDiv)
	
	document.getElementById("organisation-detail").append(orgCard);
	
	orgcardDiv.addEventListener('click', function () {
		var id = orgDetail.org_id;
		var link = "/appAdmin/orgCoordinatorVerify";
		console.log("on click card", id);

		link += "?id=" + id;
		console.log("url", link);
		window.location.href = link;

	});
		
}
