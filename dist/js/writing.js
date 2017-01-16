(function(exports) {
// $(document).ready(function() {

  // console.log('wordpress.js');

  var WORDPRESS = "https://public-api.wordpress.com/rest/v1.1/sites/apokellypse.wordpress.com/posts";
  var POST_COUNT = 2;

  var SELECTORS = {
    BLOG: '.js-blog-template',
    BLOG_SCRIPT: '.js-blog-script',
    PLS_FORMAT: '.js-raw-date'
  };

  var formatDate = function(dateObj) {
    // var dateObj = new Date('2015-08-18T17:44:54+00:00');
    var dateList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthList = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var day = dateObj.getUTCDay();
    var date = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth();
    var year = dateObj.getUTCFullYear();

    return dateList[day] + ', ' + monthList[month] + ' ' + date + ', ' + year;
  };

  var checkDates = function() {
    var dateArray = $(SELECTORS.PLS_FORMAT);

    $.map(dateArray, function(el) {

      // console.log($(el));

      var ugly = new Date($(el).text());
      var pretty = formatDate(ugly);
      $(el).text(pretty);

      $(el).removeClass(SELECTORS.PLS_FORMAT);
    });

  };

  var insertBlog = function(data) {
    // console.log(data);
    // console.log(data.posts[0].title);

    console.log(data.posts[0]);

    var source = $(SELECTORS.BLOG_SCRIPT).html();
    var template = Handlebars.compile(source);

    // fading logic

    $(SELECTORS.BLOG).fadeOut(400, function() {
      $(SELECTORS.BLOG).html(template(data));
      checkDates();
      $(this).delay(0).fadeIn(400);
    });


  };

  var delayedInsert = function(data) {
    setTimeout(function() { insertBlog(data); }, 800);
  };

  // console.log(insertBlog);

  // get stuff from wordpress
  $.get(
    WORDPRESS,
    {number : POST_COUNT},
    delayedInsert
  );

// });
})(this.wordpress = {});