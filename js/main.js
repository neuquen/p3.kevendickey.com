var upperAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var lowerAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var numOfColors = 50;


for (i in upperAlphabet){
	$('#palette').append('<div class="letter" id="letter'+upperAlphabet[i]+'">'+upperAlphabet[i]+'</div>');
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#letter' + upperAlphabet[i]).css('color', rainbow(numOfColors, randomValue));
}

for (i in lowerAlphabet){
	$('#palette').append('<div class="letter" id="letter'+lowerAlphabet[i]+'">'+lowerAlphabet[i]+'</div>');
	
	// Set random color for each letter
	var randomValue = Math.floor(Math.random() * numOfColors) + 1;
	$('#letter' + lowerAlphabet[i]).css('color', rainbow(numOfColors, randomValue));
}

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


$(".letter").draggable({
    helper: 'clone',
    containment: 'html'
});

$("#canvas").droppable({
    accept: '.letter',
    drop: function(event, ui) {
        $(this).append($(ui.helper).clone());
        $("#canvas .letter").addClass("newLetter");
        $(".newLetter").removeClass("ui-draggable letter");
        $(".newLetter").draggable({
            containment: 'parent'
        });
    }
});
