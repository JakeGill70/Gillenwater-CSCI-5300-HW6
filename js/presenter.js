var presenter = {
    getUserInput : function(problemName){
        // Get user input from form data
        let index = $("#" + problemName + "-index").val();
        let maxTime = $("#" + problemName + "-maxTime").val();
        let isAutoIncrementEnabled = $("#" + problemName + "-autoIncrement").is(":checked");
        let startIndex = $("#" + problemName + "-startIndex").val();

        // The start index property is only available after problem 3,
        // so not all implementations will have it.
        // If they don't have it, just treat it like a 0.
        if(startIndex == undefined){
            startIndex = "0";
        }

        // Package data
        let result = {};
        result.index = parseInt(index);
        result.maxTime = parseInt(maxTime);
        result.isAutoIncrementEnabled = isAutoIncrementEnabled;
        result.startIndex = parseInt(startIndex);
        return result;
    },

    setUserInput : function(problemName, index, maxTime, startIndex){
        // Get user input from form data
        $("#" + problemName + "-index").val(index);
        $("#" + problemName + "-maxTime").val(maxTime);
        $("#" + problemName + "-startIndex").val(startIndex);
    },

    writeOutput : function(problemName, output){
        // Mirror the output to the console
        console.log(output);
        
        // Wrap the output in the appropriate HTML tags
        output = this.wrapTextInListItem(output);

        // Add it to the output window
        $("#" + problemName + "-output-list").append(output);

        // Scroll the output window to the bottom
        let moduleWindow = document.getElementById(problemName + "-output");
        moduleWindow.scrollTo(0, moduleWindow.scrollHeight);
    },

    // Wraps some object in a <li> tag
    wrapTextInListItem : function(text){
        return "<li class=\"list-group-item\">" + text + "</li>";
    },

    autoIncrementIndex : function(problemName){
        let userInput = this.getUserInput(problemName);
        if(userInput.isAutoIncrementEnabled){
            $("#" + problemName + "-index").val( parseInt(userInput.index)+1 );
        }
    }
}

