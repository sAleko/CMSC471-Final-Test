// https://observablehq.com/@dudaspm/moving-point-along-a-path@96
function _1(md){return(
md`# Moving Point Along a Path`
)}

function* _2(d3,DOM,width,height,margin,x,y,movingX,movingY,pathCoordinates)
{ 
  const svg = d3.select(DOM.svg(width, height))
    .style("width", width)
    .style("height", height)
  
  svg
    .append("g")
    .attr("class", "bottom")
    .attr("transform", "translate(0," + (height-margin.bottom) + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("class", "left")
    .attr("transform", "translate("+ (margin.left) + ",0)")
    .call(d3.axisLeft(y));   
  
  svg.append("circle")
    .attr("cx", x(movingX))
    .attr("cy", y(movingY))
    .attr("r",5)
    .style("fill", "black")
    .style("stroke","black")
  
  const line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); })
  
  svg.append("path")
    .attr("d",line(pathCoordinates))
    .style("fill", "none")
    .style("stroke","black")  
  
  yield svg.node()
}


function _3(md){return(
md`Create points to graph`
)}

function _pathCoordinates(){return(
[[0,220], [195, 220], [215, 110], [325, 110], [340,220], [640,220]]
)}

function _5(md){return(
md`Create a path from those points.`
)}

function _draw(d3,DOM,width,height,pathCoordinates)
{ 
  const svg = d3.select(DOM.svg(width, height))
  
  const path = svg.append("path")
    .attr("d",d3.line()(pathCoordinates))
  
  return path.node()
}


function _7(md){return(
md`Get the length of that path`
)}

function _l(draw){return(
draw.getTotalLength()
)}

function _9(md){return(
md` (Not required, but helpful to view) Create an interator from 0 to the path length (l)`
)}

function* _timer(l)
{
  for (var i = 0; i < parseInt(l); ++i) {
    yield i = (i==(parseInt(l)-2)) ? 0 : i;
  }
}


function _11(md){return(
md` Get the x and y values along that path for each iteraction of our timer`
)}

function* _movingX(draw,timer)
{ yield draw.getPointAtLength(timer).x }


function* _movingY(draw,timer)
{ yield draw.getPointAtLength(timer).y }


function _14(md){return(
md`Variables`
)}

function _x(d3,pathCoordinates,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(pathCoordinates,(d,i)=>d[0]))
    .range ([margin.left, width - margin.right])
)}

function _y(d3,pathCoordinates,height,margin){return(
d3.scaleLinear()
    .domain(d3.extent(pathCoordinates,(d,i)=>d[1]))
    .range ([ height - margin.bottom, margin.top ])
)}

function _width(){return(
800
)}

function _height(){return(
300
)}

function _margin(){return(
{top: 30, right: 40, bottom: 40, left: 50}
)}

function _d3(require){return(
require('d3')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["d3","DOM","width","height","margin","x","y","movingX","movingY","pathCoordinates"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("pathCoordinates")).define("pathCoordinates", _pathCoordinates);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("draw")).define("draw", ["d3","DOM","width","height","pathCoordinates"], _draw);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("l")).define("l", ["draw"], _l);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("timer")).define("timer", ["l"], _timer);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("movingX")).define("movingX", ["draw","timer"], _movingX);
  main.variable(observer("movingY")).define("movingY", ["draw","timer"], _movingY);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("x")).define("x", ["d3","pathCoordinates","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","pathCoordinates","height","margin"], _y);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
