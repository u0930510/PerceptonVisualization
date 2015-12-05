

var values = document.getElementsByName('screen')
for (var i=0,max=values.length; i<max; i++) {
    var value = values[i];
    value.addEventListener('focus', function() {
        this.setAttribute('opacity', '1');
    }, value);
}


function gotoSecond() {
    try {
        window.scrollBy(0, 900);
       // values[1].focus();
        getOriginalKid();
        setTimeout(drawWeightVector,1000);
        setTimeout(getNextKID2,2000);
    }catch(e){ console.log("Error! ", e); }

}


function gotoThird() {
    try {
      //  values[2].focus();
        shrinkWeightVector2();
        setTimeout(scrollThird,900);


    }catch(e){ console.log("Error! ", e); }

}

function scrollThird(){
    window.scrollBy(0, 900);
    expandWeightvector3();
}
function gotoFourth() {
    try {
        shrinklWeightvectorBest3();
        setTimeout(scrollFourth,900);
    }catch(e){ console.log("Error! ", e); }

}
function scrollFourth(){
    window.scrollBy(0, 800);
    expandWeightvector4();
}
function goBack(){

    window.scrollBy(0, -800);

}