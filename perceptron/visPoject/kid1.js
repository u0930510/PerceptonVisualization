/**
 * Created by abhinay on 11/23/15.
 */

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    height = 500 - margin.top - margin.bottom;

var svgKid1 = d3.select("body").append("svg")
    .attr("id", "kid1")
    .attr("width", 400)
    .attr("height", height + margin.top + margin.bottom)
    .append("g");


var kid1= svgKid1.selectAll("image").data([0]);
    kid1.enter()
    .append("svg:image")
    .attr("xlink:href", "start1.jpg")
    .attr("x", "60")
    .attr("y", "60")
    .attr("width", "200")
    .attr("height", "200");

function changeKid1(){

     svgKid1.selectAll("image")
         .data([0])
        .attr("xlink:href", "start2.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}