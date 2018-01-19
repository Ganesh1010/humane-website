	function registerUser() {
		x = $('#regsiterForm').serialize();
		$.ajax({
			type: "POST",
			beforeSend: function () {
				$("#register-btn").prop('disabled', true);
				$(".loader").show();
			},
			url: '/auth/register/user/' + window.location.search,
			data: x,

			success: function (userProfile) {

				var email = userProfile.email
				var token = userProfile.token

				doOtpVerification(email, token,  '/otp/generate-otp/totp/' + window.location.search)

			},
			error: function (response) {
                $('#email').val("")
                $('#email').attr("style","display:inline")
				console.log("response whiler egistering user " + response)
				$("#register-btn").prop('disabled', false);
				$(".loader").hide();

				var error = jQuery.parseJSON(response.responseText)
				if (error.email[0] == "This field must be unique.") {
                
					
//					$('#email').focusin();
					$("#email_exists_error").show();
				}
			},
		});
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
				"Authorization": "JWT " + token
			},
			url: urlToLoad,
			data: otp_data,
			success: function (otpUUID) {

				var uuid = otpUUID.otp_uuid

				console.log("token " + token)
				console.log("uuid " + uuid)
				//sessionStorage.setItem("token",token);
				//sessionStorage.setItem("uuid",uuid);

				document.cookie = "token" + "=" + token + ";path=/";
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
