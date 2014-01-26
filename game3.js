
var TAU = 2.0 * Math.PI;
var ICONS_FOLDER = "icons/";
var STORAGE_VERSION = "0.1";
var STORAGE_KEY = "judgement";

var g_log;
var g_form;

var g_prevPlaythrough;
var g_curPlayThrough;

function playthrough(element) {
	return { 
		"element" : element
	};
}

function supportsLocalStorage()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function loadData()
{
    if (!supportsLocalStorage()) return false;
    try
    {
        var storage = window.localStorage;
        var storedData = JSON.parse(storage.getItem(STORAGE_KEY));
        if (storedData == null || storedData.version != STORAGE_VERSION) { return false; }
        g_curPlaythrough = storedData.playthrough;
        return true;
    }
    catch (e)
    {
        return false;
    }
}

function saveData()
{
    if (!supportsLocalStorage()) return false;
    try
    {
        var storage = window.localStorage;
        var storedData = {
            'version': STORAGE_VERSION,
            'playthrough': g_curPlaythrough
        };
        storage.setItem(STORAGE_KEY, JSON.stringify(storedData));
        return true;
    }
    catch (e)
    {
        return false;
    }
}

function onLoad() {
	g_log = document.getElementById("log");
	g_form = document.getElementById("form");

	var images = [
		"artist.svg",
		"athlete.svg",
		"building_a_bridge.svg",
		"explorer.svg",
		"finding_new_land.svg",
		"fire.svg",
		"general.svg",
		"god.svg",
		"moc.svg",
		"olympics.svg",
		"oracle.svg",
		"pirate.svg",
		"priest.svg",
		"prisoner.svg",
		"protection_of_realm.svg",
		"rock.svg",
		"scouting.svg",
		"spreading_the_word.svg",
		"warrior.svg",
		"water.svg"
	];
	for (var i = 0; i < images.length; i++) {
		var path = images[i];
		var img = new Image();
		img.src = ICONS_FOLDER + path;
	}

	if (!loadData()) {
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
		g_curPlaythrough = playthrough(prevElement);
	}

	onNewGame();
}

function loadImage(path) {
	var fullPath = ICONS_FOLDER + path;
	var image = $("#image");
	image.fadeTo(1000, 0.0, function() {
		image.attr("src", fullPath);
		image.fadeTo(1000, 1.0);
	});
}

function playSound(name) {
	var player = document.getElementById("sfx-player");
	player.src = name + ".mp3";
	//player.src = name + ".ogg";
	player.load();
	player.play();
}

function clearLog() {
	g_log.innerHTML = null;
}

function appendLog(text) {
	var div = document.createElement("div");
	div.innerHTML = text;
	g_log.appendChild(div);
}

function appendSeperator() {
	var hr = document.createElement("hr");
	g_log.appendChild(hr);
	$(g_log).animate({scrollTop : g_log.scrollHeight});
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
	g_prevPlaythrough = JSON.parse(JSON.stringify(g_curPlaythrough))
	saveData();

	loadImage("god.svg");
	clearLog();
	appendLog( 
		"Your eyes open. The light blinds your eyes, but slowly becomes bearable. " +
		"Before you stands Zeus. &#8220;Before you stand three items: Fire, Earth, and Water. " +
		"You must choose one of these.&quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Choose Fire", onChooseFire), 
		option("Choose Earth", onChooseEarth),
		option("Choose Water", onChooseWater)
	]);
}

function onChooseFire() {
	g_curPlaythrough.element = "Fire";
	loadImage("fire.svg");
	playSound("Fire");
	appendLog( 
		"&#8220;When you return you will need to make another choice. " +
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
	loadImage("rock.svg");
	playSound("Rock");
	appendLog( 
		"&#8220;When you return you will need to make another choice. " +
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
	loadImage("water.svg");
	playSound("Water");
	appendLog( 
		"&#8220;When you return you will need to make another choice. " +
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
	loadImage("building_a_bridge.svg");
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
	loadImage("oracle.svg");
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
	loadImage("warrior.svg");
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
	loadImage("scouting.svg");
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
	loadImage("moc.svg");
	appendLog("CRAFTSMAN");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onAthlete() {
	loadImage("athlete.svg");
	appendLog("ATHLETE");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onPriest() {
	loadImage("priest.svg");
	appendLog("PRIEST");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onExplorer() {
	loadImage("explorer.svg");
	appendLog("EXPLORER");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onProtector() {
	loadImage("protection_of_realm.svg");
	appendLog("PROTECTOR");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

function onPirate() {
	loadImage("pirate.svg");
	appendLog("PIRATE");
	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

