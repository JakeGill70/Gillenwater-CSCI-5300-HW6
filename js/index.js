$(document).ready(function(){

    $("#problem1-calculate").click(function(){
        let problemName = "problem1"; // Set the problem name; used for interaction with the UI
        let userInput = presenter.getUserInput(problemName); // Get the user input from the form
        let startTime = Date.now(); // Set the official starting time of the method

        let output = ""
        for (let i = 0; i <= userInput.index; i++) {
            try {
                let outputStartTime = Date.now(); // Set the start time of this index's run
                let answer = problem1.getLucasNumber(i, startTime, userInput.maxTime); // Get the runtime 
                let outputRunTime = (Date.now() - outputStartTime)/1000; // Determine how long it took to calculate this index
                // Write out normal output
                output = `lucas ${i} is ${answer[0]} - computed with ${answer[1]} ${answer[1] == 1 ? " call " : " calls "} in ${outputRunTime} seconds`;
                presenter.writeOutput(problemName, output);
            }
            catch (error) {
                output = error;
                if(error == "timeout"){
                    output = `timeout at lucas ${i} after ${ userInput.maxTime } seconds`;
                }
                presenter.writeOutput(problemName, output);
                break;
            }
        }
    });

    $("#problem2a-calculate").click(function(){
        problemDriver("problem2a")
    });


    $("#problem2b-calculate").click(function(){
        problemDriver("problem2b")
    });
    
});