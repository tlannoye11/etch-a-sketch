/* global $ */
// The above line is used to prevent Cloud9's ESLint tool from failing to interpret the jquery '$' symbol.
// Credit for the fix goes here:
// https://community.c9.io/t/being-flagged-as-not-defined-in-js-file-when-using-jquery/4231/4

$(document).ready(function() {
    var currentColor = "black";
    
    // Draw a new grid to start out.
    newGrid(16,16);
    
    $("#clearBtn").on("click", function() {
       $(".square").removeClass("colored");
       
       var size = prompt("Please enter a new grid size", "10");
       
       // Make sure that the default size is used if none is entered.
       if (size === null) {
           size = 10;
       }
       
       // Empty all divs from the previous grid.
       $("#container").empty();
       
       // Draw a new grid.
       newGrid(size,size);
    });
    
    $(".colorBtn").on("click", function() {
        $(".colorBtn").removeClass("colorBtnSelected");
        $(this).addClass("colorBtnSelected");
    })
});
    
function newGrid(gridHeight, gridWidth) {
    for (var i = 0; i < gridHeight; i++) {
        var newRow = $("<div class='row' id='row" + i + "'></div>");
        
        $("#container").append(newRow);
        
        for (var k = 0; k < gridWidth; k++) {
            var newSquare = $("<div class='square' id=square" + i + "-" + k + "></div>");
            
            $("#row" + i).append(newSquare);
        }
        
        // Increase the border on the first and last squares.
        $("#square" + i + "-0").addClass("leftSquare");
        $("#square" + i + "-" + (gridWidth - 1)).addClass("rightSquare");
    }
    
    // Increase the border on the top and bottom rows.
    $("#row0").addClass("topRow");
    $("#row" + (gridHeight - 1)).addClass("bottomRow");
    
    // Change the size of each square based on how many squares there are.
    // The original grid is 480px by 480px.
    // Make sure to allow 2px total for the border around each square.
    $(".square").css({"width": (480 / gridWidth) - 2, "height": (480 / gridHeight) - 2});
    
    // Also change the height of each square row accordingly.
    // Grid rows have no borders, so just divide the 480px grid by the number of rows.
    $(".row").css("height", 480 / gridHeight);
    
    // Add the darkenSquare function to each new square.
    $(".square").on("mouseenter", darkenSquare);
    
    console.log("L/W: " + gridHeight + ", " + gridWidth);
}

// This function was originally created here:
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors.
// All credit goes to the author of that post.
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

function darkenSquare() {
    $(this).css({"background-color": shadeRGBColor($(this).css("background-color"), -0.25)});
    
    
}