$(document).ready(function(){

    function problemDriver(problemName){

        // Dispatch table for the different problems/implementations 
        // getting a specific number within the lucas series
        let lucasSeriesImplementation = {
            "problem1" : problem1.getLucasNumber,
            "problem2a" : problem2a.getLucasNumber,
            "problem2b" : problem2b.getLucasNumber
        }

        // Get the user input from the form
        let userInput = presenter.getUserInput(problemName); 
        // Set the official starting time of the method
        let startTime = Date.now(); 

        let output = ""
        for (let i = 0; i <= userInput.index; i++) {
            try {
                // Set the start time of this index's run
                let outputStartTime = Date.now(); 
                // Get the runtime 
                let answer = lucasSeriesImplementation[problemName](i, startTime, userInput.maxTime);
                // Determine how long it took to calculate this index 
                let outputRunTime = (Date.now() - outputStartTime)/1000; 
                // Write out normal output
                output = `lucas ${i} is ${answer[0]} - computed with ${answer[1]} ${answer[1] == 1 ? " call " : " calls "} in ${outputRunTime} seconds`;
                presenter.writeOutput(problemName, output);
            }
            catch (error) {
                // If an error occurs, prepare to write out the error message to the screen
                output = error;
                // If it was a timeout error, change the output to provide more detailed feedback
                if(error == "timeout"){
                    output = `timeout at lucas ${i} after ${ userInput.maxTime } seconds`;
                }
                // Write the error message to the page
                presenter.writeOutput(problemName, output);
                // Exit the loop
                break;
            }
        }
    }

    $("#problem1-calculate").click(function(){
        problemDriver("problem1");
    });

    $("#problem2a-calculate").click(function(){
        problemDriver("problem2a");
    });


    $("#problem2b-calculate").click(function(){
        problemDriver("problem2b");
    });
    
});