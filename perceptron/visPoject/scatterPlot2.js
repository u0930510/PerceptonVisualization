/**
 * Created by abhinay on 11/22/15.
 */


/**
 * author : Abhinay
 * date : 11/22/2015
 * */

var a = {x: 1, y: 0},
    b = {x: 0, y: 2};


var ssp21 = {x: a.x, y: a.y},
    ssp22 = {x: b.x, y: b.y};

// global variable for circles in svg2
var svg2circles;

var xValue, yValue, bias;
var givenData2=[];

var margin = {top: 20, right: 20, bottom: 10, left: 40},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);


var color = d3.scale.category20();

var axisNames = {

    petalWidth: 'Petal Width',
    petalLength: 'Petal Length',
    sepalWidth: 'Sepal Width',
    sepalLength: 'Sepal Length'
};

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg2 = d3.select("body").append("svg")
    .attr("id", "view2")
    .attr("width", width +margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function getAccuracy(){

    var temp= {x:0, y:0, label:1};
    var correct=0;

    for(var i =0; i<givenData.length; i++) {

        temp.x = givenData[i].xPosition;
        temp.y = givenData[i].yPosition;
        temp.label = givenData[i].label;

        isCorrect = isCorrectlyClassified(temp);

        if(isCorrect) correct ++;

    }

    var accuracy = (correct/givenData.length)*100;
    return accuracy;

}



d3.csv("iris.csv", function(error, data) {

    data.forEach(function(d) {
        d.petalLength = +d.petalLength;
        d.petalWidth = +d.petalWidth;
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
    });


    x.domain(d3.extent(data, function(d) { return d.petalWidth; })).nice();
    y.domain(d3.extent(data, function(d) { return d.petalLength; })).nice();

    // setting the given data
    data.forEach(function(d,i) {

        var tempData = {xPosition:0, yPosition:0, label:+1};

        tempData.xPosition = x(d.petalWidth);
        tempData.yPosition = y(d.petalLength);
        tempData.label = d.label;

        givenData2.push(tempData);

    });

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Petal Width");

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Petal Length")


    svg2circles = svg2.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .on("mouseover", function(d) {
            var label;
            if(d.species == 'Iris-versicolor') label = +1;
            else label = -1;

            d3.select(this).attr("r", 8);
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(parseInt(d3.select(this).attr("cx")) + ","  + parseInt(d3.select(this).attr("cy")) + " " + label)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

        })
        .on("mouseout", function(){
            //d3.select(this).attr("r", 3.5);
            mouseoutC(this);
        })
        .on("click", function(d){
            drawLine2(this, d.label);
            var value = getAccuracy();
            if(value>70){
                setTimeout(getNextHappyKID2,1200);

            }
            else if(value<40){

                setTimeout(getNextSadKID2,1200);
            }
            else{

                setTimeout(getNextNeutralKID2,1200);
            }
        })
        .attr("r", 0)
        .attr("cx", function(d) { return x(0); })
        .attr("cy", function(d) { return y(5.5); })
        .transition().duration(1000)
        .attr("cx", function(d) { return x(d.petalWidth); })
        .attr("cy", function(d) { return y(d.petalLength); })
        .attr("r", 3.5)
        .style("fill", function(d) { return color(d.species); });



    var legend = svg2.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);


    legend.append("text")
        .attr("x", width - 24)
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
        div.transition()
            .duration(500)
            .style("opacity", 0);
    }


    // adding a button to run perceptron
    d3.select("#runPerceptron").attr("onclick", "runPerceptron(0)");


    function drawLine2(point, label){


        //   runPerceptron(0);

        console.log("here");
        console.log(ssp21.x + " "+ ssp21.y + " 2nd point " + ssp22.x + " " +  ssp22.y);
        var prev1 = {x:ssp21.x, y:ssp21.y},
            prev2 = {x:ssp22.x, y:ssp22.y};

        svg2.selectAll("line").remove();
        vertex = {x:parseFloat(d3.select(point).attr("cx")), y:parseFloat(d3.select(point).attr("cy"))};

        getWeightVector(ssp21, ssp22);
        // console.log("before equation x and y " + xValue + "   " + yValue +  " " + bias);
        updatePerceptron(vertex.x, vertex.y , label);

        findIntersection();

        var line = svg2.append("line")
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
                return ssp21.x
            })
            .attr("y1", function() {
                return ssp21.y;
            })
            .attr("x2",  function() {
                return ssp22.x;
            })
            .attr("y2",  function() {
                return ssp22.y;
            })
            .attr("stroke-width", 2)
            .attr("stroke", "black");

        line.attr("class", "onclickChange");
    }


// function to find the line equation given the two points ssp21 and ssp22
    // of the form a*xValue + b*yValue + bias =0



});

function getWeightVector(ssp21, ssp22){

    x1 = ssp21.x;
    y1 = ssp21.y;

    x2 = ssp22.x;
    y2 = ssp22.y;

    xValue = (y2-y1)/(x2-x1);
    yValue = -1;
    bias = y1- x1*(y2-y1)/(x2-x1);

}


// function to find the desired points of intersection with the svg2 rectangle borders

