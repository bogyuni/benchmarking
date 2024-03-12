var sequencePath = './img/';
var sequenceNumberLength = 3;
var fileSuffix = '.png';

var targetElement = document.getElementById('myCanvas');

//var fps = 30;
var startFrame = 1;
var endFrame = 300;
var loop = true;
var pingPong = true;

function padWithZeroes(number, length) {
	var paddedNumber = '' + number;
	while (paddedNumber.length < length) {
		paddedNumber = '0' + paddedNumber;
	}
	return paddedNumber;
}

var frames = [];
var framesLoaded = 0;
function loadFrames(callback) {
	for (var i = startFrame; i <= endFrame; i++) {
		frames[i] = new Image();
		frames[i].src = sequencePath + padWithZeroes(i, sequenceNumberLength) + fileSuffix;
		frames[i].onload = function(){ 
			framesLoaded++; 
			if (framesLoaded >= endFrame-startFrame) {
				callback();
			}
		};
	}
}

var currentFrame = startFrame;
var forwards = true;

function frameAnimation() {
	console.log(currentFrame);
	var canvas = targetElement;
	var context = canvas.getContext('2d');
	//var img = new Image;

	//img.onload = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(frames[currentFrame], 0, 0);
	//};

	// If last frame
	if (currentFrame == endFrame) {
		if (!loop) cancelAnimationFrame();

		if (pingPong) {
			forwards = false; // Go backwards
		} else {
			currentFrame = startFrame; // Start over
		}
		// If first frame
	} else if (currentFrame == startFrame) {
		if (pingPong) {
			forwards = true;
		}
	}

	if (forwards) {
		currentFrame++;
	} else {
		currentFrame--;
	}

	requestAnimationFrame(frameAnimation);
}

loadFrames(function() {
	console.log('loaded!');
	frameAnimation();
});