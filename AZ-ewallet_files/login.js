$("#login_form").submit(function(e) {

	$('#login_error').html("");
	$('#login_success').html("");
	$('#login_error').show();
	$('#login_success').show();
    e.preventDefault();
    var base_url = $('#base_url').val();
    var redirect_link = $('#redirect_link').val();
    $.ajax({
            url: base_url+"login/Login",
            type: 'post',
            dataType: 'text',
            data: $("#login_form").serialize(),
            beforeSend: function() {
              $('.login_btn').attr('disabled','disabled');
              $('#login_success').html("Please Wait....");
            },
            success: function(data) {
              //console.log(data);
              var data = JSON.parse(data);

              if (data.status == "Fail") {
              	$('#login_success').hide();
                $('.login_btn').removeAttr('disabled','disabled');
                var msg = data.message;
                var id_ = "login_error";
              }
              if (data.status == "Success") {
              	$('#login_error').hide();
                var msg = "Login successfully, Redirecting...";
                var id_ = "login_success";
                setTimeout(function(){ window.location = base_url+"Dashboard"+redirect_link; }, 1000);
              }

              $('#'+id_).html(msg).delay(5000).fadeOut();
            },
            error: function(err){
              console.log(err);
            }
    });

});


//=================Register form=======rahul_dev==============

    $("#sign_up_form").submit(function(e) {
      $('#sign_up_error').html("");
      $('#sign_up_success').html("");
      $('#sign_up_error').show();
      $('#sign_up_success').show();
      e.preventDefault();
      var base_url = $('#base_url').val();
      $.ajax({
            url: base_url+"login/Register",
            processData: false,
            contentType: false,
            type: "post",
            data: new FormData(this),
            beforeSend: function() {
              $('.sign_up_btn').attr('disabled','disabled');
              $('#sign_up_success').html("Please Wait....");
            },
            success: function(data) {
             console.log(data);
              var data = JSON.parse(data);

              if (data.status == "Fail") {
                $('#sign_up_success').hide();
                $('.sign_up_btn').removeAttr('disabled','disabled');
                var msg = data.message;
                var id_ = "sign_up_error";
                $('#'+id_).html(msg).delay(5000).fadeOut();
                showAlertError("Error!",msg);
              }
              if (data.status == "Success") {

                $('#sign_up_error').hide();
                $('.sign_up_btn').hide();
                $('.sign_verify_btn').show();
                $('#sign_up_show_f').hide(800);
                $('#sign_up_otp_f').show(800);

                var msg = data.message;
                var id_ = "sign_up_success";
                $('#'+id_).html(msg);

              }

              
            },
            error: function(err){
              alert('Something went wrong. Please contact admin.');
            }
    });
});


function verify_signup_otp(){
    $('#sign_up_error').html("");
    $('#sign_up_success').html("");
    $('#sign_up_error').show();
    $('#sign_up_success').show();

    var signup_email = $("#signup_email").val();
    var signup_mobile = $("#signup_mobile").val();
    var signup_otp = $("#signup_otp").val();
    var signup_password = $("#signup_password").val();
    if (signup_otp.trim() == "") {
      $("#sign_up_error").html("Invalid OTP").delay(5000).fadeOut();
      return false;
    }else{
        var base_url = $('#base_url').val();
        $.ajax({
            url: base_url+"login/Register/verify_otp",
            type: 'post',
            dataType: 'text',
            data: {'otp':signup_otp,'email':signup_email,'signup_password':signup_password,'signup_mobile':signup_mobile},
            beforeSend: function() {
              $('.sign_verify_btn').attr('disabled','disabled');
              $('#sign_up_success').html("Please Wait....");
            },
            success: function(data) {
              var data_arr = JSON.parse(data);
              $('#sign_up_success').html("");
              if (data_arr.status == "Fail") {
                var msg = data_arr.message;
                var id_ = "sign_up_error";
                $('.sign_verify_btn').removeAttr('disabled','disabled');
                $('#'+id_).html(msg).delay(5000).fadeOut();
              }
              if (data_arr.status == "Success") {
                $('#ver_t').val(data_arr.verify_token);
                var msg = data_arr.message;
                var id_ = "sign_up_success";
                $('#'+id_).html(msg);
                alert('Registration successfully. Please Login.');
                setTimeout(function(){ window.location.assign("?"); }, 1000);
              }
            },
            error: function(err){
              console.log(err);
            }
        });

    }
}

//=================Register form end=====================