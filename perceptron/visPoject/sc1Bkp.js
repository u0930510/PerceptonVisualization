
/**
 * author : Abhinay
 * date : 11/09/2015
 * */
var a = {x: 1, y: 0},
    b = {x: 0, y: 2};


var xValue, yValue, bias;
var givenData =[];

//var tempData = {xPosition:0, yPosition:0, label:+1};
//givenData.push(tempData);

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


var svg = d3.select("body").append("svg")
    .attr("id", "view1")
    .attr("width", width +margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// function to show the margin

function showMargin(){

    //   svg.selectAll("line").remove();
    var minVal = {x:0, y:0};
    var minMargin = 5000;
    var temp= {x:0, y:0, label:1};

    for(var i =0; i<givenData.length; i++){

        temp.x = givenData[i].xPosition;
        temp.y = givenData[i].yPosition;
        temp.label = givenData[i].label;

        isCorrect = isCorrectlyClassified(temp);

        if(isCorrect){

            //     getWeightIntercepts();
            result = altitude(temp, a, b);

            var line = svg.append("line")
                .classed('tempLine', true)
                .attr("x1", function(){
                    return result.x;
                })
                .attr("y1", function() {
                    return result.y;
                })
                .attr("x2",  function() {
                    return temp.x;
                })
                .attr("y2",  function() {
                    return temp.y;
                })
                .attr("stroke-width", 2)
                .attr("stroke", "black");


            var t1 = result.x - temp.x;
            var t2 = result.y - temp.y;
            distance = Math.sqrt(t1*t2 + t2*t2);

            if(distance < minMargin){

                minMargin = distance;

                minVal.x = temp.x;
                minVal.y = temp.y;
            }

            // draw all the lines from the correctly classified points

        }
    }

//    getWeightIntercepts();
    svg.selectAll(".tempLine").style("opacity", 1)
        .transition().duration(1000).style("opacity", 0);

    //  svg.selectAll(".tempLine").remove();

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
        .attr("stroke", "green");


}




d3.csv("iris.csv", function(error, data) {

    data.forEach(function(d,i) {
        d.petalLength = +d.petalLength;
        d.petalWidth = +d.petalWidth;
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
        d.label = +d.label;

    });

    x.domain(d3.extent(data, function(d) { return d.petalWidth; })).nice();
    y.domain(d3.extent(data, function(d) { return d.petalLength; })).nice();

    // setting the given data
    data.forEach(function(d,i) {

        var tempData = {xPosition:0, yPosition:0, label:+1};

        tempData.xPosition = x(d.petalWidth);
        tempData.yPosition = y(d.petalLength);
        tempData.label = d.label;

        givenData.push(tempData);

    });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Petal Width");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Petal Length")


    var circles = svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .on("mouseover", function(d) {
            var label;
            label = d.label;

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

            drawLine(this, d.label);
        })
        .attr("r", 0)
        .attr("cx", function(d) { return x(0.8 + Math.random()); })
        .attr("cy", function(d) { return y(d.petalLength+Math.random()); })
        .transition().duration(5000)
        .attr("cx", function(d) { return x(d.petalWidth); })
        .attr("cy", function(d) { return y(d.petalLength); })
        .attr("r", 3.5)
        .style("fill", function(d) { return color(d.species); });

    setTimeout(changeKid1, 4000);

    var line = svg.append("line")
        .attr("x1", function(){
            a.x = x(0)
            return x(0);
        })
        .attr("y1", function() {
            a.y = y(3.5)
            return y(3.5);
        })
        .attr("x2",  function() {
            b.x = x(0.6);
            return x(0.6);
        })
        .attr("y2",  function() {
            b.y = y(2.0);
            return y(2.0);
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    var legend = svg.selectAll(".legend")
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

    var i1 = {x: a.x, y: a.y},
        i2 = {x: b.x, y: b.y};


////  setting the value of a and b
//    a.x = i1.x;
//    a.y = i1.y;
//
//    b.x = i2.x;
//    b.y = i2.y;


    function drawLine(point, label){

        var prev1 = {x:i1.x, y:i1.y},
            prev2 = {x:i2.x, y:i2.y};

        svg.selectAll("line").remove();
        vertex = {x:parseFloat(d3.select(point).attr("cx")), y:parseFloat(d3.select(point).attr("cy"))};
        console.log(vertex);

        // result  = altitude(vertex, a, b);
        //  console.log("coordinates i1" + i1.x + "  " + i1.y  + " i2 " + i2.x + "  " + i2.y);
        getWeightVector(i1, i2);
        // console.log("before equation x and y " + xValue + "   " + yValue +  " " + bias);
        updatePerceptron(vertex.x, vertex.y , label);

        //  console.log("after x and y " +xValue + "   " + yValue +  " " + bias);
        //console.log(x(0) + " " + y(1) );

        //  console.log("x1 is "  + x(0) + " y1 " + -bias/yValue);
        //  console.log("x2 is "  + ((-bias -yValue*y(1))/xValue) + " y2 " + y(1));
        findIntersection();

        //  setting the value of a and b
        a.x = i1.x;
        a.y = i1.y;

        b.x = i2.x;
        b.y = i2.y;

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
    // of the form a*xValue + b*yValue + bias =0

    function getWeightVector(i1, i2){

        x1 = i1.x;
        y1 = i1.y;

        x2 = i2.x;
        y2 = i2.y;

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

            i1.x = p1.x;
            i1.y = p1.y;
            flag1 = true;
        }

        // intersection with x Axis or y(2). x should lie between x(0) and x(1.8)
        p2.x = (-bias -yValue*y(2))/xValue;
        p2.y = i2.y = y(2);

        if(p2.x >= x(0) && p2.x <= x(1.8) && !flag1 ){

            i1.x = p2.x;
            i1.y = p2.y;
            flag1 = true;

        }else if(p2.x >= x(0) && p2.x <= x(1.8) && flag1){

            i2.x = p2.x;
            i2.y = p2.y;
            return;
        }
        // intersection with x(0) , i.e top most line parallel to xAxis. x should lie between x(0) and x(1.8)
        p3.x = -(y(5.5)*yValue + bias)/xValue;
        p3.y = y(5.5);

        if(p3.x >= x(0) && p3.x <= x(1.8) && !flag1){

            i1.x = p3.x;
            i1.y = p3.y;
            flag1 = true;

        }else if(p3.x >= x(0) && p3.x <= x(1.8) && flag1){

            i2.x = p3.x;
            i2.y = p3.y;
            return;
        }
        // intersection with x(1.8), y should lie in y(2) to y(5.5) to fall inside
        p4.x = x(1.8);
        p4.y = -(bias + x(1.8)*xValue)/yValue;

        if(p4.y >= y(5.5) && p4.y <= y(2)){

            i2.x = p4.x;
            i2.y = p4.y;

            return;

        }


    }

});
