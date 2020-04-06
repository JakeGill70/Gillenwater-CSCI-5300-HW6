$(document).ready(function(){

    function testProblemDriver(problemName){
        // Using setTimeout() briefly takes control away from my 
        //      script and back to the browser. This has the
        //      effect of re-rendering the page between test
        //      so that a user is less likely to think that 
        //      the page has frozen.
        setTimeout(function(){
            presenter.outputRoute = "allTest";
            problemDriver(problemName);
            presenter.outputRoute = null;
        }, 5);
    }

    // Ideally, this would be an asynchronous function
    //      to keep the page from locking up during execution
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

        // Print a faux function call
        presenter.writeOutput(problemName, 
            `${problemName}(${userInput.startIndex}, ${userInput.index}, ${startTime}, ${userInput.maxTime});` +
            `<i style="color:grey">// This is a faux function call</i>`);

        let output = "";
        for (let i = userInput.startIndex; i <= userInput.index; i++) {
            try {
                // Set the start time of this index's run
                let outputStartTime = Date.now(); 
                // Get the appropriate answer from the specified implementation
                let answer = lucasSeriesImplementation[problemName](i, startTime, userInput.maxTime);
                // Determine how long it took to calculate this index 
                let outputRunTime = (Date.now() - outputStartTime)/1000; 

                // Get the lucas number
                let lucasNumber = answer[0];

                // Check if the lucas number exceeded the maximum value
                //      of a 64-bit floating point number
                if(lucasNumber == Infinity){
                    throw(`64-bit floating point overflow at lucas number ${i}`);
                }
                
                // Get the lucas number, then convert it 
                //      into a string in the format "#######"
                let formattedLucasNumber = answer[0].toLocaleString("fullwide", {useGrouping: false});
                // Get the number of calls that the function had to make
                let numberOfCalls = answer[1];
                // Get how many characters it would take to display the lucas number in base 10
                //      Note that this only includes characters prior to a decimal point.
                //      Therefore, errors introduced by floating point math do not count.
                let sizeOfLucasNumberInBaseTen = formattedLucasNumber.split(".")[0].length

                // If the lucas number is not a whole number, which can be caused 
                //      by rounding errors in floating point math, round it to 
                //      the nearest whole number.
                // Note: This check occurs after the sizeOfLucasNumberInBaseTen has
                //      been determined because it alters formattedLucasNumber.
                if(lucasNumber % 1 != 0){
                    formattedLucasNumber = formattedLucasNumber + ` -- i.e., ${Math.round(lucasNumber).toLocaleString("fullwide", {useGrouping: false})} -- `;
                }

                if(sizeOfLucasNumberInBaseTen < 50){
                    // Write out normal output
                    output = `lucas ${i} is ${formattedLucasNumber} - computed with ${numberOfCalls} ${numberOfCalls == 1 ? " call " : " calls "} in ${outputRunTime} seconds`;
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

    // Declare hooks between the index.html's buttons and JS actions
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

    // Special hook that effectively hooks all other buttons
    $("#allTest-calculate").click(function(){

        // Maximum amount of time to spend on any one function 
        const MAX_RUN_TIME = 7;
        
        // Problem 1 test
        presenter.setUserInput("problem1", 0, 38, MAX_RUN_TIME);
        testProblemDriver("problem1");

        // Problem 2a test
        presenter.setUserInput("problem2a", 0, 38, MAX_RUN_TIME);
        testProblemDriver("problem2a");

        // Problem 2b test
        presenter.setUserInput("problem2b", 0, 38, MAX_RUN_TIME);
        testProblemDriver("problem2b");

        // Problem 3 test
        //  0 to 20
        presenter.setUserInput("problem3", 0, 20, MAX_RUN_TIME);
        testProblemDriver("problem3");
        //  992 to 999
        presenter.setUserInput("problem3", 992, 999, MAX_RUN_TIME);
        testProblemDriver("problem3");

        // Problem 4 test
        //  0 to 20
        presenter.setUserInput("problem4", 0, 20, MAX_RUN_TIME);
        testProblemDriver("problem4");
        //  990 to 1500
        presenter.setUserInput("problem4", 990, 1500, MAX_RUN_TIME);
        testProblemDriver("problem4");

        // Problem 5 test
        //  0 to 20
        presenter.setUserInput("problem5", 0, 20, MAX_RUN_TIME);
        testProblemDriver("problem5");
        //  990 to 1500
        presenter.setUserInput("problem5", 990, 1500, MAX_RUN_TIME);
        testProblemDriver("problem5");
    });
    
});