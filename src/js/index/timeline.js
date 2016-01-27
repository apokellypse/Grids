(function(exports) {
// $(document).ready(function() {
  console.log('timeline.js');

  var SELECTORS = {
    TIMELINE_SCRIPT : ".js-timeline-script",
    TIMELINE : ".js-timeline-template"
  };

  var data = {
    events : [
      {
        title : "a title",
        date  : "a date"
      },
      {
        title : "a title2",
        date  : "a date2"
      }
    ]
  };


  // console.log(data);
  // console.log(data.events[0].title);

  var source = $(SELECTORS.TIMELINE_SCRIPT).html();
  // console.log(source);
  var template = Handlebars.compile(source);
  // console.log(template);
  $(SELECTORS.TIMELINE).html(template(data));


// });
})(this.timeline = {});