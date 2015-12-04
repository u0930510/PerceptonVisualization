/**
 * Created by abhinay on 12/1/15.
 */

/**
 * Created by abhinay on 11/23/15.
 */

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    height = 500 - margin.top - margin.bottom;

var svgKid2 = d3.select("body").append("svg")
    .attr("id", "kid2")
    .attr("width", 400)
    .attr("height", height + margin.top + margin.bottom)
    .append("g");



function getOriginalKid(){

    var kid2= svgKid2.selectAll("image").data([0]);
    kid2.enter()
        .append("svg:image")
        .attr("xlink:href", "start2.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}

function getNextKID2(){

    svgKid2.selectAll("image")
        .data([0])
        .attr("xlink:href", "curious.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}

function getNextSadKID2(){

    svgKid2.selectAll("image")
        .data([0])
        .attr("xlink:href", "sadKid2.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}
function getNextHappyKID2(){

    svgKid2.selectAll("image")
        .data([0])
        .attr("xlink:href", "happyKid2.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}
function getNextNeutralKID2(){

    svgKid2.selectAll("image")
        .data([0])
        .attr("xlink:href", "neutral.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}