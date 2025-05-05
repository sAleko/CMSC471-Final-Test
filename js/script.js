console.log('D3 Version:', d3.version);

// Ensure D3.js is included in your HTML file before running this script

// Set up SVG dimensions
const width = 700, height = 300;
const xMax = 100, curveMargin = 80
const randRange = xMax/3 ;
const circleRadius = 5, numCircles = 500;
const startLowPerc = 0.2, endLowPerc = 0.3
const animationDuration = 5, randDelayDuration = 20;

// Load Data
function init() {
    d3.tsv("data/NSDUH_2023_Tab.txt", d => ({
        // JavaScript's Date object stores time in UTC internally.
        // We add a time zone offset to avoid potential issues.
        date: d.FILEDATE,  
        // Convert confirmed cases to numbers; assume 0 if missing (NA)
        isDepressed: d.ADDPREV
    })).then(data => {
        console.log(data); // Check if data loads correctly
        loadCircles();
        document.getElementById("loadingGif").style.visibility = "hidden";
    });
}


window.addEventListener('load', init);

// Append an SVG element to the body
const svg = d3.select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let colorScale = d3.scaleSequential(d3.interpolateTurbo)
    .domain([0, xMax]);

    // Define a path (a simple sine wave curve)


function generateBezierPath(p1, p2) {
    // Control points: horizontally in the middle, vertically offset for curve
    const cp1 = { x: p1.x + (p2.x - p1.x) / 3, y: p1.y };
    const cp2 = { x: p2.x - (p2.x - p1.x) / 3, y: p2.y };
  
    // Construct the path string
    return `M${p1.x},${p1.y} C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${p2.x},${p2.y}`;
  }


  
function loadCircles() {
    var x = d3.scaleLinear().domain([0, xMax]).range([curveMargin, width-curveMargin]);
    var y = d3.scaleLinear().domain([0, xMax]).range([curveMargin, height-curveMargin]);

    for (let i = 0; i < numCircles; i++) {
        
        const startAffected = Math.random() > startLowPerc

        const start = {x: x(0), 
                    y: startAffected  ? 
                        y(xMax + (Math.random() * randRange) - (randRange / 2)) : 
                        y((Math.random() * randRange) - (randRange / 2))}

        const end =   {x: x(xMax), 
                    y: (!startAffected ? 
                            Math.random() < endLowPerc : 
                            Math.random() > endLowPerc)  ? 
                        y(xMax + (Math.random() * randRange) - (randRange / 2)) : 
                        y((Math.random() * randRange) - (randRange / 2))}

        // Append the path to the SVG (for visualization)
        const path = svg.append("path")
            .attr("d", generateBezierPath(start, end))
            .attr("fill", "none")
            .attr("stroke", "none")
            .attr("stroke-width", 1);

        // Get the total length of the path
        const pathLength = path.node().getTotalLength();

        const initPoint = path.node().getPointAtLength(0);
        // Create the moving circle
        const circle = svg.append("circle")
            .attr("r", circleRadius)
            .attr("fill", colorScale(Math.random() * xMax))
            .attr("cx", initPoint.x)
            .attr("cy", initPoint.y)
        
            
        // Function to animate the circle along the path
        function animate() {
            circle.transition()
                .delay(Math.random() * randDelayDuration * 1000)
                .duration(animationDuration * 1000)  // Animation duration
                .ease(d3.easeLinear)  // Linear movement
                .attrTween("transform", function() {
                    return function(t) {
                        const point = path.node().getPointAtLength(t * pathLength);
                        return `translate(${point.x-initPoint.x},${point.y-initPoint.y})`;
                    };
                })
                // .on("end", animate);  // Loop animation
        }

        // Start the animation
        animate();
    }

}