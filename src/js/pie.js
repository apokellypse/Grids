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