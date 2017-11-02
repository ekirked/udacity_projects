// Define variables: 
// submit button, table, color picker need to be accessed by the user
// the value of the color needs to be stored

var height;
var width;
var submitButton;
var colorPicker;
var userColor;
var grid = [[]];
var clearButton;

height = $('#input_height').val();
width = $('#input_width').val();
submitButton = $('#select_button').val();
colorPicker = $('#colorPicker').val();
sizePicker = $('#sizePicker').val();
clearButton = $('#clear_button').val();


// Select color input
// When user selects a color, store the value of the color, 
// so clicked cell in table can be set to that color

$('#colorPicker').on('input', function() {
	colorPicker = $('#colorPicker').val();
	// test: set h2 to the color selected by user
	$('h2').css('color', colorPicker);  
});


// Select size input

$('#input_height').on('input', function() {
	height = $('#input_height').val();
	// test: set background to a different color
    $('body').css('background-color', '#BFDDDE');  
});

$('#input_width').on('input', function() {
	width = $('#input_width').val();
	// test: set h1 background to a different color
    $('h1').css('background-color', '#FCDA85');  
});

                                   
// Listen to submitButton
// When size is submitted by the user, call makeGrid()

$('#sizePicker').submit(function(event) {
	event.preventDefault();
	// test: set h2 background to a different color
    $('h2').css('background-color', '#FFCB00');  
    // Testing: print height and width (from user input) to the console.
	console.log("What sizePicker sees: \nheight: " + height + "\nwidth: " + width);
    makeGrid(height, width);
});


// Set size of the canvas as an N by M grid

function makeGrid(heightMax, widthMax) {

	$('#pixel_canvas').empty();

	for (var row = 0; row < heightMax; row++) {
        $("#pixel_canvas").append("<tr> </tr>");
        for (var column = 0; column < widthMax; column++) {
            $("tr:last").append("<td> </td>"); 
            // Set background color of pixel canvas to white
            $('td').css('background-color', '#FFFFFF');  
        }
    }

	$('td').on('click', function () {
		$(this).css('background-color', colorPicker);  
	})
}


// Add way of clearing the pixel canvas
// Listen to clearButton

$('#clearCanvas').submit(function(event) {
	event.preventDefault();
	// Reset background color of pixel canvas to white
	$('td').css('background-color', '#FFFFFF');  
	console.log("clear button clicked");
});


