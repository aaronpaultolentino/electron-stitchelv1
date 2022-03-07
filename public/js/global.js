function url(uri){
	if(uri.split('')[0] != '/'){
		uri = '/' + uri
	}
	return $('[name="url"]').attr('content')+uri;
}

function token(){
	return $('[name="csrf-token"]').attr('content');
}


function snackAlert(message, type, title, timeout){
	timeout = timeout || 3000
	type = type || 'success'
	title = title || jsUcfirst(type);
	$('.custom-alert').remove();
	let str = '<div class="alert alert-'+ type +' custom-alert" role="alert" style="top: 15px;position: absolute;right: 10px;z-index: 1073;display:none;max-width: 400px;word-break: break-word">'+
				    '<strong>'+ title +'!</strong> '+ message +
				'</div>';
	let alertDOM = $(str);
	$('body').append(alertDOM);
	$('.custom-alert').fadeIn();
	setTimeout(function(){ $('.custom-alert').fadeOut(); }, timeout);
	return alertDOM;
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}