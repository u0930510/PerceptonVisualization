/**
 * Created by abhinay on 11/11/15.
 */

var xValue=200;
var yValue = 1200;
var margin = 240000;

var execute = function () {
    var p = d3.selectAll("circle");




    p.on('click', function(){
        var elt = d3.select(this);
        updatePerceptron(elt.attr("cx"),elt.attr("cy"),elt.attr("label"));
    });

}


var updatePerceptron=  function (x,  y, label){


    var val =xValue*x + yValue*y - margin;

    if(val*label<0){

        xValue = xValue + 0.3*label*x;
        yValue = yValue + 0.3*label*y;
        margin =  margin -label;
    }
    else{
        return;
    }


    var str="";
    if(xValue>0&&yValue>0){

        x1=margin/xValue;
        y1=0;
        x2=0;
        y2=margin/yValue;
        str=str.concat("M "+x1+ " "+y1 +" L "+x2+" "+y2);
    }


    else{

        if(xValue>0){
            var x=margin/xValue;
            var y=0;

            str=str.concat("M "+x+" "+y+" ");
            while(x<3000&&y<3000) {
                y=(margin-xValue*x)/yValue;
                x+=4;

                str=str.concat(" L "+x+" "+y);
            }
        }

        else if(yValue>0){
            var y=margin/yValue;
            var x=0;

            str=str.concat("M "+x+" "+y+" ");
            while(x<3000&&y<3000) {
                x=(margin-yValue*y)/xValue;
                y+=4;

                str=str.concat(" L "+x+" "+y);
            }
        }

    }

    d3.selectAll("path")
        .data([127])
        .transition()
        .duration(1000) // 3 seconds
        .attr("d", str)
        .attr("stoke","blue")
        .attr("stroke-width","2");

}


function isCorrectlyClassified(temp){


    var val =xValue*temp.x + yValue*temp.y - margin;

    if(val*temp.label<0){
        return false;
    }

    return true;

}


