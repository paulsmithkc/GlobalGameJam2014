
var ICONS_FOLDER = "icons/";

var g_sound;
var g_log;
var g_form;
var g_kong;
var g_muted;

function onLoad() {
	g_sound = null;
	g_log = document.getElementById("log");
	g_form = document.getElementById("form");
	g_kong = null;
    g_muted = false;

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

	if (kongregateAPI != null) {
		kongregateAPI.loadAPI(onKongLoaded);
	}

	onNewGame();
}

function onKongLoaded() {
	g_kong = kongregateAPI.getAPI();
	submitScore("loaded", 1);
}

function submitScore(name, value) {
	if (g_kong != null) {
		g_kong.stats.submit(name, value);
	}
}

function loadImage(path) {
	var fullPath = ICONS_FOLDER + path;
	var image = $("#image");
	image.fadeTo(1000, 0.0, function() {
		image.attr("src", fullPath);
		image.fadeTo(1000, 1.0);
	});
}

function onMute() {
    g_muted = !g_muted;
    var mute = document.getElementById("mute");
    mute.innerHTML = g_muted ? "Unmute" : "Mute"
    var ambient = document.getElementById("ambient");
    ambient.muted = g_muted;
    if (g_sound != null) { g_sound.muted = g_muted; }
}

function playSound(name) {
    if (g_muted) {
    } else if (g_sound == null) { 
		g_sound = new Audio("sfx/" + name + ".mp3");
		g_sound.play();
	} else {
		g_sound.pause();
		g_sound.src = "sfx/" + name + ".mp3"; 
		g_sound.load();
		g_sound.play();
	}
}

function clearLog() {
	g_log.innerHTML = null;
}

function appendLog(text) {
	var div = document.createElement("div");
	var hr = document.createElement("hr");
	div.innerHTML = text;
	g_log.appendChild(div);
	g_log.appendChild(hr);
}

function scrollLog() {
	$(g_log).animate({scrollTop : g_log.scrollHeight}, "slow");
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

// LAYER 0

function onNewGame() {
	loadImage("god.svg");
	playSound("Zeus");
	clearLog();
	appendLog( 
		"Your eyes are open. The light is blinding you, but slowly becomes bearable. " +
        "Before you stands Zeus. He speaks, &#8220;There are three items in front of you: Fire, Earth, and Water. You must choose one.&quot; " +
        ""
	);
	setOptions(false, [
		option("Choose Fire", onChooseFire), 
		option("Choose Earth", onChooseEarth),
		option("Choose Water", onChooseWater)
	]);
	scrollLog();
}

// LAYER 1

function onChooseFire() {
	loadImage("fire.svg");
	playSound("Fire");
	appendLog( 
		"&#8220;Since you choose fire, now I give you three more options, which will define your destiny.  You may help build the bridge with the rest of your village. Or you may seek out the oracle, to grow in knowledge. Or you may choose to become a warrior for the roman legion. &quot; "
	);
	setOptions(false, [
		option("Build the bridge", onBuildBridge),
        option("Seek the Oracle", onSeekOracle),
        option("Become a warrior", onBecomeWarrior)
	]);
	scrollLog();
}

function onChooseEarth() {
        loadImage("rock.svg");
		playSound("Rock");
        appendLog( 
                "&#8220;When you return you will need to make another choice. " +
                "You may help build the bridge with the rest of your village. " +
                "Or you may seek to become a scout for the roman legion. " +
                "Or you may seek to become a warrior for the roman legion. &quot; "
        );
        setOptions(false, [
                option("Help the town finish the bridge", onBuildBridge),
                option("Become a scout for the roman legion", onBecomeScout),
                option("Become a warrior the roman legion", onBecomeWarrior)
        ]);
	scrollLog();
}

function onChooseWater() {
	loadImage("water.svg");
	playSound("Water");
	appendLog( 
		"&#8220;When you return you will need to make another choice. " +
		"You may help build the bridge with the rest of your village. " +
		"Or you may seek to become a scout for the roman legion. " +
		"Or you may seek out the oracle, to learn from her. &quot; "
	);
	setOptions(false, [
		option("Help the town finish the bridge", onBuildBridge),
		option("Seek out the oracle", onSeekOracle),
		option("Become a scout for the roman legion", onBecomeScout)
	]);
	scrollLog();
}

// LAYER 2

function onBuildBridge() {
	loadImage("building_a_bridge.svg");
    playSound("Bridge");
	appendLog( 
	"You gained experience building the bridge. Now, with your skills, you are ready for the next steps. " +
            "You can either try out the Olympics or you can be an apprentice at the Master of Crafts. "
    );
    setOptions(false, [
            option("Master of Crafts", onMoc),
            option("Olympics", onOlympics)
    ]);
	scrollLog();
}

function onSeekOracle() {
	loadImage("oracle.svg");
	playSound("Oracle");
	appendLog( 
		"You seek out the oracle and spend many years with her. "
	);
	setOptions(false, [
		option("Spread the word of Zeus as a missionary", onSpreadingWord),
                option("Seek out new lands in the name of Zeus", onFindingNewLand)
	]);
	scrollLog();
}

function onBecomeWarrior() {
	loadImage("warrior.svg");
	playSound("Warrior");
	appendLog( 
		"You join the roman legion as a warrior, and fight in many battles. "
	);
	setOptions(false, [
		option("Become a protector of the realm", onProtector),
		option("Become a pirate", onPirate)
	]);
	scrollLog();
}

function onBecomeScout() {
        loadImage("scouting.svg");
	playSound("Scouting");
        appendLog( 
                "You join the roman legion as a scout. "
        );
	scrollLog();
        setOptions(false, [
                option("Become an explorer", onFindingNewLand),
                option("Try out for the olympic games", onOlympics)
        ]);
}

// LAYER 3

function onMoc() {
        loadImage("moc.svg");
	playSound("Semifinal");
        appendLog("CRAFTSMAN");
	scrollLog();
	setOptions(false, []);
        setTimeout(onArtist,3000);
}

function onOlympics() {
        loadImage("olympics.svg");
	playSound("Semifinal");
        appendLog("ATHLETE");
	scrollLog();
	setOptions(false, []);
        setTimeout(onAthlete,3000);
}

function onSpreadingWord() {
        loadImage("spreading_the_word.svg");
	playSound("Semifinal");
        appendLog("PRIEST");
	scrollLog();
	setOptions(false, []);
        setTimeout(onPriest,3000);
}

function onFindingNewLand() {
        loadImage("finding_new_land.svg");
	playSound("Semifinal");
        appendLog("EXPLORER");
	scrollLog();
	setOptions(false, []);
        setTimeout(onExplorer,3000);
}

function onProtector() {
        loadImage("protection_of_realm.svg");
	playSound("Semifinal");
        appendLog("PROTECTOR");
	scrollLog();
	setOptions(false, []);
        setTimeout(onGeneral,3000);
}

function onPirate() {
        loadImage("pirate.svg");
	playSound("Semifinal");
        appendLog("PIRATE");
	scrollLog();
	setOptions(false, []);
        setTimeout(onPrisoner,3000);
}

// LAYER 4

function onExplorer() {
    loadImage("explorer.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("explorer", 1);
}

function onPrisoner() {
    loadImage("prisoner.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("prisoner", 1);
}

function onGeneral() {
    loadImage("general.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("general", 1);
}
function onAthlete() {
    loadImage("athlete.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("athlete", 1);
}
function onArtist() {
    loadImage("artist.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("artist", 1);
}
function onPriest() {
    loadImage("priest.svg");
	playSound("Final");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
	submitScore("priest", 1);
}

