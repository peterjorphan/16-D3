// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(data, error) {

    // Log an error if one exists
    if (error) return console.warn(data);
  
    // Print the Data
    console.log(data);

    // Cast data values
    data.forEach(function(d) {
      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;
    });

    // Create Scales
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.poverty)])
      .range([0, chartWidth])

    var yScale = d3.scaleLinear()
      .domain([[0, d3.max(data, d => d.healthcare)]])
      .range([chartHeight, 0])

    // Create Axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // // Create Circles
    // chartGroup.selectAll("scatter-dots")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => xScale(d.poverty))
    //   .attr("y", d => yScale(d.healthcare))
    //   // .attr("width", xScale.bandwidth())
    //   .attr("height", d => chartHeight - yScale(d.healthcare));

});