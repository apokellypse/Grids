$(document).ready(function() {
  console.log('hi');

  var WORDPRESS = "https://public-api.wordpress.com/rest/v1.1/sites/apokellypse.wordpress.com/posts";
  var POST_COUNT = 4;

  var SELECTORS = {
    NAV: '.nav',
    MOBILE: '(max-width: 800px)',
    TRIGGER: '.js-nav-trigger',
    BLOG: '.js-blog-template',
    BLOG_SCRIPT: '.js-blog-script',
    PLS_FORMAT: '.js-unformatted'
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

      console.log($(el));

      var ugly = new Date($(el).text());
      var pretty = formatDate(ugly);
      $(el).text(pretty);

      $(el).removeClass(SELECTORS.PLS_FORMAT);
    });

  };

  var insertBlog = function(data) {
    console.log(data);
    console.log(data.posts[0].title);

    var source = $(SELECTORS.BLOG_SCRIPT).html();
    var template = Handlebars.compile(source);
    $(SELECTORS.BLOG).html(template(data));

    checkDates();
  };

  var mobileDrawer = function(event) {
    // event.preventDefault();

    if ($(SELECTORS.NAV).hasClass('hidden')) {
      console.log('collapsed');
      $(SELECTORS.NAV).removeClass('hidden');
      $(this).text('- collapse menu -');

    } else {
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

  // get stuff from wordpress
  $.get(
    WORDPRESS,
    {number : POST_COUNT},
    insertBlog
  );

});
// Thanks to http://bl.ocks.org/dbuezas/9306799
// and http://bl.ocks.org/mbostock/32bd93b1cc0fbccc9bf9

var data = [
  {label: 'Marching Band', count: 5},
  {label: 'Coding Projects', count: 5},
  {label: 'Napping', count: 3},
  {label: 'Painting', count: 4},
  {label: 'Gaming', count: 2},
  {label: 'Campus Events', count: 3},
  {label: 'Quora', count: 3},
  {label: 'Spotify', count: 4}
];


var color = d3.scale.ordinal()
    // .range(['#98c3c7', '#419596', '#00657a', '#003b56']);
    .range(['#003b56', '#00657a', '#419596', '#98c3c7']);

var blueShades = function(d) {
  // rgb(0,150,130) is our base (angle 0)
  frac = d.startAngle / (2 * Math.PI); // get fraction
  amt = frac * 225;
  return d3.rgb(30 + amt, 149, 150);
};

var width = 800,
    height = 450,
    radius = Math.min(width, height) / 2;

var outerRadius = height / 2 - 20,
    innerRadius = outerRadius / 3;

var pie = d3.layout.pie()
    // .sort(null)
    .padAngle(0.025)
    .value(function(d) {
      return d.count;
    });

var arc = d3.svg.arc()
    .padRadius(outerRadius)
    .innerRadius(innerRadius);

var innerArc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

// cool trick to center lables - use an extra arc
var outerArc = d3.svg.arc()
    .innerRadius(0.9 * radius)
    .outerRadius(0.9 * radius);

var svg = d3.select(".pie-chart")
    .append("svg")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height + 50) / 2 + ")");

// organizing
svg.append("g")
  .attr("class", "slices");
svg.append("g")
  .attr("class", "labels");
svg.append("g")
  .attr("class", "lines");


// PIE SLICES

svg.select(".slices").selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .each(function(d) { d.outerRadius = outerRadius - 20; })
    .attr("d", arc)
    .style("fill", function(d) {
        console.log(d);
        return blueShades(d);
        // return color(d.data.count);
      })
    .on("mouseover", arcTween(outerRadius, 0))
    .on("mouseout", arcTween(outerRadius - 20, 150));

function arcTween(outerRadius, delay) {
  return function() {
    d3.select(this)
      .transition()
      .delay(delay)
      .attrTween("d", function(d) {
        var i = d3.interpolate(d.outerRadius, outerRadius);
        return function(t) {
          d.outerRadius = i(t);
          return arc(d);
        };
    });
  };
}

