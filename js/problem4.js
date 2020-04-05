// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 4

// Object that provides a namespace for all of the functions within this file
var problem4 = {

    // Public interface to simplify calling the method
    getLucasNumber : function(index, startTime, maxTime){

        let result = problem4._getLucasNumber(index);
        return result;

    },

    // Recursive determines the number at the specied index within the lucas series
    // The method actual described by problem 4
    _getLucasNumber : function(index){

        // Error checking for negative index
        if(index < 0){
            throw("negative index");
        }

        let valueAtIndex = 0;

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
            let prevNumber = 1; // Initialized as to the value at index 1
            let prevPrevNumber = 2; // Initialized to the value at index 0

            // Start at i=2 because i=0 and i=1 is handled by the two previous if-statements
            for (let i = 2; i <= index; i++) {
                // Set the current value at the index as the sume of the two previous numbers
                valueAtIndex =  prevNumber + prevPrevNumber;
                // "Shift" the previous values for the next iteration
                prevPrevNumber = prevNumber;
                prevNumber = valueAtIndex;
            }
    
        }

        // Not used in this implementation
        // But kept so that the same generic driver function
        // will continue to work the same
        let numberOfTimesCalled = 1; 

        return [valueAtIndex, numberOfTimesCalled];
    }
}