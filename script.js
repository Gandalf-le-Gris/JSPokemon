/* ----------------------------------------------------- */
/* -------------------- Home screen -------------------- */
/* ----------------------------------------------------- */

function drawStartingMenu() {
    document.body.innerHTML = "";
    startButton = document.createElement('button');
    startButton.className = "start";
    startButton.innerText = "start";
    startButton.addEventListener('click', () => { tuto = false; drawTeamSelection(); });
    document.body.appendChild(startButton);
    tutoButton = document.createElement('button');
    tutoButton.className = "launch-tuto";
    tutoButton.innerText = "how to play?";
    tutoButton.addEventListener('click', () => { startTuto() });
    document.body.appendChild(tutoButton);
    gArea = new gameArea('resources/homescreen.jfif', () => {});
    gArea.start();
}

function gameArea(img, updater) {
    this.canvas = document.createElement("canvas");
    this.start = function () {
        this.canvas.width = 2000;
        this.canvas.height = 1000;
        this.canvas.style.backgroundImage = "url('" + img + "')";
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updater, 20);
    };
    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
}

function component(width, height, img, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = img;
    this.update = function () {
        ctx = gameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}

function startGame() {
    drawStartingMenu();
}

const init = (e) => {
    startGame();
}

document.addEventListener('DOMContentLoaded', init);





/* ------------------------------------------------------ */
/* ------------------- Team selection ------------------- */
/* ------------------------------------------------------ */

const pokemonList = ["venusaur", "charizard", "blastoise", "pikachu", "garchomp", "cinderace", "lucario", "volcarona", "eevee", "gardevoir", "dragonite", "ferrothorn", "blissey", "sableye", "scizor", "aegislash", "meowth", "metagross", "weavile", "zeraora", "omanyte", "tyranitar", "gyarados", "ditto", "mew", "urshifu", "gengar", "shuckle", "mimikyu", "mamoswine"]

var cSelected = 0;
var pSelected = ["", "", ""];
var tuto = false;

function drawTeamSelection() {
    document.body.innerHTML = "";
    gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    cSelected = 0;
    pSelected = ["", "", ""];

    teamSelectorScreen = document.createElement('div');
    teamSelectorScreen.className = "team-selector-screen";
    document.body.appendChild(teamSelectorScreen);

    teamSelectorTitle = document.createElement('div');
    teamSelectorTitle.className = "selector-title";
    teamTitle = document.createElement('div');
    teamTitle.className = "title";
    teamTitle.innerHTML = "Select your team";
    teamSelectorTitle.appendChild(teamTitle);
    teamSelectorCount = document.createElement('button');
    teamSelectorCount.className = "selector-count";
    teamSelectorCount.innerText = "(0/3)";
    teamSelectorCount.id = "teamSelectorCount";
    teamSelectorTitle.appendChild(teamSelectorCount);
    teamSelectorScreen.appendChild(teamSelectorTitle);

    teamSelector = document.createElement('div');
    teamSelector.className = "team-selector";

    for (const pokemon of pokemonList) {
        cell = (new pokemonSelector(pokemon)).cell;
        teamSelector.appendChild(cell);
    }

    teamSelectorScreen.appendChild(teamSelector);
}

function pokemonSelector(name) {
    this.cell = document.createElement('div');
    this.name = name;
    image = new Image();
    image.src = 'resources/sprites/pokemon_icons/' + name + '.png';
    image.className = 'pixel-sprite';
    title = document.createElement('div');
    title.innerHTML = name;
    this.cell.appendChild(title);
    this.cell.appendChild(image);
    this.cell.className = "team-selector-element";
    this.cell.onclick = function () {
        tsc = document.getElementById("teamSelectorCount");
        if (pSelected.findIndex(element => element === name) == -1 && cSelected < 3) {
            pSelected[pSelected.findIndex(element => element === "")] = name;
            cSelected += 1;
            if (cSelected < 3) {
                tsc.innerText = "(" + cSelected + "/3)";
            } else {
                tsc.innerText = "start";
                tsc.className = "selector-count-start";
                tsc.onclick = launchGame;
            }
            this.className = "selected-cell";
        } else if (pSelected.findIndex(element => element === name) != -1) {
            pSelected[pSelected.findIndex(element => element === name)] = "";
            cSelected -= 1;
            tsc.innerText = "(" + cSelected + "/3)";
            tsc.className = "selector-count";
            tsc.onclick = () => { };
            this.className = "team-selector-element";
        }
    }
}






/* ------------------------------------------------------- */
/* ------------------- Initialize game ------------------- */
/* ------------------------------------------------------- */

var team = []
var world = 1;
var area = 1;
var money = 0;
var extraLoot = 0;

var im = 0;
var nve = .6;
var se = 1.6;
var n = 1;
var stab = 1.25;

const typetable = [[n, se, n, n, nve, nve, nve, nve, nve, se, n, n, n, nve, se, n, nve, n],
    [n, nve, n, n, nve, nve, n, n, se, n, n, n, n, n, se, n, n, n],
    [n, n, se, n, im, n, n, n, n, n, n, n, n, n, n, n, nve, n],
    [n, n, nve, nve, n, n, n, se, n, nve, im, n, n, n, n, n, n, se],
    [n, se, se, n, n, se, nve, n, n, n, n, n, n, nve, n, n, nve, n],
    [nve, se, n, n, nve, n, n, nve, im, n, n, se, se, nve, nve, se, se, n],
    [se, n, nve, n, n, n, nve, n, n, se, n, se, n, n, n, nve, se, nve],
    [se, n, n, nve, n, se, n, n, n, se, n, n, n, n, n, nve, nve, n],
    [n, nve, n, n, n, n, n, n, se, n, n, n, im, n, se, n, n, n],
    [nve, n, nve, n, n, n, nve, nve, n, nve, se, n, n, nve, n, se, nve, se],
    [nve, n, n, se, n, n, se, im, n, nve, n, n, n, se, n, se, se, n],
    [n, n, se, n, n, n, nve, se, n, se, se, nve, n, n, n, n, nve, nve],
    [n, n, n, n, n, n, n, n, im, n, n, n, n, n, n, nve, nve, n],
    [n, n, n, n, se, n, n, n, nve, se, nve, n, n, nve, n, nve, im, n],
    [n, im, n, n, n, se, n, n, n, n, n, n, n, se, nve, n, nve, n],
    [se, n, n, n, n, nve, se, se, n, n, nve, se, n, n, n, n, nve, n],
    [n, n, n, nve, se, n, nve, n, n, n, n, se, n, n, n, se, nve, nve],
    [n, n, nve, n, n, n, se, n, n, nve, se, n, n, n, n, se, n, nve]]

function contains(array, element) {
    return array.findIndex(e => e === element) != -1;
}

Function.prototype.clone = function () {
    var cloneObj = this;
    if (this.__isClone) {
        cloneObj = this.__clonedFrom;
    }

    var temp = function () { return cloneObj.apply(this, arguments); };
    for (var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;
};

function typemultiplier(move, attacker, defender) {
    i = types.findIndex(e => e === move.type);
    mul = 1;
    if (i >= 0) {
        if (contains(attacker.types, move.type))
            mul *= stab;
        for (let t of defender.types) {
            n = types.findIndex(e => e === t);
            mul *= typetable[i][n];
        }
    }
    return mul;
}

function damageCalculator(move, pA, pD) {
    var typeMul = typemultiplier(move, pA, pD);
    var baseDam = 0;
    var crit = false;
    if (move.crit != undefined)
        crit = true;
    var atkMul = 1;
    var defMul = 1;
    if (move.cat === "physical") {
        if (crit) {
            atkMul = Math.min(1, statsChangeMultiplier ** pA.statchanges.attack);
            defMul = Math.max(1, statsChangeMultiplier ** pD.statchanges.defense);
        } else {
            atkMul = statsChangeMultiplier ** pA.statchanges.attack;
            defMul = statsChangeMultiplier ** pD.statchanges.defense;
        }
        baseDam = 22 * move.bp * pA.attack * atkMul / (50 * pD.defense * defMul);
    } else if (move.cat === "special") {
        if (crit) {
            atkMul = Math.min(1, statsChangeMultiplier ** pA.statchanges.spattack);
            defMul = Math.max(1, statsChangeMultiplier ** pD.statchanges.spdefense) + .5 * (weather != undefined && weather.name === "Sandstorm" && contains(pD.types, "rock"));
        } else {
            atkMul = statsChangeMultiplier ** pA.statchanges.spattack;
            defMul = statsChangeMultiplier ** pD.statchanges.spdefense;
        }
        baseDam = 22 * move.bp * pA.spattack * atkMul / (50 * pD.spdefense * defMul);
    }
    if (crit)
        baseDam *= 1.5

    var other = 1;
    if (move.cat === "physical" && isBurned(pA))
        other *= .6;
    if (weather != undefined) {
        if (weather.name === "Rain") {
            if (move.type === "water")
                other *= 1.5;
            if (move.type === "fire")
                other *= .5;
        } else if (weather.name === "Sun") {
            if (move.type === "water")
                other *= .5;
            if (move.type === "fire")
                other *= 1.5;
        }
    }
    if (isCharged(pA) && move.type === "electric")
        other *= 2;


    for (let i of pA.items) {
        if (i.boost != undefined)
            other *= i.effect(move, pA);
    }
    return Math.floor(baseDam * typeMul * other);
}

function effectiveMultiplier(move, pD) {
    var mul = 1;
    if (move.type !== "") {
        var i = types.findIndex(e => e === move.type);
        for (let t of pD.types) {
            n = types.findIndex(e => e === t);
            mul *= typetable[i][n];
        }
    }
    if (move.type === "ground" && !isGrounded(pD))
        mul = 0;
    return mul;
}

function launchGame() {
    world = 1;
    area = 1;
    money = 0;
    removePrice = 500;
    extraLoot = 0;
    for (let i = 0; i < pSelected.length; i++) {
        pokemon = createPokemon(pSelected[i]);
        adjustBST(pokemon, 600);
        team[i] = pokemon;
    }
    mapSelection();
}






/* ------------------------------------------------------ */
/* ------------------- Path selection ------------------- */
/* ------------------------------------------------------ */

var types = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"]

function mapSelection() {
    document.body.innerHTML = "";
    gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    selector = document.createElement('div');
    selector.id = "selector";
    selector.className = "team-selector-screen";
    document.body.appendChild(selector);

    titleSection = document.createElement('div');
    titleSection.className = "title-section";
    selector.appendChild(titleSection);
    subtitle = document.createElement('div');
    subtitle.className = "centered-subtitle";
    subtitle.innerHTML = "Crossroads " + world + " - " + area;
    titleSection.appendChild(subtitle);
    title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Choose your path";
    titleSection.appendChild(title);
    pathSelector();
}

function pathSelector() {
    grid = document.createElement('div');
    sel = document.getElementById('selector');
    if (area == 10) {
        grid.className = "scripted-encounter";
        cell = document.createElement('div');
        image = new Image();
        image.className = 'pixel-sprite';
        title = document.createElement('div');
        image.src = 'resources/sprites/map_icons/boss.png';
        title.innerHTML = "boss";
        cell.appendChild(image);
        cell.appendChild(title);
        cell.className = "team-selector-element";
        encounter = "boss";

        cell.onclick = function () {
            startEncounter(encounter);
        }
        grid.appendChild(cell);
    } else if (area == 9) {
        grid.className = "scripted-encounter";
        cell = document.createElement('div');
        image = new Image();
        image.className = 'pixel-sprite';
        title = document.createElement('div');
        image.src = 'resources/sprites/map_icons/pokemon_center.png';
        title.innerHTML = "pokémon center";
        cell.appendChild(image);
        cell.appendChild(title);
        cell.className = "team-selector-element";
        encounter = "pokemon_center";

        cell.onclick = function () {
            startEncounter(encounter);
        }
        grid.appendChild(cell);
    } else {
        grid.className = "encounter-selector";
        for (let i = 0; i < 2; i++) {
            cell = document.createElement('div');
            image = new Image();
            image.className = 'pixel-sprite';
            title = document.createElement('div');
            cell.appendChild(image);
            cell.appendChild(title);
            cell.className = "team-selector-element";
            rd = 0;
            if (area > 2) {
                rd = Math.floor(Math.random() * 24);
            } else {
                rd = Math.floor(Math.random() * 18);
            }
            if (rd < 18) {
                type = types[rd];
                image.src = 'resources/sprites/map_icons/' + type + '.png';
                title.innerHTML = type + " type battle";
                encounter = type;
            } else if (rd < 21) {
                image.src = 'resources/sprites/map_icons/pokemart.png';
                title.innerHTML = "pokémart";
                encounter = "pokemart";
            } else {
                image.src = 'resources/sprites/map_icons/pokemon_center.png';
                title.innerHTML = "pokémon center";
                encounter = "pokemon_center";
            }
            cell.encounter = encounter;
            cell.onclick = function () {
                startEncounter(this.encounter);
            }
            grid.appendChild(cell);
        }
    }
    sel.appendChild(grid);
    if (tuto) {
        var filter = document.createElement('div');
        filter.className = "filter-clear";
        document.body.appendChild(filter);
        filter.onclick = () => { document.body.removeChild(filter); }

        var instruct = document.createElement('div');
        instruct.className = "overlay-text";
        instruct.innerHTML = "You will have to progress by battling wild Pokémon. Choose the type of the Pokémon you want to battle first.";
        filter.appendChild(instruct);
    }
}






/* ------------------------------------------------------ */
/* ------------------ Battle encounter ------------------ */
/* ------------------------------------------------------ */

opponentList = ["venusaur", "charizard", "blastoise", "pikachu", "garchomp", "cinderace", "lucario", "volcarona", "eevee", "gardevoir", "dragonite", "ferrothorn", "blissey", "sableye", "scizor", "aegislash", "meowth", "metagross", "weavile", "zeraora", "omanyte", "tyranitar", "gyarados", "mew", "urshifu", "gengar", "shuckle", "mimikyu", "mamoswine"];
bossList = ["arceus"];

energy = 5;
maxEnergy = 5;
player = true;
switchesLeft = 1;
weather = undefined;
terrain = undefined;
environment = [];
encounterType = undefined;

function startEncounter(encounter) {
    if (encounter === "pokemon_center") {
        pokemonCenterEncounter();
    } else if (encounter === "pokemart") {
        pokemartEncounter();
    } else {
        battleEncounter(encounter);
    }
}

function battleEncounter(encounter) {
    opponent = createOpponent(encounter);
    player = true;
    weather = undefined;
    terrain = undefined;
    environment = [];
    gameOverTimeout = -1;
    rewardTimeout = -1;
    encounterType = encounter;

    if (team[0].currenthp > 0) {
        activePokemon = 0;
        switchInd = [1, 2]
    } else if (team[1].currenthp > 0) {
        activePokemon = 1;
        switchInd = [2, 0];
    } else {
        activePokemon = 2;
        switchInd = [0, 1];
    }

    document.body.innerHTML = "";
    gArea = new gameArea('resources/sprites/battle_backgrounds/plains.png', () => { });
    gArea.start();

    pLeftView = document.createElement('div');
    pLeftView.className = "pokemon-displayer-left";
    document.body.appendChild(pLeftView);
    leftHeader = document.createElement('div');
    leftHeader.className = "pokemon-header";
    pLeftView.appendChild(leftHeader);
    leftName = document.createElement('div');
    leftName.className = "pokemon-name";
    leftName.id = "leftName";
    leftName.innerHTML = team[activePokemon].name;
    leftHeader.appendChild(leftName);
    leftHPText = document.createElement('div');
    leftHPText.className = "pokemon-hp-text";
    leftHPText.id = "leftHPText";
    leftHPText.innerHTML = team[activePokemon].currenthp + "/" + team[activePokemon].maxhp;
    leftHeader.appendChild(leftHPText);
    leftHP = document.createElement('progress');
    leftHP.className = "pokemon-hp";
    leftHP.id = "leftHP";
    leftHP.value = team[activePokemon].currenthp;
    leftHP.max = team[activePokemon].maxhp;
    leftHeader.appendChild(leftHP);
    leftSprite = new Image();
    leftSprite.src = team[activePokemon].imgb;
    leftSprite.className = "pokemon-sprite";
    leftSprite.id = "leftSprite";
    pLeftView.appendChild(leftSprite);
    leftEffects = document.createElement('div');
    leftEffects.className = "effect-section";
    leftEffects.id = "leftEffects";
    pLeftView.appendChild(leftEffects);
    leftStats = document.createElement('div');
    leftStats.className = "effect-section";
    leftStats.id = "leftStats";
    pLeftView.appendChild(leftStats);

    pRightView = document.createElement('div');
    pRightView.className = "pokemon-displayer-right";
    document.body.appendChild(pRightView);
    rightHeader = document.createElement('div');
    rightHeader.className = "pokemon-header";
    pRightView.appendChild(rightHeader);
    rightName = document.createElement('div');
    rightName.className = "pokemon-name";
    rightName.id = "rightName";
    rightName.innerHTML = opponent.name;
    rightHeader.appendChild(rightName);
    rightHPText = document.createElement('div');
    rightHPText.className = "pokemon-hp-text";
    rightHPText.id = "rightHPText";
    rightHPText.innerHTML = opponent.currenthp + "/" + opponent.maxhp;
    rightHeader.appendChild(rightHPText);
    rightHP = document.createElement('progress');
    rightHP.className = "pokemon-hp";
    rightHP.id = "rightHP";
    rightHP.value = opponent.currenthp;
    rightHP.max = opponent.maxhp;
    rightHeader.appendChild(rightHP);
    rightSprite = new Image();
    rightSprite.src = opponent.imgf;
    rightSprite.className = "pokemon-sprite";
    rightSprite.id = "rightSprite";
    pRightView.appendChild(rightSprite);
    rightEffects = document.createElement('div');
    rightEffects.className = "effect-section";
    rightEffects.id = "rightEffects";
    pRightView.appendChild(rightEffects);
    rightStats = document.createElement('div');
    rightStats.className = "effect-section";
    rightStats.id = "rightStats";
    pRightView.appendChild(rightStats);

    actions = document.createElement('div');
    actions.className = "action-section";
    document.body.appendChild(actions);

    info = document.createElement('div');
    info.className = "action-information";
    actions.appendChild(info);

    discardCell = document.createElement('div');
    discardCell.className = "action-information-cell";
    info.appendChild(discardCell);
    discardIcon = new Image();
    discardIcon.src = 'resources/sprites/ui_icons/discard.png';
    discardIcon.className = "stack";
    discardCell.appendChild(discardIcon);
    discardCount = document.createElement('div');
    discardCount.id = "discardCount";
    discardCount.className = "stack";
    discardCount.innerHTML = team[activePokemon].discard.length;
    discardCell.appendChild(discardCount);

    deckCell = document.createElement('div');
    deckCell.className = "action-information-cell";
    info.appendChild(deckCell);
    deckIcon = new Image();
    deckIcon.src = 'resources/sprites/ui_icons/deck.png';
    deckIcon.className = "stack";
    deckCell.appendChild(deckIcon);
    deckCount = document.createElement('div');
    deckCount.id = "deckCount";
    deckCount.className = "stack";
    deckCount.innerHTML = team[activePokemon].draw.length;
    deckCell.appendChild(deckCount);

    energyCell = document.createElement('div');
    energyCell.className = "action-information-cell";
    info.appendChild(energyCell);
    energyIcon = new Image();
    energyIcon.src = 'resources/sprites/ui_icons/energy.png';
    energyIcon.className = "stack";
    energyCell.appendChild(energyIcon);
    energyCount = document.createElement('div');
    energyCount.id = "energyCount";
    energyCount.className = "stack";
    energyCount.innerHTML = energy;
    energyCell.appendChild(energyCount);

    movesArea = document.createElement('div');
    movesArea.className = "moves-section";
    movesArea.id = "movesArea";
    actions.appendChild(movesArea);

    endTurnB = document.createElement('button');
    endTurnB.className = "end-turn";
    endTurnB.innerText = "end turn";
    endTurnB.onclick = endTurn;
    actions.appendChild(endTurnB);

    switches = document.createElement('div');
    switches.className = "switch-headers";
    document.body.appendChild(switches);

    switch1 = document.createElement('div');
    switch1.className = "switch-header";
    switch1.id = "switch1";
    switch1.onclick = () => {
        switchPokemon(0);
    }
    switches.appendChild(switch1);
    switch2 = document.createElement('div');
    switch2.className = "switch-header";
    switch2.id = "switch2";
    switch2.onclick = () => {
        switchPokemon(1);
    }
    switches.appendChild(switch2);

    switchImage1 = new Image();
    switchImage1.src = team[switchInd[0]].imgf;
    switchImage1.id = "switchImage1";
    switchImage1.className = "switch-pokemon";
    switch1.appendChild(switchImage1);
    switchImage2 = new Image();
    switchImage2.src = team[switchInd[1]].imgf;
    switchImage2.id = "switchImage2";
    switchImage2.className = "switch-pokemon";
    switch2.appendChild(switchImage2);

    switchHeader1 = document.createElement('div');
    switchHeader1.className = "pokemon-header";
    switch1.appendChild(switchHeader1);
    switchName1 = document.createElement('div');
    switchName1.className = "pokemon-name";
    switchName1.id = "switchName1";
    switchName1.innerHTML = team[switchInd[0]].name;
    switchHeader1.appendChild(switchName1);
    switchHPText1 = document.createElement('div');
    switchHPText1.className = "pokemon-hp-text";
    switchHPText1.id = "switchHPText1";
    switchHPText1.innerHTML = team[switchInd[0]].currenthp + "/" + team[switchInd[0]].maxhp;
    switchHeader1.appendChild(switchHPText1);
    switchHP1 = document.createElement('progress');
    switchHP1.className = "pokemon-hp";
    switchHP1.id = "switchHP1";
    switchHP1.value = team[switchInd[0]].currenthp;
    switchHP1.max = team[switchInd[0]].maxhp;
    switchHeader1.appendChild(switchHP1);

    switchHeader2 = document.createElement('div');
    switchHeader2.className = "pokemon-header";
    switch2.appendChild(switchHeader2);
    switchName2 = document.createElement('div');
    switchName2.className = "pokemon-name";
    switchName2.id = "switchName2";
    switchName2.innerHTML = team[switchInd[1]].name;
    switchHeader2.appendChild(switchName2);
    switchHPText2 = document.createElement('div');
    switchHPText2.className = "pokemon-hp-text";
    switchHPText2.id = "switchHPText2";
    switchHPText2.innerHTML = team[switchInd[1]].currenthp + "/" + team[switchInd[1]].maxhp;
    switchHeader2.appendChild(switchHPText2);
    switchHP2 = document.createElement('progress');
    switchHP2.className = "pokemon-hp";
    switchHP2.id = "switchHP2";
    switchHP2.value = team[switchInd[1]].currenthp;
    switchHP2.max = team[switchInd[1]].maxhp;
    switchHeader2.appendChild(switchHP2);

    movePreview = document.createElement('div');
    movePreview.className = "preview-off";
    movePreview.id = "movePreview";
    document.body.appendChild(movePreview);

    itemSection = document.createElement('div');
    itemSection.className = "held-items-section";
    document.body.appendChild(itemSection);

    for (let p of team) {
        var itemSubsection = document.createElement('div');
        itemSubsection.className = "held-items-pokemon";
        itemSection.appendChild(itemSubsection);

        var pImage = new Image();
        pImage.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
        pImage.className = "item-pokemon-sprite";
        itemSubsection.appendChild(pImage);

        for (let i of p.items) {
            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            itemSubsection.appendChild(wrapper);

            var pImage = new Image();
            pImage.src = 'resources/sprites/held_items/' + i.name.replace(" ", "_").toLowerCase() + '.webp';
            pImage.className = "item-sprite";
            pImage.title = i.description;
            wrapper.appendChild(pImage);
        }
    }

    environmentSection = document.createElement('div');
    environmentSection.className = "environment-section";
    environmentSection.id = "environmentSection";
    document.body.appendChild(environmentSection);

    for (let p of team) {
        initDeck(p);
        p.statchanges = new StatChanges();
        p.effects = [];
    }
    initDeck(opponent);

    startTurn();

    switch1.title = getMoveDescription(team[switchInd[0]]);
    switch2.title = getMoveDescription(team[switchInd[1]]);

    if (tuto) {
        drawBattleExplanations()
    }
}

function startTurn() {
    energy = maxEnergy;
    if (player) {
        switchesLeft = 1;
        for (let p of team) {
            drawMove(p, true);
        }
        drawHand();
    } else {
        drawMove(opponent, true);
        aiActions();
    }
}

function drawHand() {
    movesArea = document.getElementById("movesArea");
    var child = movesArea.lastElementChild;
    while (child) {
        movesArea.removeChild(child);
        child = movesArea.lastElementChild;
    }

    if (team[activePokemon].currenthp > 0) {
        for (let move of team[activePokemon].hand) {
            function moveCard(move) {
                this.card = document.createElement('div');
                this.card.className = "move-card";
                this.card.onclick = function () {
                    if (this.className === "move-card")
                        document.addEventListener("click", (evt) => {
                            const flyoutEl = this;
                            let targetEl = evt.target;
                            do {
                                if (targetEl == flyoutEl) {
                                    if (this.className === "move-card") {
                                        this.className = "selected-move";
                                        previewMove(move);
                                        document.addEventListener("click", (evt) => {
                                            const flyoutEl = this;
                                            let targetEl = evt.target;
                                            do {
                                                if (targetEl == flyoutEl) {
                                                    if (this.className === "move-card") {
                                                        this.className = "selected-move";
                                                        previewMove(move);
                                                    } else {
                                                        document.getElementById("movePreview").innerHTML = "";
                                                        useMove(move);
                                                        this.className = "move-card";
                                                    }
                                                    return;
                                                }
                                                targetEl = targetEl.parentNode;
                                            } while (targetEl);
                                            this.className = "move-card";
                                            hidePreview();
                                        }, { once: true });
                                    } else {
                                        useMove(move);
                                        this.className = "move-card";
                                        hidePreview();
                                    }
                                    return;
                                }
                                targetEl = targetEl.parentNode;
                            } while (targetEl);
                            this.className = "move-card";
                            hidePreview();
                        }, { once: true });
                }
                movesArea.appendChild(this.card);

                var top = document.createElement('div');
                top.className = "move-top";
                this.card.appendChild(top);
                var bottom = document.createElement('div');
                bottom.className = "move-top";
                this.card.appendChild(bottom);

                var name = document.createElement('div');
                name.innerHTML = move.name;
                name.class = "move-name";
                top.appendChild(name);
                var cost = document.createElement('div');
                cost.innerHTML = move.cost;
                cost.className = "move-cost";
                top.appendChild(cost);

                var type = new Image();
                if (move.type !== "")
                    type.src = 'resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'resources/sprites/move_icons/category/' + move.cat + '.webp'
                cat.className = "category-icon";
                bottom.appendChild(cat);
            }
            new moveCard(move);
        }
    }

    refreshIconCounts();
}

function drawEffects(side) {
    var p = opponent;
    var effects = document.getElementById("rightEffects");
    if (side) {
        p = team[activePokemon];
        effects = document.getElementById("leftEffects");
    }
    effects.innerHTML = "";
    for (let effect of p.effects) {
        if (effect.stacks > 0) {
            var grid = document.createElement('div');
            grid.className = "effect-cell";
            grid.title = effect.description;
            effects.appendChild(grid);
            var image = new Image();
            image.src = effect.icon;
            image.className = "effect-icon stack";
            grid.appendChild(image);
            if (effect.stacks > 1) {
                var stacks = document.createElement('div');
                stacks.className = "stack";
                stacks.innerHTML = effect.stacks;
                grid.appendChild(stacks);
            }
        }
    }
}

function drawStats(side) {
    var p = opponent;
    var stats = document.getElementById("rightStats");
    if (side) {
        p = team[activePokemon];
        stats = document.getElementById("leftStats");
    }
    stats.innerHTML = "";

    if (p.statchanges.attack != 0) {
        var grid = document.createElement('div');
        grid.className = "effect-cell";
        grid.title = "Attack";
        stats.appendChild(grid);
        var image = new Image();
        if (p.statchanges.attack > 0)
            image.src = 'resources/sprites/ui_icons/buff.png';
        else
            image.src = 'resources/sprites/ui_icons/debuff.png';

        image.className = "effect-icon stack";
        grid.appendChild(image);
        var stacks = document.createElement('div');
        stacks.className = "stack";
        stacks.innerHTML = p.statchanges.attack;
        grid.appendChild(stacks);
    }
    if (p.statchanges.defense != 0) {
        var grid = document.createElement('div');
        grid.className = "effect-cell";
        grid.title = "Defense";
        stats.appendChild(grid);
        var image = new Image();
        if (p.statchanges.defense > 0)
            image.src = 'resources/sprites/ui_icons/buff.png';
        else
            image.src = 'resources/sprites/ui_icons/debuff.png';

        image.className = "effect-icon stack";
        grid.appendChild(image);
        var stacks = document.createElement('div');
        stacks.className = "stack";
        stacks.innerHTML = p.statchanges.defense;
        grid.appendChild(stacks);
    }
    if (p.statchanges.spattack != 0) {
        var grid = document.createElement('div');
        grid.className = "effect-cell";
        grid.title = "Special Attack";
        stats.appendChild(grid);
        var image = new Image();
        if (p.statchanges.spattack > 0)
            image.src = 'resources/sprites/ui_icons/buff.png';
        else
            image.src = 'resources/sprites/ui_icons/debuff.png';

        image.className = "effect-icon stack";
        grid.appendChild(image);
        var stacks = document.createElement('div');
        stacks.className = "stack";
        stacks.innerHTML = p.statchanges.spattack;
        grid.appendChild(stacks);
    }
    if (p.statchanges.spdefense != 0) {
        var grid = document.createElement('div');
        grid.className = "effect-cell";
        grid.title = "Special Defense";
        stats.appendChild(grid);
        var image = new Image();
        if (p.statchanges.spdefense > 0)
            image.src = 'resources/sprites/ui_icons/buff.png';
        else
            image.src = 'resources/sprites/ui_icons/debuff.png';

        image.className = "effect-icon stack";
        grid.appendChild(image);
        var stacks = document.createElement('div');
        stacks.className = "stack";
        stacks.innerHTML = p.statchanges.spdefense;
        grid.appendChild(stacks);
    }
    if (p.statchanges.speed != 0) {
        var grid = document.createElement('div');
        grid.className = "effect-cell";
        grid.title = "Speed";
        stats.appendChild(grid);
        var image = new Image();
        if (p.statchanges.speed > 0)
            image.src = 'resources/sprites/ui_icons/buff.png';
        else
            image.src = 'resources/sprites/ui_icons/debuff.png';

        image.className = "effect-icon stack";
        grid.appendChild(image);
        var stacks = document.createElement('div');
        stacks.className = "stack";
        stacks.innerHTML = p.statchanges.speed;
        grid.appendChild(stacks);
    }
}

function drawEnvironment() {
    var grid = document.getElementById('environmentSection');
    grid.innerHTML = "";

    if (weather != undefined) {
        var txt = document.createElement('div');
        txt.innerHTML = weather.name + " - " + weather.turns + " turns";
        txt.title = weather.description;
        grid.appendChild(txt);
    }
    if (terrain != undefined) {
        var txt = document.createElement('div');
        txt.innerHTML = terrain.name + " - " + terrain.turns + " turns";
        txt.title = terrain.description;
        grid.appendChild(txt);
    }
    for (let e of environment) {
        var txt = document.createElement('div');
        txt.innerHTML = e.name + " - " + e.turns + " turns";
        txt.title = e.description;
        grid.appendChild(txt);
    }
}

function switchPokemon(ind) {
    if (team[switchInd[ind]].currenthp > 0 && (switchesLeft > 0 && !isTrapped(team[activePokemon]) || team[activePokemon].currenthp == 0)) {
        document.getElementById("movePreview").className = "preview-off";
        document.getElementById("leftSprite").className = "pokemon-sprite";

        var n = activePokemon;
        activePokemon = switchInd[ind];
        switchInd[ind] = n;

        var pA = team[activePokemon];
        var pS = team[n];

        n = ind + 1;
        document.getElementById("switchImage" + n).src = pS.imgf;
        document.getElementById("switchName" + n).innerHTML = pS.name;
        document.getElementById("switchHP" + n).value = pS.currenthp;
        document.getElementById("switchHP" + n).max = pS.maxhp;
        document.getElementById("switchHPText" + n).innerHTML = pS.currenthp + "/" + pS.maxhp;
        document.getElementById("switch" + n).title = getMoveDescription(pS);

        document.getElementById("leftSprite").src = pA.imgb;
        document.getElementById("leftName").innerHTML = pA.name;
        document.getElementById("leftHP").value = pA.currenthp;
        document.getElementById("leftHP").max = pA.maxhp;
        document.getElementById("leftHPText").innerHTML = pA.currenthp + "/" + pA.maxhp;

        drawHand();
        drawEffects(true);
        drawStats(true);
        if (pS.currenthp > 0)
            switchesLeft--;
    } else if (switchesLeft == 0) {
        var preview = document.getElementById("movePreview");
        preview.className = "preview-on";
        preview.innerHTML = "No switches left!"
    }
}

function drawHealthBar(n) {
    var p = team[switchInd[n - 1]];
    document.getElementById("switchHP" + n).value = p.currenthp;
    document.getElementById("switchHP" + n).max = p.maxhp;
    document.getElementById("switchHPText" + n).innerHTML = p.currenthp + "/" + p.maxhp;
}

function getMoveDescription(p) {
    var s = "";
    for (let m of p.hand) {
        s += m.name + "\n";
    }
    return s;
}

function initDeck(p) {
    p.draw = [];
    for (let m of p.moves) {
        var move = JSON.parse(JSON.stringify(m));
        move.effect = m.effect.bind(move);
        p.draw.push(move);
    }
    p.hand = [];
    p.discard = [];
    shuffle(p.draw);
    for (let i of p.items) {
        if (i.init != undefined) {
            i.effect(p);
        }
    }
}

function drawMove(p, newHand) {
    if (p.currenthp > 0) {
        n = 1;
        if (newHand) {
            p.discard = p.discard.concat(p.hand);
            p.hand = [];
            n = 1 + Math.round(p.speed * statsChangeMultiplier ** p.statchanges.speed / 35);
        }
        for (let i = 0; i < n; i++) {
            if (p.hand.length < 6) {
                if (p.draw.length == 0 && p.discard.length > 0) {
                    p.draw = [].concat(p.discard);
                    p.discard = [];
                    shuffle(p.draw);
                }
                if (p.draw.length > 0) {
                    p.hand.push(p.draw.pop());
                } else {
                    p.hand.push(new Struggle());
                }
            }
        }
        if (p === team[switchInd[0]])
            document.getElementById("switch1").title = getMoveDescription(p);
        else if (p === team[switchInd[1]])
            document.getElementById("switch2").title = getMoveDescription(p);
    }
    drawHand();
}

function refreshIconCounts() {
    elem = document.getElementById("discardCount");
    elem.innerHTML = team[activePokemon].discard.length;
    elem = document.getElementById("deckCount");
    elem.innerHTML = team[activePokemon].draw.length;
    elem = document.getElementById("energyCount");
    elem.innerHTML = energy;
}

function refreshHealthBar(p) {
    if (!p) {
        document.getElementById("rightHP").value = opponent.currenthp;
        document.getElementById("rightHP").max = opponent.maxhp;
        document.getElementById("rightHPText").innerHTML = opponent.currenthp + "/" + opponent.maxhp;
    } else {
        document.getElementById("leftHP").value = team[activePokemon].currenthp;
        document.getElementById("leftHP").max = team[activePokemon].maxhp;
        document.getElementById("leftHPText").innerHTML = team[activePokemon].currenthp + "/" + team[activePokemon].maxhp;
    }
}

function previewMove(move) {
    var disp = document.getElementById("movePreview");
    disp.className = "preview-on";
    disp.innerHTML = move.description;
}

function hidePreview() {
    document.getElementById("movePreview").className = "preview-off";
}

var gameOverTimeout = -1;
var rewardTimeout = -1;

//use move
function useMove(move) {
    if (energy >= move.cost && opponent.currenthp > 0) {
        energy -= move.cost;

        var pCopied;
        var sCopied;

        var cancelled = false;
        var message = "";
        if (player) {
            for (let e of team[activePokemon].effects) {
                if (e.cancel != undefined && e.stacks > 0) {
                    if (!cancelled) {
                        cancelled = true;
                        e.effect(team[activePokemon], opponent);
                        drawEffects(true);
                        message = e.specialMessage;
                    }
                }
            }
            if (doesBlock(opponent)) {
                pCopied = Object.assign({}, opponent);
                sCopied = JSON.stringify(opponent.statchanges);
            }
        } else {
            for (let e of opponent.effects) {
                if (e.cancel != undefined && e.stacks > 0) {
                    if (!cancelled) {
                        cancelled = true;
                        e.effect(opponent, team[activePokemon]);
                        message = e.specialMessage;
                    }
                }
            }
            if (doesBlock(team[activePokemon])) {
                pCopied = Object.assign({}, team[activePokemon]);
                sCopied = JSON.stringify(team[activePokemon].statchanges);
            }
        }

        if (!cancelled) {
            if (player && (move.cat === "status" || effectiveMultiplier(move, opponent) > 0))
                move.effect(move, team[activePokemon], opponent);
            else if (!player && (move.cat === "status" || effectiveMultiplier(move, team[activePokemon]) > 0))
                move.effect(move, opponent, team[activePokemon]);
            if (move.fails)
                cancelled = true;
        }

        var desc = document.getElementById("movePreview");
        desc.className = "preview-on";
        if (!player) {
            if (message !== "")
                desc.innerHTML += opponent.name + message;
            else
                desc.innerHTML += opponent.name + ' used ' + move.name + '!<br />';
        } else {
            if (message !== "")
                desc.innerHTML += team[activePokemon].name + message;
            else {
                desc.innerHTML += team[activePokemon].name + ' used ' + move.name + '!<br />';
            }
        }

        if (move.fails && message === "") {
            desc.innerHTML += "But it failed!<br />";
        }

        if (!cancelled && ((player && !doesBlock(opponent)) || (!player && !doesBlock(team[activePokemon])))) {
            var effMul = effectiveMultiplier(move, player ? opponent : team[activePokemon]);
            if (move.cat !== "status") {
                if (move.crit)
                    desc.innerHTML += "Critical hit!<br />";
                if (effMul > 1)
                    desc.innerHTML += "It's super effective!<br />";
                else if (effMul == 0)
                    desc.innerHTML += "It doesn't affect " + (player ? opponent : team[activePokemon]).name + "...< br />";
                else if (effMul < 1)
                    desc.innerHTML += "It's not very effective...<br />";
            }

            var hits = 1;
            if (move.multihit != undefined)
                hits = move.multihit;
            if (player) {
                for (let i = 0; i < hits; i++) {
                    var damage = damageCalculator(move, team[activePokemon], opponent);
                    dealDamage(damage, opponent);
                    if (move.recoil != undefined)
                        dealDamage(Math.floor(move.recoil * damage), team[activePokemon]);
                }

            } else {
                for (let i = 0; i < hits; i++) {
                    var damage = damageCalculator(move, opponent, team[activePokemon]);
                    dealDamage(damage, team[activePokemon]);
                    if (move.recoil != undefined)
                        dealDamage(Math.floor(move.recoil * damage), opponent);
                    if (damage > 0) {
                        for (let j of team[activePokemon].items) {
                            if (j.revenge != undefined)
                                j.effectR(move, team[activePokemon], opponent);
                        }
                    }
                }
            }
        }
        discardCard(move);

        if (pCopied != undefined) {
            if (!player) {
                team[activePokemon] = pCopied;
                team[activePokemon].statchanges = JSON.parse(sCopied);
                var i = team[activePokemon].effects.findIndex(e => e.block);
                team[activePokemon].effects[i].bEffect(move, team[activePokemon], opponent);
                drawEffects(true);
                drawStats(true);
            } else {
                opponent = pCopied;
                opponent.statchanges = JSON.parse(sCopied);
                var i = opponent.effects.findIndex(e => e.block);
                opponent.effects[i].bEffect(move, opponent, team[activePokemon]);
                drawEffects(false);
                drawStats(false);
            }
        }
    }
}

function dealDamage(damage, p) {
    if (p.currenthp > 0)
        p.currenthp = Math.min(Math.max(0, Math.floor(p.currenthp - damage)), p.maxhp);
    refreshHealthBar(true);
    refreshHealthBar(false);
    checkKO();
}

function checkKO() {
    if (team[activePokemon].currenthp == 0) {
        leftSprite.className += " fainted";
        var gameO = true;
        for (let p of team) {
            gameO = gameO && p.currenthp == 0;
        }
        if (gameO && gameOverTimeout == -1)
            gameOverTimeout = setTimeout(gameOver, 3000);
    }
    if (opponent.currenthp == 0) {
        rightSprite.className += " fainted";
        if (rewardTimeout == -1)
            if (area < 10 || world < 3)
                rewardTimeout = setTimeout(rewardScreen, 3000);
            else
                rewardTimeout = setTimeout(nextEncounter, 3000);
    }
}

function discardCard(move) {
    p = opponent;
    if (player)
        p = team[activePokemon];
    var i = p.hand.findIndex(e => e == move);
    if (move.exhaust == undefined)
        p.discard.push(p.hand[i]);
    p.hand.splice(i, 1);
    if (player)
        drawHand();
}

function endTurn() {
    if ((!player || team[activePokemon].currenthp > 0) && opponent.currenthp > 0) {
        runEffects();
        for (let p of team) {
            for (let i of p.items) {
                if (i.turn_end != undefined)
                    i.effect(p);
            }
        }
        player = !player;
        startTurn();
    }
}

function runEffects() {
    if (player) {
        for (let e of team[activePokemon].effects) {
            if (e.stacks > 0)
                e.effect(team[activePokemon], opponent);
        }
        for (let e of team[activePokemon].effects) {
            if (e.stacks <= 0) {
                var i = team[activePokemon].effects.findIndex(elt => elt == e);
                team[activePokemon].effects.splice(i, 1);
            }
        }
        drawEffects(true);
    }
    else {
        for (let e of opponent.effects) {
            if (e.stacks > 0)
                e.effect(opponent, team[activePokemon]);
        }
        for (let e of opponent.effects) {
            if (e.stacks <= 0) {
               var i = opponent.effects.findIndex(elt => elt == e);
                opponent.effects.splice(i, 1);
            }
        }
        drawEffects(false);
    }

    if (weather != undefined) {
        weather.effect();
        if (weather.turns == 0)
            weather = undefined;
    }
    if (terrain != undefined) {
        terrain.effect();
        if (terrain.turns == 0)
            terrain = undefined;
    }
    for (let e of environment) {
        e.effect();
    }
    drawEnvironment();
}

function aiActions() {
    var desc = document.getElementById("movePreview");
    desc.className = "preview-on";
    desc.innerHTML = "";
    var i = aiPlayable();
    while (i >= 0 && opponent.currenthp > 0) {
        useMove(opponent.hand[i]);
        i = aiPlayable();
    }
    if (team[activePokemon].currenthp == 0) {
        desc.innerHTML += '<br />' + team[activePokemon].name + ' fainted!<br />Choose a new Pokémon to send out.<br />';
    }
    endTurn();
}

function aiPlayable() {
    return opponent.hand.findIndex(e => e.cost <= energy);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createOpponent(encounter) {
    var opponent;
    if (area < 10) {
        while (opponent == undefined || !contains(opponent.types, encounter)) {
            opponent = createPokemon(opponentList[Math.floor(Math.random() * opponentList.length)]);
        }
    } else {
        opponent = createPokemon(bossList[Math.floor(Math.random() * bossList.length)]);
    }
    adjustBST(opponent, 400 + 10 * area + 100 * world + 100 * (encounter === "boss"));
    return opponent;
}

function nextEncounter() {
    if (area == 10) {
        if (world == 3) {
            victoryScreen();
            return;
        } else {
            for (let p of team) {
                p.currenthp = Math.min(p.maxhp, p.currenthp + .5 * p.maxhp);
            }
            area = 1;
            world += 1;
        }
    } else {
        area += 1;
    }
    mapSelection();
}






/* ------------------------------------------------------- */
/* ----------------------- Victory ----------------------- */
/* ------------------------------------------------------- */

function victoryScreen() {
    document.body.innerHTML = "";
    var gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Victory!";

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "Play again";
    replay.onclick = drawTeamSelection;

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    grid.appendChild(title);
    grid.appendChild(replay);
    document.body.appendChild(grid);
}






/* ------------------------------------------------------ */
/* ------------------ Reward selection ------------------ */
/* ------------------------------------------------------ */

function rewardScreen() {
    money += 10 * Math.round(Math.sqrt(75 * (10 * world + area)));

    var filter = document.createElement('div');
    filter.className = "filter";
    filter.id = "filter";
    document.body.appendChild(filter);

    var grid = document.createElement('div');
    grid.className = "reward-selector";
    filter.appendChild(grid);

    var title = document.createElement('div');
    title.className = "centered-subtitle";
    title.innerHTML = "Choose your reward";
    grid.appendChild(title);

    for (let i = 0; i < team.length; i++) {
        function makeReward(i) {
            var p = team[i];
            this.reward1 = document.createElement('div');
            this.reward1.className = "reward";
            var sprite1 = new Image();
            sprite1.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
            sprite1.className = "reward-sprite";
            this.reward1.appendChild(sprite1);

            move1 = getFromMovepool(p);
            function makeCard(move) {
                this.card = document.createElement('div');
                this.card.className = "static-move-card";

                var top = document.createElement('div');
                top.className = "move-top";
                this.card.appendChild(top);
                var bottom = document.createElement('div');
                bottom.className = "move-top";
                this.card.appendChild(bottom);

                var name = document.createElement('div');
                name.innerHTML = move.name;
                name.class = "move-name";
                top.appendChild(name);
                var cost = document.createElement('div');
                cost.innerHTML = move.cost;
                cost.className = "move-cost";
                top.appendChild(cost);

                var type = new Image();
                if (move.type !== "")
                    type.src = 'resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'resources/sprites/move_icons/category/' + move.cat + '.webp'
                cat.className = "category-icon";
                bottom.appendChild(cat);
            }
            var card1 = new makeCard(move1);
            this.reward1.appendChild(card1.card);
            var desc1 = document.createElement('div');
            desc1.className = "descriptor";
            this.reward1.appendChild(desc1);
            var text = document.createElement('div');
            text.innerHTML = move1.description;
            desc1.appendChild(text);

            this.reward1.p = i;
            this.reward1.move = move1;
            this.reward1.onclick = function () {
                team[this.p].moves.push(this.move);
                if (Math.random() < extraLoot || tuto) {
                    extraLoot = 0;
                    extraReward();
                } else {
                    extraLoot += .35;
                    nextEncounter();
                }
            };
        }
        grid.appendChild((new makeReward(i)).reward1);
    }

    var skip = document.createElement('div');
    skip.className = "centered-subtitle replay";
    skip.innerHTML = "skip (" + String.fromCharCode(08381) + "100)";
    skip.onclick = () => {
        money += 100;
        if (Math.random() < extraLoot || tuto) {
            extraLoot = 0;
            extraReward();
        } else {
            extraLoot += .35;
            nextEncounter();
        }
    };
    grid.appendChild(skip);

    if (tuto) {
        var filter2 = document.createElement('div');
        filter2.className = "filter-clear";
        document.body.appendChild(filter2);
        filter2.onclick = () => { document.body.removeChild(filter2); }

        var instruct = document.createElement('div');
        instruct.className = "overlay-text";
        instruct.innerHTML = "After each battle, you will have the opportunity to add a move to one of your Pokémon's deck. You can also skip it for some money.";
        filter2.appendChild(instruct);
    }
}

function extraReward() {
    var filter = document.getElementById('filter');
    filter.innerHTML = "";

    var grid = document.createElement('div');
    grid.className = "reward-selector";
    filter.appendChild(grid);

    var title = document.createElement('div');
    title.className = "centered-subtitle";
    title.innerHTML = "Choose your reward";
    grid.appendChild(title);

    var ind = Math.floor(Math.random() * team.length);

    for (let i = 0; i < team.length; i++) {
        function makeReward(i) {
            var p = team[i];
            this.reward1 = document.createElement('div');
            this.reward1.className = "reward";

            var sprite = new Image();
            sprite.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
            sprite.className = "reward-sprite";
            this.reward1.appendChild(sprite);

            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            this.reward1.appendChild(wrapper);

            var item = getFromItemPool(i == ind);
            var sprite1 = new Image();
            sprite1.src = item.img;
            sprite1.className = "reward-sprite";
            wrapper.appendChild(sprite1);

            var desc = document.createElement('div');
            desc.className = "descriptor-name";
            this.reward1.appendChild(desc);
            var name = document.createElement('div');
            name.innerHTML = item.name;
            desc.appendChild(name);

            var desc1 = document.createElement('div');
            desc1.className = "descriptor";
            this.reward1.appendChild(desc1);
            var text = document.createElement('div');
            text.innerHTML = item.description;
            desc1.appendChild(text);

            this.reward1.p = i;
            this.reward1.item = item;
            this.reward1.onclick = function () {
                team[this.p].items.push(this.item);
                nextEncounter();
            };
        }
        grid.appendChild((new makeReward(i)).reward1);
    }

    var skip = document.createElement('div');
    skip.className = "centered-subtitle replay";
    skip.innerHTML = "skip (" + String.fromCharCode(08381) + "150)";
    skip.onclick = () => {
        money += 150;
        extraLoot += .35;
        nextEncounter();
    };
    grid.appendChild(skip);

    if (tuto) {
        var filter2 = document.createElement('div');
        filter2.className = "filter-clear";
        document.body.appendChild(filter2);
        filter2.onclick = () => {
            instruct.innerHTML = "Now you know all that you need to get started. Keep enhancing your decks, gather held items, refine your strategies, and you will surely make it to the legendary Pokémon awaiting you!";
            filter2.onclick = () => { document.body.removeChild(filter2); };
            tuto = false;
        }

        var instruct = document.createElement('div');
        instruct.className = "overlay-text";
        instruct.innerHTML = "Sometimes you will also be offered held items. Those give passive bonuses to their holder. Some of them can only be found after specific battles.";
        filter2.appendChild(instruct);
    }
}

function getFromMovepool(p) {
    return createMove(p.movepool[Math.floor(Math.random() * p.movepool.length)]);
}

function getFromItemPool(t) {
    var item;
    if (t) {
        while (item == undefined || item.area !== encounterType)
            item = createHeldItem(heldItems[Math.floor(Math.random() * heldItems.length)]);
    } else {
        while (item == undefined || item.area !== "")
            item = createHeldItem(heldItems[Math.floor(Math.random() * heldItems.length)]);
    }
    return item;
}






/* ------------------------------------------------------ */
/* ------------------ Center encounter ------------------ */
/* ------------------------------------------------------ */

function pokemonCenterEncounter() {
    document.body.innerHTML = "";
    gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Pokémon Center";

    var progress = document.createElement('div');
    progress.className = "centered-subtitle";
    progress.innerHTML = "Your Pokémon have been healed";

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "continue";
    replay.onclick = nextEncounter;

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    grid.appendChild(title);
    grid.appendChild(progress);
    grid.appendChild(replay);
    document.body.appendChild(grid);

    for (let p of team) {
        p.currenthp = Math.min(p.maxhp, p.currenthp + .5 * p.maxhp);
    }
}






/* ------------------------------------------------------ */
/* ----------------- Pokémart encounter ----------------- */
/* ------------------------------------------------------ */

movePrice = 1000;
itemPrice = 2000;
removePrice = 500;

function pokemartEncounter() {
    document.body.innerHTML = "";
    gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    var moneyT = document.createElement('div');
    moneyT.className = "money-text";
    moneyT.innerHTML = "Balance: " + String.fromCharCode(08381) + money;
    moneyT.id = "money";
    document.body.appendChild(moneyT);

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    document.body.appendChild(grid);

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Pokémart";
    grid.appendChild(title);

    var articles = document.createElement('div');
    articles.className = "article-section";
    grid.appendChild(articles);
    var moves = document.createElement('div');
    moves.className = "article-selector";
    articles.appendChild(moves);
    var items = document.createElement('div');
    items.className = "article-selector";
    articles.appendChild(items);

    for (let i = 0; i < team.length; i++) {
        function makeMoveArticle(i) {
            this.article = document.createElement('div');
            this.article.className = "article";
            moves.appendChild(this.article);

            var wrapper = document.createElement('div');
            wrapper.className = "price-tag";
            this.article.appendChild(wrapper);

            this.priceTag = document.createElement('div');
            this.priceTag.innerHTML = String.fromCharCode(08381) + movePrice;
            wrapper.appendChild(this.priceTag);

            var p = team[i];
            this.reward1 = document.createElement('div');
            this.reward1.className = "reward";
            var sprite1 = new Image();
            sprite1.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
            sprite1.className = "reward-sprite";
            this.reward1.appendChild(sprite1);

            move1 = getFromMovepool(p);
            function makeCard(move) {
                this.card = document.createElement('div');
                this.card.className = "static-move-card";

                var top = document.createElement('div');
                top.className = "move-top";
                this.card.appendChild(top);
                var bottom = document.createElement('div');
                bottom.className = "move-top";
                this.card.appendChild(bottom);

                var name = document.createElement('div');
                name.innerHTML = move.name;
                name.class = "move-name";
                top.appendChild(name);
                var cost = document.createElement('div');
                cost.innerHTML = move.cost;
                cost.className = "move-cost";
                top.appendChild(cost);

                var type = new Image();
                if (move.type !== "")
                    type.src = 'resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'resources/sprites/move_icons/category/' + move.cat + '.webp'
                cat.className = "category-icon";
                bottom.appendChild(cat);
            }
            var card1 = new makeCard(move1);
            this.reward1.appendChild(card1.card);
            var desc1 = document.createElement('div');
            desc1.className = "descriptor";
            this.reward1.appendChild(desc1);
            var text = document.createElement('div');
            text.innerHTML = move1.description;
            desc1.appendChild(text);

            this.reward1.p = i;
            this.reward1.move = move1;
            this.reward1.priceTag = this.priceTag;
            this.reward1.article = this.article;
            this.reward1.onclick = function () {
                if (money >= movePrice && this.priceTag.innerHTML !== "sold") {
                    team[this.p].moves.push(this.move);
                    money -= movePrice;
                    document.getElementById('money').innerHTML = "Balance: " + String.fromCharCode(08381) + money;
                    this.priceTag.innerHTML = "sold";
                    this.article.className += " sold";
                }
            };

            this.article.appendChild(this.reward1);
        }
        new makeMoveArticle(i);
    }

    for (let i = 0; i < team.length; i++) {
        function makeItemArticle(i) {
            this.article = document.createElement('div');
            this.article.className = "article";
            items.appendChild(this.article);

            var wrapper1 = document.createElement('div');
            wrapper1.className = "price-tag";
            this.article.appendChild(wrapper1);

            this.priceTag = document.createElement('div');
            this.priceTag.innerHTML = String.fromCharCode(08381) + itemPrice;
            wrapper1.appendChild(this.priceTag);

            var p = team[i];
            this.reward1 = document.createElement('div');
            this.reward1.className = "reward";
            var sprite1 = new Image();
            sprite1.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
            sprite1.className = "reward-sprite";
            this.reward1.appendChild(sprite1);

            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            this.reward1.appendChild(wrapper);

            var item = getFromItemPool();
            var sprite1 = new Image();
            sprite1.src = item.img;
            sprite1.className = "reward-sprite";
            wrapper.appendChild(sprite1);

            var desc = document.createElement('div');
            desc.className = "descriptor-name";
            this.reward1.appendChild(desc);
            var name = document.createElement('div');
            name.innerHTML = item.name;
            desc.appendChild(name);

            var desc1 = document.createElement('div');
            desc1.className = "descriptor";
            this.reward1.appendChild(desc1);
            var text = document.createElement('div');
            text.innerHTML = item.description;
            desc1.appendChild(text);

            this.reward1.p = i;
            this.reward1.item = item;
            this.reward1.priceTag = this.priceTag;
            this.reward1.article = this.article;
            this.reward1.onclick = function () {
                if (money >= itemPrice && this.priceTag.innerHTML !== "sold") {
                    team[this.p].items.push(this.item);
                    money -= itemPrice;
                    document.getElementById('money').innerHTML = "Balance: " + String.fromCharCode(08381) + money;
                    this.priceTag.innerHTML = "sold";
                    this.article.className += " sold";
                }
            };

            this.article.appendChild(this.reward1);
        }
        new makeItemArticle(i);
    }

    var deleteB = document.createElement('div');
    deleteB.className = "remove-button";
    deleteB.onclick = drawRemoveCard;
    grid.appendChild(deleteB);

    var wrapper = document.createElement('div');
    wrapper.className = "price-tag";
    deleteB.appendChild(wrapper);
    priceTag = document.createElement('div');
    priceTag.innerHTML = String.fromCharCode(08381) + removePrice;
    priceTag.id = "removePriceTag";
    wrapper.appendChild(priceTag);

    var deleteImage = new Image();
    deleteImage.src = 'resources/sprites/ui_icons/remove.png';
    deleteImage.className = "reward-sprite";
    deleteB.appendChild(deleteImage);

    var wrapper1 = document.createElement('div');
    wrapper1.className = "wrapper";
    deleteB.appendChild(wrapper1);
    remove = document.createElement('div');
    remove.innerHTML = "Remove move card";
    remove.className = "remove-text";
    wrapper1.appendChild(remove);

    var continueB = document.createElement('div');
    continueB.className = "centered-subtitle replay";
    continueB.innerHTML = "continue";
    continueB.onclick = nextEncounter;
    grid.appendChild(continueB);
}

function drawRemoveCard() {
    var filter = document.createElement('div');
    filter.className = "filter";
    filter.id = 'filter';
    document.body.appendChild(filter);

    var grid = document.createElement('div');
    grid.className = "remove-selector";
    filter.appendChild(grid);

    var title = document.createElement('div');
    title.className = "centered-subtitle";
    title.innerHTML = "Choose a move to remove";
    grid.appendChild(title);

    for (let p of team) {
        for (let move of p.moves) {
            function makeReward(p, move1) {
                this.reward1 = document.createElement('div');
                this.reward1.className = "reward";
                var sprite1 = new Image();
                sprite1.src = 'resources/sprites/pokemon_icons/' + p.name.toLowerCase() + '.png';
                sprite1.className = "reward-sprite";
                this.reward1.appendChild(sprite1);

                function makeCard(move) {
                    this.card = document.createElement('div');
                    this.card.className = "static-move-card";

                    var top = document.createElement('div');
                    top.className = "move-top";
                    this.card.appendChild(top);
                    var bottom = document.createElement('div');
                    bottom.className = "move-top";
                    this.card.appendChild(bottom);

                    var name = document.createElement('div');
                    name.innerHTML = move.name;
                    name.class = "move-name";
                    top.appendChild(name);
                    var cost = document.createElement('div');
                    cost.innerHTML = move.cost;
                    cost.className = "move-cost";
                    top.appendChild(cost);

                    var type = new Image();
                    if (move.type !== "")
                        type.src = 'resources/sprites/move_icons/types/' + move.type + '.webp'
                    type.className = "type-icon";
                    bottom.appendChild(type);
                    var cat = new Image();
                    cat.src = 'resources/sprites/move_icons/category/' + move.cat + '.webp'
                    cat.className = "category-icon";
                    bottom.appendChild(cat);
                }
                var card1 = new makeCard(move1);
                this.reward1.appendChild(card1.card);
                var desc1 = document.createElement('div');
                desc1.className = "descriptor";
                this.reward1.appendChild(desc1);
                var text = document.createElement('div');
                text.innerHTML = move1.description;
                desc1.appendChild(text);

                this.reward1.p = p;
                this.reward1.move = move1;
                this.reward1.onclick = function () {
                    if (money >= removePrice) {
                        var i = this.p.moves.findIndex(e => e === this.move);
                        this.p.moves.splice(i, 1);
                        hideCardRemove();
                        money -= removePrice;
                        removePrice += 250;
                        document.getElementById('money').innerHTML = "Balance: " + String.fromCharCode(08381) + money;
                        document.getElementById('removePriceTag').innerHTML = String.fromCharCode(08381) + removePrice;
                    }
                };
            }
            grid.appendChild((new makeReward(p, move)).reward1);
        }
    }

    var continueB = document.createElement('div');
    continueB.className = "centered-subtitle replay";
    continueB.innerHTML = "cancel";
    continueB.onclick = hideCardRemove;
    grid.appendChild(continueB);
}

function hideCardRemove() {
    document.getElementById('filter').remove();
}






/* ------------------------------------------------------- */
/* ---------------------- Game over ---------------------- */
/* ------------------------------------------------------- */

function gameOver() {
    document.body.innerHTML = "";
    var gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Game Over";

    var progress = document.createElement('div');
    progress.className = "centered-subtitle";
    progress.innerHTML = "Defeat on world " + world + " - area " + area;

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "Try again";
    replay.onclick = drawTeamSelection;

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    grid.appendChild(title);
    grid.appendChild(progress);
    grid.appendChild(replay);
    document.body.appendChild(grid);
}






/* ------------------------------------------------------ */
/* ------------------ Pokémon creation ------------------ */
/* ------------------------------------------------------ */

//sprites: https://www.pokencyclopedia.info/en/index.php?id=sprites/3ds/ani-b_6

function createPokemon(pokemon) {
    switch (pokemon) {
        case "venusaur":
            return new Venusaur();
        case "charizard":
            return new Charizard();
        case "blastoise":
            return new Blastoise();
        case "pikachu":
            return new Pikachu();
        case "garchomp":
            return new Garchomp();
        case "cinderace":
            return new Cinderace();
        case "lucario":
            return new Lucario();
        case "volcarona":
            return new Volcarona();
        case "eevee":
            return new Eevee();
        case "gardevoir":
            return new Gardevoir();
        case "dragonite":
            return new Dragonite();
        case "ferrothorn":
            return new Ferrothorn();
        case "blissey":
            return new Blissey();
        case "sableye":
            return new Sableye();
        case "scizor":
            return new Scizor();
        case "aegislash":
            return new Aegislash();
        case "meowth":
            return new Meowth();
        case "metagross":
            return new Metagross();
        case "weavile":
            return new Weavile();
        case "zeraora":
            return new Zeraora();
        case "omanyte":
            return new Omanyte();
        case "tyranitar":
            return new Tyranitar();
        case "gyarados":
            return new Gyarados();
        case "ditto":
            return new Ditto();
        case "mew":
            return new Mew();
        case "urshifu":
            return new Urshifu();
        case "gengar":
            return new Gengar();
        case "shuckle":
            return new Shuckle();
        case "mimikyu":
            return new Mimikyu();
        case "mamoswine":
            return new Mamoswine();
        case "arceus":
            return new Arceus();
        default:
            return new MissingNo();
    }
}

function MissingNo() {
    this.name = "MissingNo.";
    this.hp = 33;
    this.attack = 136;
    this.defense = 0;
    this.spattack = 1;
    this.spdefense = 1;
    this.speed = 29;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = [];
    this.moves = [createMove("struggle")];
    this.movepool = [];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/missingno.png';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/missingno.png';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Venusaur() {
    this.name = "Venusaur";
    this.hp = 80;
    this.attack = 82;
    this.defense = 83;
    this.spattack = 100;
    this.spdefense = 100;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["grass", "poison"];
    this.moves = [createMove("vine_whip"), createMove("mega_drain"), createMove("poison_powder"), createMove("sludge"), createMove("leech_seed"), createMove("sunny_day")];
    this.movepool = ["vine_whip", "poison_powder", "leech_seed", "double_edge", "earthquake", "rest", "toxic", "mega_drain", "giga_drain", "sludge", "bulldoze", "bullet_seed", "curse", "energy_ball", "frenzy_plant", "growth", "hidden_power", "ingrain", "leaf_storm", "outrage", "power_whip", "razor_leaf", "sleep_powder", "sludge_bomb", "solar_beam", "substitute", "sunny_day", "synthesis", "venoshock", "weather_ball", "venom_dranch", "toxic_spikes"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/venusaur.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/venusaur.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Charizard() {
    this.name = "Charizard";
    this.hp = 78;
    this.attack = 84;
    this.defense = 78;
    this.spattack = 109;
    this.spdefense = 85;
    this.speed = 100;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fire", "flying"];
    this.moves = [createMove("ember"), createMove("wing_attack"), createMove("air_cutter"), createMove("dragon_pulse"), createMove("roost"), createMove("sunny_day")];
    this.movepool = ["ember", "wing_attack", "flamethrower", "ancient_power", "crunch", "double_edge", "outrage", "roost", "sunny_day", "solar_beam", "swords_dance", "weather_ball", "air_cutter", "air_slash", "blast_burn", "breaking_swipe", "brick_break", "defog", "dragon_claw", "dragon_dance", "dragon_pulse", "dual_wingbeat", "fire_blast", "fire_spin", "flame_charge", "flare_blitz", "focus_blast", "heat_wave", "hurricane", "inferno", "overheat", "scale_shot", "scorching_sands", "shadow_claw", "will_o_wisp"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/charizard.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/charizard.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Blastoise() {
    this.name = "Blastoise";
    this.hp = 79;
    this.attack = 83;
    this.defense = 100;
    this.spattack = 85;
    this.spdefense = 105;
    this.speed = 78;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["water"];
    this.moves = [createMove("water_gun"), createMove("ice_beam"), createMove("water_pulse"), createMove("brick_break"), createMove("flip_turn"), createMove("rain_dance"),];
    this.movepool = ["water_gun", "rapid_spin", "flash_cannon", "aura_sphere", "brick_break", "curse", "earthquake", "focus_blast", "power_up_punch", "rest", "waterfall", "weather_ball", "avalanche", "blizzard", "brine", "bubble_beam", "dark_pulse", "dive", "dynamic_punch", "flip_turn", "gyro_ball", "hydro_cannon", "hydro_pump", "ice_beam", "iron_defense", "iron_tail", "liquidation", "rain_dance", "rock_slide", "scald", "seismic_toss", "shell_smash", "skull_bash", "surf", "water_pulse", "water_spout", "whirlpool"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/blastoise.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/blastoise.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Pikachu() {
    this.name = "Pikachu";
    this.hp = 35;
    this.attack = 110;
    this.defense = 40;
    this.spattack = 100;
    this.spdefense = 50;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["electric"];
    this.moves = [createMove("thunder_shock"), createMove("nuzzle"), createMove("quick_attack"), createMove("volt_switch"), createMove("fake_out"), createMove("electroweb")];
    this.movepool = ["thunder_shock", "quick_attack", "nuzzle", "detect", "extreme_speed", "rollout", "seismic_toss", "spark", "surf", "volt_switch", "agility", "calm_mind", "charge", "charge_beam", "discharge", "double_kick", "draining_kiss", "electro_ball", "electroweb", "facade", "fake_out", "grass_knot", "iron_tail", "last_resort", "magnet_rise", "mimic", "nasty_plot", "play_rough", "shock_wave", "swagger", "thunder", "thunderbolt", "thunder_punch", "volt_tackle", "wild_charge", "wish", "zap_cannon"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/pikachu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/pikachu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Garchomp() {
    this.name = "Garchomp";
    this.hp = 108;
    this.attack = 130;
    this.defense = 95;
    this.spattack = 80;
    this.spdefense = 85;
    this.speed = 102;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dragon", "ground"];
    this.moves = [createMove("bulldoze"), createMove("sand_tomb"), createMove("dual_chop"), createMove("dragon_claw"), createMove("hone_claws"), createMove("rock_slide")];
    this.movepool = ["dual_chop", "sand_tomb", "crunch", "breaking_swipe", "double_edge", "dragon_claw", "dragon_pulse", "earthquake", "facade", "fire_blast", "bulldoze", "iron_tail", "outrage", "rock_slide", "scale_shot", "scorching_sands", "shadow_claw", "stomping_tantrum", "swords_dance", "twister", "aqua_tail", "dig", "draco_meteor", "dragon_rush", "dragon_tail", "earth_power", "fire_fang", "giga_impact", "hone_claws", "iron_head", "poison_jab", "sandstorm", "stealth_rock", "stone_edge", "thrash"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/garchomp.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/garchomp.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Cinderace() {
    this.name = "Cinderace";
    this.hp = 80;
    this.attack = 116;
    this.defense = 75;
    this.spattack = 65;
    this.spdefense = 75;
    this.speed = 119;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fire"];
    this.moves = [createMove("fire_punch"), createMove("fire_fang"), createMove("quick_attack"), createMove("double_kick"), createMove("u_turn"), createMove("pyro_ball")];
    this.movepool = ["tackle", "ember", "quick_attack", "pyro_ball", "assurance", "double_edge", "double_kick", "facade", "fire_fang", "flame_charge", "flare_blitz", "giga_impact", "iron_head", "agility", "sunny_day", "baton_pass", "blaze_kick", "bounce", "fire_punch", "gunk_shot", "high_jump_kick", "low_sweep", "mega_kick", "reversal", "sucker_punch", "u_turn", "zen_headbutt", "bulk_up", "protect", "super_fang", "ally_switch"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/cinderace.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/cinderace.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Lucario() {
    this.name = "Lucario";
    this.hp = 70;
    this.attack = 110;
    this.defense = 70;
    this.spattack = 115;
    this.spdefense = 70;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fighting", "steel"];
    this.moves = [createMove("steel_beam"), createMove("rock_smash"), createMove("vacuum_wave"), createMove("flash_cannon"), createMove("drain_punch"), createMove("life_dew")];
    this.movepool = ["rock_smash", "metal_claw", "aura_sphere", "blaze_kick", "brick_break", "bulk_up", "bulldoze", "bullet_punch", "calm_mind", "dark_pulse", "dragon_pulse", "extreme_speed", "facade", "flash_cannon", "focus_blast", "fury_cutter", "heal_pulse", "high_jump_kick", "hone_claws", "iron_defense", "iron_tail", "low_sweep", "nasty_plot", "poison_jab", "power_up_punch", "psychic", "reversal", "rock_slide", "shadow_ball", "stone_edge", "bone_rush", "close_combat", "cross_chop", "drain_punch", "focus_punch", "force_palm", "life_dew", "meteor_mash", "steel_beam", "vacuum_wave"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/lucario.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/lucario.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Volcarona() {
    this.name = "Volcarona";
    this.hp = 85;
    this.attack = 60;
    this.defense = 65;
    this.spattack = 135;
    this.spdefense = 105;
    this.speed = 100;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fire", "bug"];
    this.moves = [createMove("ember"), createMove("gust"), createMove("struggle_bug"), createMove("quiver_dance"), createMove("fiery_dance"), createMove("silver_wind")];
    this.movepool = ["ember", "struggle_bug", "gust", "fiery_dance", "calm_mind", "defog", "fire_blast", "fire_spin", "flamethrower", "giga_drain", "heat_wave", "hidden_power", "hurricane", "hyper_beam", "overheat", "protect", "psychic", "roost", "solar_beam", "sunny_day", "u_turn", "will_o_wisp", "absorb", "amnesia", "bug_buzz", "morning_sun", "mystical_fire", "quiver_dance", "string_shot", "signal_beam", "silver_wind"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/volcarona.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/volcarona.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Eevee() {
    this.name = "Eevee";
    this.hp = 55;
    this.attack = 55;
    this.defense = 50;
    this.spattack = 45;
    this.spdefense = 65;
    this.speed = 55;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("tackle"), createMove("tackle"), createMove("quick_attack"), createMove("last_resort")];
    this.movepool = ["quick_attack", "last_resort", "double_edge"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/eevee.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/eevee.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Gardevoir() {
    this.name = "Gardevoir";
    this.hp = 68;
    this.attack = 65;
    this.defense = 65;
    this.spattack = 125;
    this.spdefense = 115;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic", "fairy"];
    this.moves = [createMove("confusion"), createMove("confusion"), createMove("disarming_voice"), createMove("hypnosis")];
    this.movepool = ["confusion", "disarming_voice", "hypnosis", "dazzling_gleam"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gardevoir.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gardevoir.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Dragonite() {
    this.name = "Dragonite";
    this.hp = 91;
    this.attack = 134;
    this.defense = 95;
    this.spattack = 100;
    this.spdefense = 100;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dragon", "flying"];
    this.moves = [createMove("tackle"), createMove("tackle"), createMove("wing_attack"), createMove("twister")];
    this.movepool = ["wing_attack", "twister", "extreme_speed", "roost"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/dragonite.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/dragonite.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Ferrothorn() {
    this.name = "Ferrothorn";
    this.hp = 74;
    this.attack = 94;
    this.defense = 131;
    this.spattack = 54;
    this.spdefense = 116;
    this.speed = 40; //adjusted
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["grass", "steel"];
    this.moves = [createMove("tackle"), createMove("tackle"), createMove("vine_whip"), createMove("metal_claw")];
    this.movepool = ["vine_whip", "metal_claw", "leech_seed"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/ferrothorn.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/ferrothorn.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Blissey() {
    this.name = "Blissey";
    this.hp = 255;
    this.attack = 10;
    this.defense = 10;
    this.spattack = 75;
    this.spdefense = 135;
    this.speed = 55;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("echoed_voice"), createMove("toxic"), createMove("soft_boiled"), createMove("heal_pulse")];
    this.movepool = ["echoed_voice", "soft_boiled", "heal_pulse", "toxic"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/blissey.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/blissey.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Sableye() {
    this.name = "Sableye";
    this.hp = 50;
    this.attack = 75;
    this.defense = 75;
    this.spattack = 65;
    this.spdefense = 65;
    this.speed = 50;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dark", "ghost"];
    this.moves = [createMove("scratch"), createMove("shadow_sneak"), createMove("detect"), createMove("toxic")];
    this.movepool = ["shadow_sneak", "detect", "toxic"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/sableye.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/sableye.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Scizor() {
    this.name = "Scizor";
    this.hp = 70;
    this.attack = 130;
    this.defense = 100;
    this.spattack = 55;
    this.spdefense = 80;
    this.speed = 65;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["bug", "steel"];
    this.moves = [createMove("metal_claw"), createMove("metal_claw"), createMove("fury_cutter"), createMove("wing_attack")];
    this.movepool = ["metal_claw", "fury_cutter", "wing_attack"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/scizor.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/scizor.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Aegislash() {
    this.name = "Aegislash";
    this.hp = 60;
    this.attack = 50;
    this.defense = 140;
    this.spattack = 50;
    this.spdefense = 140;
    this.speed = 60;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["steel", "ghost"];
    this.moves = [createMove("metal_claw"), createMove("shadow_sneak"), createMove("swords_dance"), createMove("kings_shield")];
    this.movepool = ["metal_claw", "shadow_sneak", "swords_dance", "kings_shield"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/aegislash.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/aegislash.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Meowth() {
    this.name = "Meowth";
    this.hp = 40;
    this.attack = 45;
    this.defense = 35;
    this.spattack = 40;
    this.spdefense = 40;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("scratch"), createMove("scratch"), createMove("pay_day"), createMove("fury_swipes")];
    this.movepool = ["pay_day", "fury_swipes", "assurance"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/meowth.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/meowth.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Metagross() {
    this.name = "Metagross";
    this.hp = 80;
    this.attack = 135;
    this.defense = 130;
    this.spattack = 95;
    this.spdefense = 90;
    this.speed = 70;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["steel", "psychic"];
    this.moves = [createMove("metal_claw"), createMove("hammer_arm"), createMove("confusion"), createMove("bullet_punch")];
    this.movepool = ["metal_claw", "confusion", "bullet_punch", "hammer_arm"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/metagross.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/metagross.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Weavile() {
    this.name = "Weavile";
    this.hp = 70;
    this.attack = 120;
    this.defense = 65;
    this.spattack = 45;
    this.spdefense = 85;
    this.speed = 125;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dark", "ice"];
    this.moves = [createMove("scratch"), createMove("ice_shard"), createMove("assurance"), createMove("beat_up")];
    this.movepool = ["ice_shard", "assurance", "beat_up"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/weavile.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/weavile.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Zeraora() {
    this.name = "Zeraora";
    this.hp = 88;
    this.attack = 112;
    this.defense = 75;
    this.spattack = 102;
    this.spdefense = 80;
    this.speed = 143;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["electric"];
    this.moves = [createMove("scratch"), createMove("volt_switch"), createMove("spark"), createMove("power_up_punch")];
    this.movepool = ["spark", "power_up_punch", "volt_switch"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/zeraora.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/zeraora.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Omanyte() {
    this.name = "Omanyte";
    this.hp = 35;
    this.attack = 40;
    this.defense = 100;
    this.spattack = 90;
    this.spdefense = 55;
    this.speed = 35;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["rock", "water"];
    this.moves = [createMove("water_gun"), createMove("water_gun"), createMove("rollout"), createMove("ancient_power")];
    this.movepool = ["water_gun", "rollout", "ancient_power"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/omanyte.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/omanyte.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Tyranitar() {
    this.name = "Tyranitar";
    this.hp = 100;
    this.attack = 134;
    this.defense = 110;
    this.spattack = 95;
    this.spdefense = 100;
    this.speed = 61;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["rock", "dark"];
    this.moves = [createMove("tackle"), createMove("stomping_tantrum"), createMove("rock_throw"), createMove("payback")];
    this.movepool = ["rock_throw", "payback", "stomping_tantrum"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/tyranitar.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/tyranitar.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Gyarados() {
    this.name = "Gyarados";
    this.hp = 95;
    this.attack = 125;
    this.defense = 79;
    this.spattack = 60;
    this.spdefense = 100;
    this.speed = 81;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["water", "flying"];
    this.moves = [createMove("tackle"), createMove("bite"), createMove("waterfall"), createMove("rain_dance")];
    this.movepool = ["bite", "waterfall", "rain_dance"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gyarados.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gyarados.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Ditto() {
    this.name = "Ditto";
    this.hp = 48;
    this.attack = 48;
    this.defense = 48;
    this.spattack = 48;
    this.spdefense = 48;
    this.speed = 48;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("struggle")];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/ditto.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/ditto.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Mew() {
    this.name = "Mew";
    this.hp = 100;
    this.attack = 100;
    this.defense = 100;
    this.spattack = 100;
    this.spdefense = 100;
    this.speed = 100;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic"];
    this.moves = [createMove("pound"), createMove("psychic"), createMove("ancient_power"), createMove("metronome")];
    this.movepool = movesList;
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mew.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mew.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Urshifu() {
    this.name = "Urshifu";
    this.hp = 100;
    this.attack = 130;
    this.defense = 100;
    this.spattack = 63;
    this.spdefense = 60;
    this.speed = 97;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fighting", "dark"];
    this.moves = [createMove("rock_smash"), createMove("wicked_blow"), createMove("surging_strikes"), createMove("detect")];
    this.movepool = ["rock_smash", "wicked_blow", "surging_strikes", "detect"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/urshifu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/urshifu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Gengar() {
    this.name = "Gengar";
    this.hp = 60;
    this.attack = 65;
    this.defense = 60;
    this.spattack = 130;
    this.spdefense = 75;
    this.speed = 110;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "poison"];
    this.moves = [createMove("shadow_ball"), createMove("shadow_ball"), createMove("hypnosis"), createMove("dream_eater")];
    this.movepool = ["shadow_ball", "hypnosis", "dream_eater"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gengar.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gengar.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Shuckle() {
    this.name = "Shuckle";
    this.hp = 20;
    this.attack = 10;
    this.defense = 230;
    this.spattack = 10;
    this.spdefense = 230;
    this.speed = 20; //adjusted
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["bug", "rock"];
    this.moves = [createMove("rollout"), createMove("struggle_bug"), createMove("sticky_web"), createMove("rest")];
    this.movepool = ["rollout", "struggle_bug", "sticky_web", "rest"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/shuckle.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/shuckle.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Mimikyu() {
    this.name = "Mimikyu";
    this.hp = 55;
    this.attack = 90;
    this.defense = 80;
    this.spattack = 50;
    this.spdefense = 105;
    this.speed = 96;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "fairy"];
    this.moves = [createMove("scratch"), createMove("shadow_sneak"), createMove("play_rough"), createMove("swords_dance")];
    this.movepool = ["shadow_sneak", "play_rough", "swords_dance"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mimikyu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mimikyu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Mamoswine() {
    this.name = "Mamoswine";
    this.hp = 110;
    this.attack = 130;
    this.defense = 80;
    this.spattack = 70;
    this.spdefense = 60;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ground", "ice"];
    this.moves = [createMove("tackle"), createMove("ice_shard"), createMove("earthquake"), createMove("ancient_power")];
    this.movepool = ["ice_shard", "earthquake", "ancient_power"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mamoswine.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mamoswine.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Arceus() {
    this.name = "Arceus";
    this.hp = 120;
    this.attack = 120;
    this.defense = 120;
    this.spattack = 120;
    this.spdefense = 120;
    this.speed = 120;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("judgment"), createMove("hyper_beam"), createMove("extreme_speed"), createMove("ancient_power")];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/arceus.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/arceus.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function StatChanges() {
    this.attack = 0;
    this.defense = 0;
    this.spattack = 0;
    this.spdefense = 0;
    this.speed = 0;
}

function adjustBST(pokemon, target) {
    n = pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spattack + pokemon.spdefense + pokemon.speed;
    ratio = target / n;
    pokemon.hp = Math.round(pokemon.hp * ratio);
    pokemon.attack = Math.round(pokemon.attack * ratio);
    pokemon.defense = Math.round(pokemon.defense * ratio);
    pokemon.spattack = Math.round(pokemon.spattack * ratio);
    pokemon.spdefense = Math.round(pokemon.spdefense * ratio);
    pokemon.speed = Math.round(pokemon.speed * ratio);
    pokemon.maxhp = 5 * pokemon.hp;
    pokemon.currenthp = pokemon.maxhp;
}

var statsChangeMultiplier = 1.2;
function boostStat(p, stat, stages) {
    switch (stat) {
        case "attack":
            p.statchanges.attack = Math.min(6, Math.max(-6, p.statchanges.attack + stages));
            break;
        case "defense":
            p.statchanges.defense = Math.min(6, Math.max(-6, p.statchanges.defense + stages));
            break;
        case "spattack":
            p.statchanges.spattack = Math.min(6, Math.max(-6, p.statchanges.spattack + stages));
            break;
        case "spdefense":
            p.statchanges.spdefense = Math.min(6, Math.max(-6, p.statchanges.spdefense + stages));
            break;
        case "speed":
            p.statchanges.speed = Math.min(6, Math.max(-6, p.statchanges.speed + stages));
            break;
        default:
    }
    drawStats(contains(team, p));
}






/* ------------------------------------------------------ */
/* ------------------- Moves creation ------------------- */
/* ------------------------------------------------------ */

movesList = ["ancient_power", "assurance", "aura_sphere", "beat_up", "bite", "bullet_punch", "confusion", "crunch", "dazzling_gleam", "detect",
    "disarming_voice", "double_edge", "dual_chop", "echoed_voice", "ember", "extreme_speed", "fiery_dance", "flamethrower", "flash_cannon", "fury_cutter",
    "fury_swipes", "gust", "hammer_arm", "heal_pulse", "hypnosis", "ice_shard", "kings_shield", "last_resort", "leech_seed", "metal_claw", "metronome",
    "nuzzle", "payback", "pay_day", "poison_powder", "pound", "power_up_punch", "psychic", "pyro_ball", "quick_attack", "rain_dance", "rapid_spin",
    "rock_smash", "rock_throw", "rollout", "roost", "sand_tomb", "scratch", "shadow_sneak", "soft_boiled", "spark", "stomping_tantrum", "struggle_bug",
    "swords_dance", "tackle", "thunder_shock", "toxic", "twister", "vine_whip", "volt_switch", "waterfall", "water_gun", "wing_attack", "wicked_blow",
    "surging_strikes", "shadow_ball", "dream_eater", "sticky_web", "rest", "play_rough", "earthquake", "judgment", "hyper_beam", "mega_drain", "giga_drain",
    "sludge", "bulldoze", "bullet_seed", "curse", "energy_ball", "frenzy_plant", "growth", "hidden_power", "ingrain", "leaf_storm", "toxic_spikes",
    "outrage", "power_whip", "razor_leaf", "sleep_powder", "sludge_bomb", "solar_beam", "substitute", "sunny_day", "synthesis", "venoshock", "weather_ball",
    "venom_drench", "air_cutter", "air_slash", "blast_burn", "breaking_swipe", "brick_break", "defog", "dragon_claw", "dragon_dance", "dragon_pulse",
    "dual_wingbeat", "fire_blast", "fire_spin", "flame_charge", "flare_blitz", "focus_blast", "heat_wave", "hurricane", "inferno", "overheat", "scale_shot",
    "scorching_sands", "shadow_claw", "will_o_wisp", "avalanche", "blizzard", "brine", "bubble_beam", "dark_pulse", "dive", "dynamic_punch", "flip_turn",
    "gyro_ball", "hydro_cannon", "hydro_pump", "ice_beam", "iron_defense", "iron_tail", "liquidation", "rock_slide", "scald", "seismic_toss", "shell_smash",
    "skull_bash", "surf", "water_pulse", "water_spout", "whirlpool", "agility", "calm_mind", "charge", "charge_beam", "discharge", "double_kick",
    "draining_kiss", "electro_ball", "electroweb", "facade", "fake_out", "grass_knot", "magnet_rise", "mimic", "nasty_plot", "shock_wave", "swagger",
    "thunder", "thunderbolt", "thunder_punch", "volt_tackle", "wild_charge", "wish", "zap_cannon", "aqua_tail", "dig", "draco_meteor", "dragon_rush",
    "dragon_tail", "earth_power", "fire_fang", "giga_impact", "hone_claws", "iron_head", "poison_jab", "sandstorm", "stealth_rock", "stone_edge", "thrash",
    "baton_pass", "blaze_kick", "bounce", "fire_punch", "gunk_shot", "high_jump_kick", "low_sweep", "mega_kick", "reversal", "sucker_punch", "u_turn",
    "zen_headbutt", "bulk_up", "protect", "super_fang", "ally_switch", "bone_rush", "close_combat", "cross_chop", "drain_punch", "focus_punch",
    "force_palm", "life_dew", "meteor_mash", "steel_beam", "vacuum_wave", "absorb", "amnesia", "bug_buzz", "morning_sun", "mystical_fire", "quiver_dance",
    "string_shot", "signal_beam", "silver_wind"];

function createMove(move) {
    switch (move) {
        case "absorb":
            return new Absorb();
        case "agility":
            return new Agility();
        case "air_cutter":
            return new AirCutter();
        case "air_slash":
            return new AirSlash();
        case "ally_switch":
            return new AllySwitch();
        case "amnesia":
            return new Amnesia();
        case "ancient_power":
            return new AncientPower();
        case "aqua_tail":
            return new AquaTail();
        case "assurance":
            return new Assurance();
        case "aura_sphere":
            return new AuraSphere();
        case "avalanche":
            return new Avalanche();
        case "baton_pass":
            return new BatonPass();
        case "beat_up":
            return new BeatUp();
        case "bite":
            return new Bite();
        case "blast_burn":
            return new BlastBurn();
        case "blaze_kick":
            return new BlazeKick();
        case "blizzard":
            return new Blizzard();
        case "bone_rush":
            return new BoneRush();
        case "bounce":
            return new Bounce();
        case "breaking_swipe":
            return new BreakingSwipe();
        case "brick_break":
            return new BrickBreak();
        case "brine":
            return new Brine();
        case "bubble_beam":
            return new BubbleBeam();
        case "bug_buzz":
            return new BugBuzz();
        case "bulk_up":
            return new BulkUp();
        case "bulldoze":
            return new Bulldoze();
        case "bullet_punch":
            return new BulletPunch();
        case "bullet_seed":
            return new BulletSeed();
        case "calm_mind":
            return new CalmMind();
        case "charge":
            return new Charge();
        case "charge_beam":
            return new ChargeBeam();
        case "close_combat":
            return new CloseCombat();
        case "confusion":
            return new Confusion();
        case "cross_chop":
            return new CrossChop();
        case "crunch":
            return new Crunch();
        case "curse":
            return new Curse();
        case "dark_pulse":
            return new DarkPulse();
        case "dazzling_gleam":
            return new DazzlingGleam();
        case "defog":
            return new Defog();
        case "detect":
            return new Detect();
        case "dig":
            return new Dig();
        case "disarming_voice":
            return new DisarmingVoice();
        case "discharge":
            return new Discharge();
        case "dive":
            return new Dive();
        case "double_kick":
            return new DoubleKick();
        case "draco_meteor":
            return new DracoMeteor();
        case "dragon_claw":
            return new DragonClaw();
        case "dragon_dance":
            return new DragonDance();
        case "dragon_pulse":
            return new DragonPulse();
        case "dragon_rush":
            return new DragonRush();
        case "draining_kiss":
            return new DrainingKiss();
        case "drain_punch":
            return new DrainPunch();
        case "dragon_tail":
            return new DragonTail();
        case "double_edge":
            return new DoubleEdge();
        case "dream_eater":
            return new DreamEater();
        case "dual_chop":
            return new DualChop();
        case "dual_wingbeat":
            return new DualWingbeat();
        case "dynamic_punch":
            return new DynamicPunch();
        case "earth_power":
            return new EarthPower();
        case "earthquake":
            return new Earthquake();
        case "echoed_voice":
            return new EchoedVoice();
        case "electro_ball":
            return new ElectroBall();
        case "electroweb":
            return new Electroweb();
        case "ember":
            return new Ember();
        case "energy_ball":
            return new EnergyBall();
        case "extreme_speed":
            return new ExtremeSpeed();
        case "facade":
            return new Facade();
        case "fake_out":
            return new FakeOut();
        case "fiery_dance":
            return new FieryDance();
        case "fire_blast":
            return new FireBlast();
        case "fire_fang":
            return new FireFang();
        case "fire_punch":
            return new FirePunch();
        case "fire_spin":
            return new FireSpin();
        case "flame_charge":
            return new FlameCharge();
        case "flamethrower":
            return new Flamethrower();
        case "flare_blitz":
            return new FlareBlitz();
        case "flash_cannon":
            return new FlashCannon();
        case "flip_turn":
            return new FlipTurn();
        case "focus_blast":
            return new FocusBlast();
        case "focus_punch":
            return new FocusPunch();
        case "force_palm":
            return new ForcePalm();
        case "frenzy_plant":
            return new FrenzyPlant();
        case "fury_cutter":
            return new FuryCutter();
        case "fury_swipes":
            return new FurySwipes();
        case "giga_drain":
            return new GigaDrain();
        case "giga_impact":
            return new GigaImpact();
        case "grass_knot":
            return new GrassKnot();
        case "growth":
            return new Growth();
        case "gunk_shot":
            return new GunkShot();
        case "gust":
            return new Gust();
        case "gyro_ball":
            return new GyroBall();
        case "hammer_arm":
            return new HammerArm();
        case "heal_pulse":
            return new HealPulse();
        case "heat_wave":
            return new HeatWave();
        case "hidden_power":
            return new HiddenPower();
        case "high_jump_kick":
            return new HighJumpKick();
        case "hone_claws":
            return new HoneClaws();
        case "hurricane":
            return new Hurricane();
        case "hydro_cannon":
            return new HydroCannon();
        case "hydro_pump":
            return new HydroPump();
        case "hyper_beam":
            return new HyperBeam();
        case "hypnosis":
            return new Hypnosis();
        case "ice_beam":
            return new IceBeam();
        case "ice_shard":
            return new IceShard();
        case "inferno":
            return new Inferno();
        case "ingrain":
            return new Ingrain();
        case "iron_defense":
            return new IronDefense();
        case "iron_head":
            return new IronHead();
        case "iron_tail":
            return new IronTail();
        case "judgment":
            return new Judgment();
        case "kings_shield":
            return new KingsShield();
        case "last_resort":
            return new LastResort();
        case "leaf_storm":
            return new LeafStorm();
        case "leech_seed":
            return new LeechSeed();
        case "low_sweep":
            return new LowSweep();
        case "life_dew":
            return new LifeDew();
        case "liquidation":
            return new Liquidation();
        case "magnet_rise":
            return new MagnetRise();
        case "mega_drain":
            return new MegaDrain();
        case "mega_kick":
            return new MegaKick();
        case "metal_claw":
            return new MetalClaw();
        case "meteor_mash":
            return new MeteorMash();
        case "metronome":
            return new Metronome();
        case "mimic":
            return new Mimic();
        case "morning_sun":
            return new MorningSun();
        case "mystical_fire":
            return new MysticalFire();
        case "nasty_plot":
            return new NastyPlot();
        case "nuzzle":
            return new Nuzzle();
        case "outrage":
            return new Outrage();
        case "overheat":
            return new Overheat();
        case "payback":
            return new Payback();
        case "pay_day":
            return new PayDay();
        case "play_rough":
            return new PlayRough();
        case "poison_jab":
            return new PoisonJab();
        case "poison_powder":
            return new PoisonPowder();
        case "pound":
            return new Pound();
        case "power_up_punch":
            return new PowerUpPunch();
        case "power_whip":
            return new PowerWhip();
        case "protect":
            return new Protect();
        case "psychic":
            return new Psychic();
        case "pyro_ball":
            return new PyroBall();
        case "quick_attack":
            return new QuickAttack();
        case "quiver_dance":
            return new QuiverDance();
        case "rain_dance":
            return new RainDance();
        case "rapid_spin":
            return new RapidSpin();
        case "razor_leaf":
            return new RazorLeaf();
        case "rest":
            return new Rest();
        case "reversal":
            return new Reversal();
        case "rock_slide":
            return new RockSlide();
        case "rock_smash":
            return new RockSmash();
        case "rock_throw":
            return new RockThrow();
        case "rollout":
            return new Rollout();
        case "roost":
            return new Roost();
        case "sandstorm":
            return new Sandstorm();
        case "sand_tomb":
            return new SandTomb();
        case "scald":
            return new Scald();
        case "scale_shot":
            return new ScaleShot();
        case "scorching_sands":
            return new ScorchingSands();
        case "scratch":
            return new Scratch();
        case "seismic_toss":
            return new SeismicToss();
        case "shadow_ball":
            return new ShadowBall();
        case "shadow_claw":
            return new ShadowClaw();
        case "shadow_sneak":
            return new ShadowSneak();
        case "shell_smash":
            return new ShellSmash();
        case "shock_wave":
            return new ShockWave();
        case "signal_beam":
            return new SignalBeam();
        case "silver_wind":
            return new SilverWind();
        case "skull_bash":
            return new SkullBash();
        case "sleep_powder":
            return new SleepPowder();
        case "sludge":
            return new Sludge();
        case "sludge_bomb":
            return new SludgeBomb();
        case "soft_boiled":
            return new SoftBoiled();
        case "solar_beam":
            return new SolarBeam();
        case "spark":
            return new Spark();
        case "stealth_rock":
            return new StealthRock();
        case "steel_beam":
            return new SteelBeam();
        case "sticky_web":
            return new StickyWeb();
        case "stomping_tantrum":
            return new StompingTantrum();
        case "stone_edge":
            return new StoneEdge();
        case "string_shot":
            return new StringShot();
        case "struggle_bug":
            return new StruggleBug();
        case "substitute":
            return new Substitute();
        case "sucker_punch":
            return new SuckerPunch();
        case "sunny_day":
            return new SunnyDay();
        case "super_fang":
            return new SuperFang();
        case "surf":
            return new Surf();
        case "surging_strikes":
            return new SurgingStrikes();
        case "swagger":
            return new Swagger();
        case "swords_dance":
            return new SwordsDance();
        case "synthesis":
            return new Synthesis();
        case "tackle":
            return new Tackle();
        case "thunder":
            return new Thunder();
        case "thunderbolt":
            return new Thunderbolt();
        case "thunder_punch":
            return new ThunderPunch();
        case "thunder_shock":
            return new ThunderShock();
        case "thrash":
            return new Thrash();
        case "toxic":
            return new Toxic();
        case "toxic_spikes":
            return new ToxicSpikes();
        case "twister":
            return new Twister();
        case "u_turn":
            return new UTurn();
        case "vacuum_wave":
            return new VacuumWave();
        case "venom_drench":
            return new VenomDrench();
        case "venoshock":
            return new Venoshock();
        case "vine_whip":
            return new VineWhip();
        case "volt_switch":
            return new VoltSwitch();
        case "volt_tackle":
            return new VoltTackle();
        case "waterfall":
            return new Waterfall();
        case "water_gun":
            return new WaterGun();
        case "water_pulse":
            return new WaterPulse();
        case "water_spout":
            return new WaterSpout();
        case "weather_ball":
            return new WeatherBall();
        case "Whirlpool":
            return new Whirlpool();
        case "wicked_blow":
            return new WickedBlow();
        case "wild_charge":
            return new WildCharge();
        case "will_o_wisp":
            return new WillOWisp();
        case "wing_attack":
            return new WingAttack();
        case "wish":
            return new Wish();
        case "zap_cannon":
            return new ZapCannon();
        case "zen_headbutt":
            return new ZenHeadbutt();
        default:
            return new Struggle();
    }
}

function Absorb() {
    this.name = "Absorb";
    this.type = "grass";
    this.cat = "special";
    this.bp = 20;
    this.cost = 0;
    this.recoil = -.5;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent and heals user for 50% of damage dealt.";
}

function Agility() {
    this.name = "Agility";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "speed", 2); };
    this.description = "Raises the user's speed by 2 stages.";
}

function AirCutter() {
    this.name = "Air Cutter";
    this.type = "flying";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function AirSlash() {
    this.name = "Air Slash";
    this.type = "flying";
    this.cat = "special";
    this.bp = 75;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.hand.length >= 5) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's hand contains at least 5 cards.";
}

function AllySwitch() {
    this.name = "Ally Switch";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) { switchesLeft = Math.max(1, switchesLeft); };
    this.description = "User regains the opportunity to switch out.";
}

function Amnesia() {
    this.name = "Amnesia";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "spdefense", 2); };
    this.description = "Raises the user's special defense by 2 stages.";
}

function AncientPower() {
    this.name = "Ancient Power";
    this.type = "rock";
    this.cat = "special";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pA.currenthp % 10 == 7) {
            if (pA.statchanges.attack <= 0) boostStat(pA, "attack", 1);
            if (pA.statchanges.defense <= 0) boostStat(pA, "defense", 1);
            if (pA.statchanges.spattack <= 0) boostStat(pA, "spattack", 1);
            if (pA.statchanges.spdefense <= 0) boostStat(pA, "spdefense", 1);
            if (pA.statchanges.speed <= 0) boostStat(pA, "speed", 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If the user's HP ends with 7, raises all non-enhanced stats by one stage.";
}

function AquaTail() {
    this.name = "Aqua Tail";
    this.type = "water";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.statchanges.attack > 0) energy++; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Restores 1 energy if user's attack has been raised.";
}

function Assurance() {
    this.name = "Assurance";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.currenthp <= pA.maxhp / 2) this.bp = 120; else this.bp = 60; };
    this.description = "Deals 60 base power damage to the opponent. Power doubles if user's HP is below 50%.";
}

function AuraSphere() {
    this.name = "Aura Sphere";
    this.type = "fighting";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Avalanche() {
    this.name = "Avalanche";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.currenthp <= pA.maxhp / 2) this.bp = 120; else this.bp = 60; };
    this.description = "Deals 60 base power damage to the opponent. Power doubles if user's HP is below 50%.";
}

function BatonPass() {
    this.name = "Baton Pass";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        switchesLeft += 1;
        removeEffect(pA, "Trap");
        removeEffect(pA, "Trap Damage");
        if (player) {
            team[switchInd[0]].statchanges = JSON.parse(JSON.stringify(pA.statchanges));
            switchPokemon(0);
        }
        pA.statchanges = new StatChanges();
        drawStats(player);
        drawEffects(player);
    };
    this.description = "User shoves off all trapping effects, switches places with the first other party member and transfers all of its stats changes. Resets user's stats changes in the process.";
}

function BeatUp() {
    this.name = "Beat Up";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.multihit = 1;
    this.effect = function (move, pA, pD) {
        if (player) {
            this.multihit = 0;
            for (let p of team) {
                if (p.currenthp > 0)
                    this.multihit++;
            }
        } else
            this.multihit = 1;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent for each non-fainted party member.";
}

function Bite() {
    this.name = "Bite";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pA.discard.length >= 5) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's discard pile contains at least 5 cards.";
}

function BlastBurn() {
    this.name = "Blast Burn";
    this.type = "fire";
    this.cat = "special";
    this.bp = 180;
    this.cost = 3;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Shuffles 2 Recharge into the user's draw pile.";
}

function BlazeKick() {
    this.name = "Blaze Kick";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun")
            applyEffect("burn", 1, pD);
        var c = 0;
        c += Math.max(0, pA.statchanges.attack);
        c += Math.max(0, pA.statchanges.spattack);
        if (c >= 2)
            this.crit = true;
        else
            this.crit = false;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target in the sun. Always results in a critical hit if the user's attack or special attack have been raised at least twice in total.";
}

function Blizzard() {
    this.name = "Blizzard";
    this.type = "ice";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Hail") applyEffect("freeze", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of freeze to the target in the hail.";
}

function BoneRush() {
    this.name = "Bone Rush";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 18;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { boostStat(pD, "attack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times.";
}

function Bounce() {
    this.name = "Bounce";
    this.type = "flying";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new BounceStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Bounce Strike into its deck.";
}

function BounceStrike() {
    this.name = "Bounce Strike";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function BreakingSwipe() {
    this.name = "Breaking Swipe";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "attack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's attack by 1 stage.";
}

function BrickBreak() {
    this.name = "Brick Break";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (effectiveMultiplier(this, pD))
            this.bp = 65;
        else
            this.bp = 45;
    };
    this.description = "Deals 45 base power damage to the opponent. Super effective attacks deal extra damage.";
}

function Brine() {
    this.name = "Brine";
    this.type = "water";
    this.cat = "special";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pD.currenthp < .5 * pD.maxhp)
            this.bp = 120;
        else
            this.bp = 60;
    };
    this.description = "Deals 60 base power damage to the opponent. Base power doubles against targets below 50% of maximum HP.";
}

function BubbleBeam() {
    this.name = "Bubble Beam";
    this.type = "water";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage in the rain.";
}

function BugBuzz() {
    this.name = "Bug Buzz";
    this.type = "bug";
    this.cat = "special";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.discard.length > 0 && pA.discard[pA.discard.length-1].type === "bug") boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special defense by 1 stage if the user's last discarded move is of the bug type.";
}

function BulkUp() {
    this.name = "Bulk Up";
    this.type = "fighting";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 1);
        boostStat(pA, "defense", 1);
    };
    this.description = "Raises user's attack and defense by 1 stage.";
}

function Bulldoze() {
    this.name = "Bulldoze";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage.";
}

function BulletPunch() {
    this.name = "Bullet Punch";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function BulletSeed() {
    this.name = "Bullet Seed";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 18;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times.";
}

function CalmMind() {
    this.name = "Calm Mind";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "spattack", 1);
        boostStat(pA, "spdefense", 1);
    };
    this.description = "Raises the user's special attack and special defense by 1 stage.";
}

function Charge() {
    this.name = "Charge";
    this.type = "electric";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        applyEffect("charge", 1, pA);
        boostStat(pA, "spdefense", 1);
    };
    this.description = "Raises the user's special defense by 1 stage. Applies 1 stack of charge to the user.";
}

function ChargeBeam() {
    this.name = "Charge Beam";
    this.type = "electric";
    this.cat = "special";
    this.bp = 10;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (energy >= 4) {
            energy++;
            boostStat(pA, "spattack", 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises the user's special attack by 1 stage and restores 1 energy if energy is at least 5 upon use.";
}

function CloseCombat() {
    this.name = "Close Combat";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pA.currenthp < pD.currenthp) {
            boostStat(pA, "defense", -1);
            boostStat(pA, "spdefense", -1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's defense and special defense by 1 stage unless its HP is higher than the target's.";
}

function Confusion() {
    this.name = "Confusion";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function CrossChop() {
    this.name = "Cross Chop";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) { this.crit = pA.currenthp < .4 * pA.maxhp; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit if user's HP is below 40% of maximum HP.";
}

function Crunch() {
    this.name = "Crunch";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Curse() {
    this.name = "Curse";
    this.type = "ghost";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (contains(pA.types, "ghost")) {
            dealDamage(pA.maxhp * .25, pA);
            applyEffect("curse", 1, pD);
        } else {
            boostStat(pA, "attack", 1);
            boostStat(pA, "defense", 1);
            boostStat(pA, "speed", -1);
        }
    };
    this.description = "Raises user's attack and defense by 1 stage and lowers speed by 1 stage. Different effect for ghost type Pokémon.";
}

function DarkPulse() {
    this.name = "Dark Pulse";
    this.type = "dark";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (isScared(pD)) this.bp = 120; else this.bp = 80; };
    this.description = "Deals 80 base power damage to the opponent. Damage increases against frightened foes.";
}

function DazzlingGleam() {
    this.name = "Dazzling Gleam";
    this.type = "fairy";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Defog() {
    this.name = "Defog";
    this.type = "flying";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        drawMove(pA, false);
        drawMove(pA, false);
        removeEffect(opponent, "Stealth Rock");
        removeEffect(opponent, "Spikes");
        removeEffect(opponent, "Toxic Spikes");
        removeEffect(opponent, "Sticky Web");
        for (let p of t) {
            removeEffect(p, "Stealth Rock");
            removeEffect(p, "Spikes");
            removeEffect(p, "Toxic Spikes");
            removeEffect(p, "Sticky Web");
        }
    };
    this.description = "Removes all hazards from both sides of the terrain. Draw 2 cards.";
}

function Detect() {
    this.name = "Detect";
    this.type = "fighting";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("protection", 1, pA); };
    this.description = "Applies one stack of protection to the user.";
}

function Dig() {
    this.name = "Dig";
    this.type = "ground";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new DigStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Dig Strike into its deck.";
}

function DigStrike() {
    this.name = "Dig Strike";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function DisarmingVoice() {
    this.name = "Disarming Voice";
    this.type = "fairy";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Discharge() {
    this.name = "Discharge";
    this.type = "electric";
    this.cat = "special";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) {
        if (energy >= 3)
            applyEffect("paralysis", 1, pD);
        this.bp = 50 * energy;
        energy = 0;
    };
    this.description = "Deals 50 base power damage per energy point left to the opponent. Consumes all energy left. Applies 1 stack of paralysis to the target is at least 3 energy has been used.";
}

function Dive() {
    this.name = "Dive";
    this.type = "water";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new DiveStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Dive Strike into its deck.";
}

function DiveStrike() {
    this.name = "Dive Strike";
    this.type = "water";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function DoubleEdge() {
    this.name = "Double Edge";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 2;
    this.recoil = .33;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 33% recoil.";
}

function DoubleKick() {
    this.name = "Double Kick";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 25;
    this.cost = 1;
    this.multihit = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent twice.";
}

function DracoMeteor() {
    this.name = "Draco Meteor";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 130;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.hand) {
            if (m.type === "dragon")
                c++;
        }
        if (c < 3)
            boostStat(pA, "spattack", -2);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's special attack by 2 stages unless it has 2 other dragon type moves in hand.";
}

function DragonClaw() {
    this.name = "Dragon Claw";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        this.bp = 70;
        for (let m of pA.moves) {
            if (m.type === "dragon")
                this.bp += 10;
        }
    };
    this.description = "Deals 70 base power damage to the opponent. Base damage increases by 10 for each dragon move in the user's deck.";
}

function DragonDance() {
    this.name = "Dragon Dance";
    this.type = "dragon";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 1);
        boostStat(pA, "speed", 1);
    };
    this.description = "Raises the user's attack and speed by 1 stage.";
}

function DragonPulse() {
    this.name = "Dragon Pulse";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.moves) {
            if (m.type === "dragon")
                c++;
        }
        if (c >= 3)
            boostStat(pA, "spattack", 1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises the user's special attack by 1 stage if its deck contains at least 3 dragon moves.";
}

function DragonRush() {
    this.name = "Dragon Rush";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pA.discard.findIndex(e => e.type === "dragon") >= 0)
            applyEffect("fear", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the opponent if the user's discard pile contains at least 1 dragon move.";
}

function DragonTail() {
    this.name = "Dragon Tail";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var i = pA.discard.findIndex(e => e.type === "dragon");
        if (i >= 0) {
            pA.hand.push(pA.discard[i]);
            pA.discard.splice(i, 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fetches the first dragon type move in the user's discard pile and places it into its hand.";
}

function DrainingKiss() {
    this.name = "Draining Kiss";
    this.type = "fairy";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.recoil = -.75;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Heals user for 75% of damage dealt.";
}

function DrainPunch() {
    this.name = "Drain Punch";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.recoil = -.5;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Heals user for 50% of damage dealt.";
}

function DreamEater() {
    this.name = "Dream Eater";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.recoil = -.5;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (isAsleep(pD)) {
            this.fails = false;
            removeEffect(pD, "Sleep");
        } else {
            this.fails = true;
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent and heals user for 50% damage dealt. Fails unless target is asleep and wakes it up.";
}

function DualChop() {
    this.name = "Dual Chop";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 2;
    this.multihit = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent twice.";
}

function DualWingbeat() {
    this.name = "Dual Wingbeat";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 2;
    this.multihit = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent twice.";
}

function DynamicPunch() {
    this.name = "Dynamic Punch";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (pA.currenthp >= pD.currenthp) {
            this.fails = false;
            applyEffect("confusion", 1, pD);
        } else
            this.fails = true;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent and applies 1 stack of confusion to it. Fails unless user's HP is higher than target's HP.";
}

function EarthPower() {
    this.name = "Earth Power";
    this.type = "ground";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special defense by 1 stage if this move is super effective.";
}

function Earthquake() {
    this.name = "Earthquake";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 140;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function EchoedVoice() {
    this.name = "Echoed Voice";
    this.type = "normal";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        var next = new EchoedVoice();
        next.bp = this.bp + 20;
        next.description = "Deals " + next.bp + " base power damage to the opponent. Base power increases with each use.";
        pA.discard.push(next);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
}

function ElectroBall() {
    this.name = "Electro Ball";
    this.type = "electric";
    this.cat = "special";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.min(125, Math.max(25, 25 * (pA.speed * statsChangeMultiplier ** pA.statchanges.speed + 1) / (pD.speed * statsChangeMultiplier ** pD.statchanges.speed + 1))) };
    this.description = "Deals between 25 and 125 base power damage to the opponent, depending on how fast the user is compared to the target.";
}

function Electroweb() {
    this.name = "Electroweb";
    this.type = "electric";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage.";
}

function Ember() {
    this.name = "Ember";
    this.type = "fire";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function EnergyBall() {
    this.name = "Energy Ball";
    this.type = "grass";
    this.cat = "special";
    this.bp = 80;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sun") boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special defense by 1 stage under the sun.";
}

function ExtremeSpeed() {
    this.name = "Extreme Speed";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { drawMove(pA, false); drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw 2 cards.";
}

function Facade() {
    this.name = "Facade";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (isBurned(pA) || isPoisoned(pA))
            this.bp = 140;
        else
            this.bp = 70;
    };
    this.description = "Deals 70 base power damage to the opponent. Base power doubles if user is poisoned or burned.";
}

function FakeOut() {
    this.name = "Fake Out";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 30;
    this.cost = 1;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (energy >= 4) {
            drawMove(pA, false);
            applyEffect("fear", 1, pD);
            this.fails = true;
        } else
            this.fails = false;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target. Draw a card. Fails if energy is below 5 upon use.";
}

function FieryDance() {
    this.name = "Fiery Dance";
    this.type = "fire";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pA, "spattack", 1) };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's special attack by one stage if the move is super effective.";
}

function FireBlast() {
    this.name = "Fire Blast";
    this.type = "fire";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sun") applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target under the sun.";
}

function FireFang() {
    this.name = "Fire Fang";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun") applyEffect("burn", 1, pD);
        if (pA.statchanges.attack > 0) applyEffect("fear", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target in the sun. Applies 1 stack of fear to the target if the user's attack has been raised.";
}

function FirePunch() {
    this.name = "Fire Punch";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (isBurned(pD)) applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target if it's burned already.";
}

function FireSpin() {
    this.name = "Fire Spin";
    this.type = "fire";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 3, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 3 turns.";
}

function FlameCharge() {
    this.name = "Flame Charge";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "speed", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises the user's speed by 1 stage.";
}

function Flamethrower() {
    this.name = "Flamethrower";
    this.type = "fire";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function FlareBlitz() {
    this.name = "Flare Blitz";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 2;
    this.recoil = .33;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 33% recoil.";
}

function FlashCannon() {
    this.name = "Flash Cannon";
    this.type = "steel";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function FlipTurn() {
    this.name = "Flip Turn";
    this.type = "water";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        switchesLeft = 1;
        removeEffect(pA, "Trap");
        removeEffect(pA, "Trap Damage");
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. User regains the opportunity to switch out and loses all trapping effects.";
}

function FocusBlast() {
    this.name = "Focus Blast";
    this.type = "fighting";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (pA.currenthp < .3 * pA.maxhp) boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special defense by 1 stage if user's HP is below 30%.";
}

function FocusPunch() {
    this.name = "Focus Punch";
    this.type = "fighting";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ChargedFocusPunch());
    };
    this.description = "Shuffles a Charged Focus Punch into the user's deck.";
}

function ChargedFocusPunch() {
    this.name = "Charged Focus Punch";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 150;
    this.cost = 0;
    this.exhaust = true;
    this.fails = false;
    this.effect = function (move, pA, pD) { this.fails = pA.currenthp < .7 * pA.maxhp; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fails unless user's HP is higher than 70% of its maximum HP. Exhaust.";
}

function ForcePalm() {
    this.name = "Force Palm";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pD.currenthp < .3 * pD.maxhp) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target if its HP is below 30%.";
}

function FrenzyPlant() {
    this.name = "Frenzy Plant";
    this.type = "grass";
    this.cat = "special";
    this.bp = 180;
    this.cost = 3;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Shuffles 2 Recharge into the user's draw pile.";
}

function FuryCutter() {
    this.name = "Fury Cutter";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        var next = new FuryCutter();
        next.bp = this.bp + 20;
        next.description = "Deals " + next.bp + " base power damage to the opponent. Base power increases with each use.";
        pA.discard.push(next);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
}

function FurySwipes() {
    this.name = "Fury Swipes";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 18;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times.";
}

function GigaDrain() {
    this.name = "Giga Drain";
    this.type = "grass";
    this.cat = "special";
    this.bp = 75;
    this.cost = 2;
    this.recoil = -.5;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent and heals user for 50% damage dealt.";
}

function GigaImpact() {
    this.name = "GigaImpact";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 350;
    this.cost = 5;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Shuffles 3 Recharge into the user's draw pile.";
}

function GrassKnot() {
    this.name = "Grass Knot";
    this.type = "grass";
    this.cat = "special";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, Math.min(125, 25 * 180 / (pD.speed * statsChangeMultiplier ** pD.statchanges.speed + 1))) };
    this.description = "Deals up to 125 base power damage to the opponent depending on how slow it is.";
}

function Growth() {
    this.name = "Growth";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 1 + (weather != undefined && weather.name === "Sun"));
        boostStat(pA, "spattack", 1 + (weather != undefined && weather.name === "Sun"));
    };
    this.description = "Raises the user's attack and special attack by 1 stage. Double this effect under the sun.";
}

function GunkShot() {
    this.name = "Gunk Shot";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { this.bp = isPoisoned(pD) ? 180 : 130; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Increased base power against poisoned foes.";
}

function Gust() {
    this.name = "Gust";
    this.type = "flying";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function GyroBall() {
    this.name = "Gyro Ball";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.min(125, Math.max(25, 25 * (pD.speed * statsChangeMultiplier ** pD.statchanges.speed + 1) / (pA.speed * statsChangeMultiplier ** pA.statchanges.speed + 1))) };
    this.description = "Deals between 25 and 125 base power damage to the opponent, depending on how slow the user is compared to the target.";
}

function HammerArm() {
    this.name = "Hammer Arm";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's speed by one stage.";
}

function HealPulse() {
    this.name = "Heal Pulse";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (contains(team, pA)) {
            for (let p of team) {
                if (p.currenthp > 0)
                    dealDamage(-p.maxhp * .1, p);
            }
            drawHealthBar(1);
            drawHealthBar(2);
        } else {
            dealDamage(-pA.maxhp * .1, pA);
        }
    };
    this.description = "Heals all Pokémon in the user's party for 10% of maximum HP.";
}

function HeatWave() {
    this.name = "Heat Wave";
    this.type = "fire";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun")
            this.bp = 110;
        else
            this.bp = 70;
    };
    this.description = "Deals 70 base power damage to the opponent. Base power increases under the sun.";
}

function HiddenPower() {
    this.name = "Hidden Power";
    this.type = types[Math.floor(Math.random() * types.length)];
    this.cat = "special";
    this.bp = 60;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.type = types[Math.floor(Math.random() * types.length)]; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Changes type randomly after each use.";
}

function HighJumpKick() {
    this.name = "High Jump Kick";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (doesBlock(pD) || effectiveMultiplier(this, pD) == 0) dealDamage(150, pA); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals heavy damage to the user if the move is used and doesn't hit.";
}

function HoneClaws() {
    this.name = "Hone Claws";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 1);
        var c = 0;
        for (let m of pA.hand) {
            if (m.cat !== "status")
                c++;
        }
        if (c > 0) {
            var i = Math.floor(Math.random() * c);
            var move;
            for (let m of pA.hand) {
                if (m.cat !== "status" && i == 0)
                    move = m;
                else if (m.cat !== "status")
                    i--;
            }
            move.crit = true;
            if (!move.description.includes("Always results in a critical hit."))
                move.description += " Always results in a critical hit.";
        }
    };
    this.description = "Raises user's attack by 1 stage. A random offensive move in the user's hand will now hit critically.";
}

function Hurricane() {
    this.name = "Hurricane";
    this.type = "flying";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") applyEffect("confusion", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of confusion to the target in the rain.";
}

function HydroCannon() {
    this.name = "Hydro Cannon";
    this.type = "water";
    this.cat = "special";
    this.bp = 180;
    this.cost = 3;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Shuffles 2 Recharge into the user's draw pile.";
}

function HydroPump() {
    this.name = "Hydro Pump";
    this.type = "water";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") this.bp = 180; else this.bp = 130; };
    this.description = "Deals 110 base power damage to the opponent. Base power increases in the rain.";
}

function HyperBeam() {
    this.name = "Hyper Beam";
    this.type = "normal";
    this.cat = "special";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) {
        this.bp = 50 * energy;
        energy = 0;
    };
    this.description = "Deals 50 base power damage per energy point left to the opponent. Consumes all energy left.";
}

function Hypnosis() {
    this.name = "Hypnosis";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("sleep", 1, pD); };
    this.description = "Applies 1 stack of sleep to the opponent.";
}

function IceBeam() {
    this.name = "Ice Beam";
    this.type = "ice";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Hail") applyEffect("freeze", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of freeze to the target in the hail.";
}

function IceShard() {
    this.name = "Ice Shard";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function Inferno() {
    this.name = "Inferno";
    this.type = "fire";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun") {
            this.fails = false;
            applyEffect("burn", 2, pD);
        } else
            this.fails = true;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent and applies 2 stacks of burn. Fails if not under the sun.";
}

function Ingrain() {
    this.name = "Ingrain";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) {
        applyEffect("ingrain", 1, pA);
        applyEffect("trap", 1, pA);
        applyEffect("grounded", 1, pA);
    };
    this.description = "Restores 20HP at the end of each turn. User can no longer switch out and is grounded.";
}

function IronDefense() {
    this.name = "Iron Defense";
    this.type = "steel";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "defense", 2); };
    this.description = "Raises user's defense by 2 stages.";
}

function IronHead() {
    this.name = "Iron Head";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.statchanges.defense > 0) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's defense has been raised.";
}

function IronTail() {
    this.name = "Iron Tail";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.statchanges.defense > 0) boostStat(pD, "defense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lower's target's defense by 1 stage if user's defense has been raised.";
}

function Judgment() {
    this.name = "Judgment";
    this.type = "normal";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.type = pA.types[0]; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Changes type to match that of the user.";
}

function KingsShield() {
    this.name = "King's Shield";
    this.type = "steel";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("kings_protection", 1, pA); };
    this.description = "Applies one stack of protection to the user. Pokémon making contact with the user have their attack lowered by one stage.";
}

function LastResort() {
    this.name = "Last Resort";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 140;
    this.cost = 2;
    this.fails = false;
    this.effect = function (move, pA, pD) { if (pA.hand.length > 1) this.fails = true; else this.fails = false; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fails unless it is the last card in the user's hand.";
}

function LeafStorm() {
    this.name = "Leaf Storm";
    this.type = "grass";
    this.cat = "special";
    this.bp = 130;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "spattack", -2); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's special attack by 2 stages.";
}

function LeechSeed() {
    this.name = "Leech Seed";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { applyEffect("leech_seed", 5, pD); };
    this.description = "Drains a little HP from the opponent at the end of every turn for 5 turns. Grass type Pokémon are immune.";
}

function LowSweep() {
    this.name = "Low Sweep";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage.";
}

function LifeDew() {
    this.name = "Life Dew";
    this.type = "water";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (contains(team, pA)) {
            for (let p of team) {
                if (p.currenthp > 0)
                    dealDamage(-p.maxhp * .05, p);
            }
            drawHealthBar(1);
            drawHealthBar(2);
        } else {
            dealDamage(-pA.maxhp * .05, pA);
        }
    };
    this.description = "Heals all Pokémon in the user's party for 5% of maximum HP.";
}

function Liquidation() {
    this.name = "Liquidation";
    this.type = "water";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") boostStat(pD, "defense", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's defense by 1 stage in the rain.";
}

function MagnetRise() {
    this.name = "Magnet Rise";
    this.type = "electric";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("levitation", 5, pA); };
    this.description = "Applies 5 stacks of levitation to the user.";
}

function MegaDrain() {
    this.name = "Mega Drain";
    this.type = "grass";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.recoil = -.5;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent and heals user for 50% damage dealt.";
}

function MegaKick() {
    this.name = "Mega Kick";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 150;
    this.cost = 3;
    this.fails = false;
    this.effect = function (move, pA, pD) { this.fails = (pA.statchanges.attack > 0 || pA.statchanges.defense > 0 || pA.statchanges.spattack > 0 || pA.statchanges.spdefense > 0 || pA.statchanges.speed > 0); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fails unless user has a raised stat.";
}

function MetalClaw() {
    this.name = "Metal Claw";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function MeteorMash() {
    this.name = "Meteor Mash";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.statchanges.defense > 0) boostStat(pA, "attack", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's attack by 1 stage if its defense has been raised.";
}

function Metronome() {
    this.name = "Metronome";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        var m = createMove(movesList[Math.floor(Math.random() * movesList.length)])
        m.cost = Math.max(0, m.cost - 1);
        pA.hand.push(m);
    };
    this.description = "Adds a random move to the user's hand and lowers its cost by 1.";
}

function Mimic() {
    this.name = "Mimic";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (pD.discard.length > 0) {
            var m = JSON.parse(JSON.stringify(pD.discard[pD.discard.length - 1]))
            m.effect = pD.discard[pD.discard.length - 1].effect.bind(m);
            m.exhaust = true;
            if (!m.description.includes("Exhaust."))
                m.description += " Exhaust.";
            pA.hand.push(m);
            this.fails = false;
        } else
            this.fails = true;
    };
    this.description = "Creates a copy with exhaust of the last card in the target's discard pile in the user's hand. Fails if target's discard pile is empty.";
}

function MorningSun() {
    this.name = "Morning Sun";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined) {
            if (weather.name === "Sun")
                dealDamage(-pA.maxhp * .3, pA);
            else
                dealDamage(-pA.maxhp * .1, pA);
        } else
            dealDamage(-pA.maxhp * .2, pA);
    };
    this.description = "Restores 20% of maximum HP. Varies depending on the weather.";
}

function MysticalFire() {
    this.name = "Mystical Fire";
    this.type = "fire";
    this.cat = "special";
    this.bp = 75;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special attack by 1 stage.";
}

function NastyPlot() {
    this.name = "Nasty Plot";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "spattack", 2); };
    this.description = "Raises user's special attack by 2 stages.";
}

function Nuzzle() {
    this.name = "Nuzzle";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the opponent.";
}

function Outrage() {
    this.name = "Outrage";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        pA.hand.push(new Outrage());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Remains in hand.";
}

function Overheat() {
    this.name = "Overheat";
    this.type = "fire";
    this.cat = "special";
    this.bp = 130;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "spattack", -2); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's special attack by 2 stages.";
}

function Payback() {
    this.name = "Payback";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (pA.speed * statsChangeMultiplier ** pA.statchanges.speed < pD.speed * statsChangeMultiplier ** pD.statchanges.speed)
            this.bp = 60;
        else
            this.bp = 40;
    };
    this.description = "Deals 40 base power damage to the opponent. Deals 50% extra damage if the user is slower than its foe.";
}

function PayDay() {
    this.name = "Pay Day";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 25;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (player) money += 50; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Gain " + String.fromCharCode(08381) + "50.";
}

function PlayRough() {
    this.name = "Play Rough";
    this.type = "fairy";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pD, "attack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's attack by one stage if the move is super effective.";
}

function Pound() {
    this.name = "Pound";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function PoisonJab() {
    this.name = "Poison Jab";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (isPoisoned(pD)) boostStat(pA, "attack", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's attack by 1 stage if target is poisoned.";
}

function PoisonPowder() {
    this.name = "Poison Powder";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("poison", 4, pD); };
    this.description = "Applies 4 stacks of poison to the opponent.";
}

function PowerUpPunch() {
    this.name = "Power-Up Punch";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "attack", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's attack by one stage.";
}

function PowerWhip() {
    this.name = "Power Whip";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 140;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Protect() {
    this.name = "Protect";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("protection", 1, pA); };
    this.description = "Applies one stack of protection to the user.";
}

function Psychic() {
    this.name = "Psychic";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.draw.length >= 5) boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers its special defense by one stage if the user's draw pile contains at least 5 cards.";
}

function PyroBall() {
    this.name = "Pyro Ball";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 150;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function QuickAttack() {
    this.name = "Quick Attack";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function QuiverDance() {
    this.name = "Quiver Dance";
    this.type = "bug";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "spattack", 1);
        boostStat(pA, "spdefense", 1);
        boostStat(pA, "speed", 1);
    };
    this.description = "Raises user's special attack, special defense and speed by 1 stage.";
}

function RainDance() {
    this.name = "Rain Dance";
    this.type = "water";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { setWeather("rain", 5); };
    this.description = "Sets the weather to rain for 5 turns.";
}

function RapidSpin() {
    this.name = "Rapid Spin";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        drawMove(pA, false);
        var t = team
        if (!player)
            t = [opponent]
        for (let p of t) {
            removeEffect(p, "Leech Seed");
            removeEffect(p, "Stealth Rock");
            removeEffect(p, "Spikes");
            removeEffect(p, "Toxic Spikes");
            removeEffect(p, "Sticky Web");
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Removes hazards and seeds from the user's team. Draw a card.";
}

function RazorLeaf() {
    this.name = "Razor Leaf";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function Rest() {
    this.name = "Rest";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        dealDamage(-pA.maxhp * .3, pA);
        applyEffect("sleep", 3, pA);
        removeEffect(pA, "Burn");
        removeEffect(pA, "Poison");
        removeEffect(pA, "Paralysis");
        removeEffect(pA, "Freeze");
    };
    this.description = "Applies 3 stacks of sleep to the user and restores 30% of its maximum HP. Removes status afflictions.";
}

function Reversal() {
    this.name = "Reversal";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, 200 * (1 - pA.currenthp / pA.maxhp)); };
    this.description = "Deals up to 200 base power damage to the opponent, depending on how low user's HP is.";
}

function Rollout() {
    this.name = "Rollout";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        var next = new Rollout();
        next.bp = this.bp + 20;
        next.description = "Deals " + next.bp + " base power damage to the opponent. Base power increases with each use.";
        pA.discard.push(next);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
}

function RockSmash() {
    this.name = "Rock Smash";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function RockSlide() {
    this.name = "Rock Slide";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sandstorm") applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target in the sandstorm.";
}

function RockThrow() {
    this.name = "Rock Throw";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Roost() {
    this.name = "Roost";
    this.type = "flying";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { dealDamage(-pA.maxhp * .2, pA); };
    this.description = "Recover 20% of maximum HP.";
}

function SandTomb() {
    this.name = "Sand Tomb";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 3, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 3 turns.";
}

function Sandstorm() {
    this.name = "Sandstorm";
    this.type = "rock";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { setWeather("sandstorm", 5); };
    this.description = "Sets the weather to sandstorm for 5 turns.";
}

function Scald() {
    this.name = "Scald";
    this.type = "water";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) >= 1) applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target if this attack deals normal or super effective damage.";
}

function ScaleShot() {
    this.name = "Scale Shot";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 30;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "speed", 1);
        boostStat(pA, "defense", -1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times. Raises the user's speed by 1 stage and lowers its defense by 1 stage.";
}

function ScorchingSands() {
    this.name = "Scorching Sands";
    this.type = "ground";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target.";
}

function Scratch() {
    this.name = "Scratch";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function SeismicToss() {
    this.name = "Seismic Toss";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { dealDamage(40, pD); };
    this.description = "Deals 40 damage to the opponent.";
}

function ShadowBall() {
    this.name = "Shadow Ball";
    this.type = "ghost";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pD.statchanges.defense < 0 || pD.statchanges.defense < 0)
            boostStat(pD, "spdefense", -1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If target has a lowered defensive stat, lowers its special defense by one stage.";
}

function ShadowClaw() {
    this.name = "Shadow Claw";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 60;
    this.cost = 2;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function ShadowSneak() {
    this.name = "Shadow Sneak";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function ShellSmash() {
    this.name = "Shell Smash";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 2);
        boostStat(pA, "spattack", 2);
        boostStat(pA, "speed", 2);
        boostStat(pA, "defense", -1);
        boostStat(pA, "spdefense", -1);
    };
    this.description = "Raises the user's attack, special attack and speed by 2 stages and lowers its defense and special defense by 1 stage.";
}

function ShockWave() {
    this.name = "Shock Wave";
    this.type = "electric";
    this.cat = "special";
    this.bp = 30;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (energy == 0) this.bp = 60; else this.bp = 30; };
    this.description = "Deals 30 base power damage to the opponent. Base power doubles if user's energy reaches 0 upon use.";
}

function SignalBeam() {
    this.name = "Signal Beam";
    this.type = "bug";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.draw) {
            c += m.type === "bug";
        }
        if (c >= 2)
            applyEffect("confusion", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of confusion to the target if the user's draw pile contains at least 2 bug type moves.";
}

function SilverWind() {
    this.name = "Silver Wind";
    this.type = "bug";
    this.cat = "special";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (pA.currenthp % 10 == 1) {
            if (pA.statchanges.attack <= 0) boostStat(pA, "attack", 1);
            if (pA.statchanges.defense <= 0) boostStat(pA, "defense", 1);
            if (pA.statchanges.spattack <= 0) boostStat(pA, "spattack", 1);
            if (pA.statchanges.spdefense <= 0) boostStat(pA, "spdefense", 1);
            if (pA.statchanges.speed <= 0) boostStat(pA, "speed", 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If the user's HP ends with 1, raises all non-enhanced stats by one stage.";
}

function SkullBash() {
    this.name = "Skull Bash";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 3;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ChargedSkullBash());
        boostStat(pA, "defense", 1);
    };
    this.description = "Raises the user's defense by 1 stage and shuffles a Charged Skull Bash into its deck.";
}

function ChargedSkullBash() {
    this.name = "Charged Skull Bash";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 150;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function SleepPowder() {
    this.name = "Sleep Powder";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("sleep", 1, pD); };
    this.description = "Applies 1 stack of sleep to the opponent.";
}

function Sludge() {
    this.name = "Sludge";
    this.type = "poison";
    this.cat = "special";
    this.bp = 30;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i == -1 || pD.effects[i].stacks <= 0)
            applyEffect("poison", 4, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If target isn't poisoned, applies 4 stacks of poison to it.";
}

function SludgeBomb() {
    this.name = "Sludge Bomb";
    this.type = "poison";
    this.cat = "special";
    this.bp = 80;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i == -1 || pD.effects[i].stacks > 0)
            applyEffect("poison", 4, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If target is poisoned, applies 4 stacks of poison to it.";
}

function SoftBoiled() {
    this.name = "Soft Boiled";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { dealDamage(-pA.maxhp * .2, pA); };
    this.description = "Recover 20% of maximum HP.";
}

function SolarBeam() {
    this.name = "Solar Beam";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun")
            pA.hand.push(new ChargedSolarBeam());
        else
            pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ChargedSolarBeam());
    };
    this.description = "Shuffles a Charged Solar Beam into the user's deck. Under the sun, places it in the user's hand instead.";
}

function ChargedSolarBeam() {
    this.name = "Charged Solar Beam";
    this.type = "grass";
    this.cat = "special";
    this.bp = 120;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function Spark() {
    this.name = "Spark";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 65;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.hand.length >= 5) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis if the user's hand contains 5 or more cards.";
}

function StealthRock() {
    this.name = "Stealth Rock";
    this.type = "rock";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (player)
            applyEffect("stealth_rock", 1, pD)
        else {
            for (let p of team) {
                applyEffect("stealth_rock", 1, p)
            }
        }
    };
    this.description = "Sends sharp stones flying around the opposing team. Deals moderate rock type damage at the end of each turn.";
}

function SteelBeam() {
    this.name = "Steel Beam";
    this.type = "steel";
    this.cat = "special";
    this.bp = 200;
    this.cost = 3;
    this.recoil = 0;
    this.effect = function (move, pA, pD) {
        this.recoil = .5 - .1 * (pA.statchanges.attack > 0 + pA.statchanges.defense > 0 + pA.statchanges.spattack > 0 + pA.statchanges.spdefense > 0 + pA.statchanges.speed > 0);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Recoil is 50% - 10% per user stat raised.";
}

function StickyWeb() {
    this.name = "Sticky Web";
    this.type = "bug";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (player)
            applyEffect("sticky_web", 1, pD)
        else {
            for (let p of team) {
                applyEffect("sticky_web", 1, p)
            }
        }
    };
    this.description = "Sets a sticky web around the opposing team to reduce their speed at the end of each turn if it hasn't been lowered already and is the Pokémon is grounded.";
}

function StoneEdge() {
    this.name = "Stone Edge";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 130;
    this.cost = 3;
    this.crit = false;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sandstorm") this.crit = true; else this.crit = false; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit in a sandstorm.";
}

function StompingTantrum() {
    this.name = "Stomping Tantrum";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (doesBlock(pD)) boostStat(pA, "attack", 1); };
    this.description = "Deals 70 base power damage to the opponent. Raises user's attack by one stage if target is blocking.";
}

function StruggleBug() {
    this.name = "Struggle Bug";
    this.type = "bug";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent and lowers its special attack by one stage.";
}

function StringShot() {
    this.name = "String Shot";
    this.type = "bug";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -2); };
    this.description = "Lowers target's speed by 2 stages.";
}

function Substitute() {
    this.name = "Substitute";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        dealDamage(30, pA);
        applyEffect("protection", 2, pA);
    };
    this.description = "User takes 30 damage and gains 2 stacks of protection.";
}

function SuckerPunch() {
    this.name = "Sucker Punch";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 1;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        this.fails = pD.discard.findIndex(e => e.cat !== "status") >= 0;
        drawMove(pA, false);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent and draw a card. Fails unless target has an offensive move in its discard pile.";
}

function SunnyDay() {
    this.name = "Sunny Day";
    this.type = "fire";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        setWeather("sun", 5);
    };
    this.description = "Sets the weather to sun.";
}

function SuperFang() {
    this.name = "Super Fang";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, 100 * pD.currenthp / pD.maxhp); };
    this.description = "Deals up to 100 base power damage to the opponent, depending on how high its HP is.";
}

function Surf() {
    this.name = "Surf";
    this.type = "water";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { setWeather("rain", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Sets the weather to rain this turn only.";
}

function SurgingStrikes() {
    this.name = "Surging Strikes";
    this.type = "water";
    this.cat = "physical";
    this.bp = 30;
    this.cost = 3;
    this.multihit = 3;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times. Always results in a critical hit.";
}

function Swagger() {
    this.name = "Swagger";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pD, "attack", 2); applyEffect("confusion", 2, pD); };
    this.description = "Raises target's attack by 2 stages and applies 2 stacks of confusion to it.";
}

function SwordsDance() {
    this.name = "Swords Dance";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "attack", 2); };
    this.description = "Raises user's attack by 2 stages.";
}

function Synthesis() {
    this.name = "Synthesis";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined) {
            if (weather.name === "Sun")
                dealDamage(-pA.maxhp * .3, pA);
            else
                dealDamage(-pA.maxhp * .1, pA);
        } else
            dealDamage(-pA.maxhp * .2, pA);
    };
    this.description = "Restores 20% of maximum HP. Varies depending on the weather.";
}

function Tackle() {
    this.name = "Tackle";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Thrash() {
    this.name = "Thrash";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        pA.hand.push(new Thrash());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Remains in hand.";
}

function Thunder() {
    this.name = "Thunder";
    this.type = "electric";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target in the rain.";
}

function Thunderbolt() {
    this.name = "Thunderbolt";
    this.type = "electric";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (energy == 1) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target if user's energy is 3 upon use.";
}

function ThunderPunch() {
    this.name = "Thunder Punch";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (energy == 2) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target if user's energy is 4 upon use.";
}

function ThunderShock() {
    this.name = "Thunder Shock";
    this.type = "electric";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Toxic() {
    this.name = "Toxic";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i != -1 && pD.effects[i].stacks >= 10)
            applyEffect("poison", pD.effects[i].stacks, pD);
        else
            applyEffect("poison", 6, pD);
    };
    this.description = "If the opponent has less than 10 stacks of poison, applies 6 stacks of poison to them. Otherwise, doubles their stacks.";
}

function ToxicSpikes() {
    this.name = "Toxic Spikes";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (player)
            applyEffect("toxic_spikes", 1, pD)
        else {
            for (let p of team) {
                applyEffect("toxic_spikes", 1, p)
            }
        }
    };
    this.description = "Scatters toxic spikes around the opposing team, applying 4 stacks of poison per stack of spikes (maximum 2) to grounded Pokémon at the end of each turn.";
}

function Twister() {
    this.name = "Twister";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function UTurn() {
    this.name = "U-Turn";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        switchesLeft = 1;
        removeEffect(pA, "Trap");
        removeEffect(pA, "Trap Damage");
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. User regains the opportunity to switch out and loses all trapping effects.";
}

function VacuumWave() {
    this.name = "Vacuum Wave";
    this.type = "fighting";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function VenomDrench() {
    this.name = "Venom Drench";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i != -1 && pD.effects[i].stacks > 0) {
            boostStat(pD, "attack", -1);
            boostStat(pD, "spattack", -1);
            boostStat(pD, "speed", -1);
        }
    };
    this.description = "Lowers the opponent's attack, special attack and speed by 1 stage if it's poisoned.";
}

function Venoshock() {
    this.name = "Venoshock";
    this.type = "poison";
    this.cat = "special";
    this.bp = 65;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i != -1 && pD.effects[i].stacks > 0)
            this.bp = 130;
        else
            this.bp = 65;
    };
    this.description = "Deals 65 base power damage to the opponent. Base power doubles if target is poisoned.";
}

function VineWhip() {
    this.name = "Vine Whip";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function VoltSwitch() {
    this.name = "Volt Switch";
    this.type = "electric";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        switchesLeft = 1;
        removeEffect(pA, "Trap");
        removeEffect(pA, "Trap Damage");
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. User regains the opportunity to switch out and loses all trapping effects.";
}

function VoltTackle() {
    this.name = "Volt Tackle";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 2;
    this.recoil = .33;
    this.effect = function (move, pA, pD) { if (isParalyzed(pD)) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 33% recoil. Applies 1 stack of paralysis to the target if it's paralyzed already.";
}

function Waterfall() {
    this.name = "Waterfall";
    this.type = "water";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if it is raining.";
}

function WaterGun() {
    this.name = "Water Gun";
    this.type = "water";
    this.cat = "special";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function WaterPulse() {
    this.name = "Water Pulse";
    this.type = "water";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") applyEffect("confusion", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of confusion to the target in the rain.";
}

function WaterSpout() {
    this.name = "Water Spout";
    this.type = "water";
    this.cat = "special";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, 150 * pA.currenthp / pA.maxhp); };
    this.description = "Deals up to 150 base power damage to the opponent. Base power decreases with user's HP.";
}

function WeatherBall() {
    this.name = "Weather Ball";
    this.type = "normal";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined) {
            if (weather.name === "Rain") this.type = "water";
            else if (weather.name === "Sun") this.type = "fire";
            else if (weather.name === "Hail") this.type = "ice";
            else if (weather.name === "Sandstorm") this.type = "rock";
            this.bp = 140;
        } else {
            this.type = "normal";
            this.bp = 70;
        }
    };
    this.description = "Deals 70 base power damage to the opponent. Type and base power depend on the weather.";
}

function Whirlpool() {
    this.name = "Whirlpool";
    this.type = "water";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 3, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 3 turns.";
}

function WickedBlow() {
    this.name = "Wicked Blow";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function WildCharge() {
    this.name = "Wild Charge";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 1;
    this.recoil = 0;
    this.effect = function (move, pA, pD) { this.recoil = .1 * energy; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 10% recoil per energy left after use.";
}

function WillOWisp() {
    this.name = "Will-O-Wisp";
    this.type = "fire";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("burn", 3, pD); };
    this.description = "Applies 3 stacks of burn to the opponent.";
}

function WingAttack() {
    this.name = "Wing Attack";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function Wish() {
    this.name = "Wish";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("wish", 2, pA); };
    this.description = "Applies 2 stacks of wish to the user.";
}

function ZapCannon() {
    this.name = "Zap Cannon";
    this.type = "electric";
    this.cat = "special";
    this.bp = 150;
    this.cost = 3;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (isParalyzed(pD)) {
            applyEffect("paralysis", 2, pD);
            this.fails = false;
        } else
            this.fails = true;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent and applies 2 stacks of paralysis to it. Fails unless target is paralyzed.";
}

function ZenHeadbutt() {
    this.name = "Zen Headbutt";
    this.type = "psychic";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.draw.length >= 5) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's draw pile contains at least 5 cards.";
}

function Struggle() {
    this.name = "Struggle";
    this.type = "";
    this.cat = "physical";
    this.bp = 50;
    this.cost = 1;
    this.recoil = .5;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 50% recoil. This move has no type. Exhaust.";
}

function Recharge() {
    this.name = "Recharge";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Does nothing. Exhaust.";
}






/* ------------------------------------------------------ */
/* ------------------ Effects creation ------------------ */
/* ------------------------------------------------------ */

function applyEffect(type, stacks, p) {
    var effect = createEffect(type, stacks);
    var fails = false;
    if (effect.immune != undefined) {
        for (let t of effect.immune) {
            fails = fails || contains(p.types, t);
        }
    }
    if (!fails) {
        var i = p.effects.findIndex(e => e.name === effect.name);
        if (i >= 0) {
            p.effects[i].stacks += effect.stacks;
        } else {
            p.effects.push(effect);
        }
        drawEffects(contains(team, p));
    }
}

function createEffect(type, stacks) {
    switch (type) {
        case "burn":
            return new Burn(stacks);
        case "charge":
            return new ChargeE(stacks);
        case "confusion":
            return new ConfusionE(stacks);
        case "curse":
            return new CurseE(stacks);
        case "fear":
            return new Fear(stacks);
        case "grounded":
            return new Grounded(stacks);
        case "ingrain":
            return new IngrainE(stacks);
        case "kings_protection":
            return new KingsProtection(stacks);
        case "leech_seed":
            return new Seed(stacks);
        case "levitation":
            return new Levitation(stacks);
        case "paralysis":
            return new Paralysis(stacks);
        case "poison":
            return new Poison(stacks);
        case "protection":
            return new Protection(stacks);
        case "sleep":
            return new Sleep(stacks);
        case "stealth_rock":
            return new StealthRockE(stacks);
        case "sticky_web":
            return new StickyWebE(stacks);
        case "toxic_spikes":
            return new ToxicSpikesE(stacks);
        case "trap":
            return new Trap(stacks);
        case "trap_damage":
            return new TrapDamage(stacks);
        case "wish":
            return new WishE(stacks);
        default:
            return new Poison(0);
    }
}

function removeEffect(p, name) {
    var i = p.effects.findIndex(e => e.name === name);
    if (i >= 0)
        p.effects.splice(i, 1);
    drawEffects(contains(team, p));
}

function Burn(stacks) {
    this.name = "Burn";
    this.description = "Burn\nPhysical damage reduced by 40%. Remove 1 stack at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/burn.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function ChargeE(stacks) {
    this.name = "Charge";
    this.description = "Chargen\nIncreases the damage of eletric type moves. Remove 1 stack at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/charge.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function ConfusionE(stacks) {
    this.name = "Confusion";
    this.description = "Confusion\nNullify next attack's effects, then remove 1 stack. Take small physical damage.";
    this.icon = 'resources/sprites/effect_icons/confusion.png';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " hurt itself in confusion!<br/>"
    this.effect = (pA, pD) => {
        dealDamage(damageCalculator(new Struggle(), pA, pA), pA);
        this.stacks--;
    };
}

function CurseE(stacks) {
    this.name = "Curse";
    this.description = "Curse\nTake 30 damage at the end of each round.";
    this.icon = 'resources/sprites/effect_icons/curse.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { dealDamage(30, pA); };
}

function Fear(stacks) {
    this.name = "Fear";
    this.description = "Fear\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/fear.webp';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " has flinched!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function Grounded(stacks) {
    this.name = "Grounded";
    this.description = "Grounded";
    this.icon = 'resources/sprites/ui_icons/debuff.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function IngrainE(stacks) {
    this.name = "Ingrain";
    this.description = "Ingrain\nRestore 20HP at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/ingrain.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { dealDamage(-20, pA); };
}

function KingsProtection(stacks) {
    this.name = "King's Protection";
    this.description = "King's Protection\nCancel next attack targetting this Pokémon. Attackers making contact have their attack lowered by one stage.";
    this.icon = 'resources/sprites/effect_icons/shield.webp';
    this.stacks = stacks;
    this.block = true;
    this.effect = (pA, pD) => { };
    this.bEffect = (move, pA, pD) => {
        if (move.cat === "physical")
            boostStat(pD, "attack", -1);
        this.stacks--;
    };
}

function Levitation(stacks) {
    this.name = "Levitation";
    this.description = "Levitation\nImmunity to ground type moves and ground related effects.";
    this.icon = 'resources/sprites/effect_icons/levitation.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function Paralysis(stacks) {
    this.name = "Paralysis";
    this.description = "Paralysis\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/paralysis.png';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is paralyzed and cannot move!<br/>"
    this.immune = ["electric"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function Poison(stacks) {
    this.name = "Poison";
    this.description = "Poison\nTake 4 damage per stack at the end of the turn, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/poison.webp';
    this.stacks = stacks;
    this.immune = ["steel", "poison"];
    this.effect = (pA, pD) => {
        dealDamage(4 * this.stacks, pA);
        this.stacks--;
    }
}

function Protection(stacks) {
    this.name = "Protection";
    this.description = "Protection\nCancel next attack targetting this Pokémon.";
    this.icon = 'resources/sprites/effect_icons/shield.webp';
    this.stacks = stacks;
    this.block = true;
    this.effect = (pA, pD) => { };
    this.bEffect = (move, pA, pD) => {
        this.stacks--;
    };
}

function Seed(stacks) {
    this.name = "Leech Seed";
    this.description = "Leech Seed\nTransfer 15HP to the opposing Pokémon at the end of the turn, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/seed.png';
    this.stacks = stacks;
    this.immune = ["grass"];
    this.effect = (pA, pD) => {
        dealDamage(15, pA);
        dealDamage(-15, pD);
        this.stacks--;
    }
}

function Sleep(stacks) {
    this.name = "Sleep";
    this.description = "Sleep\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/sleep.png';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is fast asleep!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function StealthRockE(stacks) {
    this.name = "Stealth Rock";
    this.description = "Stealth Rock\nDeals 20 rock type damage at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/stealth_rock.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        dealDamage(20 * effectiveMultiplier(new RockThrow(), pA), pA);
    };
}

function StickyWebE(stacks) {
    this.name = "Sticky Web";
    this.description = "Sticky Web\nLower speed by one stage at the end of each turn if it hasn't been lowered already. Airborne Pokémon are immune.";
    this.icon = 'resources/sprites/effect_icons/sticky_web.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (pA.statchanges.speed >= 0 && isGrounded(pA))
            boostStat(pA, "speed", -1);
    };
}

function ToxicSpikesE(stacks) {
    this.name = "Toxic Spikes";
    this.description = "Toxic Spikes\nApplies 4 stacks of poison at the end of the turn. Airborne Pokémon are immune.";
    this.icon = 'resources/sprites/effect_icons/spike.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (isGrounded(pA))
            applyEffect("poison", 4, pA);
    };
}

function TrapDamage(stacks) {
    this.name = "Trap Damage";
    this.description = "Trap Damage\nTake 15 damage at the end of the turn, then remove 1 stack. Prevents switches.";
    this.icon = 'resources/sprites/effect_icons/trap_damage.png';
    this.stacks = stacks;
    this.trapped = true;
    this.effect = (pA, pD) => {
        dealDamage(15, pA);
        this.stacks--;
    }
}

function Trap(stacks) {
    this.name = "Trap";
    this.description = "Trap\nPrevents switches.";
    this.icon = 'resources/sprites/effect_icons/trap.png';
    this.stacks = stacks;
    this.trapped = true;
    this.effect = (pA, pD) => { }
}

function WishE(stacks) {
    this.name = "Wish";
    this.description = "Wish\nRestores 20% of maximum HP once this effect ends. Remove 1 stack at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/wish.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        this.stack--;
        if (this.stacks == 0)
            dealDamage(-pA.maxhp * .2, pA);
    }
}

function isTrapped(p) {
    var i = p.effects.findIndex(e => e.trapped != undefined);
    return i >= 0 && p.effects[i].stacks > 0;
}

function doesBlock(p) {
    var i = p.effects.findIndex(e => e.block != undefined);
    return i >= 0 && p.effects[i].stacks > 0;
}

function isAsleep(p) {
    var i = p.effects.findIndex(e => e.name === "Sleep");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isGrounded(p) {
    var i = p.effects.findIndex(e => e.name === "Levitation");
    var j = p.effects.findIndex(e => e.name === "Grounded");
    return !((i >= 0 && p.effects[i].stacks > 0) || contains(p.types, "flying")) || (j >= 0 && p.effects[j].stacks > 0);
}

function isBurned(p) {
    var i = p.effects.findIndex(e => e.name === "Burn");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isScared(p) {
    var i = p.effects.findIndex(e => e.name === "Fear");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isCharged(p) {
    var i = p.effects.findIndex(e => e.name === "Charge");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isPoisoned(p) {
    var i = p.effects.findIndex(e => e.name === "Poison");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isParalyzed(p) {
    var i = p.effects.findIndex(e => e.name === "Paralysis");
    return i >= 0 && p.effects[i].stacks > 0;
}






/* ------------------------------------------------------ */
/* ---------------- Environment creation ---------------- */
/* ------------------------------------------------------ */

function setWeather(w, turns) {
    switch (w) {
        case "rain":
            weather = new Rain(turns);
            break;
        case "sun":
            weather = new Sun(turns);
            break;
        case "sandstorm":
            weather = new SandstormW(turns);
            break;
        case "hail":
            weather = new HailW(turns);
            break;
        default:
    }
    drawEnvironment();
}

function Rain(turns) {
    this.name = "Rain";
    this.turns = turns;
    this.description = "Powers up water type moves and weakens fire type moves.";
    this.effect = () => {
        this.turns--;
    };
}

function Sun(turns) {
    this.name = "Sun";
    this.turns = turns;
    this.description = "Powers up fire type moves and weakens water type moves.";
    this.effect = () => {
        this.turns--;
    };
}

function SandstormW(turns) {
    this.name = "Sandstorm";
    this.turns = turns;
    this.description = "Raises the special defense of rock type Pokémon by 50%. Non rock, ground or steel type Pokémon take 10 damage at the end of each turn.";
    this.effect = () => {
        if (!contains(team[activePokemon].types, "rock") && !contains(team[activePokemon].types, "ground") && !contains(team[activePokemon].types, "steel"))
            dealDamage(10, team[activePokemon]);
        if (!contains(opponent.types, "rock") && !contains(opponent.types, "ground") && !contains(opponent.types, "steel"))
            dealDamage(10, opponent);
        this.turns--;
    };
}






/* ------------------------------------------------------ */
/* ----------------- Held item creation ----------------- */
/* ------------------------------------------------------ */

heldItems = ["black_belt", "black_glasses", "charcoal", "dragon_fang", "hard_stone", "magnet", "metal_coat", "miracle_seed", "mystic_water", "never_melt_ice", "poison_barb", "sharp_beak", "silk_scarf", "silver_powder", "soft_sand", "spell_tag", "twisted_spoon",
    "draco_plate", "dread_plate", "earth_plate", "fist_plate", "flame_plate", "icicle_plate", "insect_plate", "iron_plate", "meadow_plate", "mind_plate", "pixie_plate", "sky_plate", "splash_plate", "spooky_plate", "stone_plate", "toxic_plate", "zap_plate",
    "leftovers", "choice_band", "choice_specs", "choice_scarf", "rocky_helmet", "weakness_policy", "blunder_policy", "sitrus_berry", "life_orb"];

function createHeldItem(item) {
    switch (item) {
        case "black_belt":
            return new BlackBelt();
        case "black_glasses":
            return new BlackGlasses();
        case "charcoal":
            return new Charcoal();
        case "dragon_fang":
            return new DragonFang();
        case "hard_stone":
            return new HardStone();
        case "magnet":
            return new Magnet();
        case "metal_coat":
            return new MetalCoat();
        case "miracle_seed":
            return new MiracleSeed();
        case "mystic_water":
            return new MysticWater();
        case "never_melt_ice":
            return new NeverMeltIce();
        case "poison_barb":
            return new PoisonBarb();
        case "sharp_beak":
            return new SharpBeak();
        case "silk_scarf":
            return new SilkScarf();
        case "silver_powder":
            return new SilverPowder();
        case "soft_sand":
            return new SoftSand();
        case "spell_tag":
            return new SpellTag();
        case "twisted_spoon":
            return new TwistedSpoon();
        case "draco_plate":
            return new DracoPlate();
        case "dread_plate":
            return new DreadPlate();
        case "earth_plate":
            return new EarthPlate();
        case "fist_plate":
            return new FistPlate();
        case "flame_plate":
            return new FlamePlate();
        case "icicle_plate":
            return new IciclePlate();
        case "insect_plate":
            return new InsectPlate();
        case "iron_plate":
            return new IronPlate();
        case "meadow_plate":
            return new MeadowPlate();
        case "mind_plate":
            return new PixiePlate();
        case "sky_plate":
            return new SkyPlate();
        case "splash_plate":
            return new SplashPlate();
        case "spooky_plate":
            return new SpookyPlate();
        case "stone_plate":
            return new StonePlate();
        case "toxic_plate":
            return new ToxicPlate();
        case "zap_plate":
            return new ZapPlate();
        case "leftovers":
            return new Leftovers();
        case "choice_band":
            return new ChoiceBand();
        case "choice_specs":
            return new ChoiceSpecs();
        case "choice_scarf":
            return new ChoiceScarf();
        case "rocky_helmet":
            return new RockyHelmet();
        case "weakness_policy":
            return new WeaknessPolicy();
        case "sitrus_berry":
            return new SitrusBerry();
        case "life_orb":
            return new LifeOrb();
        default:
            return new BlackBelt();
    }
}

function BlackBelt() {
    this.name = "Black Belt";
    this.description = "Raises the power of fighting type moves by 10%";
    this.img = 'resources/sprites/held_items/black_belt.webp';
    this.area = "fighting";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "fighting"); };
}

function BlackGlasses() {
    this.name = "Black Glasses";
    this.description = "Raises the power of dark type moves by 10%";
    this.img = 'resources/sprites/held_items/black_glasses.webp';
    this.area = "dark";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "dark"); };
}

function Charcoal() {
    this.name = "Charcoal";
    this.description = "Raises the power of fire type moves by 10%";
    this.img = 'resources/sprites/held_items/charcoal.webp';
    this.area = "fire";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "fire"); };
}

function DragonFang() {
    this.name = "Dragon Fang";
    this.description = "Raises the power of dragon type moves by 10%";
    this.img = 'resources/sprites/held_items/dragon_fang.webp';
    this.area = "dragon";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "dragon"); };
}

