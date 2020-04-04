// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 1

// Object that provides a namespace for all of the functions within this file
var problem1 = { 
    // Public interface to simplify calling the method
    getLucasNumber : function(index, maxTime){
        let start = Date.now();
        let max = Date.now() + (maxTime * 1000); // Convert maxTime from seconds to ms
        return problem1._getLucasNumber(index, start, max);
    },

    // Recursive determines the number at the specied index within the lucas series
    _getLucasNumber : function(index, startTime, maxTime){

        // Error checking for negative index
        if(index < 0){
            throw("Exception: negative index");
        }
        // Error checking for negative maxTime
        if(maxTime < 0){
            throw("Exception: negative maxTime");
        }
        // Error checking for timeout
        if(maxTime - startTime <= 0){
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
            let gln1 = this._getLucasNumber(index-1, Date.now(), maxTime); // Get the previous number in the lucas series
            let gln2 = this._getLucasNumber(index-2, Date.now(), maxTime); // Get the previous previous number in the lucas series
            valueAtIndex = gln1[0] + gln2[0]; // Determine the value at this index
            timesCalled += gln1[1] + gln2[1]; // Add up the number of times this method was called
        }
        return [valueAtIndex, timesCalled];
    }
}