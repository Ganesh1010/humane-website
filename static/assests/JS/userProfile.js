var name,email,mobile,dob,id,profilePicURL;
var validator;
const PROFILE_VIDEO_REQUEST=1;

function setUserProfileDetails() {
	console.log("USER_PROFILE ", USER_PROFILE)
	name = USER_PROFILE.first_name;
	email = USER_PROFILE.email;
	mobile = USER_PROFILE.mobile;
	dob = USER_PROFILE.dob
	id = USER_PROFILE.id
	profilePicURL = USER_PROFILE.user_profile_picture
	
	$("#user-name").html(name);
	$("#user-email").html(email);
	$("#user-mobile").html(mobile);
	$("#user-dob").html(dob);
	$("#user-profile-picture").attr('src',profilePicURL); 
	
	
	if (USER_PROFILE.profile_video_exists) {
		$("#user-video-card").removeClass("hidden");
		$("#add-profile-video").addClass("hidden");
		var profileVideoUrl = "/humane/getVideo/?type=1&usage="+id+"&request=1";
		var video = document.getElementById('profile-video');
		video.src = profileVideoUrl;
		video.load();
	} else {
		$("#user-video-card").addClass("hidden");
		$("#add-profile-video").removeClass("hidden");
	}

	$(".loader").hide();
}

function saveUserProfile() {
	
	var userDetail = {
		first_name: $("#edit-user-name").val(),
		mobile:$("#edit-user-mobile").val(),
		dob: $("#edit-user-dob").val()
	}

	console.log("user detail ",JSON.stringify(userDetail))
	$.ajax({
		beforeSend: function () {
			$("#save-btn").prop('disabled', true);
			$(".loader").show();
		},
		url: '/humane/UserDetail/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$(".loader").hide();
			$("#save-btn").prop('disabled', false);
			showTheEditedProfile();
			showHideEditBtn(true);
		},
		error: function (response) {
			console.log("response while saving user detail " + response)
			$("#save-btn").prop('disabled', false);
			$(".loader").hide();
		},
		data: JSON.stringify(userDetail)

	});
	
}

function showHideEditBtn(visibility) {
	if (visibility) {
		validator.resetForm();
		
		$("#user-details").removeClass("hidden");
		$("#user-edit-details").addClass("hidden");
		$("edit-btn").show();
		$("#change-profile-pic").addClass("hidden");
		$("#change-profile-video-btn").addClass("hidden");
		
	} else {
		
		var dob = $("#user-dob").html();
		$("#user-details").addClass("hidden");
		$("#user-edit-details").removeClass("hidden");
		$("edit-btn").hide();
		$("#change-profile-pic").removeClass("hidden");
		$("#change-profile-video-btn").removeClass("hidden");
		
		$("#edit-user-name").val($("#user-name").html());
		$("#edit-user-email").val($("#user-email").html());
		$("#edit-user-mobile").val($("#user-mobile").html());
		$("#edit-user-dob-picker").datepicker('setDate', new Date(dob));
		$("#edit-user-dob-picker").datepicker('update');
		$("#edit-user-dob").val(dob);
		
		if(USER_PROFILE.is_email_verified)
		{
			console.log("here in if of email");
			$("#to_verify_email").addClass("hidden");
			
		}
		else{
			console.log("here in else of email");
			$("#to_verify_email").removeClass("hidden");
		}
			
	}
}

function doOtpVerification(email, token, urlToLoad) {
		var otp_data = {
			email_or_mobile: email,
			is_mobile_verification: false
		}
		console.log("otp data", JSON.stringify(otp_data))
		$.ajax({
			type: "POST",
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
			url: urlToLoad,
			data: otp_data,
			success: function (otpUUID) {

				var uuid = otpUUID.otp_uuid

				console.log("token " + token)
				console.log("uuid " + uuid)
				//sessionStorage.setItem("token",token);
				//sessionStorage.setItem("uuid",uuid);

				document.cookie = "url" + "=" + "email verification url" + ";path=/";
				document.cookie = "uuid" + "=" + uuid + ";path=/";

				$(".loader").hide();
				window.location = "/html/emailVerificationPage"

			},
			error: function (response) {
				console.log("response while generating otp " + response)
				$(".loader").hide();
			},
		});
	}
	

function changePassword()
{
	
	var data = {
    "new_password": $("#new_password").val(),
    "current_password": $("#current_password").val()
	}
	
		console.log("password change data", JSON.stringify(data))
		
		$.ajax({
			beforeSend: function () {
			$(".loader").show();
		},
			type: "POST",
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		url: "/auth/password/",
			data: data,
			success: function (response) {

			if ($('#change-password-modal').is(':visible')) {
				$(".loader").hide();
				$('#change-password-modal').modal('hide');
			}
			
			window.location = "/login"

			},
			error: function (response) {
				console.log("response while changeing  password " + response)
				$(".loader").hide();
			},
		});
}

function verifyEmail()
{
	doOtpVerification(USER_PROFILE.email,null,'/otp/generate-otp/totp/' + window.location.search)
}

function showTheEditedProfile()
{
	var dob = $("#edit-user-dob").val()
	$("#user-name").html($("#edit-user-name").val());
	$("#user-mobile").html($("#edit-user-mobile").val());
	$("#user-dob").html(dob);
}

function changeProfilePic()
{
	var formData = new FormData();

 	var file = $('input[name="profilePic"]').get(0).files[0];
	formData.append("user_profile_icon",file);
	
	$.ajax({
		beforeSend: function () {
			$(".loader").show();
		},
		url: '/humane/profilepic/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		success: function (data) {
			$(".loader").hide();
			showHideEditBtn(true);
		},
		data: formData,
		contentType: false,
 		processData: false,

	});
}

function changeProfileVideo(isChangeVideo)
{
	var file = $('input[name="profileVideo"]').get(0).files[0];
	var formData = new FormData();
	formData.append("request_from",PROFILE_VIDEO_REQUEST);
	formData.append("media_usage_id",id);
	if(isChangeVideo)
		formData.append("media_url",file);
	
	$.ajax({
		beforeSend: function () {
			if($('#profile-video-modal').is(':visible'))
				$('#profile-video-modal').modal('toggle');
			$(".loader").show();
		},
		url: '/humane/media/',
		type: 'post',
		headers: {
			"X-CSRFToken": getCookie("csrftoken")
		},
		dataType: 'json',
		success: function (data) {
			$(".loader").hide();
			if(!isChangeVideo){
				$("#user-video-card").addClass("hidden");
				$("#add-profile-video").removeClass("hidden");
			}
			else{
				$("#add-profile-video").addClass("hidden");
				$("#user-video-card").removeClass("hidden");
			}
		},
		data: formData,
		contentType: false,
 		processData: false,

	});
}


function setProfileVideoSource(input)
{
	 if (input.files && input.files[0]) {
        var file = input.files[0];
        var url = URL.createObjectURL(file);
        console.log(url);
        var video = document.getElementById('profile-video');
        var reader = new FileReader();
        reader.onload = function() {
            video.src = url;
        }
        reader.readAsDataURL(file);
    }
}