function HardStone() {
    this.name = "Hard Stone";
    this.description = "Raises the power of rock type moves by 10%";
    this.img = 'resources/sprites/held_items/hard_stone.webp';
    this.area = "rock";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "rock"); };
}

function Magnet() {
    this.name = "Magnet";
    this.description = "Raises the power of electric type moves by 10%";
    this.img = 'resources/sprites/held_items/magnet.webp';
    this.area = "electric";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "electric"); };
}

function MetalCoat() {
    this.name = "Metal Coat";
    this.description = "Raises the power of steel type moves by 10%";
    this.img = 'resources/sprites/held_items/metal_coat.webp';
    this.area = "steel";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "steel"); };
}

function MiracleSeed() {
    this.name = "Miracle Seed";
    this.description = "Raises the power of grass type moves by 10%";
    this.img = 'resources/sprites/held_items/miracle_seed.webp';
    this.area = "grass";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "grass"); };
}

function MysticWater() {
    this.name = "Mystic Water";
    this.description = "Raises the power of water type moves by 10%";
    this.img = 'resources/sprites/held_items/mystic_water.webp';
    this.area = "water";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "water"); };
}

function NeverMeltIce() {
    this.name = "Never Melt Ice";
    this.description = "Raises the power of ice type moves by 10%";
    this.img = 'resources/sprites/held_items/never_melt_ice.webp';
    this.area = "ice";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "ice"); };
}

