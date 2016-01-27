(function(exports) {
// $(document).ready(function() {
  console.log('nav.js');
  var SELECTORS = {
    NAV: '.nav',
    MOBILE: '(max-width: 800px)',
    TRIGGER: '.js-nav-trigger'
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

  var mobileDrawer = function(event) {
    // event.preventDefault();
    console.log('mobileDrawer');
    console.log(SELECTORS);

    if ($(SELECTORS.NAV).hasClass('hidden')) {
      console.log('collapsed');
      $(SELECTORS.NAV).removeClass('hidden');
      $(this).text('- collapse menu -');

    } else {
      console.log('expanded');
      $(SELECTORS.NAV).addClass('hidden');
      $(this).text('+ expand menu +');
    }
  };

  // default: have drawer hidden
  checkSize();

  // checks window size and hides/shows the mobile nav drawer
  addEvent(window, 'resize', checkSize);

  // listens for click
  $(SELECTORS.TRIGGER).on('click', mobileDrawer);

// });
})(this.nav = {});