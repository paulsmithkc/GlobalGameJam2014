
var TAU = 2.0 * Math.PI;
var ICONS_FOLDER = "icons/";
var STORAGE_VERSION = "0.1";
var STORAGE_KEY = "cryosleep";

var g_log;
var g_form;
var g_playthrough;

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
        g_playthrough = storedData.playthrough;
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
            'playthrough': g_playthrough
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

	if (!loadData()) {
		g_playthrough = {
		"wakeup" : null,
		"wakeup_who" : "",
		"wakeup_what" : "",
		"wakeup_why" : "",
		"engine" : null,
		"engine_who" : "",
		"engine_what" : "",
		"engine_why" : "",
		"sickbay" : null,
		"sickbay_who" : "",
		"sickbay_what" : "",
		"sickbay_why" : "",
		"pod" : null,
		"pod_who" : "",
		"pod_what" : "",
		"pod_why" : "",
		};
	}

	onNewGame();
}

function loadImage(path) {
	var fullPath = ICONS_FOLDER + path;
	var image = $("#image");
	image.fadeTo("1s", 0.0, function() {
		image.attr("src", fullPath);
		image.fadeTo("1s", 1.0);
	});
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
	saveData();

	var prompt = 
		"Your eyes open and adjust to the light. " +
		"Your cryosleep chamber has been activated. ";
	var options = [];
	if (g_playthrough.wakeup == null) {
		options = [
		option("Survey the room", onCryosleepSurvey),
		option("Head to the engine room", onEngine),
		option("Head to the sickbay", onSickbay),
		option("Head for an escape pod", onPod)
		];
	} else {
		prompt += "You see somebody else in the room.";
		options = [
		option("Who are you?", onCryosleepWho),
		option("What is going on?", onCryosleepWhat),
		option("Why did you wake me up?", onCryosleepWhy),
		option("Kill them", onCryosleepKill),
		option("Tell them to head for an escape pod", onCryosleepSpare)
		];
	}

	clearLog();
	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onCryosleepSurvey() {
	var prompt = 
		"The room is full of crysleep chambers. Several of the chambers have been opened. " +
		"Looks like you aren't the first one wake up. " +
		"However, several of your crewmates still haven't been awoken.";
	var options = [
	option("Try to wake them up", onWakeupOthers),
	option("Head to the engine room", onEngine),
	option("Head to the sickbay", onSickbay),
	option("Head for an escape pod", onPod)
	];

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onCryosleepWho() {
	var prompt = "";
	if (g_playthrough.wakeup == "kill") {
		g_playthrough.wakeup = null;
		saveData();
		prompt = 
			"They grab a sharp piece of metal and stab you. " +
			"As you bleed out, they run away." + 
			"<br/><br/>GAME OVER";
		var options = [
		option("New Game", onNewGame)
		];
		setOptions(false, options);
	} else {
		prompt = 
			g_playthrough.wakeup_who != "" ?
			g_playthrough.wakeup_who : 
			"They stare out you silently.";
	}
	appendLog(prompt);
	appendSeperator();
}

function onCryosleepWhat() {
	var prompt = "";
	if (g_playthrough.wakeup == "kill") {
		g_playthrough.wakeup = null;
		saveData();
		prompt = 
			"They grab a sharp piece of metal and stab you. " +
			"As you bleed out, they run away." + 
			"<br/><br/>GAME OVER";
		var options = [
		option("New Game", onNewGame)
		];
		setOptions(false, options);
	} else {
		prompt = 
			g_playthrough.wakeup_what != "" ?
			g_playthrough.wakeup_what : 
			"They stare out you silently.";
	}
	appendLog(prompt);
	appendSeperator();
}

function onCryosleepWhy() {
	var prompt = "";
	if (g_playthrough.wakeup == "kill") {
		g_playthrough.wakeup = null;
		saveData();
		prompt = 
			"They grab a sharp piece of metal and stab you. " +
			"As you bleed out, they run away." + 
			"<br/><br/>GAME OVER";
		var options = [
		option("New Game", onNewGame)
		];
		setOptions(false, options);
	} else {
		prompt = 
			g_playthrough.wakeup_why != "" ?
			g_playthrough.wakeup_why : 
			"They stare out you silently.";
	}
	appendLog(prompt);
	appendSeperator();
}

function onCryosleepKill() {
	g_playthrough.wakeup = null;
	saveData();

	var prompt = 
		"You quickly grab them by them around the neck and choke the life out of them.";
	var options = [
	option("Head to the engine room", onEngine),
	option("Head to the sickbay", onSickbay),
	option("Head for an escape pod", onPod)
	];

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onCryosleepSpare() {
	var prompt = "";
	if (g_playthrough.wakeup == "kill") {
		g_playthrough.wakeup = null;
		saveData();
		prompt = 
			"They grab a sharp piece of metal and stab you. " +
			"As you bleed out, they run away." + 
			"<br/><br/>GAME OVER";
		var options = [
		option("New Game", onNewGame)
		];
		setOptions(false, options);
	} else {
		g_playthrough.wakeup = null;
		saveData();
		prompt = 
			"Without a second thought, they head off towards the escape pods.";
		var options = [
		option("Head to the engine room", onEngine),
		option("Head to the sickbay", onSickbay),
		option("Head for an escape pod", onPod)
		];
	}

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onEngine() {
}

function onSickbay() {
}

function onPod() {
}

function onWakeupOthers() {
	var prompt = 
		"You fuddle around with the controls and manage to open one of the chambers. ";
	var options = [
	option("Talk to them", onWakeupOthersTalk),
	option("Kill them", onWakeupOthersKill)
	];

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onWakeupOthersTalk() {
	// FIXME: ask for who, what, why
	g_playthrough.wakeup = "talk";
	g_playthrough.wakeup_who = "";
	g_playthrough.wakeup_what = "";
	g_playthrough.wakeup_why = "";
	saveData();

	var prompt = 
		"Who are you? What is happening? Why did you wake me up? " +
		"<br/><br/>To be continued... ";
	var options = [
	option("New Game", onNewGame)
	];

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}

function onWakeupOthersKill() {
	g_playthrough.wakeup = "kill";
	saveData();

	var prompt = 
		"You grab a sharp piece of metal and get ready to stab them. " +
		"<br/><br/>To be continued... ";
	var options = [
	option("New Game", onNewGame)
	];

	appendLog(prompt);
	appendSeperator();
	setOptions(false, options);
}
