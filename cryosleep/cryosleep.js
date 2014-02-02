
var gEngine = null;

function onLoad() {
    gEngine = new Engine({
        "storageKey" : "cryosleep",
        "storageVersion" : "0.1",
        "imgFolder" : "img/",
        "sfxFolder" : "sfx/",
        "imageID" : "image",
        "logID" : "log",
        "optionsID" : "form",
        "muteID" : "mute",
        "ambientID" : "ambient"
    });
    
    if (!gEngine.loadData()) {
		gEngine.data = {
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
            "pod_why" : ""
		};
	}
    
    onNewGame();
}

function onNewGame() {
	gEngine.saveData();

	var prompt = 
		"Your eyes open and adjust to the light. " +
		"Your cryosleep chamber has been activated. ";
	var options = [];
	if (gEngine.data.wakeup === null) {
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

	gEngine.clearLog();
	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
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

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onCryosleepWho() {
	var prompt = "";
	if (gEngine.data.wakeup == "kill") {
		gEngine.data.wakeup = null;
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
			gEngine.data.wakeup_who != "" ?
			gEngine.data.wakeup_who : 
			"They stare out you silently.";
	}
	gEngine.appendLog(prompt);
	gEngine.scrollLog();
}

function onCryosleepWhat() {
	var prompt = "";
	if (gEngine.data.wakeup == "kill") {
		gEngine.data.wakeup = null;
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
			gEngine.data.wakeup_what != "" ?
			gEngine.data.wakeup_what : 
			"They stare out you silently.";
	}
	gEngine.appendLog(prompt);
	gEngine.scrollLog();
}

function onCryosleepWhy() {
	var prompt = "";
	if (gEngine.data.wakeup == "kill") {
		gEngine.data.wakeup = null;
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
			gEngine.data.wakeup_why != "" ?
			gEngine.data.wakeup_why : 
			"They stare out you silently.";
	}
	gEngine.appendLog(prompt);
	gEngine.scrollLog();
}

function onCryosleepKill() {
	gEngine.data.wakeup = null;
	gEngine.saveData();

	var prompt = 
		"You quickly grab them by them around the neck and choke the life out of them.";
	var options = [
        option("Head to the engine room", onEngine),
        option("Head to the sickbay", onSickbay),
        option("Head for an escape pod", onPod)
	];

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onCryosleepSpare() {
	var prompt = "";
	if (gEngine.data.wakeup == "kill") {
		gEngine.data.wakeup = null;
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
		gEngine.data.wakeup = null;
		gEngine.saveData();
		prompt = 
			"Without a second thought, they head off towards the escape pods.";
		var options = [
            option("Head to the engine room", onEngine),
            option("Head to the sickbay", onSickbay),
            option("Head for an escape pod", onPod)
		];
	}

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onWakeupOthers() {
	var prompt = 
		"You fuddle around with the controls and manage to open one of the chambers. ";
	var options = [
        option("Talk to them", onWakeupOthersTalk),
        option("Kill them", onWakeupOthersKill)
	];

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onWakeupOthersTalk() {
    var questions = [
        question("Who are you?", "who"),
        question("What is happening?", "what"),
        question("Why did you wake me up?", "why")
	];
	var options = [
        option("Confirm", onWakeupOthersTalk2)
	];

	gEngine.scrollLog();
	gEngine.setQuestions(questions, options);
}

function onWakeupOthersTalk2() {
	// FIXME: ask for who, what, why
	gEngine.data.wakeup = "talk";
	gEngine.data.wakeup_who = gEngine.options.elements["who"].value;
	gEngine.data.wakeup_what = gEngine.options.elements["what"].value;
	gEngine.data.wakeup_why = gEngine.options.elements["why"].value;
	gEngine.saveData();

	var prompt = 
		"To be continued... ";
	var options = [
        option("New Game", onNewGame)
	];

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onWakeupOthersKill() {
	gEngine.data.wakeup = "kill";
	gEngine.saveData();

	var prompt = 
		"You grab a sharp piece of metal and get ready to stab them. " +
		"<br/><br/>To be continued... ";
	var options = [
        option("New Game", onNewGame)
	];

	gEngine.appendLog(prompt);
	gEngine.scrollLog();
	gEngine.setOptions(options);
}

function onEngine() {
}

function onSickbay() {
}

function onPod() {
}
