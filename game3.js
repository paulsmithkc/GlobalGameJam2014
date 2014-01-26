
var TAU = 2.0 * Math.PI;

var g_image;
var g_log;
var g_form;
//var g_canvas;
//var g_time;

var g_prevPlaythrough;
var g_curPlayThrough;

function playthrough(element) {
	return { 
		"element" : element
	};
}

function onLoad() {
	g_image = document.getElementById("image");
	g_log = document.getElementById("log");
	g_form = document.getElementById("form");

	var prevElement = null;
	switch (Math.floor(Math.random() * 3.0)) {
	case 0.0:
		prevElement = "Fire"
		break;
	case 1.0:
		prevElement = "Water"
		break;
	case 2.0:
	default:
		prevElement = "Earth"
		break;
	}
	g_prevPlaythrough = playthrough(prevElement);
	g_curPlaythrough = playthrough(prevElement);

	//g_canvas = document.getElementById("canvas");
	//g_time = 0.0;
	//requestAnimationFrame(animate);
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
	var hr = document.createElement("hr");
	g_log.appendChild(hr);
	g_log.scrollTop = g_log.scrollHeight;
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
		var optionField = document.createElement("input");
		optionField.name = "option";
		optionField.type = "button";
		optionField.value = options[i].text;
		optionField.onclick = optionHandler(options[i].text, options[i].callback);
		g_form.appendChild(optionField);
	}
}

function onNewGame() {
	g_prevPlaythrough.element = g_curPlaythrough.element;
	g_image.src = "icons/god.svg";	
	clearLog();
	appendLog( 
		"Your eyes open. The light blinds your eyes, but slowly becomes bearable. " +
		"Before you stands Zeus. &quot;Before you stand three items: Fire, Earth, and Water. " +
		"You must choose one of these.&quot; "
	);
	appendSeperator();
	switch (g_prevPlaythrough.element) {
	case "Fire":
		setOptions(false, [
			option("Choose Earth", onChooseEarth),
			option("Choose Water", onChooseWater)
		]);
		break;
	case "Water":
		setOptions(false, [
			option("Choose Fire", onChooseFire), 
			option("Choose Earth", onChooseEarth)
		]);
		break;
	case "Earth":
	default:
		setOptions(false, [
			option("Choose Fire", onChooseFire), 
			option("Choose Water", onChooseWater)
		]);
		break;
	}
}

function onChooseFire() {
	g_curPlaythrough.element = "Fire";
	g_image.src = "icons/fire.svg";
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
	g_curPlaythrough.element = "Earth";
	g_image.src = "icons/rock.svg";
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
	g_curPlaythrough.element = "Water";
	g_image.src = "icons/water.svg";
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
	g_image.src = "icons/building_a_bridge.svg";
	appendLog( 
		"You enjoyed helping the village with the bridge."
	);
	appendSeperator();
	setOptions(false, [
		option("Seek out a craftsman to learn the art of stonework", onCraftsman),
		option("Try out for the olympic games", onAthlete)
	]);
}

function onSeekOracle() {
	g_image.src = "icons/oracle.svg";
	appendLog( 
		"You seek out the oracle and spend many years with her. "
	);
	appendSeperator();
	setOptions(false, [
		option("Spread the word of Zeus as a missionary", onPriest),
		option("Seek out new lands in the name of Zeus", onExplorer)
	]);
}

function onBecomeWarrior() {
	g_image.src = "icons/warrior.svg";
	appendLog( 
		"You join the roman legion as a warrior, and fight in many battles. "
	);
	appendSeperator();
	setOptions(false, [
		option("Become a protector of the realm", onProtector),
		option("Become a pirate", onPirate)
	]);
}

function onBecomeScout() {
	g_image.src = "icons/scouting.svg";
	appendLog( 
		"You join the roman legion as a scout. "
	);
	appendSeperator();
	setOptions(false, [
		option("Become an explorer", onExplorer),
		option("Try out for the olympic games", onAthlete)
	]);
}

function onCraftsman() {
	g_image.src = "icons/moc.svg";
	appendLog("CRAFTSMAN");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onAthlete() {
	g_image.src = "icons/athlete.svg";
	appendLog("ATHLETE");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onPriest() {
	g_image.src = "icons/priest.svg";
	appendLog("PRIEST");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onExplorer() {
	g_image.src = "icons/explorer.svg";
	appendLog("EXPLORER");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onProtector() {
	g_image.src = "icons/protection_of_realm.svg";
	appendLog("PROTECTOR");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onPirate() {
	g_image.src = "icons/pirate.svg";
	appendLog("PIRATE");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

