// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 3

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
    // The method actual described by problem 3
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
            let valueBeforeIndex = 0;
            let timesCalled = 1; // Holds the number of times this method was called

            // Determine the value at the specified index
            if(i == 0){
                // Value by definition
                valueAtIndex = 2;
                valueBeforeIndex = null;
            }
            else if(i == 1){
                // Value by definition
                valueAtIndex = 1;
                valueBeforeIndex = 2;
            }
            else if(i == -1){
                // i may be -1 on the first call if the user requested the 0th index
                // Just treat it the same as i==0 because that is what they meant
                valueAtIndex = 2;
                valueBeforeIndex = null;
            }
            else {
                let clu = computeLucasNumber(ctx, i-1); // Get the previous number in the lucas series
                valueAtIndex = clu[0] + clu[1]; // Determine the value at this index
                valueBeforeIndex = clu[0]; // Set the value at the of the previous index
                timesCalled += clu[2]; // Add up the number of times this method was called
            }
            return [valueAtIndex, valueBeforeIndex, timesCalled];
        }

        // Error checking for negative index
        if(index < 0){
            throw("negative index");
        }
        // Error checking for negative maxTime
        if(problem3._endTime < 0){
            throw("negative endTime");
        }
        let result = computeLucasNumber(this, index-1);
        let lucasNumber = result[0] + result[1];
        let numberOfTimesCalled = result[2];
        return [lucasNumber, numberOfTimesCalled];
    }
}