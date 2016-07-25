(function(exports) {
// $(document).ready(function() {
console.log('bar.js');

var senior = (6/8),
    major = (35/56),
    game = (12/24);

var data = [
  {label: "Cornell University Senior", detail: "6 of 8 semesters", value: senior},
  {label: "Computer Science Major", detail: "35 of 56 core credits", value: major}, // 35 out of 56 credits
  {label: "Game Design Minor", detail: "12 of 24 credits", value: game}
];

var blueShades = function(d) {
  frac = d.value; // get fraction
  // return d3.hsl(200, frac, 0.3);
  return d3.rgb(30, 150, 150);
};

var dataset = [senior, major, game];

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

// gray bar
bar.append("rect")
    .attr("class", "gray-rect")
    .attr("fill", "#dadada")
    .attr("width", 760)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("height", barHeight - 15);

// blue bar
bar.append("rect")
    .attr("class", "blue-rect")
    .attr("fill", function(d) { return blueShades(d); })
    // .attr("width", function(d) { return x(d.value); })
    .attr("width", 760)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("height", barHeight - 15);


bar.append("text")
    .attr("class", "completed")
    // .attr("x", function(d) { return x(d.value) - 20; })
    .attr("x", 760/2)
    .attr("y", barHeight / 2)
    .attr("dy", "0em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.label; });


bar.append("text")
    .attr("class", "percents")
    .attr("text-anchor", "start")
    // .attr("x", function(d) { return x(d.value) + 20; })
    .attr("x", function(d) { return 760; })
    .attr("y", barHeight / 2)
    .attr("dy", "0em")
    .text(function(d) { return d.detail; });
      // .text(function(d) { return Math.round(d.value * 100) + "% completed"; });


bar.on("mouseover", function(d) {
        wid = d3.select(this).select(".blue-rect").attr("width");
        xval = d3.select(this).select(".completed").attr("x");
        xval2 = d3.select(this).select(".percents").attr("x");
        len = d3.select(this).select(".completed").node().getBBox().width;
        // console.log(len);
        d3.select(this).select(".blue-rect").transition()
            .attrTween("width", function() { return d3.interpolate(wid, x(d.value)); })
            // .ease("linear")
            .duration(200);
        d3.select(this).select(".completed").transition()
            .attrTween("x", function() { return d3.interpolate(xval, x(d.value) - len/2 - 20); })
            // .ease("linear")
            .duration(200);
        d3.select(this).select(".percents").transition()
            .attrTween("x", function() { return d3.interpolate(xval2, x(d.value) + 20); })
            .duration(200);
    })
    .on("mouseout", function(d) {
        wid = d3.select(this).select(".blue-rect").attr("width");
        xval = d3.select(this).select(".completed").attr("x");
        xval2 = d3.select(this).select(".percents").attr("x");
        d3.select(this).select(".blue-rect").transition()
            .attrTween("width", function() { return d3.interpolate(wid, 760); })
            // .ease("linear")
            .duration(200);
        d3.select(this).select(".completed").transition()
            .attrTween("x", function() { return d3.interpolate(xval, 760/2); })
            // .ease("linear")
            .duration(200);
        d3.select(this).select(".percents").transition()
            .attrTween("x", function() { return d3.interpolate(xval2, 760); })
            .duration(200);
    });



})(this.bar = {});
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