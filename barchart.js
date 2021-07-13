var refugeesIn, originatedFrom


d3.csv("refugees_applications_decisions.csv", function(d) {
  if(d.country == country){
      refugeesIn = d.in_country_total_applied
      originatedFrom = d.origin_total_applied
  }
}, function(error, data) {
    if (error) throw error;

var dataset = [refugeesIn,originatedFrom];
var svg1 = d3.select("#barchart"),
            margin1 = 200,
            width1 = svg1.attr("width") - margin1,
            height1 = svg1.attr("height") - margin1
var xScale = d3.scaleBand().range([0, width1]).padding(0.5),
            yScale = d3.scaleLinear().range([height1, 0]);

var g1 = svg1.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

var max = d3.max(dataset, function(d) { return +d;} );

        xScale.domain(dataset);
        yScale.domain([0, max ]);

        g1.append("g")
         .attr("transform", "translate(0," + height1 + ")")
         .call(d3.axisBottom(xScale).tickFormat(function(d,i){
             if( i %2 ==0){
                 return "Asylum Seekers In Country";
             }else{
                 return "Asylum Seekers From Country";
             }
         })
         );
var tooltip = d3.select("body").append("div").attr("class", "BarcharttoolTip");
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
        g1.append("g").attr("id", "yaxis")
         .call(d3.axisLeft(yScale).ticks(4));
//// Population text
            svg1.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", 15)
            .attr("x", -200)
            .text("Population")
//// in country text
    svg1.append("text").attr("id","In")
            .attr("text-anchor", "end")
            .attr("y", 380)
            .attr("x", 235).attr("visibility","hidden")
            .text(numberWithCommas(refugeesIn))
//// from country text
            svg1.append("text").attr("id","From")
            .attr("text-anchor", "end")
            .attr("y", 380)
            .attr("x", 410).attr("visibility","hidden")
            .text(numberWithCommas(originatedFrom))
   if(refugeesIn/originatedFrom>=650){
   d3.select("#From").transition().duration(1000).attr("visibility","visible");
   d3.select("#In").transition().duration(1000).attr("visibility","hidden");
}else if(originatedFrom/refugeesIn>=650){
   d3.select("#From").transition().duration(1000).attr("visibility","hidden");
   d3.select("#In").transition().duration(1000).attr("visibility","visible");
   }else{
   d3.select("#From").transition().duration(1000).attr("visibility","hidden");
   d3.select("#In").transition().duration(1000).attr("visibility","hidden");
   }


       g1.selectAll(".bar")
         .data(dataset)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d); })
         .attr("y", function(d) {
             return yScale(d); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height1 - yScale(d); })
         .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(numberWithCommas(d));
        })
    		.on("mouseout", function(){ tooltip.style("display", "none");});
  // add a change event handler

});

 // call this whenever the filter changes
  function applyFilter(value) {


    var refugeesIn, originatedFrom
    d3.csv("refugees_applications_decisions.csv", function(d) {
    if(d.country == value){
          refugeesIn = d.in_country_total_applied;
          originatedFrom = d.origin_total_applied;
      }
    }, function(error, d) {
        if (error) throw error;
        var data = [refugeesIn,originatedFrom]
var mysvg = d3.select("#barchart")
   margin1 = 200,
            width1 = mysvg.attr("width") - margin1,
            height1 = mysvg.attr("height") - margin1
var xScale = d3.scaleBand().range([0, width1]).padding(0.5),
            yScale = d3.scaleLinear().range([height1, 0]);

var g1 = mysvg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

var max = d3.max(data, function(d) { return +d;} );
   xScale.domain(data);
        yScale.domain([0, max ]);
data = [refugeesIn, originatedFrom]

        d3.select("#yaxis").transition().duration(1000)
         .call(d3.axisLeft(yScale).ticks(4));

   if(refugeesIn/originatedFrom>=650){
   d3.select("#From").transition().duration(1000).attr("visibility","visible").text(originatedFrom);
   d3.select("#In").transition().duration(1000).attr("visibility","hidden").text(refugeesIn);
}else if(originatedFrom/refugeesIn>=650){
   d3.select("#From").transition().duration(1000).attr("visibility","hidden").text(originatedFrom);
   d3.select("#In").transition().duration(1000).attr("visibility","visible").text(refugeesIn);
   }else{
   d3.select("#From").transition().duration(1000).attr("visibility","hidden").text(originatedFrom);
   d3.select("#In").transition().duration(1000).attr("visibility","hidden").text(refugeesIn);
   }
    // update the bars
    d3.selectAll(".bar")
      .data(data)
      .transition().duration(1000)
      .attr("x", function(d) { return xScale(d); })
         .attr("y", function(d) {
             return yScale(d); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height1 - yScale(d); });

});




    }