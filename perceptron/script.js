/**
 * Created by abhinay on 11/11/15.
 */


var vertex = {x: 3, y:4};
var result;
var a = {x:0, y:0};
var b = {x:0, y:0};
var givenData;

var width = 2000;
var height = 1200;

var margins =[];

str = "M 1200 0 L 0 200";

var svg = d3.select("body").append("svg")
    .attr("width", width )
    .attr("height", height);

var color = d3.scale.category20();

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var line = svg.append("path")
    .attr("d", str)
    .attr("stroke","red")
    .attr("stroke-width","2")
    .attr("fill", "none");

function showMargin(){

    svg.selectAll("line").remove();
    var minVal = {x:0, y:0};
    var minMargin = 5000;
    var temp= {x:0, y:0, label:1};

    for(var i =0; i<givenData.length; i++){

        temp.x = givenData[i].xPosition;
        temp.y = givenData[i].yPosition;
        temp.label = givenData[i].label;

        isCorrect = isCorrectlyClassified(temp);

        if(isCorrect){

            getWeightIntercepts();
            result = altitude(temp, a, b);
            var t1 = result.x - temp.x;
            var t2 = result.y - temp.y;
            distance = Math.sqrt(t1*t2 + t2*t2);

            if(distance < minMargin){

                minMargin = distance;

                minVal.x = temp.x;
                minVal.y = temp.y;
            }
        }
    }

    getWeightIntercepts();
    result = altitude(minVal, a, b);

    var line = svg.append("line")
        .attr("x1", function(){
            return result.x;
        })
        .attr("y1", function() {
            return result.y;
        })
        .attr("x2",  function() {
            return minVal.x;
        })
        .attr("y2",  function() {
            return minVal.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black");
}

d3.csv("data.csv", function(error, data) {

    data.forEach(function (d) {
        d.xPosition = +d.xPosition;
        d.yPosition = +d.yPosition;
        d.size = +d.size;
        d.label = +d.label;
        d.color = d.color;
    });


    var circles = svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) { return (d.xPosition); })
        .attr("cy", function(d) { return (d.yPosition); })
        .style("fill", function(d) { return color(d.label +5); })
        .on("mouseover", function(d) {

            console.log("label " + d.label);
            d3.select(this).attr("r", 18);
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html( "label =" +parseInt(d.label))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(){

            mouseoutC(this);
        })
        .on("click", function(d){

            svg.selectAll("line").remove();
            updatePerceptron(d3.select(this).attr("cx"),d.yPosition,d.label);

          //  console.log("x y and margin " +xValue + " " +yValue + " " + margin);
            vertex.x = d.xPosition;
            vertex.y = d.yPosition;

            getWeightIntercepts();

            console.log("weight intercepts" + a.x + " " + a.y + "  " + b.x +"  " + b.y);

            result = altitude(vertex, a, b);

            console.log("result" + result.x  + " " + result.y);


        });

    function mouseoutC(param){

        d3.select(param).attr("r", 10);
        div.transition()
            .duration(500)
            .style("opacity", 0);
    }

    givenData = data;

});

function getWeightIntercepts(){

    a.x = 0;
    a.y = margin/yValue;

    b.x = width;
    b.y= (margin - width*xValue)/yValue;

}


