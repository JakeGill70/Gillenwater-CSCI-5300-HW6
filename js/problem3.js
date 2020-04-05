// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 2b

// Object that provides a namespace for all of the functions within this file
var problem3 = { 
    _startTime : 0,
    _endTime : 0,

    // Public interface to simplify calling the method
    getLucasNumber : function(index, startTime, maxTime){
        
        let start = startTime;
        let end = startTime + (maxTime * 1000); // Convert maxTime from seconds to ms

        problem3._startTime = start;
        problem3._endTime = end;

        let result = problem3._getLucasNumber(index);
        return result;
    },

    // Recursive determines the number at the specied index within the lucas series
    // The method actual described by problem 2b
    _getLucasNumber : function(index){

        // ctx -> The current context in which this function is being called in.
        //      This is necessary because of the contextual nature of the "this" keyword in javascript
        // i -> The index of the number within the lucas series that the method should compute to
        function computeLucasNumber(ctx, i){
            // Error checking for timeout
            if(problem3._endTime - Date.now() <= 0){
                throw("timeout");
            }

            let valueAtIndex = 0; // Holds the number at the specified index in the lucas series
            let timesCalled = 1; // Holds the number of times this method was called

            // Determine the value at the specified index
            if(i == 0){
                // Value by definition
                valueAtIndex = 2;
            }
            else if(i == 1){
                // Value by definition
                valueAtIndex = 1;
            }
            else {
                
                let gln1 = computeLucasNumber(ctx, i-1); // Get the previous number in the lucas series
                let gln2 = computeLucasNumber(ctx, i-2); // Get the previous previous number in the lucas series
                valueAtIndex = gln1[0] + gln2[0]; // Determine the value at this index
                timesCalled += gln1[1] + gln2[1]; // Add up the number of times this method was called
            }
            return [valueAtIndex, timesCalled];
        }

        // Error checking for negative index
        if(index < 0){
            throw("negative index");
        }
        // Error checking for negative maxTime
        if(problem3._endTime < 0){
            throw("negative endTime");
        }
        console.log(this);
        return computeLucasNumber(this, index);
    }
}