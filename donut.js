


     var origin_data,country_data ;
 d3.csv("refugees_applications_decisions.csv", function(d) {

    if(d.country == country){
        origin_data = [{
            "title": "Recognitions",
            "value": +d.origin_recognized,
            "all": +d.origin_total_decisions},
            {
                "title": "Decisions Other",
                "value": +d.origin_decisions_other,
                "all": +d.origin_total_decisions},
            {
                "title": "Rejects",
                "value": +d.origin_rejected,
                "all": +d.origin_total_decisions},
            {
                "title": "Otherwise Closed",
                "value": +d.origin_otherwise_closed,
                "all": +d.origin_total_decisions}];
         country_data = [{
            "title": "Recognitions",
            "value": +d.in_country_recognized,
            "all": +d.in_country_total_decisions},
            {
                "title": "Decisions Other",
                "value": +d.in_country_decisions_other,
                "all":  +d.in_country_total_decisions},
            {
                "title": "Rejects",
                "value": +d.in_country_rejected,
                "all": +d.in_country_total_decisions},
            {
                "title": "Otherwise Closed",
                "value": +d.in_country_otherwise_closed,
                "all": +d.in_country_total_decisions}];
      }
    }, function(error, d) {

     var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75; //This is the size of the hole in the middle

//customized color scheme:
var color = d3.scaleOrdinal()
.range(["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]);
// ["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]
var svgDonut = d3.select('#donut')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);
var pie = d3.pie()
     .value(function (d) {
          return d.value;
     })
     .sort(null)
var Donuttooltip = d3.select("body").append("div").attr("class", "Donuttooltip");

     var path = svgDonut.selectAll('path')
     .data(pie(origin_data))
     .enter()
     .append('path')
     .attr('d', arc)
     .style('fill', function (d,i) {
          return color(d.data.title);
     }).on("mouseover",function(d) {
        Donuttooltip.html(numberWithCommas(d.data.value)).transition().duration(500)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px").style("display", "inline-block");
  	}).on("mouseout", function(){
  	    Donuttooltip.style("display","none");
         })
     .attr('transform', 'translate(0, 0)');
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
var legendRectSize = 13;
var legendSpacing = 7;
var legend = svgDonut.selectAll('.legend') //the legend and placement
.data(color.domain())
.enter()
.append('g')
.attr('class', 'circle-legend')
.attr('transform', function (d, i) {
     var height = legendRectSize + legendSpacing;
     var offset = height * color.domain().length / 2;
     var horz = -2 * legendRectSize - 13;
     var vert = i * height - offset;
     return 'translate(' + horz + ',' + vert + ')';
});
legend.append('circle') //keys
.style('fill', color)
.style('stroke', color)
.attr('cx', 0)
.attr('cy', 0)
.attr('r', '.5rem');
legend.append('text') //labels
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function (d) {
     return d;
});



d3.select("button#InCountry")
     .on("click", function () {
          change(country_data);
     })
d3.select("button#FromCountry")
     .on("click", function () {
          change(origin_data)
     })




 });
function filterDonut(country){
      var origin_data,country_data ;
 d3.csv("refugees_applications_decisions.csv", function(d) {

    if(d.country == country){
        origin_data = [{
            "title": "Recognitions",
            "value": +d.origin_recognized,
            "all": +d.origin_total_decisions},
            {
                "title": "Decisions Other",
                "value": +d.origin_decisions_other,
                "all": +d.origin_total_decisions},
            {
                "title": "Rejects",
                "value": +d.origin_rejected,
                "all": +d.origin_total_decisions},
            {
                "title": "Otherwise Closed",
                "value": +d.origin_otherwise_closed,
                "all": +d.origin_total_decisions}];
         country_data = [{
            "title": "Recognitions",
            "value": +d.in_country_recognized,
            "all": +d.in_country_total_decisions},
            {
                "title": "Decisions Other",
                "value": +d.in_country_decisions_other,
                "all":  +d.in_country_total_decisions},
            {
                "title": "Rejects",
                "value": +d.in_country_rejected,
                "all": +d.in_country_total_decisions},
            {
                "title": "Otherwise Closed",
                "value": +d.in_country_otherwise_closed,
                "all": +d.in_country_total_decisions}];
      }
    }, function(error, d) {

change(origin_data)

d3.select("button#InCountry")
     .on("click", function () {
          change(country_data);
     })
d3.select("button#FromCountry")
     .on("click", function () {
          change(origin_data)
     })

})
}
function change(data) {
     var pie = d3.pie()
     .value(function (d) {
          return d.value;
     }).sort(null)(data);
     var width = 360;
     var height = 360;
     var radius = Math.min(width, height) / 2;
     var donutWidth = 75;
       var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
     path = d3.select("#donut")
          .selectAll("path")
          .data(pie).attr("d", arc).transition().duration(500);// Compute the new angles

}
