$(document).ready(function() {
    function newGrid(gridLength, gridWidth) {
        for (var i = 0; i < gridLength; i++) {
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
        $("#row" + (gridLength - 1)).addClass("bottomRow");
    }
    
    newGrid(16,16);
    
    $(".square").on("mouseenter", function() {
        var currentOpacity;
        
        $(this).addClass("colored");
        
        currentOpacity = parseInt($(this).css("opacity"));
        
        console.log("BEFORE " + currentOpacity);
        currentOpacity += 0.1;
        console.log("AFTER " + currentOpacity);
        
        $(this).css({"opacity": parseInt($(this).css("opacity")) + 0.1});
    });
    
    $("#clearBtn").on("click", function() {
       $(".square").removeClass("colored");
    });
    
    function shadeRGBColor(color, percent) {
        var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
        return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
    }
});
