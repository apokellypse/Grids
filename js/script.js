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
			$('link[href="light.css"]').attr('href','dark.css');
			// $('body').addClass('body-dark');

			// $('p, h1, h2, h3, span').removeClass('text-light');
			// $('p, h1, h2, h3, span').addClass('text-dark');
			// $('h1, h2, h3').addClass('text-white2');
			// $(links).addClass('text-white');

			// $('#container').removeClass('container-light');
			// $('#container').addClass('container-dark');

			// $('h1').addClass('title-dark');
			// $('header').addClass('header-dark');
		} else {
			$(this).text('<Lights On>');
			$('link[href="dark.css"]').attr('href','light.css');
			// $('body').removeClass('body-dark');

			// $('p, h1, h2, h3, span').removeClass('text-dark');
			// $('p, h1, h2, h3, span').addClass('text-light');
			// $('h1, h2, h3').removeClass('text-white2');
			// $(links).removeClass('text-white');

			// $('#container').removeClass('container-dark');
			// $('#container').addClass('container-light');

			// $('h1').removeClass('title-dark');
			// $('header').removeClass('header-dark');
		}
	});

	// $('#lightsoff').click(function() {
	// 	$('link[href="style.css"]').attr('href','style2.css');
	// 	$(this).removeAttr('id');
	// 	$(this).attr('id', 'lightson');
	// 	$(this).text('<Lights On>');
	// 	console.log('lightsoff');
	// });

})
