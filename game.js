
var g_form = null;
var g_prevRequest = "";
var g_prevSmote = false;
var g_youSmote = false;

function option(text, callback) {
	return {
		"text": text,
		"callback": callback
	};
}

function onNewGame() {
	g_prevSmote = g_youSmote;
	loadState(null, 
		"You are zeus. A mortal stands before you. He says to you: <br/><br/>" +
		g_prevRequest +
		"<br/><br/>Will you smite him?", [
		option("Yes, smite this foul creature.", onSmite), 
		option("No, spare the fool.", onSpare)
	], false);
}

function onSmite() {
	g_youSmote = true;
	loadState(null, "You are a mortal. You stand before Zeus. What is your request?", [
		option("Request", onResult)
	], true);
}

function onSpare() {
	g_youSmote = false;
	loadState(null, "You are a mortal. You stand before Zeus. What is your request?", [
		option("Request", onResult)
	], true);
}

function onResult() {
	g_prevRequest = g_form.elements["response"].value;
	if (g_prevRequest == null || g_prevRequest == "") {
		g_prevRequest = "nothing";
	}

	if (g_youSmote && g_prevSmote) {
		loadState(null, "You and the previous player both smote their mortal.", [
			option("New Game", onNewGame)
		], false);
	} else if (!g_youSmote && !g_prevSmote) {
		loadState(null, "You and the previous player both spared the mortal.", [
			option("New Game", onNewGame)
		], false);
	} else if (g_youSmote && !g_prevSmote) {
		loadState(null, "The previous player spared the mortal, you are evil.", [
			option("New Game", onNewGame)
		], false);
	} else if (!g_youSmote && g_prevSmote) {
		loadState(null, "The previous player smote their mortal, you are kind.", [
			option("New Game", onNewGame)
		], false);
	}
}

function onLoad(form) {
	g_form = form;
	g_prevRequest = "Hail mighty zeus. I seek your blessing.";
	g_prevSmote = false;
	g_youSmote = false;
	onNewGame();
}

function loadState(image, prompt, options, requireResponse) {
	g_form.innerHTML = "";

	//var imageField = document.createElement("img");
	//form.appendChild(imageField);

	var promptField = document.createElement("div");
	promptField.innerHTML = prompt;
	g_form.appendChild(promptField);

	if (requireResponse) {
		var textField = document.createElement("input");
		textField.name = "response";
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
		//optionField.style = "width: 100%";
		optionField.onclick = options[i].callback;
		g_form.appendChild(optionField);
	}
}

