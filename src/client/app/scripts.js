let $ = require('../../../bower_components/jquery/dist/jquery.min');
require('../../../bower_components/sweetalert/dist/sweetalert.min.js');


$(function() {
	console.log('OK!');
	$('.enter').click(function(){
		let login = $("input[name*='login']");
		let password = $("input[name*='password']");

		if(!login.val() || !password.val()) {
            swal({
                title: "Хей!",
                text: "Забыл заполнить поля!",
                type: "error",
                confirmButtonText: "Упс! Сейчас заполню!"
            });
		} else {
			$.post("/", {login: login.val().toLowerCase(), password: password.val()});
			login.val('');
			password.val('');
		}});
	$('.reg-user').click(function () {
		let login = $("input[name*='login']");
		let fullname = $("input[name*='fullname']");
		let password_1 = $("input[name*='password_1']");
		let password_2 = $("input[name*='password_2']");

		if (!login.val() || !fullname.val() || !password_1.val() || !password_2.val()) {
            swal({
                title: "Хей!",
                text: "Забыл заполнить поля!",
                type: "error",
                confirmButtonText: "Упс! Сейчас заполню!"
            });
        } else if(password_1.val() !== password_2.val()){
            swal({
                title: "Ой!",
                text: "Пароли не совпадают!",
                type: "warning",
                confirmButtonText: "Буду внимательней..."
            });
			password_1.val('');
			password_2.val('');
		} else {
        	$.post("/register", {login: login.val().toLowerCase(), fullname: fullname.val(), password: password_1.val()});
			login.val('');
			fullname.val('');
			password_1.val('');
			password_2.val('');
		}});
});