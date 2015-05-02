var times = {
	0: {
		"time": 5,
		"text": "Introductory Speech"
	},
	1: {
		"time": 3,
		"text": "First Speaker, Proposition"
	},
	2: {
		"time": 3,
		"text": "First Speaker, Opposition"
	},
	3: {
		"time": 3,
		"text": "Second Speaker, Proposition"
	},
	4: {
		"time": 3,
		"text": "Second Speaker, Opposition"
	},
	5: {
		"time": 5,
		"text": "Fill in Assessment Forms"
	},
	6: {
		"time": 3,
		"text": "Rebuttal Speaker, Opposition"
	},
	7: {
		"time": 3,
		"text": "Rebuttal Speaker, Proposition"
	},
	8: {
		"time": 5,
		"text": "Audience Questions"
	}
};

var actual = 0;
var alarm = 0;

function element(a) {
	return document.querySelector(a);
}

function restoreclock() {
	var canvas = element("#clock"),
		context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 300, 0, 2*Math.PI, false);
	context.lineWidth = 15;
	context.strokeStyle = "black";
	context.stroke();
}

function drawclock(units) {
	var canvas = element("#clock"),
		context = canvas.getContext("2d"),
		units = units * 2;
	
	units += 1.5;

	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 280, 1.5*Math.PI, units*Math.PI, false);
	context.lineWidth = 25;
	context.strokeStyle = "red";
	context.stroke();
}

function doTimer() {
	restoreclock();
	element("#time").hidden = false;
	element("#speaker").hidden = false;
	element("#speaker").innerText = times[actual].text;
	element("#start").disabled = true;
	element("#time").innerText = secondstominutes(times[actual].time * 60);
	alarm = new Date().getTime() + times[actual].time * 1000 * 60;
    function instance() {
        if(new Date().getTime() >= alarm) { // If time passed
        	element("#time").hidden = true;
			element("#speaker").hidden = true;
        	element("#start").disabled = false;
        	actual++;
        } else {
        	drawclock(1 - Math.floor((alarm - new Date().getTime()) / 1000) / (times[actual].time * 60));
        	var time2 = alarm/1000 - (Math.round(new Date().getTime()/1000.0));
        	var time = secondstominutes(time2);
        	element("#time").innerText = time;
            var diff = (new Date().getTime()) % 1000;
            window.setTimeout(instance, (1000 - diff));
        }
    }
    window.setTimeout(instance, 1000);
}

function secondstominutes(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}

function init() {
	actual = 0;

	var canvas = element("#clock"),
		context = canvas.getContext("2d");

	restoreclock();

	element("#start").addEventListener("click", doTimer);
}

window.addEventListener("load", init);