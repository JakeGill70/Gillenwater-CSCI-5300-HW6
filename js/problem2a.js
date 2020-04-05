// Jake Gillenwater
// 4/3/2020
// CSCI-5300-201
// HW6 - Problem 2a

// Object that provides a namespace for all of the functions within this file
var problem2a = { 
    _startTime : 0,
    _endTime : 0,

    // Public interface to simplify calling the method
    getLucasNumber : function(index, startTime, maxTime){
        let start = startTime;
        let end = startTime + (maxTime * 1000); // Convert maxTime from seconds to ms

        _startTime = start;
        _endTime = end;

        let result = problem2a._getLucasNumber(index);
        return result;
    },

    // Recursive determines the number at the specied index within the lucas series
    // The method actual described by problem 2a
    _getLucasNumber : function(index){

        // Error checking for negative index
        if(index < 0){
            throw("negative index");
        }
        // Error checking for negative maxTime
        if(_endTime < 0){
            throw("negative endTime");
        }
        // Error checking for timeout
        if(_endTime - Date.now() <= 0){
            throw("timeout");
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
            let gln1 = this._getLucasNumber(index-1); // Get the previous number in the lucas series
            let gln2 = this._getLucasNumber(index-2); // Get the previous previous number in the lucas series
            valueAtIndex = gln1[0] + gln2[0]; // Determine the value at this index
            timesCalled += gln1[1] + gln2[1]; // Add up the number of times this method was called
        }
        return [valueAtIndex, timesCalled];
    }
}