function PoisonBarb() {
    this.name = "Poison Barb";
    this.description = "Raises the power of poison type moves by 10%";
    this.img = 'resources/sprites/held_items/poison_barb.webp';
    this.area = "poison";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "poison"); };
}

function SharpBeak() {
    this.name = "Sharp Beak";
    this.description = "Raises the power of flying type moves by 10%";
    this.img = 'resources/sprites/held_items/sharp_beak.webp';
    this.area = "flying";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "flying"); };
}

function SilkScarf() {
    this.name = "Silk Scarf";
    this.description = "Raises the power of normal type moves by 10%";
    this.img = 'resources/sprites/held_items/silk_scarf.webp';
    this.area = "normal";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "normal"); };
}

function SilverPowder() {
    this.name = "Silver Powder";
    this.description = "Raises the power of bug type moves by 10%";
    this.img = 'resources/sprites/held_items/silver_powder.webp';
    this.area = "bug";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "bug"); };
}

function SoftSand() {
    this.name = "Soft Sand";
    this.description = "Raises the power of ground type moves by 10%";
    this.img = 'resources/sprites/held_items/soft_sand.webp';
    this.area = "ground";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "ground"); };
}

function SpellTag() {
    this.name = "Spell Tag";
    this.description = "Raises the power of ghost type moves by 10%";
    this.img = 'resources/sprites/held_items/spell_tag.webp';
    this.area = "ghost";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "ghost"); };
}