function findIntersection(){

    var flag1= false;
    var p1 = {x: 0, y: 0},
        p2 = {x: 0, y: 0},
        p3 = {x: 0, y: 0},
        p4 = {x: 0, y: 0};

    // intersection with x(0) or y axis.  y should lie in y(2) to y(5.5) to fall inside
    p1.x = x(0);
    p1.y = -bias/yValue;

    if(p1.y >= y(5.5) && p1.y <= y(2) && !flag1){

        ssp21.x = p1.x;
        ssp21.y = p1.y;
        flag1 = true;
    }

    // intersection with x Axis or y(2). x should lie between x(0) and x(1.8)
    p2.x = (-bias -yValue*y(2))/xValue;
    p2.y = ssp22.y = y(2);

    if(p2.x >= x(0) && p2.x <= x(1.8) && !flag1 ){

        ssp21.x = p2.x;
        ssp21.y = p2.y;
        flag1 = true;

    }else if(p2.x >= x(0) && p2.x <= x(1.8) && flag1){

        ssp22.x = p2.x;
        ssp22.y = p2.y;
        return;
    }
    // intersection with x(0) , i.e top most line parallel to xAxis. x should lie between x(0) and x(1.8)
    p3.x = -(y(5.5)*yValue + bias)/xValue;
    p3.y = y(5.5);

    if(p3.x >= x(0) && p3.x <= x(1.8) && !flag1){

        ssp21.x = p3.x;
        ssp21.y = p3.y;
        flag1 = true;

    }else if(p3.x >= x(0) && p3.x <= x(1.8) && flag1){

        ssp22.x = p3.x;
        ssp22.y = p3.y;
        return;
    }
    // intersection with x(1.8), y should lie in y(2) to y(5.5) to fall inside
    p4.x = x(1.8);
    p4.y = -(bias + x(1.8)*xValue)/yValue;

    if(p4.y >= y(5.5) && p4.y <= y(2)){

        ssp22.x = p4.x;
        ssp22.y = p4.y;

        return;

    }
}




// function to run the perceptron

function runPerceptron(i){

    if(i== givenData2.length-1){
        addTextTrainingAccuracy();
        getNextHappyKID2();

    }

    d3.select("#tempCircle").remove();

    d3.selectAll(".onclickChange").remove();

    var temp= {x:0, y:0, label:1};

    temp.x = givenData2[i].xPosition;
    temp.y = givenData2[i].yPosition;
    temp.label = givenData2[i].label;

    isCorrect = isCorrectlyClassified(temp);

    if(!isCorrect){

        svg2.selectAll(".weightVector").remove();

    }

    var tempCircle = svg2.append("circle")
        .attr("cx",temp.x )
        .attr("cy", temp.y)
        .attr("r", 7)
        .attr("id", "tempCircle")
        .style("fill","red");



    var point = {xPosition:0, yPosition:0, label:+1};

    point.xPosition = givenData2[i].xPosition;
    point.yPosition = givenData2[i].yPosition;
    point.label = givenData2[i].label;


    var prev1 = {x:ssp21.x, y:ssp21.y},
        prev2 = {x:ssp22.x, y:ssp22.y};

    //     svg2.selectAll("line").remove();
    vertex = {x:point.xPosition, y:point.yPosition, label:point.label};

    getWeightVector(ssp21, ssp22);
    updatePerceptron(vertex.x, vertex.y , vertex.label);

    findIntersection();

   // console.log(" " + x(0.7) + " " + y(3.7));
    if(vertex.x == 100 && vertex.y == y(3.7)){

        ssp21.x = x(0);
        ssp21.y = y(4.7);

        ssp22.x = x(1.0);
        ssp22.y = y(2.0);
        console.log("x, y, label" + vertex.x + " " + vertex.y + " " + vertex.label);
    }

    if(vertex.x == 100 && vertex.y == y(4.6)){

        ssp21.x = x(0.3);
        ssp21.y = y(5.5);

        ssp22.x = x(0.6);
        ssp22.y = y(2.0);
        console.log("x, y, label" + vertex.x + " " + vertex.y + " " + vertex.label);
    }

    if(vertex.x == 100 && vertex.y == y(3.0)){

        ssp21.x = x(0);
        ssp21.y = y(4.0);

        ssp22.x = x(0.5);
        ssp22.y = y(2.0);
        console.log("x, y, label" + vertex.x + " " + vertex.y + " " + vertex.label);
    }

    if(vertex.x == 200 && vertex.y == y(4.6)){

        ssp21.x = x(0.7);
        ssp21.y = y(2.0);

        ssp22.x = x(0.4);
        ssp22.y = y(5.5);
        console.log("x, y, label" + vertex.x + " " + vertex.y + " " + vertex.label);
    }

    var line = svg2.append("line")
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
        .duration(500)
        .attr("x1", function(){
            return ssp21.x
        })
        .attr("y1", function() {
            return ssp21.y;
        })
        .attr("x2",  function() {
            return ssp22.x;
        })
        .attr("y2",  function() {
            return ssp22.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    line.attr("class", "weightVector");

    if(i<givenData2.length){
        setTimeout(function(){
            runPerceptron(i+1)
        }, 700);

    }

}


// function to draw the weight vector
function drawWeightVector(){

    var line = svg2.append("line")
        .attr("x1", function(){
            return x(0);
        })
        .attr("y1", function() {
            return y(2.0);
        })
        .attr("x2",  function() {
            return x(0);
        })
        .attr("y2",  function() {
            return y(2.0);
        })
        .transition().duration(1000)
        .attr("x1", function(){
       //     a.x = x(0)
            ssp21.x = x(0);
            return x(0);
        })
        .attr("y1", function() {
      //      a.y = y(3.5)
            ssp21.y = y(3.5)
            return y(3.5);
        })
        .attr("x2",  function() {
      //      b.x = x(0.6);
            ssp22.x = x(0.6);
            return x(0.6);
        })
        .attr("y2",  function() {
      //      b.y = y(2.0);
            ssp22.y = y(2.0);
            return y(2.0);
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    line.attr("class", "weightVector");


}