// TEXT LABELS

var text = svg.select(".labels").selectAll("text")
    .data(pie(data))
    .enter()
    .append("text")
    .attr("dy", "0.25em") // center the text next to the lines
    .text(function(d) {
      return d.data.label;
    });

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle)/2;
}

// text.attr("class", "label-text");
text.attr("transform", function(d) {
      pos = outerArc.centroid(d); // returns [x,y]
      // editing the x coord
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.1 : -1.1);
      return "translate(" + pos + ")";
    })
    // aligning to end of text vs. beginning of text
    .attr("text-anchor", function(d) { return midAngle(d) < Math.PI ? "start" : "end"; });


// LINES

var line = svg.select(".lines").selectAll("polyline")
    .data(pie(data))
    .enter()
    .append("polyline");

line.attr("points", function(d) {
      pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.05 : -1.05);
      return [innerArc.centroid(d), outerArc.centroid(d), pos];
    });

// var data = [
//   {label: 'Marching Band', value: 26},
//   {label: 'Coding Projects', value: 24},
//   {label: 'Napping', value: 16},
//   {label: 'Painting', value: 14},
//   {label: 'Gaming', value: 10},
//   {label: 'Campus Events', value: 8}
// ];

// var width = 800,
//     height = 500,
//     radius = Math.min(width, height) / 2;

// var outerRadius = height / 2 - 10,
//     innerRadius = outerRadius / 3;

// var pie = d3.layout.pie()
//   .sort(null)
//   .padAngle(0.025)
//   .value(function(d) {
//     return d.value;
//   });

// var svg = d3.select(".pie-chart")
//   .append("svg")
//   .append("g")
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// svg.append("g")
//   .attr("class", "slices");
// svg.append("g")
//   .attr("class", "labels");
// svg.append("g")
//   .attr("class", "lines");

// var arc = d3.svg.arc()
//   .outerRadius(radius * 0.8)
//   .innerRadius(radius * 0.3);

// var outerArc = d3.svg.arc()
//   .innerRadius(radius * 0.9)
//   .outerRadius(radius * 0.9);


// var key = function(d){ return d.data.label; };

// var color = d3.scale.ordinal()
//   .range(['#98c3c7', '#419596', '#00657a', '#003b56', '#10294F', '#00657a',]);





//   /* ------- PIE SLICES -------*/
//   var slice = svg.select(".slices").selectAll("path.slice")
//     .data(pie(data), key);

//   console.log(slice);

//   slice.enter()
//     .insert("path")
//     .attr("d", arc)
//     .style("fill", function(d) { return color(d.data.label); })
//     .attr("class", "slice");

//   slice
//     .transition()
//     .attrTween("d", function(d) {
//       return function(t) {
//         return arc(d);
//       };
//     });


//    // ------- TEXT LABELS -------

//   var text = svg.select(".labels").selectAll("text")
//     .data(pie(data), key);

//   text.enter()
//     .append("text")
//     .attr("dy", ".35em")
//     .text(function(d) {
//       return d.data.label;
//     });

//   function midAngle(d){
//     return d.startAngle + (d.endAngle - d.startAngle)/2;
//   }

//   text.transition().duration(1000)
//     .attrTween("transform", function(d) {
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         var pos = outerArc.centroid(d2);
//         pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
//         return "translate("+ pos +")";
//       };
//     })
//     .styleTween("text-anchor", function(d){
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         return midAngle(d2) < Math.PI ? "start":"end";
//       };
//     });

//   text.exit()
//     .remove();

//   /* ------- SLICE TO TEXT POLYLINES -------*/

//   var polyline = svg.select(".lines").selectAll("polyline")
//     .data(pie(data), key);

//   polyline.enter()
//     .append("polyline");

//   polyline.transition().duration(1000)
//     .attrTween("points", function(d){
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         var pos = outerArc.centroid(d2);
//         pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
//         return [arc.centroid(d2), outerArc.centroid(d2), pos];
//       };
//     });

//   polyline.exit()
//     .remove();
