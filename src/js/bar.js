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