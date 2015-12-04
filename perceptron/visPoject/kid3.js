
var marginkid3 = {top: 20, right: 20, bottom: 30, left: 40},
    heightKid3 = 500 - marginkid3.top - marginkid3.bottom;

var svgKid3 = d3.select("body").append("svg")
    .attr("id", "kid2")
    .attr("width", 400)
    .attr("height", heightKid3 + marginkid3.top + marginkid3.bottom)
    .append("g");



var kid3= svgKid3.selectAll("image").data([0]);
kid3.enter()
    .append("svg:image")
    .attr("xlink:href", "3rdstart.jpg")
    .attr("x", "60")
    .attr("y", "60")
    .attr("width", "200")
    .attr("height", "200");


function getfirstKID3(){

    svgKid3.selectAll("image")
        .data([0])
        .attr("xlink:href", "1stclass.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}

function getSecondKID3(){

    svgKid3.selectAll("image")
        .data([0])
        .attr("xlink:href", "2ndClass.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}

function getThirdKID3(){

    svgKid3.selectAll("image")
        .data([0])
        .attr("xlink:href", "3rdClass.jpg")
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
}