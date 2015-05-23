$(document).ready(function() {

	var links = 'a, a:link, a:active, a:focus, a:visited';
	$(links).addClass('text-light');
	$('#container').addClass('container-light');


	/*This highlights the link to the current page along the nav bar*/
	$(function() {
		var p = window.location.pathname.split('/');
		// console.log(p);
	    // var pathname = (window.location.pathname.match(/[^\/]+$/)[0]);
	    var pathname = p[p.length - 1];
	    // console.log(pathname);

	    $('a').each(function() {
		    if ($(this).attr('href') == pathname) {
		        // $(this).addClass('current');
		        $(this).attr('id', 'current');
		    }
	    });
	});

	/*This toggles the dark/light theme*/
	/*If this gets too tiresome, consider swapping css sheets instead of css classes*/
	$('.lights').click(function() {
		console.log('toggling theme');
		console.log($(this).text());
		if ($(this).text() == '<Lights On>') {
			$(this).text('<Lights Off>');
			$('link[href="css/light.css"]').attr('href','dark.css');

		} else {
			$(this).text('<Lights On>');
			$('link[href="css/light.css"]').attr('href','light.css');

		}
	});


})
