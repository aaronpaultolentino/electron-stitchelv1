document.querySelector('.reg-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let url = base_url();
    let name = $('.name').val()
    let email = $('.email').val()
    let password = $('.password').val()
    let password_confirmation = $('.password-confirm').val()

    let Registerdata = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
    };

    $.ajax({
        type: 'POST',
        url: url + '/api/v1/user/signup',
        headers: {
            Accept: 'application/json'
        },
        data: Registerdata
    }).done(function(data) {
        $("#result").html('<div class="alert alert-success"><button type="button" class="close">×</button> ' + data.Message + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
                window.location.href = '../view/loginWindow.html';
            });
        }, 2000);
    }).fail(showError);

    function showError(error) {
        
    }
});
