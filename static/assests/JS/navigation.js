     
 var commonUserProfile;
	 function logout(isSkipped)
    {
		console.log("logout called",isSkipped);
        $.ajax('/html/ajaxlogout/', {
      success: function(data) {
          
		  if(isSkipped)
			window.location.replace("/html/homePage")
		  else
			   location.reload()
         //alert('success'+data)
      },
      error: function(data) {
         console.log(data);
      }
   });
    }
    // function login()
    // {
           // x=$('#login_form').serialize();
        // //alert(x)
        // $.ajax({
    // type:"post",
    // url: '/login1/'+window.location.search,
    // data: x,
    // success: function(response){
        // location.reload()
            // // data.redirect contains the string URL to redirect to
        // //alert(response)
           // // window.location.href = '/test';
        // // do something with response
      // //  response['result']; // equals 'Success or failed';
        // response['message'] // equals 'you"re logged in or You messed up';
     // }
// });

    // }

			
	function loadNavigationNotificationDetails(data,commonUserProfile=null) {
			var count = $.parseJSON(data)
			var t = $.parseJSON(data)['results']
			console.log("common user profile in load notification details"+commonUserProfile)
			$('#notification_count').html(count.count);
			// $('#count').html(count.count);
			
			$("#nv-bar-notification-card-id").empty();
			if(t.length>5){
				for(i=0;i<5;i++)
					createNavigationNotificationCard(t[i],commonUserProfile);
			}else{
				$.each(t, function(key, value) {
					 createNavigationNotificationCard(value,commonUserProfile);
				});
			}
			
			$('.loader').hide();
			// if(isLoadMore){
			
				// $("#notification-card-id").empty();
				// // $.each(t, function(key, value) {
					// // createNotificationCard(value);

				// // });
			// }
			// else{
				
			// $("#notification-card-id").empty();
				// for(i=0;i<5;i++)
					// createNotificationCard(t[i]);
				
			// }
		}
		
	function validFeedback(){
		var feedBackText = $("#feedback-text").val();
		if(isSendClicked){
		if(feedBackText=="" || feedBackText.length < 3){
			
			$('#feedback-text').addClass('redBorder');
			$('#feedback-text').focusin();
			$('#feedback_error').removeClass('hidden');
			return false;
			
		}else{
		$('#feedback-text').removeClass('redBorder');
		$('#feedback_error').addClass('hidden');
			return true;
		}
		}
	}
	
	function postFeedBack(){
	    isSendClicked = true;		
		var feedBackText = $("#feedback-text").val();
		var isFeedBackValid = validFeedback(feedBackText)
	    console.log("feed back valid",isFeedBackValid)
		
	
	if(isFeedBackValid){
		var feedBack = {
			feedback_txt:feedBackText
		}
		$.ajax({
		url: '/humane/feedback/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert("Thanks for your valuable feedback")
			window.location.href = "/html/homePage/";
		},
		
		data: JSON.stringify(feedBack)

	});
	}
	}
	

function createNavigationNotificationCard(item,commonUserProfile = null) {

	var doc = document.createDocumentFragment();


	var notificationCardContainer = document.createElement("li");
	notificationCardContainer.classList.add("notification-card-padding");
	var notificationCardDiv = document.createElement("div");
	//notificationCardDiv.classList.add("card");


	var cardContentDiv = document.createElement("div");
	cardContentDiv.className = "media";

	var itemImageDiv = document.createElement("div");
	itemImageDiv.classList.add("media-left");
	itemImageDiv.classList.add("media-middle");
	var itemImage = getImage(item.main_item_icon);
	itemImage.classList.add("notification-card-img-padding");
	itemImage.classList.add("media-object");
	itemImage.classList.add("thumbnail-small-image");


	var notificationContentDiv = document.createElement("div");
	notificationContentDiv.classList.add("media-body");
	notificationContentDiv.classList.add("media-middle");

	var hrLine = document.createElement("hr");
	hrLine.className = "hr-padding";
	console.log(item);
	var orgName = item.organisation.org_name;

	var mainItem = item.main_item;

	var date = getLocalDateFormat(item.actioned_time);

	var notification_type = item.task_type;
	if(commonUserProfile!=null){
	if (notification_type == REQUEST_TYPE_DONATION) {
		
		if(commonUserProfile.role == REGISTERED_COORDINATOR ){
		// if({{user.role.user_role_id}} == REGISTERED_COORDINATOR){
			var notificationMsg = getText(item.donation_detail.donating_user.first_name + COORDINATOR_DONATION_NOTIFICATION_MSG + mainItem + " " + TO_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
			cardContentDiv.append(itemImageDiv);
			cardContentDiv.append(notificationContentDiv);
		}else{
			console.log("Registered msg");
			var notificationMsg = getText(DONATION_NOTIFICATION_MSG + " " + mainItem + " " + TO_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
			cardContentDiv.append(itemImageDiv);
			cardContentDiv.append(notificationContentDiv);
		}
		
	} else if (notification_type == REQUEST_TYPE_SERVICE) {
		if(commonUserProfile.role == REGISTERED_COORDINATOR){
			var notificationMsg = getText(item.service_interested_detail.service_user_detail.first_name + COORDINATOR_SERVICE_NOTIFICATION_MSG + mainItem+" "+ TO_TEXT +" "+ orgName + " " + ON_TEXT + " " + date);
			cardContentDiv.append(notificationContentDiv);
			cardContentDiv.append(itemImageDiv);
			
		}else{
			
			var notificationMsg = getText(SERVICE_NOTIFICATION_MSG + " " + mainItem + " " + TO_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
			cardContentDiv.append(itemImageDiv);
			cardContentDiv.append(notificationContentDiv);
		}
	}else if(notification_type == TASK_TYPE_DONATION_COMPLETED){
		var notificationMsg = getText(DONATION_MSG + mainItem + TO_TEXT + orgName + DONATION_RECEIVED_MSG + ON_TEXT + " " + date);
			cardContentDiv.append(notificationContentDiv);
			cardContentDiv.append(itemImageDiv);

	}else if(notification_type == TASK_TYPE_SERVICE_ATTENDED){
		var notificationMsg = getText(SERVICE_MSG + mainItem + TO_TEXT + orgName + SERVICE_ATTENDED_MSG + ON_TEXT + " " + date);
			cardContentDiv.append(notificationContentDiv);
			cardContentDiv.append(itemImageDiv);
	}else if(notification_type == TASK_TYPE_VOLUNTEER_ASSIGNED){
		var notificationMsg = getText(item.volunteer_detail.first_name + VOLUNTEER_ASSIGNED_MSG + ON_TEXT + " " + date);
			cardContentDiv.append(notificationContentDiv);
			cardContentDiv.append(itemImageDiv);
	}		else {
		var notificationMsg = getText(THANK_YOU_NOTIFICATION_MSG + " " + FOR_TEXT+" "+mainItem + " " + FROM_TEXT + " " + orgName + " " + ON_TEXT + " " + date);
		cardContentDiv.append(notificationContentDiv);
		cardContentDiv.append(itemImageDiv);
	}
	}else{
		console.log("No user profile")
	}

	itemImageDiv.append(itemImage);
	notificationContentDiv.append(notificationMsg);

	cardContentDiv.append(hrLine);
	notificationCardDiv.append(cardContentDiv);

	notificationCardContainer.append(notificationCardDiv);



	doc.appendChild(notificationCardContainer);

	document.getElementById("nv-bar-notification-card-id").appendChild(doc);


}
		