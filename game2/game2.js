
var g_log;
var g_form;

var g_prevSmote;
var g_youSmote;

function onLoad(form) {
	g_log = document.getElementById("log");
	g_form = form;
	g_prevRequest = "Hail mighty zeus. I seek your blessing.";
	g_prevSmote = false;
	g_youSmote = false;
	onNewGame();
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
	var div = document.createElement("div");
	div.innerHTML = "-----------------------------";
	g_log.appendChild(div);
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
	g_prevSmote = g_youSmote;
	clearLog();
	appendLog( 
		"You are zeus. A mortal stands before you. He says to you: <br/><br/>&quot;" +
		g_prevRequest +
		"&quot;<br/><br/>Will you smite him?"
	);
	appendSeperator();
	setOptions(false, [
		option("Yes, smite this foul creature.", onSmite), 
		option("No, spare the fool.", onSpare)
	]);
}

function onSmite() {
	g_youSmote = true;
	appendLog("You are a mortal. You stand before Zeus. What is your request?");
	appendSeperator();
	setOptions(true, [
		option("Make Request", onResult)
	]);
}

function onSpare() {
	g_youSmote = false;
	appendLog("You are a mortal. You stand before Zeus. What is your request?");
	appendSeperator();
	setOptions(true, [
		option("Make Request", onResult)
	]);
}

function onResult() {
	g_prevRequest = g_form.elements["text"].value;
	if (g_prevRequest == null || g_prevRequest == "") {
		g_prevRequest = "nothing";
	}

	if (g_youSmote && g_prevSmote) {
		appendLog("You and the previous player both smote their mortal.");
	} else if (!g_youSmote && !g_prevSmote) {
		appendLog("You and the previous player both spared the mortal.");
	} else if (g_youSmote && !g_prevSmote) {
		appendLog("The previous player spared the mortal, you are evil.");
	} else if (!g_youSmote && g_prevSmote) {
		appendLog("The previous player smote their mortal, you are kind.");
	}

	appendSeperator();
	setOptions(false, [
		option("New Game", onNewGame)
	]);
}

