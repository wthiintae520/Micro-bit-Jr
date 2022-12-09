window.onload = function() {

    // const blackRectangles = document.getElementsByClassName("sim-led-back");
    // const redRectangles = document.getElementsByClassName("sim-led");

    var blackRectangles = document.getElementsByClassName("sim-led-back");
    var redRectangles = document.getElementsByClassName("sim-led");
    
    for(var i = 1; i<blackRectangles.length; i++){
        blackRectangles[i].addEventListener("click", turnRed);
    }

    blackRectangles[0].addEventListener("click", turnRed);
    redRectangles.addEventListener("click", turnBlack);
    
    function turnRed() {
        alert ("turnRed");
    }
    
    function turnBlack() {
        alert ("turnBlack");
    }
}
