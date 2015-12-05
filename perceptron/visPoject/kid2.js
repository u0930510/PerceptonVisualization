

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

function  addTextTrainingAccuracy(){
    svgKid2.selectAll(".kid2text").remove();
    svgKid2.append("text")
        .attr("x", "170")
        .attr("y", "340")
        .attr("text-anchor", "middle")
        .attr("font-size", 15)
        .attr("opacity", "1")
        .text("Training Accuracy");

    svgKid2.append("text")
        .attr("x", "170")
        .attr("y", "360")
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("opacity", "1")
        .text("100%");
}



    svgKid2.append("text")
        .attr("x", "170")
        .attr("y", "340")
        .attr("class","kid2text")
        .attr("text-anchor", "middle")
        .attr("font-size", 15)
        .attr("opacity", "1")
        .text("Training ...");
