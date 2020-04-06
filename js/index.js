$(document).ready(function(){

    function problemDriver(problemName){

        // Dispatch table for the different problems/implementations 
        //      getting a specific number within the lucas series
        let lucasSeriesImplementation = {
            "problem1" : problem1.getLucasNumber,
            "problem2a" : problem2a.getLucasNumber,
            "problem2b" : problem2b.getLucasNumber,
            "problem3" : problem3.getLucasNumber,
            "problem4" : problem4.getLucasNumber,
            "problem5" : problem5.getLucasNumber
        }

        // Get the user input from the form
        let userInput = presenter.getUserInput(problemName); 
        // Set the official starting time of the method
        let startTime = Date.now(); 

        let output = "";
        for (let i = userInput.startIndex; i <= userInput.index; i++) {
            try {
                // Set the start time of this index's run
                let outputStartTime = Date.now(); 
                // Get the runtime 
                let answer = lucasSeriesImplementation[problemName](i, startTime, userInput.maxTime);
                // Determine how long it took to calculate this index 
                let outputRunTime = (Date.now() - outputStartTime)/1000; 

                // Check if the lucas number exceeded the maximum value
                //      of a 64-bit floating point number
                if(answer[0] == Infinity){
                    throw(`64-bit floating point overflow at lucas number ${i}`);
                }
                
                // Get the lucas number, then convert it 
                //      into a string in the format "#######"
                let lucasNumber = answer[0].toLocaleString("fullwide", {useGrouping: false});
                // Get the number of calls that the function had to make
                let numberOfCalls = answer[1];
                // Get how many characters it would take to display the lucas number in base 10
                let sizeOfLucasNumberInBaseTen = lucasNumber.length;

                if(sizeOfLucasNumberInBaseTen < 50){
                    // Write out normal output
                    output = `lucas ${i} is ${lucasNumber} - computed with ${numberOfCalls} ${numberOfCalls == 1 ? " call " : " calls "} in ${outputRunTime} seconds`;
                }
                else{
                    // Write out abridged output because the normal
                    //      would be too long to be easily readable.
                    output = `lucas ${i} contains ${sizeOfLucasNumberInBaseTen} digits - computed in ${outputRunTime} seconds`;
                }
                // Write the output string to the page
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

    $("#problem3-calculate").click(function(){
        problemDriver("problem3");
    });

    $("#problem4-calculate").click(function(){
        problemDriver("problem4");
    });

    $("#problem5-calculate").click(function(){
        problemDriver("problem5");
    });
    
});