function TwistedSpoon() {
    this.name = "Twisted Spoon";
    this.description = "Raises the power of psychic type moves by 10%";
    this.img = 'resources/sprites/held_items/twisted_spoon.webp';
    this.area = "psychic";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.type === "psychic"); };
}

function DracoPlate() {
    this.name = "Draco Plate";
    this.description = "Creates a free random dragon type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/draco_plate.webp';
    this.area = "dragon";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "dragon")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function DreadPlate() {
    this.name = "Dread Plate";
    this.description = "Creates a free random dark type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/dread_plate.webp';
    this.area = "dark";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "dark")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function EarthPlate() {
    this.name = "Earth Plate";
    this.description = "Creates a free random ground type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/earth_plate.webp';
    this.area = "ground";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "ground")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function FistPlate() {
    this.name = "Fist Plate";
    this.description = "Creates a free random fighting type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/fist_plate.webp';
    this.area = "fighting";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "fighting")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function FlamePlate() {
    this.name = "Flame Plate";
    this.description = "Creates a free random fire type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/flame_plate.webp';
    this.area = "fire";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "fire")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function IciclePlate() {
    this.name = "Icicle Plate";
    this.description = "Creates a free random ice type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/icicle_plate.webp';
    this.area = "ice";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "ice")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function InsectPlate() {
    this.name = "Insect Plate";
    this.description = "Creates a free random bug type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/insect_plate.webp';
    this.area = "bug";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "bug")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function IronPlate() {
    this.name = "Iron Plate";
    this.description = "Creates a free random steel type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/iron_plate.webp';
    this.area = "steel";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "steel")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function MeadowPlate() {
    this.name = "Meadow Plate";
    this.description = "Creates a free random grass type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/meadow_plate.webp';
    this.area = "grass";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "grass")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function MindPlate() {
    this.name = "Mind Plate";
    this.description = "Creates a free random psychic type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/mind_plate.webp';
    this.area = "psychic";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "psychic")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function PixiePlate() {
    this.name = "Pixie Plate";
    this.description = "Creates a free random fairy type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/pixie_plate.webp';
    this.area = "fairy";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "fairy")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function SkyPlate() {
    this.name = "Sky Plate";
    this.description = "Creates a free random flying type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/sky_plate.webp';
    this.area = "flying";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "flying")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function SplashPlate() {
    this.name = "Splash Plate";
    this.description = "Creates a free random water type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/splash_plate.webp';
    this.area = "water";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "water")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function SpookyPlate() {
    this.name = "Spooky Plate";
    this.description = "Creates a free random ghost type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/spooky_plate.webp';
    this.area = "ghost";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "ghost")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function StonePlate() {
    this.name = "Stone Plate";
    this.description = "Creates a free random rock type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/stone_plate.webp';
    this.area = "rock";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "rock")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function ToxicPlate() {
    this.name = "Toxic Plate";
    this.description = "Creates a free random poison type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/toxic_plate.webp';
    this.area = "poison";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "poison")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function ZapPlate() {
    this.name = "Zap Plate";
    this.description = "Creates a free random electric type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'resources/sprites/held_items/zap_plate.webp';
    this.area = "electric";
    this.init = true;
    this.effect = (p) => {
        var move;
        while (move == undefined || move.type !== "electric")
            move = createMove(movesList[Math.floor(Math.random() * movesList.length)]);
        move.exhaust = true;
        move.cost = 0;
        if (!move.description.includes("Exhaust."))
            move.description += " Exhaust.";
        p.draw.push(move);
    };
}

