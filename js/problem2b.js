// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 2b

// Object that provides a namespace for all of the functions within this file
var problem2b = { 

    startTime : 0,
    endTime : 0,

    // Public interface to simplify calling the method
    getLucasNumber : function(index, maxTime){

        // Error checking for negative index
        if(index < 0){
            throw("Exception: negative index");
        }
        // Error checking for negative maxTime
        if(maxTime < 0){
            throw("Exception: negative maxTime");
        }

        startTime = Date.now();
        endTime = Date.now() + (maxTime * 1000); // Convert maxTime from seconds to ms
        return problem2b._getLucasNumber(index);
    },

    // Recursive determines the number at the specied index within the lucas series
    _getLucasNumber : function(index){

        // Error checking for timeout
        if(endTime - Date.now() <= 0){
            throw("Exception: maxTime exceeded");
        }

        let valueAtIndex = 0; // Holds the number at the specified index in the lucas series
        let timesCalled = 1; // Holds the number of times this method was called

        // Determine the value at the specified index
        if(index == 0){
            // Value by definition
            valueAtIndex = 2;
        }
        else if(index == 1){
            // Value by definition
            valueAtIndex = 1;
        }
        else {
            let gln1 = problem2b._getLucasNumber(index-1); // Get the previous number in the lucas series
            let gln2 = problem2b._getLucasNumber(index-2); // Get the previous previous number in the lucas series
            valueAtIndex = gln1[0] + gln2[0]; // Determine the value at this index
            timesCalled += gln1[1] + gln2[1]; // Add up the number of times this method was called
        }
        return [valueAtIndex, timesCalled];
    }
}