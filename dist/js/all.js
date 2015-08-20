// var source = $("#animalTemplate").html();
// var template = Handlebars.compile(source);
// var data = {animals: [
//   {type: "Dog", sound: "woof"},
//   {type: "Cat", sound: "meow"},
//   {type: "Cow", sound: "moo"}
// ]};
// $("#animalList").html(template(data));

$(document).ready(function() {
  console.log('hi');

  var SELECTORS = {
    NAV: '.nav',
    MOBILE: '(max-width: 800px)',
    TRIGGER: '.nav-trigger'
  };

  var addEvent = function(object, type, callback) {
      if (object === null || typeof(object) == 'undefined') return;
      if (object.addEventListener) {
          object.addEventListener(type, callback, false);
      } else if (object.attachEvent) {
          object.attachEvent("on" + type, callback);
      } else {
          object["on"+type] = callback;
      }
  };

  var checkSize = function() {

    var mql = window.matchMedia(SELECTORS.MOBILE);
    // console.log(mql);

    if (mql.matches) {
      $(SELECTORS.NAV).addClass('hidden');
    } else {
      $(SELECTORS.NAV).removeClass('hidden');
    }
  };

  // default: have drawer hidden
  checkSize();

  // checks window size and hides/shows the mobile nav drawer
  addEvent(window, 'resize', checkSize);

  $(SELECTORS.TRIGGER).on('click', function() {

    if ($(SELECTORS.NAV).hasClass('hidden')) {
      console.log('collapsed');
      $(SELECTORS.NAV).removeClass('hidden');
      $(this).text('- collapse menu -');

    } else {
      $(SELECTORS.NAV).addClass('hidden');
      $(this).text('+ expand menu +');
    }

  });




});