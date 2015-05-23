$(document).ready(function() {
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
})
