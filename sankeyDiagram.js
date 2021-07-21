  var t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear);

// set the dimensions and margins of the graph
var marginSankey = {top: 10, right: 10, bottom: 10, left: 10},
    widthSankey = 700 - marginSankey.left - marginSankey.right,
    heightSankey = 500 - marginSankey.top - marginSankey.bottom;
// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d); },
    color = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
var SankeySvg = d3.select("#sankey").append("svg").attr("id", "sankeysvg")
    .attr("width", widthSankey + marginSankey.left + marginSankey.right)
    .attr("height", heightSankey + marginSankey.top + marginSankey.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginSankey.left + "," + marginSankey.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([widthSankey, heightSankey]);

var Sankeypath = sankey.link();


// load the data
d3.csv("resettlement_EDITED.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

  data.forEach(function (d) {
      if(d.Origin == country){

          if(graph.nodes.length<1){
               graph.nodes.push({"name":country})
          }
                graph.nodes.push({ "name": d.Country });
                graph.links.push({ "source": country,
                       "target": d.Country,
                       "value": +d.Resettlers });
      }

   });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
    .key(function (d) { return d.name; })
    .object(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { "name": d };
  });
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

 draw(SankeySvg,widthSankey,heightSankey,marginSankey, sankey,formatNumber,color,graph)
});

function updateSankey(value){
    // set the dimensions and margins of the graph
// set the dimensions and margins of the graph
var marginSankey = {top: 10, right: 10, bottom: 10, left: 10},
    widthSankey = 700 - marginSankey.left - marginSankey.right,
    heightSankey = 500 - marginSankey.top - marginSankey.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d); },
    color = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
var SankeySvg = d3.select("#sankeysvg")
// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([widthSankey, heightSankey]);

var Sankeypath = sankey.link();



// load the data
d3.csv("resettlement_EDITED.csv", function(error, data) {

    //set up graph in same style as original example but empty
    var graph = {"nodes": [], "links": []};

    data.forEach(function (d) {
        if (d.Origin == value) {
            if (graph.nodes.length < 1) {
                graph.nodes.push({"name": value})
            }
            graph.nodes.push({"name": d["Country"]});
            graph.links.push({
                "source": value,
                "target": d["Country"],
                "value": +d["Resettlers"]
            });
        }
    });
    console.log(graph)
    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) {
            return d.name;
        })
        .object(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    // now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = {"name": d};
    });
    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);
d3.selectAll("#sankeysvg > *").remove();
draw(SankeySvg,widthSankey,heightSankey,marginSankey, sankey,formatNumber,color,graph)

});

}
function draw(SankeySvg,widthSankey,heightSankey,marginSankey, sankey,formatNumber,color,graph)
{
   var Sankeypath = sankey.link()
     // add in the links

  var link = SankeySvg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", Sankeypath)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });
  // add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });


  // add in the nodes
  var node = SankeySvg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {
		  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) {
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) {
		  return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(heightSankey - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", Sankeypath);
  }
}
