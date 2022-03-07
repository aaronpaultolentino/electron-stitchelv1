document.querySelector(".update-profile").addEventListener('click', (e) => {
    e.preventDefault(); 

    let updateProfileData = {
        name: $('.full-name').val(),
        password: $('.password').val(),
        confirm_password: $('.confirm-password').val(),
        mobile_number: $('.mobile-number').val(),
        address: $('.address').val(),
        postcode: $('.post-code').val(),
        area: $('.area').val(),
        country: $('.country').val(),
        state: $('.state').val(),
    };

    // get access_token
    let token = localStorage.getItem('access_token');
    let url = base_url();

    $.ajax({
        type: 'POST',
        url: url + '/api/v1/user/updateprofile',
        data: updateProfileData,
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        contentType: "application/json",
    }).done(function(updateProfile) {
        let profile = JSON.stringify(updateProfile.Info)
        let getValue = JSON.parse(profile)
        $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + updateProfile.message + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                window.localStorage.setItem('name', updateProfile.Info.name)
                window.localStorage.setItem('mobile_number', getValue.mobile_number)
                window.localStorage.setItem('address', getValue.address)
                window.localStorage.setItem('postcode', getValue.postcode)
                window.localStorage.setItem('area', getValue.area)
                window.localStorage.setItem('country', getValue.country)
                window.localStorage.setItem('state', getValue.state)
                window.location.reload(true);
                $(this).remove();
            });
        }, 2000);
    }).fail(updateProfileError);

    function updateProfileError(error) {

        $('.error-mobile-number').html('');
        $.each(error.responseJSON.errors.mobile_number, function(key,value) {
            $('.error-mobile-number').append(value);
        });

        $('.error-address').html('');
        $.each(error.responseJSON.errors.address, function(key,value) {
            $('.error-address').append(value);
        }); 

        $('.error-post-code').html('');
        $.each(error.responseJSON.errors.postcode, function(key,value) {
            $('.error-post-code').append(value);
        }); 

        $('.error-area').html('');
        $.each(error.responseJSON.errors.area, function(key,value) {
            $('.error-area').append(value);
        }); 

        $('.error-country').html('');
        $.each(error.responseJSON.errors.country, function(key,value) {
            $('.error-country').append(value);
        }); 

        $('.error-state').html('');
        $.each(error.responseJSON.errors.state, function(key,value) {
            $('.error-state').append(value);
        });

        $('.error-password').html('');
        $.each(error.responseJSON.errors.password, function(key,value) {
            $('.error-password').append(value);
        }); 
    }
});
// ========================= Update Profile END ========================

// ========================= Store name and email Profile ========================

    $(document).ready(function(){ 
      $(".name").html(name = localStorage.getItem('name'))
      $(".email").html(email = localStorage.getItem('email'))
      $(".store-name").val(name = localStorage.getItem('name'))
      $(".store-mobile-number").val(localStorage.getItem('mobile_number'))
      $(".store-address").val(localStorage.getItem('address'))
      $(".store-post-code").val(localStorage.getItem('postcode'))
      $(".store-area").val(localStorage.getItem('area'))
      $(".store-country").val(localStorage.getItem('country'))
      $(".store-state").val(localStorage.getItem('state'))
    });
// ========================= Store name and email Profile END ========================