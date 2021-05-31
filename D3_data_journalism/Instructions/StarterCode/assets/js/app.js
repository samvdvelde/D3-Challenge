var svgWidth = 900;
var svgHeight = 600;
var padding = 25;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function(healthData) {

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    })

    console.log(healthData);
    var abbrev = healthData.map(d => d.abbr)
    console.log(abbrev)

    var xScale = d3.scaleLinear()
        // .domain(d3.extent(healthData, d => d.poverty))
        .domain([8,d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        // .domain(d3.extent(healthData, d => d.healthcare))
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([height, 0]);



    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale);


    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    chartGroup.append("g").call(yAxis);


    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    var textGroup = chartGroup.selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty)-7)
        .attr("y", d => yScale(d.healthcare)+3)
        .attr("font-size", "12px")
        .attr("font_family", "arial")
        .attr("fill", "white")


    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

 
    
}).catch(function(error) {
    console.log(error);
});
