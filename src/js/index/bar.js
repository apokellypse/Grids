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