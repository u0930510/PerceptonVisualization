/**
 * Created by abhinay on 12/4/15.
 */

/**
 * author : Abhinay
 * date : 11/09/2015
 * */
var a4 = {x: 1, y: 0},
    b4 = {x: 0, y: 2};

var circles1;
var circles2;


var xValue4, yValue4, bias4;
var givenData4 =[];

//var tempData = {xPosition:0, yPosition:0, label:+1};
//givenData.push(tempData);

var margin4 = {top: 20, right: 20, bottom: 30, left: 40},
    width4 = 960 - margin4.left - margin4.right,
    height4 = 500 - margin4.top - margin4.bottom;


var x4 = d3.scale.linear()
    .range([0, width4]);

var y4 = d3.scale.linear()
    .range([height4, 0]);


var color4 = d3.scale.category20();

var axisNames = {

    petalWidth: 'Petal Width',
    petalLength: 'Petal Length',
    sepalWidth: 'Sepal Width',
    sepalLength: 'Sepal Length'
};

var xAxis4 = d3.svg.axis()
    .scale(x4)
    .orient("bottom");

// Define the div4 for the tooltip
var div4 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var yAxis4 = d3.svg.axis()
    .scale(y4)
    .orient("left");


var svg4 = d3.select("body").append("svg")
    .attr("id", "view4")
    .attr("width", width4 +margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");


d3.csv("test.csv", function(error, data) {

    data.forEach(function(d,i) {
        d.petalLength = +d.petalLength;
        d.petalWidth = +d.petalWidth;
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
        d.label = +d.label;

    });

    x4.domain(d3.extent(data, function(d) { return d.petalWidth; })).nice();
    y4.domain(d3.extent(data, function(d) { return d.petalLength; })).nice();

    // setting the given data
    data.forEach(function(d,i) {

        var tempData = {xPosition:0, yPosition:0, label:+1};

        tempData.xPosition = x4(d.petalWidth);
        tempData.yPosition = y4(d.petalLength);
        tempData.label = d.label;
        tempData.species = d.species;

        givenData4.push(tempData);

    });

    svg4.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height4 + ")")
        .call(xAxis4)
        .append("text")
        .attr("class", "label")
        .attr("x", width4)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Petal Width");

    svg4.append("g")
        .attr("class", "y axis")
        .call(yAxis4)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Petal Length")


    var circles4 = svg4.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .on("mouseover", function(d) {
            var label;
            label = d.label;

            d3.select(this).attr("r", 8);
            div4.transition()
                .duration(200)
                .style("opacity", .9);
            div4	.html(parseInt(d3.select(this).attr("cx")) + ","  + parseInt(d3.select(this).attr("cy")) + " " + label)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

        })
        .on("mouseout", function(){
            //d3.select(this).attr("r", 3.5);
            mouseoutC(this);
        })
        .on("click", function(d){
            var label;
            if(d.species == 'Iris-versicolor') label = 1;
            else label = -1;
            drawLine(this, label);
        })
        .attr("r", 0)
        .attr("cx", function(d) { return x4(0); })
        .attr("cy", function(d) { return y4(5.5); })
        .transition().duration(1000)
        .attr("cx", function(d) { return x4(d.petalWidth); })
        .attr("cy", function(d) { return y4(d.petalLength); })
        .attr("r", 3.5)
        .style("fill", function(d) { return color4(d.species); });


    var line = svg4.append("line")
        .attr("x1", function(){
            a4.x = x4(0.4)
            return x4(0.4);
        })
        .attr("y1", function() {
            a4.y = y4(5.5)
            return y4(5.5);
        })
        .attr("x2",  function() {
            b4.x = x4(0.7);
            return x4(0.7);
        })
        .attr("y2",  function() {
            b4.y = y4(2.0);
            return y4(2.0);
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("class", "w1");

    var legend = svg4.selectAll(".legend")
        .data(color4.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


    legend.append("rect")
        .attr("x", width4 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color4);


    legend.append("text")
        .attr("x", width4 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    var mouseoverC = function() {

        var circle = d3.select(this);
        circle.transition().duration(500)
            .attr("r",  10 );
    }

    function mouseoutC(param){

        d3.select(param).attr("r", 3.5);
        div4.transition()
            .duration(500)
            .style("opacity", 0);
    }


    function drawLine(point, label){

        var prev1 = {x:i1.x, y:i1.y},
            prev2 = {x:i2.x, y:i2.y};

        svg.selectAll("line").remove();
        vertex = {x:parseFloat(d3.select(point).attr("cx")), y:parseFloat(d3.select(point).attr("cy"))};
        getWeightVector(i1, i2);
        // console.log("before equation x4 and y4 " + xValue4 + "   " + yValue4 +  " " + bias4);
        updatePerceptron(vertex.x, vertex.y , label);


        findIntersection();

        //  setting the value of a4 and b4
        a4.x = i1.x;
        a4.y = i1.y;

        b4.x = i2.x;
        b4.y = i2.y;

        var line = svg.append("line")
            .attr("x1", function(){
                return prev1.x
            })
            .attr("y1", function() {
                return prev1.y;
            })
            .attr("x2",  function() {
                return prev2.x;
            })
            .attr("y2",  function() {
                return prev2.y;
            })
            .transition()
            .duration(1000)
            .attr("x1", function(){
                return i1.x
            })
            .attr("y1", function() {
                return i1.y;
            })
            .attr("x2",  function() {
                return i2.x;
            })
            .attr("y2",  function() {
                return i2.y;
            })
            .attr("stroke-width", 2)
            .attr("stroke", "black");
    }


// function to find the line equation given the two points i1 and i2
    // of the form a4*xValue4 + b4*yValue4 + bias4 =0

    function getWeightVector(i1, i2){

        x1 = i1.x;
        y1 = i1.y;

        x2 = i2.x;
        y2 = i2.y;

        xValue4 = (y2-y1)/(x2-x1);
        yValue4 = -1;
        bias4 = y1- x1*(y2-y1)/(x2-x1);

    }



});

function resultShow(){

     circles1 = d3.selectAll(".figureRow1");
     circles2 = d3.selectAll(".figure2Row1");

    addImage(0);
}
var colorCircles41=0;
var colorCircles42=0;
var count4val=0;
function addImage(i){


    xcoord = givenData4[i].xPosition-6;
    ycoord = givenData4[i].yPosition-6;
    label = givenData4[i].label;

    if(label ==0){
    count4val++;


        svgCircle4.selectAll(".textVal").remove();

        var variable= svgCircle4.append("text")
            .attr("x", "170")
            .attr("y", "360")
            .attr("class","textVal")
            .attr("id","textVal")
            .attr("text-anchor", "middle")
            .attr("font-size", 20)
            .attr("opacity", "1");

        var percent = Math.round((count4val/69)*100);
        document.getElementById("textVal").textContent = percent + "%";

    if(givenData4[i].species == "Iris-setosa"){

        svgCircle4.append("circle")
            .attr("r", 3)
            .attr("cx",circles1[0][colorCircles41].cx.animVal.value)
            .attr("cy",circles1[0][colorCircles41].cy.animVal.value)
            .attr("class","figure2Row1")
            .attr("stroke","rgb(31, 119, 180)")
            .attr("stroke-width", "1")
            .attr("fill","rgb(31, 119, 180)");
        colorCircles41++;
    }
        else {
        svgCircle4.append("circle")
            .attr("r", 3)
            .attr("cx",circles2[0][colorCircles42].cx.animVal.value)
            .attr("cy",circles2[0][colorCircles42].cy.animVal.value)
            .attr("class","figure2Row1")
            .attr("stroke","rgb(174, 199, 232)")
            .attr("stroke-width", "1")
            .attr("fill","rgb(174, 199, 232)");
        colorCircles42++;
    }

        svg4
            .append("svg:image")
            .attr("xlink:href", "smiley.jpg")
            .attr("x", xcoord)
            .attr("y", ycoord)
            .attr("width", "20")
            .attr("height", "20");

    } else{

        svg4
            .append("svg:image")
            .attr("xlink:href", "sad.jpg")
            .attr("x", xcoord)
            .attr("y", ycoord)
            .attr("width", "20")
            .attr("height", "20");

    }



    if(i<givenData4.length-1){

        setTimeout(function(){

            addImage(i+1)
        },50);
    }



}

