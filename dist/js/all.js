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
$(document).ready(function() {

var junior = (5/8),
    major = (35/56),
    game = (12/24);

var data = [
  {label: "Cornell University Junior", detail: "5 of 8 semesters", value: junior},
  {label: "Computer Science Major", detail: "35 of 56 core credits", value: major}, // 35 out of 56 credits
  {label: "Game Design Minor", detail: "12 of 24 credits", value: game}
];

var blueShades = function(d) {
  frac = d.value; // get fraction
  return d3.hsl(200, frac, 0.3);
};

var dataset = [junior, major, game];

var width = 760,
    barHeight = 80;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".bar-chart")
    .append("svg");
    // .attr("width", width);

chart.attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    // .attr("class", "bar-chart-item")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });


bar.append("rect")
    .attr("fill", "#dadada")
    .attr("width", 760)
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("height", barHeight - 15);

bar.append("rect")
    .attr("fill", function(d) { return blueShades(d); })
    .attr("width", function(d) { return x(d.value); })
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("height", barHeight - 15);

bar.append("text")
    .attr("class", "completed")
    .attr("x", function(d) { return x(d.value) - 20; })
    .attr("y", barHeight / 2)
    .attr("dy", "0em")
    .attr("text-anchor", "end")
    .text(function(d) { return d.label; });

bar.append("text")
    .attr("class", "percents")
    .attr("text-anchor", "start")
    .attr("x", function(d) { return x(d.value) + 20; })
    .attr("y", barHeight / 2)
    .attr("dy", "0em")
    .text(function(d) { return d.detail; });
      // .text(function(d) { return Math.round(d.value * 100) + "% completed"; });
});
$(document).ready(function() {
// Thanks to http://bl.ocks.org/dbuezas/9306799
// and http://bl.ocks.org/mbostock/32bd93b1cc0fbccc9bf9

// based on hours per two weeks

var data = [
  {label: 'Coding For Fun', count: 4},
  {label: 'Painting', count: 4},
  {label: 'Gaming', count: 3},
  {label: 'Napping', count: 4},
  {label: 'Band', count: 8},
  {label: 'Local Events', count: 3},
  {label: 'Quora', count: 2},
  {label: 'Spotify', count: 6}
];


var color = d3.scale.ordinal()
    // .range(['#98c3c7', '#419596', '#00657a', '#003b56']);
    .range(['#003b56', '#00657a', '#419596', '#98c3c7']);

var blueShades = function(d) {
  // rgb(0,150,130) is our base (angle 0)
  frac = d.startAngle / (2 * Math.PI); // get fraction
  amt = frac * 225;
  return d3.rgb(30 + amt, 150, 150);
};

var width = 800,
    height = 450,
    radius = Math.min(width, height) / 2;

var outerRadius = height / 2 - 20,
    innerRadius = outerRadius / 3;

var pie = d3.layout.pie()
    .sort(null) // disables the sort by size
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
        // console.log(d);
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

});
$(document).ready(function() {

var margin = {top: 60, right: 20, bottom: 60, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var formatPercent = d3.format(".0%");
var parseDate = d3.time.format("%m/%Y").parse;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .tickFormat();

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.about;
  });

var svg = d3.select(".timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

console.log('here');

data =

// [
//   {letter: "A", frequency: 3},
//   {letter: "B", frequency: 4},
//   {letter: "C", frequency: 7},
//   {letter: "D", frequency: 0}
// ];

[
  {
    "date":"10/2011",
    "about":"learned animation and modeling in 3dsmax",
    "art":1,
    "tools":1,
    "coding":0,
    "happening":0
  },
  {
    "date":"09/2012",
    "about":"started photoshop, flash, after fx, illustrator",
    "art":0,
    "tools":1,
    "coding":0,
    "happening":0
  },
  {
    "date":"10/2012",
    "about":"interest in websites and computer graphics",
    "art":1,
    "tools":1,
    "coding":0,
    "happening":1
  },
  {
    "date":"10/2012",
    "about":"chose CS as major for college",
    "art":0,
    "tools":0,
    "coding":0,
    "happening":1
  },
  {
    "date":"05/2013",
    "about":"graduated from Rochester High School",
    "art":0,
    "tools":0,
    "coding":0,
    "happening":1
  },
  {
    "date":"08/2013",
    "about":"entered Cornell University",
    "art":0,
    "tools":0,
    "coding":0,
    "happening":1
  },
  {
    "date":"08/2013",
    "about":"took first coding class in Python",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":1
  },
  {
    "date":"01/2014",
    "about":"coding class with Java",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":0
  },
  {
    "date":"02/2014",
    "about":"started blender and maya?",
    "art":0,
    "tools":1,
    "coding":0,
    "happening":0
  },
  {
    "date":"06/2014",
    "about":"created first website",
    "art":1,
    "tools":0,
    "coding":1,
    "happening":1
  },
  {
    "date":"08/2014",
    "about":"Siggraph 2014 in vancouver",
    "art":1,
    "tools":1,
    "coding":0,
    "happening":1
  },
  {
    "date":"08/2014",
    "about":"first computer graphics class",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":0
  },
  {
    "date":"08/2014",
    "about":"coding class with Ocaml",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":0
  },
  {
    "date":"01/2015",
    "about":"coding class with C",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":0
  },
  {
    "date":"01/2015",
    "about":"took first painting class; used acrylic",
    "art":1,
    "tools":0,
    "coding":0,
    "happening":1
  },
  {
    "date":"05/2015",
    "about":"interned at LinkedIn; webdev",
    "art":1,
    "tools":0,
    "coding":1,
    "happening":1
  },
  {
    "date":"08/2015",
    "about":"Siggraph 2015 in LA",
    "art":1,
    "tools":1,
    "coding":0,
    "happening":0
  },
  {
    "date":"08/2015",
    "about":"painting class; used watercolor",
    "art":1,
    "tools":0,
    "coding":0,
    "happening":1
  },
  {
    "date":"08/15",
    "about":"first machine learning class with MatLab",
    "art":0,
    "tools":0,
    "coding":1,
    "happening":0
  }
];


x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.happening; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Axis label");

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.date); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.happening); })
    .attr("height", function(d) { return height - y(d.happening); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

});
