const ipc = require('electron').ipcRenderer;
let url = base_url();

// ========================= GMAIL ========================
// Get Gmail URL Funtion
document.querySelector(".add-gmailIntegration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')

    $.ajax({
        type: 'GET',
        url: url + '/api/v1/integrations/code/gmail',
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(getGmailUrl) {
        ipc.send('openIntegrationWindow', getGmailUrl);
        ipc.on('store-data', function (event, data) {
            console.log(data);
            $.ajax({
                type: 'GET',
                url: url + '/api/v1/integrations/gmail/all',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: "application/json",
            }).done(function(dataGmail) {
                let gmailId = JSON.stringify(dataGmail[0].id);
                let gmailData = JSON.parse(dataGmail[0].data);
                let gmailEmail = JSON.stringify(gmailData.email);
                window.localStorage.setItem('get_gmail_id', gmailId)
                window.localStorage.setItem('get_gmail_email', gmailEmail.slice(1, -1))
                $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + 'Gmail Integration Success!' + '</div>');
                window.setTimeout(function() {
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        window.location.reload(true);
                        $(this).remove();
                    });
                }, 2000);
            }).fail(showListGmailError);

            function showListGmailError(req, s, t) {
                alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
            }
                });
    }).fail(showAddGmailError);

    function showAddGmailError(req, s, t) {
        alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
    }
});

// Delete Gmail Integration
document.querySelector(".delete-gmail-integration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')
    let deleteGmailId = localStorage.getItem('get_gmail_id')

    $.ajax({
        type: 'DELETE',
        url: url + '/api/v1/integrations/delete/gmail/' + deleteGmailId,
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(delGmail) {
        const revokeGmail = JSON.stringify(delGmail.message);
        window.localStorage.removeItem('get_gmail_id');
        window.localStorage.removeItem('get_gmail_email');
        $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + revokeGmail + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                window.location.reload(true);
                $(this).remove();
            });
        }, 2000);
    }).fail(showDeleteGmailError);

    function showDeleteGmailError(error) {
        $("#result").html('<div class="alert alert-danger"><button type="button" class="close"> × </button>' + 'No Gmail Integrations Found' + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 2000);
    }
});
// ========================= GMAIL END ========================

// ========================= JIRA ========================
// Get Jira URL Funtion
document.querySelector(".add-jiraIntegration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')
    // get dynamic_host
    let dynamic_value = $('.dynamicValue').val();
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/integrations/code/jira/' + dynamic_value,
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(getJiraUrl) {
        ipc.send('openIntegrationWindow', getJiraUrl);
        ipc.on('store-data', function (event, data) {
            console.log(data);
            $.ajax({
                type: 'GET',
                url: url + '/api/v1/integrations/jira/all',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: "application/json",
            }).done(function(dataJira) {
                let jiraId = JSON.stringify(dataJira[0].id);
                let jiraData = JSON.parse(dataJira[0].data);
                let jiraEmail = JSON.stringify(jiraData.email);
                window.localStorage.setItem('get_jira_id', jiraId)
                window.localStorage.setItem('get_jira_email', jiraEmail.slice(1, -1))
                $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + 'Jira Integration Success!' + '</div>');
                window.setTimeout(function() {
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        window.location.reload(true);
                        $(this).remove();
                    });
                }, 2000);
            }).fail(showListJiraError);

            function showListJiraError(req, s, t) {
                alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
            }
        });
    }).fail(showAddJiraError);

    function showAddJiraError(req, s, t) {
        alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
    }
});

// Delete Jira Integration
document.querySelector(".delete-jira-integration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')
    let deleteJiraId = localStorage.getItem('get_jira_id')
    $.ajax({
        type: 'DELETE',
        url: url + '/api/v1/integrations/delete/jira/' + deleteJiraId,
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(delJira) {
        const revokeJira = JSON.stringify(delJira.message);
        console.log(delJira)
        window.localStorage.removeItem('get_jira_id');
        window.localStorage.removeItem('get_jira_email');
        $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + revokeJira + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                window.location.reload(true);
                $(this).remove();
            });
        }, 2000);
    }).fail(showDeleteJiraError);

    function showDeleteJiraError(req, s, t) {
        $("#result").html('<div class="alert alert-danger"><button type="button" class="close"> × </button>' + 'No Jira Integrations Found' + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 2000);
    }
});
// ========================= JIRA END ========================

// ========================= Slack ========================
// Get Slack URL Funtion
document.querySelector(".add-slackIntegration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/integrations/code/slack',
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(getSlackUrl) {
        ipc.send('openIntegrationWindow', getSlackUrl);
        ipc.on('store-data', function (event, data) {
            console.log(data);
            $.ajax({
                type: 'GET',
                url: url + '/api/v1/integrations/slack/all',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: "application/json",
            }).done(function(dataSlack) {
                let slackId = JSON.stringify(dataSlack[0].id);
                let slackProfile = JSON.parse(dataSlack[0].data);
                window.localStorage.setItem('get_slack_id', slackId)
                window.localStorage.setItem('get_slack_email', slackProfile.profile.email)
                $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + 'Slack Integration Success!' + '</div>');
                window.setTimeout(function() {
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        window.location.reload(true);
                        $(this).remove();
                    });
                }, 2000);
                $(".slack-result").html('<div>' + getSlackEmail + '</div>');
            }).fail(showListSlackError);

            function showListSlackError(req, s, t) {
                alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
            }
        });
    }).fail(showAddSlackError);

    function showAddSlackError(req, s, t) {
        alert('Request Status: ' + req.status + ' Status Text: ' + req.statusText + ' ' + req.responseText);
    }
});

// Delete Slack Integration
document.querySelector(".delete-slack-integration").addEventListener('click', (e) => {
    e.preventDefault();

    // get access_token
    let token = localStorage.getItem('access_token')
    let deleteSlackId = localStorage.getItem('get_slack_id')

    $.ajax({
        type: 'DELETE',
        url: url + '/api/v1/integrations/delete/slack/' + deleteSlackId,
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
        },
        contentType: "application/json",
    }).done(function(delSlack) {
        const revokeSlack = JSON.stringify(delSlack.message);
        console.log(delSlack)
        window.localStorage.removeItem('get_slack_id');
        window.localStorage.removeItem('get_slack_email');
        $("#result").html('<div class="alert alert-success"><button type="button" class="close"> × </button>' + revokeSlack + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                window.location.reload(true);
                $(this).remove();
            });
        }, 2000);
    }).fail(showDeleteSlackError);

    function showDeleteSlackError(req, s, t) {
        $("#result").html('<div class="alert alert-danger"><button type="button" class="close"> × </button>' + 'No Slack Integrations Found' + '</div>');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 2000);
    }
});
// ========================= Slack END ========================

//=========================== USERS NAME & EMAIL ========================
let name = localStorage.getItem('name')
let getGmailEmail = localStorage.getItem('get_gmail_email') 
let getJiraEmail = localStorage.getItem('get_jira_email')
let getSlackEmail = localStorage.getItem('get_slack_email')
    $(document).ready(function(){ 
      $(".name").html(name)
      $(".gmail-result").html(getGmailEmail)
      $(".jira-result").html(getJiraEmail)
      $(".slack-result").html(getSlackEmail)
    });
//=========================== USERS NAME & EMAIL END ====================