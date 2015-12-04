
/**
 * author : Abhinay
 * date : 11/09/2015
 * */
var a = {x: 1, y: 0},
    b = {x: 0, y: 2};


var xValue, yValue, bias;
var givenData3 =[];

var finalWeightVector = {temp1:0, temp2:0, label:1};

//var tempData = {xPosition:0, yPosition:0, label:+1};
//givenData.push(tempData);

var margin = {top: 50, right: 20, bottom: 20, left: 40},
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


var svg3 = d3.select("body").append("svg")
    .attr("id", "view3")
    .attr("width", width +margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   var def1 =  svg3.append('defs');

   var filter1 = def1.append("filter")
    .attr("id" ,"blurFilter4")
    .attr("x", "-20" )
    .attr("y", "-20")
    .attr("width", "200")
    .attr("height", "200");

filter1.append("feGaussianBlur")
    .attr("in","SourceGraphic" )
    .attr("stdDeviation", "10")



function displayMargin(){

    getWeightVector();

    finalWeightVector.temp1 = xValue;
    finalWeightVector.temp2 = yValue;
    finalWeightVector.label = bias;

    showMargin();


}

function showMargin(){

    //   svg.selectAll("line").remove();
    var minVal = {x:0, y:0};
    var minMargin = 5000;
    var temp= {x:0, y:0, label:1};
    var distance =0;

    for(var i =0; i<givenData3.length; i++){

        temp.x = givenData3[i].xPosition;
        temp.y = givenData3[i].yPosition;
        temp.label = givenData3[i].label;

        isCorrect = isCorrectlyClassified(temp);

        if(isCorrect){

            //     getWeightIntercepts();
            result = altitude(temp, a, b);

            var line = svg3.append("line")
                .classed('tempLine', true)
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .style("opacity", 1)
                .attr("x1", function(){
                    return result.x;
                })
                .attr("y1", function() {
                    return result.y;
                })
                .attr("x2",  function() {
                    return result.x;
                })
                .attr("y2",  function() {
                    return result.y;
                })
                .transition().duration(4000)
                .attr("x2",  function() {
                    return temp.x;
                })
                .attr("y2",  function() {
                    return temp.y;
                })
                .  style("opacity", 0);

            var t1 = result.x - temp.x;
            var t2 = result.y - temp.y;
            var squareSum = t1*t1 + t2*t2;
            distance = Math.sqrt(squareSum);

            if(distance < minMargin){

                minMargin = distance;

                minVal.x = temp.x;
                minVal.y = temp.y;
            }

            // draw all the lines from the correctly classified points

        }
    }

    console.log("minVal" + minVal.x + " " + minVal.y);

//    getWeightIntercepts();
//    svg3.selectAll(".tempLine").style("opacity", 1)
//        .transition().duration(2000).style("opacity", 0);

    //  svg.selectAll(".tempLine").remove();

    result = altitude(minVal, a, b);

    var line = svg3.append("line")
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

function showClassifiers(){

    // weight middle vector

    var point1 = {x:0, y:0};
    point1.x = x(0.4);
    point1.y = y(4.5);

    var a1 = {x:0, y:0};
    var b1 = {x:0, y:0};

    a1.x = a.x + 40;
    a1.y = a.y;
    b1.x = b.x + 40;
    b1.y = b.y;

    var line2 = svg3.append("line")
        .attr("x1", function(){
            return a1.x;
        })
        .attr("y1", function() {
            return a1.y;
        })
        .attr("x2",  function() {
            return b1.x;
        })
        .attr("y2",  function() {
            return b1.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "blue")
        .attr("class", "classifier")
        .attr("name", "line2");


    result = altitude(point1, a1, b1);

    var margin2 = svg3.append("line")
        .classed('tempLine', true)
        .attr("x1", function(){
            return result.x;
        })
        .attr("y1", function() {
            return result.y;
        })
        .attr("x2",  function() {
            return point1.x;
        })
        .attr("y2",  function() {
            return point1.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "blue");

    // right most weight vector

    var point2 = {x:0, y:0};
    point2.x = x(0.8);
    point2.y = y(4.0);

    console.log("x " + x(0.8));

    var a2 = {x:0, y:0};
    var b2 = {x:0, y:0};

    a2.x = a1.x + 40;
    a2.y = a1.y;
    b2.x = b1.x + 40;
    b2.y = b1.y;

    var line2 = svg3.append("line")
        .attr("x1", function(){
            return a2.x;
        })
        .attr("y1", function() {
            return a2.y;
        })
        .attr("x2",  function() {
            return b2.x;
        })
        .attr("y2",  function() {
            return b2.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "orange")
        .attr("class", "classifier")
        .attr("name", "line3");




    result2 = altitude(point2, a2, b2);

    var margin2 = svg3.append("line")
        .classed('tempLine', true)
        .attr("x1", function(){
            return result2.x;
        })
        .attr("y1", function() {
            return result2.y;
        })
        .attr("x2",  function() {
            return point2.x;
        })
        .attr("y2",  function() {
            return point2.y;
        })
        .attr("stroke-width", 2)
        .attr("stroke", "yellow");
    // add two new points

    var newData = [];

    var tempData = {xPosition:0, yPosition:0, label:0, species:"iris"};
    var tempData1 = {xPosition:0, yPosition:0, label:0, species:"fsd"};

    console.log("x " + x(0.2));

    tempData.xPosition = x(0.5);
    tempData.yPosition = y(5.0);
    tempData.label = -1;
    tempData.species = "Iris-setosa";

    newData.push(tempData);

    tempData1.xPosition = x(0.6);
    tempData1.yPosition = y(4.5);
    tempData1.label = 1;
    tempData1.species = "Iris-versicolor";

    newData.push(tempData1);

    var newcircles = svg3.selectAll("newPoints")
        .data(newData)
        .enter().append("circle")
        .attr("class", "newPoints")
        .attr("name",function(d){
            return d.species;
        })
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
            d3.select(this).attr("r", 3.5);
        })
        .attr("r", 0)
        .attr("cx", function(d) { return 0.8 + Math.random(); })
        .attr("cy", function(d) { return d.yPosition+Math.random(); })
        .transition().duration(5000)
        .attr("cx", function(d) {
            console.log("xpos" + d.xPosition);
            return d.xPosition; })
        .attr("cy", function(d) { return d.yPosition; })
        .attr("r", 5.5)
        .style("fill", function(d) { return color(d.species); });


    // blurring logic

    d3.selectAll(".classifier")
        .on('mouseover', function(){
        var elt = d3.select(this);
        var p1 = d3.selectAll(".classifier");
        p1.attr("filter","url(#blurFilter4)");
        elt.attr("filter","");
        console.log("got here");

            var circle = d3.selectAll(".newPoints");

            var val = elt.attr("name");

            if(val=="line2"){
                circle
                    .attr("style","fill:green");
                getSecondKID3();
            }

            if(val=="line1"){
                circle
                    .attr("style",function(){
                        var cir = d3.select(this);
                        if(cir.attr("name")=="Iris-setosa"){
                            return "fill:red";
                        }
                        else
                            return "fill:green";
                    });
                getfirstKID3();
            }
            if(val=="line3"){
                circle
                    .attr("style",function(){
                        var cir = d3.select(this);
                        if(cir.attr("name")=="Iris-setosa"){
                            return "fill:green";
                        }
                        else
                            return "fill:red";
                    });
                getThirdKID3();
            }

    })
        .attr("stroke-width","4");

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

        givenData3.push(tempData);

    });

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Petal Width");

    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Petal Length")


    var circles = svg3.selectAll(".dot")
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

    // displaying the linear seperator

    var line = svg3.append("line")
        .attr("x1", function(){
            a.x = x(0.4)
            return x(0.4);
        })
        .attr("y1", function() {
            a.y = y(5.5)
            return y(5.5);
        })
        .attr("x2",  function() {
            b.x = x(0.7);
            return x(0.7);
        })
        .attr("y2",  function() {
            b.y = y(2.0);
            return y(2.0);
        })
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("class", "classifier")
        .attr("name", "line1");

    var legend = svg3.selectAll(".legend")
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

    //var i1 = {x: a.x, y: a.y},
    //    i2 = {x: b.x, y: b.y};



    function drawLine(point, label){

        var prev1 = {x:i1.x, y:i1.y},
            prev2 = {x:i2.x, y:i2.y};

        svg3.selectAll("line").remove();
        vertex = {x:parseFloat(d3.select(point).attr("cx")), y:parseFloat(d3.select(point).attr("cy"))};
        console.log(vertex);

        getWeightVector(i1, i2);

        // console.log("before equation x and y " + xValue + "   " + yValue +  " " + bias);
        updatePerceptron(vertex.x, vertex.y , label);

        findIntersection();

        //  setting the value of a and b
        a.x = i1.x;
        a.y = i1.y;

        b.x = i2.x;
        b.y = i2.y;

        var line = svg3.append("line")
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

    // function to get the line equation

    function getLineEquation(p1, p2){

        var temp= {temp1:0, temp2:0, constant:1};

        var x1 = p1.x;
        var y1 = p1.y;

        var x2 = p2.x;
        var y2 = p2.y;

        temp.temp1 = (y2-y1)/(x2-x1);
        temp.temp2 = -1;
        temp.constant = y1- x1*(y2-y1)/(x2-x1);

        return temp;

    }

});
