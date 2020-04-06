// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 3

// Object that provides a namespace for all of the functions within this file
var problem3 = { 
    // Public interface to simplify calling the method
    getLucasNumber : function(index, startTime, maxTime){
        // If the caller requested the 0th index, this can accidentially
        //      request the -1th index, which does not exists.
        //      Therefore, we should treat any request for the 0th index
        //      as if it was the 1st index.
        index = index == 0 ? 1 : index; 
        let start = startTime;
        let end = startTime + (maxTime * 1000); // Convert maxTime from seconds to ms
        let result = problem3._getLucasNumber(index-1, start, end);
        let lucasNumberAtIndex = result[0] + result[1];
        let timeToComplete = result[2];
        // Package output
        let output = [lucasNumberAtIndex, timeToComplete];
        return output;
    },

    // Recursive determines the number at the specied index within the lucas series
    // The method actual described by problem 3
    _getLucasNumber : function(index, startTime, endTime){

        // Error checking for negative index
        if(index < 0){
            throw("negative index");
        }
        // Error checking for negative endTime
        if(endTime < 0){
            throw("negative endTime");
        }
        // Error checking for timeout
        if(endTime - startTime <= 0){
            throw("timeout");
        }

        let valueAtIndex = 0; // Holds the number at the specified index in the lucas series
        let valueBeforeIndex = 0;   // Holds the number prior to the specified index in the lucas series
        let timesCalled = 1; // Holds the number of times this method was called

        // Determine the value at the specified index
        if(index == 0){
            // Value by definition
            valueAtIndex = 2;
            valueBeforeIndex = null;
        }
        else if(index == 1){
            // Value by definition
            valueAtIndex = 1;
            valueBeforeIndex = 2;
        }
        else {
            let result = this._getLucasNumber(index-1, Date.now(), endTime); // Get the previous two numbers in the lucas series
            valueAtIndex = result[0] + result[1]; // Determine the value at this index
            valueBeforeIndex = result[0];
            timesCalled += result[2]; // Add up the number of times this method was called
        }
        return [valueAtIndex, valueBeforeIndex, timesCalled];
    }
}