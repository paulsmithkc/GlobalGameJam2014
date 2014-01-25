
var TAU = 2.0 * Math.PI;

var g_canvas;
var g_log;
var g_form;
var g_time;

function onLoad() {
	g_canvas = document.getElementById("canvas");
	g_log = document.getElementById("log");
	g_form = document.getElementById("form");
	g_time = 0.0;
	requestAnimationFrame(animate);
	onNewGame();
}

function animate() {
	var context = canvas.getContext("2d");
	g_time += (1.0 / 60.0);

	context.clearRect(0.0, 0.0, canvas.width, canvas.height);
	context.fillStyle = "#FFFFFF";
	context.beginPath();
	context.arc(
		0.5 * canvas.width + 20.0 * Math.cos(g_time * TAU), 
		0.5 * canvas.height + 20.0 * Math.sin(g_time * TAU), 
		20.0, 
		0.0, 
		2.0 * Math.PI
	);
	context.closePath();
	context.fill();

	requestAnimationFrame(animate);
}

function clearLog() {
	g_log.innerHTML = null;
}

function appendLog(text) {
	var div = document.createElement("div");
	div.innerHTML = text;
	g_log.appendChild(div);
	g_log.scrollTop = g_log.scrollHeight;
}

function appendSeperator() {
	appendLog("-----------------------------");
}

function option(text, callback) {
	return {
		"text": text,
		"callback": callback
	};
}

function optionHandler(text, callback) {
	return function() { 
		appendLog(text);
		appendSeperator();
		callback();
	};
}

function setOptions(allowText, options) {
	g_form.innerHTML = "";

	if (allowText) {
		var textField = document.createElement("input");
		textField.name = "text";
		textField.type = "text";
		textField.value = "";
		g_form.appendChild(textField);
	}

	for (var i = 0; i < options.length; i++) {
		g_form.appendChild(document.createElement("br"));

		var optionField = document.createElement("input");
		optionField.name = "option";
		optionField.type = "button";
		optionField.value = options[i].text;
		optionField.onclick = optionHandler(options[i].text, options[i].callback);
		g_form.appendChild(optionField);
	}
}

function onNewGame() {
	clearLog();
	appendLog( 
		"You find yourself in the forest. Your stomach growls, reminding you of how " +
		"long it has been since your last meal. You spot a deer in the woods ahead."
	);
	appendSeperator();
	setOptions(false, [
		option("Hunt the deer with your bow.", onHuntDeer), 
		option("Keep on going, there is bound to be a village nearby.", onSkipDeer)
	]);
}

function onHuntDeer() {
	appendLog(
		"You track the deer for several yards. You finding it grazing among the trees. " +
		"You arrow hits the deer in the rear quarters and runs away."
	);
	appendSeperator();
	setOptions(false, [
		option("Find your way back to the trail.", onFindWater)
	]);
}

function onSkipDeer() {
	appendLog(
		"A snake slithers across the trail."
	);
	appendSeperator();
	setOptions(false, [
		option("Leave the snake alone.", onFindWater),
		option("Try to capture the snake and take some of its venom.", onCatchSnake)
	]);
}

function onCatchSnake() {
	// FIXME
}

function onFindWater() {
	appendLog(
		"You come accross an old shack. Inside the old shack you find a barrel of water. " +
		"Your lips are parched."
	);
	appendSeperator();
	setOptions(false, [
		option("Drink the water.", onDrinkWater),
		option("Drip some venom into the barrel.", onPoisonWater),
		option("Leave it alone.", onFindVillage)
	]);
}

function onDrinkWater() {
	// FIXME
}

function onPoisonWater() {
	// FIXME
}

function onFindVillage() {
	appendLog(
		"You finally come accross a village. They give you cold stares as you approach. " +
		"When you get closer, one of them asks why you are here."
	);
	appendSeperator();
	setOptions(false, [
		option("I will murder you all!", onMurderVillage),
		option("I'm just looking for shelter.", onEnterVillage),
		option("I'm just passing through.", onLeaveVillage)
	]);
}

function onMurderVillage() {
	// FIXME
}

function onEnterVillage() {
	// FIXME
}

function onLeaveVillage() {
	// FIXME
}

