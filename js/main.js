// Initialize alphabet, numbers, and characters
var upperAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var lowerAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var punctuation = ['\.', '\,', '\;', '\:', '\-', '\?', '\!', '\"', '\'', '\.\.\.', '\(', '\)', '\@', '\#', '\$', '\%', '\&', '\*', '\+', '\='];
var numOfColors = 50;

// Add upper case letters to page
for (i in upperAlphabet){
	$('#upperCase').append('<div class="letter" id="'+upperAlphabet[i]+'">'+upperAlphabet[i]+'</div>');
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#' + upperAlphabet[i]).css('color', rainbow(numOfColors, randomValue));
}

//Add lower case letters to page
for (i in lowerAlphabet){
	$('#lowerCase').append('<div class="letter" id="'+lowerAlphabet[i]+'">'+lowerAlphabet[i]+'</div>');
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#' + lowerAlphabet[i]).css('color', rainbow(numOfColors, randomValue));
}

//Add numbers to page
for (i in numbers){
	$('#numbers').append('<div class="letter" id="'+numbers[i]+'">'+numbers[i]+'</div>');
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#' + numbers[i]).css('color', rainbow(numOfColors, randomValue));
}

//Add punctuation to page
for (i in punctuation){
	
	$('#punctuation').append('<div class="letter" id="punct'+ upperAlphabet[i] +'">'+punctuation[i]+'</div>');
	
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#punct' + upperAlphabet[i]).css('color', rainbow(numOfColors, randomValue));
	
}

// Assigns random color to each letter
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}


// Allows letters to be dragged
$(".letter").draggable({
	helper: 'clone',
	opacity: .25,
	revert: "invalid",
    containment: 'html'
});


// Allows letter clone to be dropped into canvas
$("#canvas").droppable({
    accept: '.letter',
    drop: function(event, ui) {
    	$(".letter").css({'opacity':'1'});
    	$(this).append($(ui.helper).clone());
        $("#canvas .letter").addClass("newLetter");
        $(".newLetter").removeClass("ui-draggable letter");
        $(".newLetter").draggable({
        	containment: 'parent',
        	opacity: .25
        });
    }
});

// Delete Letters
$("#trash").droppable({
	accept: '.newLetter',
	drop: function(event, ui) {
		$(ui.draggable).remove();
	}
});

//Creates accordion affect on left hand side
$(function() {
    $( "#accordion" ).accordion({ heightStyle: "fill" });
});

