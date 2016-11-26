var $ = require('../../../bower_components/jquery/dist/jquery');

$(function() {
	console.log('OK!');
	$('.enter').click(function(){
		var login = $("input[name*='login']");
		var password = $("input[name*='password']");

		//modal windows
		if(!login.val() || !password.val()) {
			console.log('Пустые поля');
		} else {
			$.post("/", {login: login.val(), password: password.val()});
			login.val('');
			password.val('');
		}
	});
});