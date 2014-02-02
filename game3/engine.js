
// Structs

function option(text, callback) {
	return {
		"text": text,
		"callback": callback
	};
}

function optionHandler(engine, text, callback) {
	return function() { 
		engine.appendLog(text);
		callback();
	};
}

function question(text, id) {
	return {
		"text": text,
		"id": id
	};
}

// Engine Class

function Engine(settings) {
    this.storageKey = settings.storageKey;
    this.storageVersion = settings.storageVersion;
    this.imgFolder = settings.imgFolder;
    this.sfxFolder = settings.sfxFolder;
    this.image = document.getElementById(settings.imageID);
    this.log = document.getElementById(settings.logID);
    this.options = document.getElementById(settings.optionsID);
    this.muted = false;
    this.mute = document.getElementById(settings.muteID);
    this.ambient = document.getElementById(settings.ambientID);
    this.audio = new Audio();
    this.kong = null;
    
    if (this.imgFolder === null) {
        this.imgFolder = "";
    }
    if (this.sfxFolder === null) {
        this.sfxFolder = "";
    }
    if (this.mute !== null) {
        this.mute.onclick = this.handler(onMute);
    }
    
    if (kongregateAPI !== null) {
		kongregateAPI.loadAPI(this.handler(onKongLoaded));
	}
}

Engine.prototype.handler = function(callback) {
    var engine = this;
    return function () {
        callback(engine);
    };
};

Engine.prototype.submitScore = function(name, value) {
	if (this.kong !== null) {
		this.kong.stats.submit(name, value);
	}
};

Engine.prototype.preloadImages = function(images) {
    for (var i = 0; i < images.length; i++) {
		var path = images[i];
		var img = new Image();
		img.src = this.imgFolder + path;
	}
};

Engine.prototype.setImage = function(path) {
    if (this.image === null) { return; }
	var fullPath = this.imgFolder + path;
	var image = $(this.image);
	image.fadeTo(1000, 0.0, function() {
		image.attr("src", fullPath);
		image.fadeTo(1000, 1.0);
	});
};

Engine.prototype.playSound = function(name) {
    var fullPath = this.sfxFolder + name + ".mp3";
    if (this.audio !== null) {
		this.audio.pause();
		this.audio.src = fullPath;
		this.audio.load();
		this.audio.play();
	} else if (!this.muted) {
        this.audio = new Audio(fullPath);
		this.audio.play();
    }
};

Engine.prototype.clearLog = function() {
    if (this.log === null) { return; }
	this.log.innerHTML = null;
};

Engine.prototype.appendLog = function(text) {
    if (this.log === null) { return; }
	var div = document.createElement("div");
	var hr = document.createElement("hr");
	div.innerHTML = text;
	this.log.appendChild(div);
	this.log.appendChild(hr);
};

Engine.prototype.scrollLog = function() {
    if (this.log === null) { return; }
	$(this.log).animate({scrollTop : this.log.scrollHeight}, "slow");
};

Engine.prototype.setOptions = function(options) {
    if (this.options === null) { return; }
	this.options.innerHTML = "";
	for (var i = 0; i < options.length; i++) {
		var button = document.createElement("input");
		button.name = "option";
		button.type = "button";
		button.value = options[i].text;
		button.onclick = optionHandler(this, options[i].text, options[i].callback);
		this.options.appendChild(button);
	}
};

Engine.prototype.setQuestions = function(questions, options) {
    if (this.options === null) { return; }
	this.options.innerHTML = "";
	for (var i = 0; i < questions.length; i++) {
        var label = document.createElement("label");
        //label.for = questions[i].id;
        label.innerHTML = questions[i].text;
        this.options.appendChild(label);
        
		var textField = document.createElement("input");
		textField.name = questions[i].id;
		textField.type = "text";
		textField.value = "";
		this.options.appendChild(textField);
	}
    for (var i = 0; i < options.length; i++) {
		var button = document.createElement("input");
		button.name = "option";
		button.type = "button";
		button.value = options[i].text;
		button.onclick = optionHandler(this, options[i].text, options[i].callback);
		this.options.appendChild(button);
	}
};

// Handlers

function onKongLoaded(engine) {
	engine.kong = kongregateAPI.getAPI();
	engine.submitScore("loaded", 1);
};

function onMute(engine) {
    engine.muted = !engine.muted;
    if (engine.audio !== null) {
        engine.audio.muted = engine.muted;
    }
    if (engine.ambient !== null) {
        engine.ambient.muted = engine.muted;
    }
    if (engine.mute !== null) {
        engine.mute.innerHTML = engine.muted ? "Unmute" : "Mute";
    }
};
