console.log('D3 Version:', d3.version);

// Ensure D3.js is included in your HTML file before running this script

// Set up SVG dimensions
const width = 700, height = 300;

// Append an SVG element to the body
const svg = d3.select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define a path (a simple sine wave curve)


// const pathData = "M 50 200 Q 300 50 550 200 T 1050 200";



    var data = d3.range(0, 10).map(function(k) {
      var value = Math.cos((1/11) * k * Math.PI)*5+5;
      return value;
    });

    var x = d3.scaleLinear().domain([0, 10]).range([0, 700]);
    var y = d3.scaleLinear().domain([0, 10]).range([10, 290]);
    var line = d3.line()
    .curve(d3.curveCardinal)
    .x((d, i) => x(i))
    .y(d => y(d));



// Append the path to the SVG (for visualization)
const path = svg.append("path")
    .attr("d", line(data))
    .attr("fill", "none")
    .attr("stroke", "none")
    .attr("stroke-width", 2);

// Get the total length of the path
const pathLength = path.node().getTotalLength();

// Create the moving circle
const circle = svg.append("circle")
    .attr("r", 7)
    .attr("fill", "red");

// Function to animate the circle along the path
function animate() {
    circle.transition()
        .duration(4000)  // Animation duration (4s)
        .ease(d3.easeLinear)  // Linear movement
        .attrTween("transform", function() {
            return function(t) {
                const point = path.node().getPointAtLength(t * pathLength);
                return `translate(${point.x},${point.y})`;
            };
        })
        .on("end", animate);  // Loop animation
}

// Start the animation
animate();