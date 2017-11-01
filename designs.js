// Define variables: 
// submit button, table, color picker need to be accessed by the user
// the value of the color needs to be stored

var height;
var width;
var submitButton;
var colorPicker;
var userColor;
var grid = [[]];

height = $('#input_height').val();
width = $('#input_width').val();
submitButton = $('#select_button').val();
colorPicker = $('#colorPicker').val();
sizePicker = $('#sizePicker').val();


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
	// test: set h2 background to a different color
    $('h2').css('background-color', '#FFCB00');  
    // Testing: print height and width (from user input) to the console.
	console.log("What sizePicker sees: \nheight: " + height + "\nwidth: " + width);
    makeGrid(height, width);
    // Prevent the page from refreshing and reloading content
    return false;
});


// Set size of the canvas as an N by M grid

function makeGrid(N, M) {
	// Use nested arrays to make a grid: each row is an array,
	// and each array is an element of the larger array.
	// The first loop accesses each row of the grid,
	// and the nested loops access each element (column) for each row.
    // Testing: print height and width (from user input) to the console.
	console.log("What makeGrid sees: \nheight: " + N + "\nwidth: " + M);
	for (var row = 0; row < N; row++) {
		// Define a new row in an HTML table, append to pixel canvas
		var thisRow = $('#pixel_canvas').append('<tr></tr>');
		// Testing: print message to console
		console.log("Added new row " + row);
		for (var column = 0; column < M; column++){
			// Define a new cell in the row
			var cell = thisRow.append('<td>abc</td>');
			// $('tr').append('<td></td>');
			// Testing: print message to console
			console.log("Added new cell " + column + " to row " + row);
			// Also add an event listener to each cell
			// that sets the background color of the cell to the selected color.
			$('#pixel_canvas').on('click', 'td', function() {
				('td').css('background-color', '#FCDA85');
			});
		}
	}
}

// Add test event listener for test canvas
$('td').on('click', function () {
	$('td').css('background-color', '#FFCB00');  
})

// Add way of clearing the pixel canvas?


