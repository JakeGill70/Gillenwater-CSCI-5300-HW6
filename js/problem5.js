// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 5

// Object that provides a namespace for all of the functions within this file
var problem5 = {

    // Public interface to simplify calling the method
    getLucasNumber : function(index, startTime, maxTime){

        let result = problem5._getLucasNumber(index);
        return result;

    },

    // Recursive determines the number at the specied index within the lucas series
    // The method actual described by problem 5
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
            // Determine the value via formula
            //      Source: https://en.wikipedia.org/wiki/Lucas_number

            // Determine the square root of 5
            let sqrtOfFive = Math.sqrt(5);
            // Determine the golden ratio
            let phi = (1 + sqrtOfFive) / 2;
            // Determine one minus the golden ratio
            let coPhi = (1 - sqrtOfFive) / 2;
            // Determine the lucas number
            valueAtIndex = Math.pow(phi, index) + Math.pow(coPhi, index);
        }

        // Not used in this implementation
        // But kept so that the same generic driver function
        // will continue to work the same
        let numberOfTimesCalled = 1;

        return [valueAtIndex, numberOfTimesCalled];
    }
}