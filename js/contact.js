$(function(){

	/* NAVIGATION SCRIPT */
	var menuPullDown = $('#burger');
	var menu = $('nav ul');
	var menuHeight = menu.height();
	var menuArrow = $('#burger::after');
	/* Pull menu down on click */
	$(menuPullDown).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	/* Return menu to visible when resizing from small menu */
	$(window).resize(function() {
		if ($(window).width() > 480 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

	/* CONTACT SCRIPT */
	$('#contact-form').submit(function() {
		saveContact();
		showSavePending();
		return false;
	});

});


//
// Function: save contact info to Firebase
//
function saveContact() {
	var db = new Firebase('https://vl-contacts.firebaseio.com/');
	var name = $('input[name="name"]').val().trim().replace(/ /, '_');
	var uniqueNum = Date.now();
	var email = $('input[name="email"]').val().trim();
	var phone = $('input[name="phone"]').val().trim() || "n/a";
	var message = $('textarea[name="message"]').val().trim();
	var contact = db.child(name+uniqueNum);
	contact.set({
		fullName: name,
		email: email,
		message: message,
		time: Firebase.ServerValue.TIMESTAMP
	},
	function(error) {
		if (error) {
			showSaveFail('#saving-state');
		}
		else {
			showSaveSuccess('#saving-state');
			clearForm('#contact-form');
		}
	});
}

//
// Function:
//
function showSavePending() {
	console.log('saving...');
	var div = '<div class="popup-status">'
	        + '   <p id="saving-state">Sending...</p>'
	        + '</div>';
	$('body').append(div);
	$('.popup-status').addClass('show');
}

//
// Function: show confirmation that contact is saved
//
function showSaveSuccess(pid) {
	console.log('saved');
	$(pid)[0].innerHTML = 'Message Sent';
	$(pid).addClass('good-state');
	setTimeout(function() {
		$('.popup-status').removeClass('show');
		setTimeout(function() {
			$('.popup-status').remove();
		}, 500);
	}, 2000);
}

//
// Function: show alert that contact is NOT saved
//
function showSaveFail(pid) {
	console.log('NOT saved');
	$(pid).innerHTML = 'Sending Failed';
	$(pid).addClass('bad-state');
	setTimeout(function() {
		$('.popup-status').removeClass('show');
		setTimeout(function() {
			$('.popup-status').remove();
		}, 500);
	}, 2000);
}

//
// Function: clear all input from a form
//
function clearForm(form) {
	var inputs = $(form).find('input');
	var textareas = $(form).find('textarea');

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].value = '';
	}
	for (var i = 0; i < textareas.length; i++) {
		textareas[i].value = '';
	}
}