function Leftovers() {
    this.name = "Leftovers";
    this.description = "Restores 20HP at the end of each turn.";
    this.img = 'resources/sprites/held_items/leftovers.webp';
    this.area = "";
    this.turn_end = true;
    this.effect = (p) => {
        dealDamage(-20, p);
    };
}

function ChoiceBand() {
    this.name = "Choice Band";
    this.description = "Discards all cards in hand after using a move. Doubles the damage of physical moves.";
    this.img = 'resources/sprites/held_items/choice_band.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => {
        var temp = [].concat(p.hand);
        for (let c of temp) {
            discardCard(c);
        }
        return 1 + (move.cat === "physical");
    };
}

function ChoiceSpecs() {
    this.name = "Choice Specs";
    this.description = "Discards all cards in hand after using a move. Doubles the damage of special moves.";
    this.img = 'resources/sprites/held_items/choice_specs.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => {
        var temp = [].concat(p.hand);
        for (let c of temp) {
            discardCard(c);
        }
        return 1 + (move.cat === "special");
    };
}

function ChoiceScarf() {
    this.name = "Choice Scarf";
    this.description = "Discards all cards in hand after using a move, then restores 1 energy.";
    this.img = 'resources/sprites/held_items/choice_scarf.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => {
        var temp = [].concat(p.hand);
        for (let c of temp) {
            discardCard(c);
        }
        energy += 1;
        return 1;
    };
}

