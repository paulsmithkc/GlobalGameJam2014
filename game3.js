
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
	//g_time += (1.0 / 60.0);

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
		"Your eyes open. The light blinds your eyes, but slowly becomes bearable. " +
		"Before you stands Zeus. &quot;Before you stand three items: Fire, Earth, and Water. " +
		"You must choose one of these.&quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Choose Fire", onChooseFire), 
		option("Choose Earth", onChooseEarth),
		option("Choose Water", onChooseWater),
		//option("Defy Zeus", onDefyZeus),
	]);
}

function onChooseFire() {
	appendLog( 
		"&quot;When you return you will need to make another choice. " +
		"You may help build the bridge with the rest of your village. " +
		"Or you may seek out the oracle, to learn from her. " +
		"Or you may seek to become a warrior for the roman legion. &quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Help the town finish the bridge", onBuildBridge),
		option("Seek out the oracle", onSeekOracle),
		option("Become a warrior the roman legion", onBecomeWarrior)
	]);
}

function onChooseEarth() {
	appendLog( 
		"&quot;When you return you will need to make another choice. " +
		"You may help build the bridge with the rest of your village. " +
		"Or you may seek to become a scout for the roman legion. " +
		"Or you may seek to become a warrior for the roman legion. &quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Help the town finish the bridge", onBuildBridge),
		option("Become a scout for the roman legion", onBecomeScout),
		option("Become a warrior the roman legion", onBecomeWarrior)
	]);
}

function onChooseWater() {
	appendLog( 
		"&quot;When you return you will need to make another choice. " +
		"You may help build the bridge with the rest of your village. " +
		"Or you may seek to become a scout for the roman legion. " +
		"Or you may seek out the oracle, to learn from her. &quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Help the town finish the bridge", onBuildBridge),
		option("Seek out the oracle", onSeekOracle),
		option("Become a scout for the roman legion", onBecomeScout)
	]);
}

function onBuildBridge() {
	appendLog( 
		"You enjoyed helping the village with the bridge."
	);
	appendSeperator();
	setOptions(false, [
		option("Seek out a craftsman to learn the art of stonework", onSeekCraftsman),
		option("Try out for the olympic games", onJoinOlympicGames)
	]);
}

function onSeekOracle() {
	appendLog( 
		"You seek out the oracle and spent many years with her. "
	);
	appendSeperator();
	setOptions(false, [
		option("Spread the word of Zeus as a missionary", onPriest),
		option("Seek out new lands in the name of Zeus", onExplorer)
	]);
}

function onBecomeWarrior() {
}

function onBecomeScout() {
}

function onSeekCraftsman() {
}

function onJoinOlympicGames() {
}

function onPriest() {
}

function onExplorer() {
}


