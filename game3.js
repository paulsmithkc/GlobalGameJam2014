
var TAU = 2.0 * Math.PI;
var ICONS_FOLDER = "icons/";
var STORAGE_VERSION = "0.1";
var STORAGE_KEY = "judgement";

var g_sound;
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
	g_sound = null;
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
	if (g_sound == null) { 
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
	playSound("narrator");
	clearLog();
	appendLog( 
		"Your eyes are open. The light is blinding you, but slowly becomes bearable. " +
        "Before you stands Zeus. He speaks, &#8220;There are three items in front of you: Fire, Earth, and Water. You must choose one.&quot; " +
        ""
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
		"&#8220;Since you choose fire, now I give you three more options, which will define your destiny.  You may help build the bridge with the rest of your village. Or you may seek out the oracle, to grow in knowledge. Or you may choose to become a warrior for the roman legion. &quot; "
	);
	appendSeperator();
	setOptions(false, [
		option("Build the bridge", onBuildBridge),
        option("Seek the Oracle", onSeekOracle),
        option("Become a warrior", onBecomeWarrior)
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
	"You gained experience building the bridge. Now, with your skills, you are ready for the next steps. " +
            "You can either try out the Olympics or you can be an apprentice at the Master of Crafts. "
    );
    appendSeperator();
    setOptions(false, [
            option("Master of Crafts", onMoc),
            option("Olympics", onOlympics)
    ]);
}

function onSeekOracle() {
	loadImage("oracle.svg");
	playSound("Oracle");
	appendLog( 
		"You seek out the oracle and spend many years with her. "
	);
	appendSeperator();
	setOptions(false, [
		option("Spread the word of Zeus as a missionary", onSpreadingWord),
                option("Seek out new lands in the name of Zeus", onFindingNewLand)
	]);
}

function onBecomeWarrior() {
	loadImage("warrior.svg");
	playSound("Warrior");
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
		playSound("Scouting");
        appendLog( 
                "You join the roman legion as a scout. "
        );
        appendSeperator();
        setOptions(false, [
                option("Become an explorer", onFindingNewLand),
                option("Try out for the olympic games", onOlympics)
        ]);
}

function onMoc() {
        loadImage("moc.svg");
		playSound("Semifinal");
        appendLog("CRAFTSMAN");
        appendSeperator();
        setTimeout(onArtist,3000);
}

function onOlympics() {
        loadImage("olympics.svg");
		playSound("Semifinal");
        appendLog("ATHLETE");
        appendSeperator();
        setTimeout(onAthlete,3000);
}

function onSpreadingWord() {
        loadImage("spreading_the_word.svg");
		playSound("Semifinal");
        appendLog("PRIEST");
        appendSeperator();
        setTimeout(onPriest,3000);
}

function onFindingNewLand() {
        loadImage("finding_new_land.svg");
		playSound("Semifinal");
        appendLog("EXPLORER");
        appendSeperator();
        setTimeout(onExplorer,3000);
}

function onProtector() {
        loadImage("protection_of_realm.svg");
		playSound("Semifinal");
        appendLog("PROTECTOR");
        appendSeperator();
        setTimeout(onGeneral,3000);
}

function onPirate() {
        loadImage("pirate.svg");
		playSound("Semifinal");
        appendLog("PIRATE");
        appendSeperator();
        setTimeout(onPrisoner,3000);
}

function onExplorer() {
    loadImage("explorer.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}

function onPrisoner() {
    loadImage("prisoner.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}

function onGeneral() {
    loadImage("general.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}
function onAthlete() {
    loadImage("athlete.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}
function onArtist() {
    loadImage("artist.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}
function onPriest() {
    loadImage("priest.svg");
    setOptions(false, [
            option("New Game", onNewGame)
    ]);
}
