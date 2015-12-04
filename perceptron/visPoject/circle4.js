
var marginCircle4 = {top: 20, right: 20, bottom: 30, left: 40},
    heightCircle4 = 500 - marginCircle4.top - marginCircle4.bottom;

var svgCircle4 = d3.select("body").append("svg")
    .attr("id", "circle4")
    .attr("width", 400)
    .attr("height", heightCircle4 + marginCircle4.top + marginCircle4.bottom)
    .append("g");

    var yVal=400;
var xVal=50;
    for(var i=0;i<14;i++){
        svgCircle4.append("circle")
            .attr("r", 3)
            .attr("cx",xVal+i*8)
            .attr("cy", yVal)
            .attr("class","figureRow1")
            .attr("stroke","rgb(31, 119, 180)")
            .attr("stroke-width", "1")
            .attr("fill","none");
    }
yVal=408;
for(var i=0;i<12;i++){
    svgCircle4.append("circle")
        .attr("r", 3)
        .attr("cx",xVal+i*8)
        .attr("cy", yVal)
        .attr("class","figureRow1")
        .attr("stroke","rgb(31, 119, 180)")
        .attr("stroke-width", "1")
        .attr("fill","none");
}

yVal=416;
for(var i=0;i<8;i++){
    svgCircle4.append("circle")
        .attr("r", 3)
        .attr("cx",xVal+i*8)
        .attr("cy", yVal)
        .attr("class","figureRow1")
        .attr("stroke","rgb(31, 119, 180)")
        .attr("stroke-width", "1")
        .attr("fill","none");
}

 yVal=400;
 xVal=50+(8*14)+40;
for(var i=0;i<14;i++){
    svgCircle4.append("circle")
        .attr("r", 3)
        .attr("cx",xVal+i*8)
        .attr("cy", yVal)
        .attr("class","figure2Row1")
        .attr("stroke","rgb(174, 199, 232)")
        .attr("stroke-width", "1")
        .attr("fill","none");

}
yVal=408;
xVal= 50+(8*14)+40+16;
for(var i=0;i<12;i++){
    svgCircle4.append("circle")
        .attr("r", 3)
        .attr("cx",xVal+i*8)
        .attr("cy", yVal)
        .attr("class","figure2Row1")
        .attr("stroke","rgb(174, 199, 232)")
        .attr("stroke-width", "1")
        .attr("fill","none");
}

yVal=416;
xVal= 50+(8*14)+40+16+16;
for(var i=0;i<8;i++){
    svgCircle4.append("circle")
        .attr("r", 3)
        .attr("cx",xVal+i*8)
        .attr("cy", yVal)
        .attr("class","figure2Row1")
        .attr("stroke","rgb(174, 199, 232)")
        .attr("stroke-width", "1")
        .attr("fill","none");
}


// adding text tag

svgCircle4.append("text")
    .attr("x", "170")
    .attr("y", "340")
    .attr("text-anchor", "middle")
    .attr("font-size", 15)
    .attr("opacity", "1")
    .text("Testing Accuracy");

svgCircle4.append("text")
    .attr("x", "170")
    .attr("y", "360")
    .attr("class","textVal")
    .attr("id","textVal")
    .attr("text-anchor", "middle")
    .attr("font-size", 20)
    .attr("opacity", "1")
    .text("0%");