function RockyHelmet() {
    this.name = "Rocky Helmet";
    this.description = "Attackers making contact with the user lose 10HP.";
    this.img = 'resources/sprites/held_items/rocky_helmet.webp';
    this.area = "";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (move.cat === "physical")
            dealDamage(10, pD);
    };
}

function WeaknessPolicy() {
    this.name = "Weakness Policy";
    this.description = "The first super effective attack against the holder each battle increases its attack and special attack by one stage.";
    this.img = 'resources/sprites/held_items/weakness_policy.webp';
    this.area = "";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (effectiveMultiplier(move, pA) > 1 && !this.consumed) {
            boostStat(pA, "attack", 1);
            boostStat(pA, "spattack", 1);
            this.consumed = true;
        }
    };
    this.init = true;
    this.consumed = false;
    this.effect = (p) => {
        this.consumed = false;
    }
}

function SitrusBerry() {
    this.name = "Sitrus Berry";
    this.description = "Restores 25% of maximum HP the first time an attack brings the holder below 50% of maximum HP.";
    this.img = 'resources/sprites/held_items/sitrus_berry.webp';
    this.area = "";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (pA.currenthp < .5 * pA.maxhp && !this.consumed) {
            dealDamage(-pA.maxhp * .25, pA);
            this.consumed = true;
        }
    };
    this.init = true;
    this.consumed = false;
    this.effect = (p) => {
        this.consumed = false;
    }
}

