
var updatePerceptron=  function (x,  y, label){


    var val =xValue*x + yValue*y + bias;

   // console.log("val and label are" + val + " " + label);
    if(val*label<0){

        xValue = xValue + 0.0003*label*x;
        yValue = yValue + 0.0003*label*y;
        bias =  bias + 0.0003*label;
    }
}

function isCorrectlyClassified(temp){


    var val =xValue*temp.x + yValue*temp.y +bias;

    if(val*temp.label<0){
        return false;
    }

    return true;

}

function isPointCorrectlyClassified(point, line){


    var val =line.temp1*point.x + line.temp2*point.y +constant;

    if(val*point.label<0){
        return false;
    }

    return true;

}
