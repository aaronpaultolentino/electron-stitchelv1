document.querySelector(".logout-user").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token to revoke
    let token = localStorage.getItem('access_token')
    let url = base_url();
    
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/user/logout',
        headers: {
            Authorization: 'Bearer ' + token
        },
        contentType: "application/json",
    }).done(function(revoke) {
        $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + 'Logout Success!' + '</div>');
            window.setTimeout(function() {
                $(".alert").fadeTo(300, 0).slideUp(300, function() {
                    window.localStorage.clear();
                    window.location.href = '../view/loginWindow.html';
                    $(this).remove();
                });
            }, 2000);
    }).fail(showLogoutError);

    function showLogoutError() {
        $("#result").html('<div class="alert alert-danger"><button type="button" class="close"> × </button>' + 'Logout Failed!' + '</div>');
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                });
            }, 2000);
    }
});