function LifeOrb() {
    this.name = "Life Orb";
    this.description = "Increases damage by 30%, consumes 25HP with each damaging move.";
    this.img = 'resources/sprites/held_items/life_orb.webp';
    this.area = "boss";
    this.boost = true;
    this.effect = (move, p) => {
        if (move.cat !== "status")
            dealDamage(25, p);
        return 1.3;
    };
}






/* ------------------------------------------------------ */
/* ---------------------- Tutorial ---------------------- */
/* ------------------------------------------------------ */

function startTuto() {
    tuto = true;
    drawTeamSelectionTuto();
}

function drawTeamSelectionTuto() {
    document.body.innerHTML = "";
    var gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    cSelected = 0;
    pSelected = ["", "", ""];

    var teamSelectorScreen = document.createElement('div');
    teamSelectorScreen.className = "team-selector-screen";
    document.body.appendChild(teamSelectorScreen);

    var teamSelectorTitle = document.createElement('div');
    teamSelectorTitle.className = "selector-title";
    var teamTitle = document.createElement('div');
    teamTitle.className = "title";
    teamTitle.innerHTML = "Select your team";
    teamSelectorTitle.appendChild(teamTitle);
    var teamSelectorCount = document.createElement('button');
    teamSelectorCount.className = "selector-count";
    teamSelectorCount.innerText = "(0/3)";
    teamSelectorCount.id = "teamSelectorCount";
    teamSelectorTitle.appendChild(teamSelectorCount);
    teamSelectorScreen.appendChild(teamSelectorTitle);

    var teamSelector = document.createElement('div');
    teamSelector.className = "team-selector";

    for (const pokemon of pokemonList) {
        var cell = (new pokemonSelectorTuto(pokemon)).cell;
        teamSelector.appendChild(cell);
    }

    teamSelectorScreen.appendChild(teamSelector);

    var filter = document.createElement('div');
    filter.className = "filter";
    filter.id = "filter";
    teamSelectorScreen.appendChild(filter);

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Welcome trainer!";

    var message = document.createElement('div');
    message.className = "centered-subtitle";
    message.innerHTML = "Every adventure begins with a choice! Before venturing into the world of Pokémon you will need to assemble a powerful party. Here you can select which Pokémon to travel with.";

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "Continue";
    replay.onclick = () => {
        teamSelectorScreen.removeChild(filter);
        var instruct = document.createElement('div');
        instruct.className = "overlay-text";
        instruct.innerHTML = "Select Venusaur, Charizard and Blastoise, then hit start.";
        teamSelectorScreen.appendChild(instruct);
    };

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    grid.appendChild(title);
    grid.appendChild(message);
    grid.appendChild(replay);
    filter.appendChild(grid);
}

