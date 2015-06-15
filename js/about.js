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
	})
});