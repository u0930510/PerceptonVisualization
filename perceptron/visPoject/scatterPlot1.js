
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
