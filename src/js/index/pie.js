(function(exports) {
// $(document).ready(function() {
// Thanks to http://bl.ocks.org/dbuezas/9306799
// and http://bl.ocks.org/mbostock/32bd93b1cc0fbccc9bf9

// based on hours per two weeks
console.log('pie.js');

var data = [
  {label: 'Quora', count: 3, desc: 'I like reading funny and random anecdotes. At the heart of Quora is storytelling.'},
  {label: 'Gaming', count: 2, desc: 'My favorite Games include Bastion, Don\'t Starve, and Crypt of the NecroDancer.'},
  {label: 'Band', count: 4, desc: 'Saxophones Rule.'},
  {label: 'Painting', count: 1, desc: 'Started with acrylic, now experimenting with watercolor too.'},
  {label: 'Napping', count: 2, desc: '<insert sleeping pusheen>'},
  {label: 'Spotify', count: 3, desc: 'Genres appreciated include dance pop, chill pop, ambient, and swing.'}
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

var hoverShades = function(d) {
  // rgb(0,150,130) is our base (angle 0)
  frac = d.startAngle / (2 * Math.PI); // get fraction
  amt = frac * 225;
  return d3.rgb(amt + 60, 180, 180);
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

// cool trick to center labels - use an extra arc
var outerArc = d3.svg.arc()
    .innerRadius(0.9 * radius)
    .outerRadius(0.9 * radius);

var svg = d3.select(".pie-chart")
    .append("svg")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height + 50) / 2 + ")");

var g = svg.selectAll(".slice-group")
    .data(pie(data))
  .enter().append("g")
    .attr("class", "slice-group");

// PIE SLICES

g.append("path")
    .each(function(d) { d.outerRadius = outerRadius - 20; })
    .attr("d", arc)
    .style("fill", function(d) { return blueShades(d); })
    .on("mouseover", function(d) { 
      d3.select(this).style("fill", function(d) { return hoverShades(d); });
      d3.select(this.parentNode).select('.label-desc')
        .text(function(d) { return d.data.desc; })
        .call(wrap, 150);
    })
    .on("mouseout", function(d) { 
      d3.select(this).style("fill", function(d) { return blueShades(d); });
      d3.select(this.parentNode).select('.label-desc').text('');
    });
  

g.append("text").attr("class", "label-blurb");
g.append("text").attr("class", "label-desc");

g.append("polyline");

// TEXT LABELS

var text = svg.selectAll(".slice-group").selectAll(".label-blurb")
    .attr("dy", "0.25em") // center the text next to the lines
    .text(function(d) {
      return d.data.label;
    });

var desc = svg.selectAll(".slice-group").selectAll(".label-desc")
    .attr("dy", "2em") // center the text next to the lines
    .attr("font-size", "0.7em");  

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle)/2;
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", "1.4em").text(word);
      }
    }
  });
}


text.attr("transform", function(d) {
      pos = outerArc.centroid(d); // returns [x,y]
      // editing the x coord
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.05 : -1.05);
      return "translate(" + pos + ")";
    })
    // aligning to end of text vs. beginning of text
    .attr("text-anchor", function(d) { return midAngle(d) < Math.PI ? "start" : "end"; });

desc.attr("transform", function(d) {
      pos = outerArc.centroid(d); // returns [x,y]
      // editing the x coord
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.05 : -1.05);
      return "translate(" + pos + ")";
    })
    // aligning to end of text vs. beginning of text
    .attr("text-anchor", function(d) { return midAngle(d) < Math.PI ? "start" : "end"; });


// LINES

var line = svg.selectAll(".slice-group").selectAll("polyline");

line.attr("points", function(d) {
      pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.0 : -1.0);
      return [innerArc.centroid(d), outerArc.centroid(d), pos];
    });


})(this.pie = {});