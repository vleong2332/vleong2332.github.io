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


	/* PERSONAL BRAND SCRIPT*/
	/* Highlight brand on mouseover */
	//$('.brand').on('mouseover', selectActiveAdjEvent(event));
	$('.brand').on('mouseover', function(event) {selectActiveAdjEvent(event);});


	/* CAROUSEL SCRIPT */
	var carousel = $('#adjectives');
	/* Set Carousel on pageload */
	if (window.matchMedia('screen and (max-width: 775px)').matches) {
		carousel.jcarousel({wrap: "circular"});
		prevAndNext('show');
	}
	else
	{
		prevAndNext('hide');
	}
	/* On resizing... */ 
	$(window).resize(function() {
		// Setup carousel
		if (window.matchMedia('screen and (max-width: 775px)').matches)
		{
			// Initiate carousel
			carousel.jcarousel({wrap: "both"});
			// Unbind event from the logos
			$('.brand').off('mouseover');
			// Show the carousel navigation buttons
			prevAndNext('show');
			// Select the visible logo as active
			selectActiveAdj();
		}
		// If not setting up...
		else
		{
			// Bind event to the logos
			$('.brand').on('mouseover', function(event) {selectActiveAdjEvent(event);});
			// Hide carousel navigation buttons
			prevAndNext("hide");
		}
	})


	/* CAROUSEL NAVIGATION SCRIPT */
	/* Next brand on click */
	$('#adjective-next').click(function() {
	    carousel.jcarousel('scroll', '+=1');
	    selectActiveAdj();
	});
	/* Previous brand on click */
	$('#adjective-prev').click(function() {
	    carousel.jcarousel('scroll', '-=1');
	    selectActiveAdj();
	});

});



function prevAndNext(command) {
	if (command === "show")
	{
		$('#adjective-prev').removeClass('hidden');
		$('#adjective-next').removeClass('hidden');
	}
	else if (command === "hide")
	{
		$('#adjective-prev').addClass('hidden');
		$('#adjective-next').addClass('hidden');
	}
}

function selectActiveAdj() {
	var visible = $('#adjectives').jcarousel('fullyvisible').children().attr('id');
	var target = $('#' + visible);
	var desc = $('#' + visible + '-desc');
	// Make target active but the siblings not
	target.parent().siblings().children().removeClass('active');
	target.addClass('active');
	// Show target description and hide others'
	desc.siblings().addClass('hidden');
	desc.removeClass('hidden');
}

function selectActiveAdjEvent(e) {
	console.log('binding event');
	var target = '#'+ event.currentTarget.id;
	console.log(target);
	var desc = target + '-desc';
	console.log(desc);
	// Reset active class
	$(target).parent().siblings().children().removeClass('active');
	// Set active class to target
	$(target).addClass('active');
	// Reset description of brand
	$(desc).siblings().addClass('hidden');
	// Set active description of brand
	$(desc).removeClass('hidden');
}