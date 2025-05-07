console.log('D3 Version:', d3.version);

// Ensure D3.js is included in your HTML file before running this script
// Set up SVG dimensions
const width = 800;
const height = 400;
const xMax = 100, curveMargin = 80
const randRange = xMax/3 ;
const circleRadius = 5, numCircles = 500;
const startLowPerc = 0.2, endLowPerc = 0.3
const animationDuration = 5, randDelayDuration = 20;
const optionToField = {
    startYear: 'year',
    endYear: 'year',
    g1Age: 'ageRange',
    g1Sex: 'sex',
    g1Ethnicity: 'ethnicity',
    g1Health: 'health',
    g1Income: 'income',
    g1Insured: 'insured',
    g1Served: 'served',
    g2Age: 'ageRange',
    g2Sex: 'sex',
    g2Ethnicity: 'ethnicity',
    g2Health: 'health',
    g2Income: 'income',
    g2Insured: 'insured',
    g2Served: 'served'
};

let colorScale = d3.scaleSequential(d3.interpolateTurbo)
    .domain([0, xMax]);
let allData = []
let group1 = []
let group2 = []



// Append an SVG element to the body
const svg = d3.select("#vis")
                .append('svg')
                .attr('width', width)
                .attr('height', height);


// Load Data
function init() {
    d3.csv("data/data.csv", d => ({
        year: (new Date(d.Date)).getFullYear(),             //Only need year
        isDepressed: d.Depression == "Yes" ? 1 : 0,         //Can average easier 
        ageRange: d.Age,                                    //Can deal with string stuff later
        ethnicity: d.Race,                              
        health: d.Health,                               
        income: d.Income,                               
        sex: d.Sex,                                     
        insured:                                            //Made it look cleaner for pickers
            d.HealthInsurance == "Yes" ? "Insured" :        
            d.HealthInsurance == "No" ? "Uninsured" : 
            "Other/Dk/Refused",                     
        served:                                             //Made it look cleaner for pickers
            d.HealthInsurance == "Yes" ? "Served" :        
            d.HealthInsurance == "No" ? "Not Served" : 
            "Other/Dk/Refused",                      
    })).then(data => {
        document.getElementById("loadingGif").style.visibility = "hidden";
        console.log(data); // Check if data loads correctly
        allData = data;

          // Find Unique Selections:
        //   function onlyUnique(value, index, array) {return array.indexOf(value) === index; }          
        //   var a = data.map(d => d.served);
        //   var unique = a.filter(onlyUnique);
        //   console.log(unique);
        
        setupSelectors();
        filter()
        loadCircles();
    })
    .catch(error => console.error('Error loading data:', error));;
}

window.addEventListener('load', init);

function setupSelectors() {
    // Function to get unique values from a field in allData
    function getUniqueValues(field) {
        const uniqueValues = [...new Set(allData.map(d => d[field]))]
            .filter(d => d !== undefined && d !== null && d !== '')
            .sort();
        return ['Any', ...uniqueValues]; // Add "Any" as the first option
    }

    let firstYear = true

    // Update each dropdown
    d3.selectAll('.variable')
        .each(function() {
            const select = d3.select(this);
            const optionKey = select.attr('id').replace('Var', ''); // Remove 'Var' suffix
            const field = optionToField[optionKey] || 'year'; // Default to 'year'

            // Get unique values for the field
            let uniqueValues = getUniqueValues(field);

            if (field == 'year') {
                uniqueValues = uniqueValues.slice(1)
            }

            // Populate dropdown with unique values
            select.selectAll('option')
                .data(uniqueValues)
                .enter()
                .append('option')
                .text(d => d)
                .attr('value', d => d);

            // Set initial value to the first unique value (or empty if none)
            select.property('value', uniqueValues[0] || '');

            if (!firstYear && field == 'year') {
                select.property('value', uniqueValues[uniqueValues.length - 1] || '');
            } else {
                firstYear = false
            }

        })
}


function updateVis() {
    filter()
}

function filter() {
    const dropdownValue = ((x) => d3.select(`#${x}Var`).node().value)

    g1vars = ['startYear', 'g1Age', 'g1Sex', 'g1Ethnicity', 'g1Health', 'g1Income', 'g1Insured', 'g1Served']
    g2vars = ['endYear', 'g2Age', 'g2Sex', 'g2Ethnicity', 'g2Health', 'g2Income', 'g2Insured', 'g2Served']    

    group1 = allData.filter(
        function (d) {
            for (const dropdownKey of g1vars) {
                let value = dropdownValue(dropdownKey)
                let key = optionToField[dropdownKey]

                if (value === 'Any') {
                    continue
                }

                if (d[key] != value) {
                    return false
                }
            }

            return true
        }
    )

    group2 = allData.filter(
        function (d) {
            for (const dropdownKey of g2vars) {
                let value = dropdownValue(dropdownKey)
                let key = optionToField[dropdownKey]

                if (value === 'Any') {
                    continue
                }

                if (d[key] != value) {
                    return false
                }
            }

            return true
        }
    )

    console.log('Group 1: ', group1)
    console.log('Group 2: ', group2)
}


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