
// var source = document.getElementById('template').innerHTML;
var source = $('template').html();
var template = Handlebars.compile(source);

var data = {
	animals:
	[
		{type: 'dog', sound: 'woof'},
		{type: 'cat', sound: 'meow'},
		{type: 'cow', sound: 'moo'}
	]
};

var output = template(data);

// document.getElementById('animalList').innerHTML = output;
$('animalList').html(output);

