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