function pokemonSelectorTuto(name) {
    this.cell = document.createElement('div');
    this.name = name;
    image = new Image();
    image.src = 'resources/sprites/pokemon_icons/' + name + '.png';
    image.className = 'pixel-sprite';
    title = document.createElement('div');
    title.innerHTML = name;
    this.cell.appendChild(title);
    this.cell.appendChild(image);
    this.cell.className = "team-selector-element";
    this.cell.onclick = function () {
        tsc = document.getElementById("teamSelectorCount");
        if (pSelected.findIndex(element => element === name) == -1 && cSelected < 3) {
            pSelected[pSelected.findIndex(element => element === "")] = name;
            cSelected += 1;
            if (cSelected < 3) {
                tsc.innerText = "(" + cSelected + "/3)";
            } else {
                tsc.innerText = "start";
                tsc.className = "selector-count-start";
                tsc.onclick = () => { if (contains(pSelected, "venusaur") && contains(pSelected, "charizard") && contains(pSelected, "blastoise")) launchGame(); };
            }
            this.className = "selected-cell";
        } else if (pSelected.findIndex(element => element === name) != -1) {
            pSelected[pSelected.findIndex(element => element === name)] = "";
            cSelected -= 1;
            tsc.innerText = "(" + cSelected + "/3)";
            tsc.className = "selector-count";
            tsc.onclick = () => { };
            this.className = "team-selector-element";
        }
    }
}

function drawBattleExplanations() {
    var filter = document.createElement('div');
    filter.className = "filter-clear";
    document.body.appendChild(filter);

    var instruct = document.createElement('div');
    instruct.className = "overlay-text";
    instruct.innerHTML = "You have encountered a wild " + opponent.name + "! To defeat it, you will need the strength of your own Pokémon, on the left.";
    filter.appendChild(instruct);

    filter.onclick = () => {
        instruct.innerHTML = team[activePokemon].name + " is your active Pokémon. It's the one that will attack and take the hits.";
        filter.onclick = () => {
            instruct.innerHTML = "Pokémon take turns attacking. You will always go first, but once your turn ends, your opponent will strike back so it is important to plan ahead.";
            filter.onclick = () => {
                instruct.innerHTML = "If you feel like another Pokémon in your party is better suit for a battle, you can click on it in the top left corner. Be careful, you can only switch once per turn."
                filter.onclick = () => {
                    instruct.innerHTML = "The bars next to the Pokémon represent their remaining HP. Once a Pokémon's HP reaches 0, it faints and cannot battle anymore until healed at a Pokémon Center."
                    filter.onclick = () => {
                        instruct.innerHTML = "Your available attacks are displayed at the bottom. They are drawn from your draw pile at the beginning of the turn and discarded at the end if they haven't been used."
                        filter.onclick = () => {
                            instruct.innerHTML = "In the bottom left corners are located important indicators: the amount of cards in the discard pile, in the draw pile, and the energy left."
                            filter.onclick = () => {
                                instruct.innerHTML = "Playing a move requires energy, indicated in the corner of the move card. For example, " + team[activePokemon].hand[0].name + " costs " + team[activePokemon].hand[0].cost + " energy to play."
                                filter.onclick = () => {
                                    instruct.innerHTML = "Moves can be physical, special, or status-related. The former two deal physical or special damage, whereas the latter spreads all sorts of effects, modifying the battle rules."
                                    filter.onclick = () => {
                                        instruct.innerHTML = "You should also keep in mind that moves of the same type as the user deal more damage, and some types are stronger or weaker against others."
                                        filter.onclick = () => {
                                            instruct.innerHTML = "To preview the effects of a move, simply click on it. Click again to use it. Used moves will be discarded."
                                            filter.onclick = () => {
                                                instruct.innerHTML = "Once you're out of options, click the end turn button. You will get new cards, a fresh switch and more energy the next turn."
                                                filter.onclick = () => {
                                                    instruct.innerHTML = "Now that you know how to battle, try to take down that nasty " + opponent.name + "!"
                                                    filter.onclick = () => { document.body.removeChild(filter); }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


