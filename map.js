var country = "Afghanistan"
var width = 700,
    height = 400;

var projection = d3
        .geoEquirectangular()
        .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
        .scale([width / (2 * Math.PI)]) // scale to fit group width
        .translate([width / 2, height / 2]) // ensure centred in group
      ;
var path = d3.geoPath()
  .projection(projection)
const container = d3.select("#map");
const svg = container.append("svg").attr("id","svg").attr("width", width).attr("height", height);;

var tooltipDiv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// zooming in map
let zoom = d3.zoom()
   .scaleExtent([1, 2])
   .translateExtent([[-500, -300], [1500, 1000]])
   .on('zoom', () => {
       svg.attr('transform', d3.event.transform)
   });

container.call(zoom);

//reading json file to project a map
d3.json("countries.json", function(error, countries) {
  if (error) console.log(error);


  svg.selectAll("path")
    .data(countries.features)
  .enter().append("path")
    .attr("d", path).style("fill", function(d){
        return "grey"
  })
    .on("mouseover",function(d) {
    	d3.select(this)
      	.classed("active",true);

    	tooltipDiv.transition()
            .duration(200)
            .style("opacity", .9);
        tooltipDiv.html(d.properties.titles )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
  	})
  	.on("mouseout",function(){
    	d3.select(this)
      	.classed("active",false);
    	 tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    }).on("click", function(d) {
        d3.select("#svg").selectAll("path").style("fill","grey");
        d3.select(this).style("fill","red");
      country = d.properties.titles;
      applyFilter(country)
      filterDonut(country)
      updateSankey(country)
      return country
});




});