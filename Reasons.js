function init(){

var w = 900;
var h = 600;
var padding = 100;
var dataset;
    // Load data from CSV file and parse it
    d3.csv("GDP.csv", function(d) {
        return {
        date: (+d.date),
        GdpG: (+d.GdpG),
        UnemploymentR: (+d.UnemploymentR),
        SchoolEnrollmentR: (+d.SchoolEnrollmentR)
      };
    }).then(function(data) {
      dataset = data;
  
      // Set x and y scales
      var xScale = d3.scaleLinear()
        .domain([
          d3.min(dataset, function(d) { return d.date; }),
          d3.max(dataset, function(d) { return d.date; })
        ])
        .range([padding, w - padding]);
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.GdpG; })])
        .range([h - padding, padding ]);
      
      // Set the line generator function
      var line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.GdpG); })
        .y(function(d) { return yScale(d.UnemploymentR); })
        .y(function(d) { return yScale(d.SchoolEnrollmentR); });
      // Add the area shape to the chart
      var area = d3.area()
        .x(function(d) { return xScale(d.date); })
        .y0(function() { return yScale.range()[0]; })
        .y1(function(d) { return yScale(d.GdpG); })
        .y2(function(d) { return yScale(d.UnemploymentR); })
        .y3(function(d) { return yScale(d.SchoolEnrollmentR); });
      // Create the SVG element
      var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
  
      svg.append("path")
        .datum(dataset)
        .attr("fill", "#FFD3D9")
        .attr("d", area);
  
      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "#7B4173FF")
        .attr("stroke-width", 2)
        .attr("d", line);
      // Add the x-axis and y-Axis to the chart
      var xAxis = d3.axisBottom(xScale)
                    .ticks(5);
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
  
      var yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        svg
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => {
            focus.style("display", null);
            })
            .on("mouseout", () => {
            focus.style("display", "none");
            })
            .on("touchmove mousemove", mouseMove);
  
    });
}

window.onload = init;
