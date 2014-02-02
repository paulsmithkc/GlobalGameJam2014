
var gEngine = null;

function onLoad() {
    gEngine = new Engine({
        "storageKey" : "judgment",
        "storageVersion" : "0.1",
        "imgFolder" : "icons/",
        "sfxFolder" : "sfx/",
        "imageID" : "image",
        "logID" : "log",
        "optionsID" : "form",
        "muteID" : "mute",
        "ambientID" : "ambient"
    });
    gEngine.preloadImages([
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
	]);
    onNewGame();
}

// LAYER 0

function onNewGame() {
	gEngine.setImage("god.svg");
	gEngine.playSound("Zeus");
	gEngine.clearLog();
	gEngine.appendLog( 
		"Your eyes are open. The light is blinding you, but slowly becomes bearable. " +
        "Before you stands Zeus. He speaks, &#8220;There are three items in front of you: Fire, Earth, and Water. You must choose one.&quot; " +
        ""
	);
	gEngine.setOptions([
		option("Choose Fire", onChooseFire), 
		option("Choose Earth", onChooseEarth),
		option("Choose Water", onChooseWater)
	]);
	gEngine.scrollLog();
}

// LAYER 1

function onChooseFire() {
	gEngine.setImage("fire.svg");
	gEngine.playSound("Fire");
	gEngine.appendLog( 
		"&#8220;Since you choose fire, now I give you three more options, which will define your destiny.  You may help build the bridge with the rest of your village. Or you may seek out the oracle, to grow in knowledge. Or you may choose to become a warrior for the roman legion. &quot; "
	);
	gEngine.setOptions([
		option("Build the bridge", onBuildBridge),
        option("Seek the Oracle", onSeekOracle),
        option("Become a warrior", onBecomeWarrior)
	]);
	gEngine.scrollLog();
}

function onChooseEarth() {
    gEngine.setImage("rock.svg");
    gEngine.playSound("Rock");
    gEngine.appendLog( 
        "&#8220;When you return you will need to make another choice. " +
        "You may help build the bridge with the rest of your village. " +
        "Or you may seek to become a scout for the roman legion. " +
        "Or you may seek to become a warrior for the roman legion. &quot; "
    );
    gEngine.setOptions([
        option("Help the town finish the bridge", onBuildBridge),
        option("Become a scout for the roman legion", onBecomeScout),
        option("Become a warrior the roman legion", onBecomeWarrior)
    ]);
	gEngine.scrollLog();
}

function onChooseWater() {
	gEngine.setImage("water.svg");
	gEngine.playSound("Water");
	gEngine.appendLog( 
		"&#8220;When you return you will need to make another choice. " +
		"You may help build the bridge with the rest of your village. " +
		"Or you may seek to become a scout for the roman legion. " +
		"Or you may seek out the oracle, to learn from her. &quot; "
	);
	gEngine.setOptions([
		option("Help the town finish the bridge", onBuildBridge),
		option("Seek out the oracle", onSeekOracle),
		option("Become a scout for the roman legion", onBecomeScout)
	]);
	gEngine.scrollLog();
}

// LAYER 2

function onBuildBridge() {
	gEngine.setImage("building_a_bridge.svg");
    gEngine.playSound("Bridge");
	gEngine.appendLog( 
        "You gained experience building the bridge. Now, with your skills, you are ready for the next steps. " +
        "You can either try out the Olympics or you can be an apprentice at the Master of Crafts. "
    );
    gEngine.setOptions([
        option("Master of Crafts", onMoc),
        option("Olympics", onOlympics)
    ]);
	gEngine.scrollLog();
}

function onSeekOracle() {
	gEngine.setImage("oracle.svg");
	gEngine.playSound("Oracle");
	gEngine.appendLog( 
		"You seek out the oracle and spend many years with her. "
	);
	gEngine.setOptions([
		option("Spread the word of Zeus as a missionary", onSpreadingWord),
        option("Seek out new lands in the name of Zeus", onFindingNewLand)
	]);
	gEngine.scrollLog();
}

function onBecomeWarrior() {
	gEngine.setImage("warrior.svg");
	gEngine.playSound("Warrior");
	gEngine.appendLog( 
		"You join the roman legion as a warrior, and fight in many battles. "
	);
	gEngine.setOptions([
		option("Become a protector of the realm", onProtector),
		option("Become a pirate", onPirate)
	]);
	gEngine.scrollLog();
}

function onBecomeScout() {
    gEngine.setImage("scouting.svg");
	gEngine.playSound("Scouting");
    gEngine.appendLog( 
            "You join the roman legion as a scout. "
    );
	gEngine.scrollLog();
    gEngine.setOptions([
        option("Become an explorer", onFindingNewLand),
        option("Try out for the olympic games", onOlympics)
    ]);
}

// LAYER 3

function onMoc() {
    gEngine.setImage("moc.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("CRAFTSMAN");
	gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onArtist,3000);
}

function onOlympics() {
    gEngine.setImage("olympics.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("ATHLETE");
	gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onAthlete,3000);
}

function onSpreadingWord() {
    gEngine.setImage("spreading_the_word.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("PRIEST");
	gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onPriest,3000);
}

function onFindingNewLand() {
    gEngine.setImage("finding_new_land.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("EXPLORER");
    gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onExplorer,3000);
}

function onProtector() {
    gEngine.setImage("protection_of_realm.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("PROTECTOR");
    gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onGeneral,3000);
}

function onPirate() {
    gEngine.setImage("pirate.svg");
	gEngine.playSound("Semifinal");
    gEngine.appendLog("PIRATE");
	gEngine.scrollLog();
	gEngine.setOptions([]);
    setTimeout(onPrisoner,3000);
}

// LAYER 4

function onExplorer() {
    gEngine.setImage("explorer.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("explorer", 1);
}

function onPrisoner() {
    gEngine.setImage("prisoner.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("prisoner", 1);
}

function onGeneral() {
    gEngine.setImage("general.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("general", 1);
}
function onAthlete() {
    gEngine.setImage("athlete.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("athlete", 1);
}
function onArtist() {
    gEngine.setImage("artist.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("artist", 1);
}
function onPriest() {
    gEngine.setImage("priest.svg");
	gEngine.playSound("Final");
    gEngine.setOptions([
        option("New Game", onNewGame)
    ]);
	gEngine.submitScore("priest", 1);
}

