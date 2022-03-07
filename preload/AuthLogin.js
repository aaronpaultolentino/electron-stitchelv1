document.querySelector(".login-button").addEventListener('click', (e) => {
    e.preventDefault();

    let url = base_url();
    let email = $('.email').val()
    let password = $('.password').val()

    let loginData = {
        email: email,
        password: password,
    };

    $.ajax({
        type: 'POST',
        url: url + '/api/v1/user/login',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: loginData
    }).done(function(data) {
        $("#result").html('<div class="alert alert-success"><button type="button" class="close">×</button>Successfully Login!</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                window.localStorage.setItem('access_token', data.access_token)
                window.localStorage.setItem('name', data.name)
                window.localStorage.setItem('email', data.email)
                window.location.href = '../view/searchWindow.html';
                $(this).remove();
            });
        }, 2000);

    }).fail(showError);

    function showError(error) {
        let err = JSON.parse(error.responseText);

        $('.error-email').html('');
        $.each(err.errors.email, function(key,value) {
            $('.error-email').append(value);
        });

         $('.error-password').html('');
        $.each(err.errors.password, function(key,value) {
            $('.error-password').append(value);
        });
    }
})
