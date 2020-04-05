$(document).ready(function(){

    $("#problem1-calculate").click(function(){
        let problemName = "problem1";
        let userInput = presenter.getUserInput(problemName);
        let startTime = Date.now();
        for (let i = 0; i < userInput.index; i++) {
            problem1.getLucasNumber(i, startTime, userInput.maxTime);
        }
    });

    $("#problem2a-calculate").click(function(){
        problemDriver("problem2a")
    });


    $("#problem2b-calculate").click(function(){
        problemDriver("problem2b")
    });
    
});