// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 60,
  left: 60
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
      d.abbr = +d.abbr;
    });

    // Create Scales
    var xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty)*0.9, d3.max(data, d => d.poverty)*1.1])
      .range([0, chartWidth])

    var yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.healthcare)*0.9, d3.max(data, d => d.healthcare)*1.1])
      .range([chartHeight, 0])
    
    // Create Axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Create Circles
    chartGroup.selectAll("scatter-dots")
      .data(data)
      .enter()
      .append("circle")
      // .attr("class", "scatter")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", 12)
      .attr("fill", 'lightblue')
      .attr("width", d => chartWidth - xScale(d.poverty))
      .attr("height", d => chartHeight - yScale(d.healthcare));

    // Create labels
    chartGroup.append("text")
      .text("Lacks Healthcare %")
      .attr("transform", "rotate(-90)")
      .attr("y", -chartMargin.left/2)
      .attr("x", -chartHeight/2 -chartMargin.top -35)
      .attr("class", "axisText")
      .attr("font-weight", "bold");
    
    chartGroup.append("text")
      .text("In Poverty %")
      .attr("y", chartHeight + chartMargin.bottom/2)
      .attr("x", chartWidth/2-35)
      .attr("class", "axisText")
      .attr("font-weight", "bold");
});