/* ----------------------------------------------------- */
/* -------------------- Home screen -------------------- */
/* ----------------------------------------------------- */

music = false;

function drawStartingMenu() {
    ambientMusic = "resources/sounds/musics/title_screen.mp3";
    document.body.innerHTML = "";
    var startButton = document.createElement('button');
    startButton.className = "start";
    startButton.innerText = "start";
    startButton.addEventListener('click', () => { tuto = false; drawTeamSelection(); });
    document.body.appendChild(startButton);
    var tutoButton = document.createElement('button');
    tutoButton.className = "launch-tuto";
    tutoButton.innerText = "how to play?";
    tutoButton.addEventListener('click', () => { startTuto() });
    document.body.appendChild(tutoButton);
    var soundButton = document.createElement('div');
    soundButton.className = "sound-button";
    soundButton.addEventListener('click', () => {
        if (music) {
            soundImage.src = "resources/sprites/ui_icons/mute.webp"
            var audios = document.getElementsByTagName('audio');
            for (let a of audios) {
                a.pause();
                a = null;
            }
            music = false;
        } else {
            soundImage.src = "resources/sprites/ui_icons/sound.webp"
            playMusic(ambientMusic, true);
            music = true;
        }
    });
    document.body.appendChild(soundButton);
    var soundImage = new Image();
    soundImage.className = "pixel-sprite";
    soundImage.src = "resources/sprites/ui_icons/mute.webp"
    soundButton.appendChild(soundImage);
    var gArea = new gameArea('resources/homescreen.jfif', () => {});
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

function startGame() {
    drawStartingMenu();
}

const init = (e) => {
    window.addEventListener('resize', resizeSprites);
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            toggleEscapeScreen();
        }
    });
    startGame();
}

document.addEventListener('DOMContentLoaded', init);

function resizeSprites(both) {
    var scale = .3 * document.body.getBoundingClientRect().height / 100;
    var sprite = document.getElementById("leftSprite");
    if (sprite != undefined) {
        sprite.onload = () => {
            var view = document.getElementById("pLeftView");
            if (view != undefined) {
                view.style.gridTemplateRows = "auto " + Math.min(130, sprite.naturalHeight) * scale + "px auto";
                view.style.top = .64 * document.body.getBoundingClientRect().height - Math.min(130, sprite.naturalHeight) * scale + "px";
            }
            if (sprite.naturalHeight > 130)
                sprite.style.transform = "scale(" + sprite.naturalHeight / 130 + "," + sprite.naturalHeight / 130 + ")";
            else
                sprite.style.transform = "scale(1,1)";

            if (both != undefined) {
                scale = .25 * document.body.getBoundingClientRect().height / 100;
                sprite = document.getElementById("rightSprite");
                sprite.onload = () => {
                    var view = document.getElementById("pRightView");
                    if (view != undefined) {
                        view.style.gridTemplateRows = "auto " + Math.min(130, sprite.naturalHeight) * scale + "px auto";
                        view.style.top = .5 * document.body.getBoundingClientRect().height - Math.min(130, sprite.naturalHeight) * scale + "px";
                    }
                    if (sprite.naturalHeight > 130)
                        sprite.style.transform = "scale(" + sprite.naturalHeight / 130 + "," + sprite.naturalHeight / 130 + ")";
                    else
                        sprite.style.transform = "scale(1,1)";
                }
                if (sprite != undefined)
                    sprite.src = opponent.imgf;
            }
        }
        if (sprite != undefined)
            sprite.src = team[activePokemon].imgb;
    }
}

function playMusic(src, repeat) {
    music = document.createElement("audio");
    music.autoplay = true;
    music.loop = repeat;
    music.onended = function () {
        music.pause();
        music = null;
    }
    music.src = src;
    document.body.appendChild(music);
    music.play();
}

function toggleEscapeScreen() {
    if (document.getElementById('escapeScreen') != undefined)
        document.body.removeChild(document.getElementById('escapeScreen'));
    else {
        var filter = document.createElement('div');
        filter.className = "filter";
        filter.id = "escapeScreen";
        document.body.appendChild(filter);
        var grid = document.createElement('div');
        grid.className = "gameover_grid";
        filter.appendChild(grid);

        var soundButton = document.createElement('div');
        soundButton.className = "sound-button";
        soundButton.addEventListener('click', () => {
            if (music) {
                soundImage.src = "resources/sprites/ui_icons/mute.webp"
                var audios = document.getElementsByTagName('audio');
                for (let a of audios) {
                    a.pause();
                    a = null;
                }
                music = false;
            } else {
                soundImage.src = "resources/sprites/ui_icons/sound.webp"
                playMusic(ambientMusic, true);
                music = true;
            }
        });
        soundButton.style.filter = "invert()";
        filter.appendChild(soundButton);
        var soundImage = new Image();
        soundImage.className = "pixel-sprite";
        if (!music)
            soundImage.src = "resources/sprites/ui_icons/mute.webp"
        else
            soundImage.src = "resources/sprites/ui_icons/sound.webp"
        soundButton.appendChild(soundImage);
    }
}





/* ------------------------------------------------------ */
/* ------------------- Team selection ------------------- */
/* ------------------------------------------------------ */

const pokemonList = ["venusaur", "charizard", "blastoise", "pikachu", "garchomp", "cinderace", "lucario", "volcarona", "eevee", "gardevoir", "dragonite", "ferrothorn", "blissey", "sableye", "scizor", "aegislash", "meowth", "metagross", "weavile", "zeraora", "omanyte", "tyranitar", "gyarados", "ditto", "mew", "urshifu", "gengar", "shuckle", "mimikyu", "mamoswine"]

var cSelected = 0;
var pSelected = ["", "", ""];
var tuto = false;

function loadProgress() {
    defeatedPokemon = window.localStorage.getItem('defeatedPokemon') != null ? parseInt(JSON.parse(window.localStorage.getItem('defeatedPokemon'))) : 0;
    victories = window.localStorage.getItem('victories') != null ? parseInt(JSON.parse(window.localStorage.getItem('victories'))) : 0;
    flawlessVictories = window.localStorage.getItem('flawlessVictories') != null ? parseInt(JSON.parse(window.localStorage.getItem('flawlessVictories'))) : 0;
    starterVictories = window.localStorage.getItem('starterVictories') != null ? parseInt(JSON.parse(window.localStorage.getItem('starterVictories'))) : 0;
    physicalDamageTaken = window.localStorage.getItem('physicalDamageTaken') != null ? parseInt(JSON.parse(window.localStorage.getItem('physicalDamageTaken'))) : 0;
    specialDamageTaken = window.localStorage.getItem('specialDamageTaken') != null ? parseInt(JSON.parse(window.localStorage.getItem('specialDamageTaken'))) : 0;
    statusMovesUsed = window.localStorage.getItem('statusMovesUsed') != null ? parseInt(JSON.parse(window.localStorage.getItem('statusMovesUsed'))) : 0;
    damageDealt = window.localStorage.getItem('damageDealt') != null ? parseInt(JSON.parse(window.localStorage.getItem('damageDealt'))) : 0;
    blockedHits = window.localStorage.getItem('blockedHits') != null ? parseInt(JSON.parse(window.localStorage.getItem('blockedHits'))) : 0;
    earnedMoney = window.localStorage.getItem('earnedMoney') != null ? parseInt(JSON.parse(window.localStorage.getItem('earnedMoney'))) : 0;
    drawnCards = window.localStorage.getItem('drawnCards') != null ? parseInt(JSON.parse(window.localStorage.getItem('drawnCards'))) : 0;
    fastBoss = window.localStorage.getItem('fastBoss') != null ? parseInt(JSON.parse(window.localStorage.getItem('fastBoss'))) : 0;
    cardsPerTurn = window.localStorage.getItem('cardsPerTurn') != null ? parseInt(JSON.parse(window.localStorage.getItem('cardsPerTurn'))) : 0;
    helixQuest = window.localStorage.getItem('helixQuest') != null ? parseInt(JSON.parse(window.localStorage.getItem('helixQuest'))) : 0;
    sandstormDamage = window.localStorage.getItem('sandstormDamage') != null ? parseInt(JSON.parse(window.localStorage.getItem('sandstormDamage'))) : 0;
    survive1hp = window.localStorage.getItem('survive1hp') != null ? parseInt(JSON.parse(window.localStorage.getItem('survive1hp'))) : 0;
    unlockedPokemon = window.localStorage.getItem('unlockedPokemon') != null ? parseInt(JSON.parse(window.localStorage.getItem('unlockedPokemon'))) : 0;
    transforms = window.localStorage.getItem('transforms') != null ? parseInt(JSON.parse(window.localStorage.getItem('transforms'))) : 0;
    flawlessKO = window.localStorage.getItem('flawlessKO') != null ? parseInt(JSON.parse(window.localStorage.getItem('flawlessKO'))) : 0;
    area1loss = window.localStorage.getItem('area1loss') != null ? parseInt(JSON.parse(window.localStorage.getItem('area1loss'))) : 0;
    maxRound = window.localStorage.getItem('maxRound') != null ? parseInt(JSON.parse(window.localStorage.getItem('maxRound'))) : 0;
    pikachuVictory = window.localStorage.getItem('pikachuVictory') != null ? parseInt(JSON.parse(window.localStorage.getItem('pikachuVictory'))) : 0;
    rockIceKO = window.localStorage.getItem('rockIceKO') != null ? parseInt(JSON.parse(window.localStorage.getItem('rockIceKO'))) : 0;
    unlockedPokemon = -3;
    for (let p of pokemonList) {
        unlockedPokemon += createPokemon(p).unlocked;
    }
}

function saveProgress() {
    window.localStorage.setItem('defeatedPokemon', JSON.stringify(defeatedPokemon));
    window.localStorage.setItem('victories', JSON.stringify(victories));
    window.localStorage.setItem('flawlessVictories', JSON.stringify(flawlessVictories));
    window.localStorage.setItem('starterVictories', JSON.stringify(starterVictories));
    window.localStorage.setItem('physicalDamageTaken', JSON.stringify(physicalDamageTaken));
    window.localStorage.setItem('specialDamageTaken', JSON.stringify(specialDamageTaken));
    window.localStorage.setItem('statusMovesUsed', JSON.stringify(statusMovesUsed));
    window.localStorage.setItem('damageDealt', JSON.stringify(damageDealt));
    window.localStorage.setItem('blockedHits', JSON.stringify(blockedHits));
    window.localStorage.setItem('earnedMoney', JSON.stringify(earnedMoney));
    window.localStorage.setItem('drawnCards', JSON.stringify(drawnCards));
    window.localStorage.setItem('fastBoss', JSON.stringify(fastBoss));
    window.localStorage.setItem('cardsPerTurn', JSON.stringify(cardsPerTurn));
    window.localStorage.setItem('helixQuest', JSON.stringify(helixQuest));
    window.localStorage.setItem('sandstormDamage', JSON.stringify(sandstormDamage));
    window.localStorage.setItem('survive1hp', JSON.stringify(survive1hp));
    window.localStorage.setItem('unlockedPokemon', JSON.stringify(unlockedPokemon));
    window.localStorage.setItem('transforms', JSON.stringify(transforms));
    window.localStorage.setItem('flawlessKO', JSON.stringify(flawlessKO));
    window.localStorage.setItem('area1loss', JSON.stringify(area1loss));
    window.localStorage.setItem('maxRound', JSON.stringify(maxRound));
    window.localStorage.setItem('pikachuVictory', JSON.stringify(pikachuVictory));
    window.localStorage.setItem('rockIceKO', JSON.stringify(rockIceKO));
}

function drawTeamSelection() {
    document.body.innerHTML = "";
    gArea = new gameArea('resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "resources/sounds/musics/pokemon_center.mp3";
    if (music)
        playMusic(ambientMusic, true);

    loadProgress();

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
    this.cell.p = createPokemon(name);
    this.name = name;
    image = new Image();
    image.src = 'resources/sprites/pokemon_icons/' + name + '.png';
    image.className = 'pixel-sprite';
    if (!this.cell.p.unlocked)
        image.className += " not-unlocked";
    title = document.createElement('div');
    title.innerHTML = this.cell.p.unlocked ? name : "?????";
    this.cell.appendChild(title);
    this.cell.appendChild(image);
    this.cell.className = "team-selector-element";
    this.cell.onclick = function () {
        if (this.p.unlocked) {
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

    if (this.cell.p.unlocked) {
        this.cell.title = this.cell.p.name + "\n" + this.cell.p.description + "\nTypes: ";
        for (let type of this.cell.p.types) {
            var t = type.charAt(0).toUpperCase() + type.slice(1)
            this.cell.title += t + " ";
        }
        this.cell.title += "\nTalent: " + this.cell.p.talent + "\n" + this.cell.p.talentDesc;
    } else {
        this.cell.title = this.cell.p.hint;
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
var se = 1.6;
var nve = 1 / se;
var n = 1;
var stab = 1.25;

const typetable =
   [[n, se, n, n, nve, nve, nve, nve, nve, se, n, n, n, nve, se, n, nve, n],
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
    if (move.type === "ground" && !isGrounded(defender))
        mul = 0;
    if (isImmune(defender, move.type))
        mul = 0;
    if (hasThickFat(defender) && (move.type === "ice" || move.type === "fire"))
        mul *= .6;
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
    if (isImmune(pD, move.type))
        mul = 0;
    return mul;
}

function launchGame() {
    world = 1;
    area = 1;
    money = 0;
    removePrice = 500;
    extraLoot = 0;
    flawless = true;
    for (let i = 0; i < pSelected.length; i++) {
        pokemon = createPokemon(pSelected[i]);
        adjustBST(pokemon, 600, false);
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

    ambientMusic = "resources/sounds/musics/crossroads.mp3";
    if (music)
        playMusic(ambientMusic, true);

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
bossList = ["arceus", "heatran", "mewtwo", "hoopa", "groudon", "kyogre", "rayquaza", "giratina", "eternatus", "regigigas", "diancie"];

energy = 5;
maxEnergy = 5;
player = true;
switchesLeft = 1;
weather = undefined;
terrain = undefined;
environment = [];
encounterType = undefined;

battleFilter = document.createElement('div');
battleFilter.className = "filter-clear";
battleFilter.id = "battleFilter";

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
    turn = 1;
    flawlessBattle = true;

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

    if (area < 10)
        ambientMusic = "resources/sounds/musics/battle.mp3";
    else
        ambientMusic = "resources/sounds/musics/boss.mp3";
    if (music)
        playMusic(ambientMusic, true);

    pLeftView = document.createElement('div');
    pLeftView.className = "pokemon-displayer-left";
    pLeftView.id = "pLeftView";
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
    pRightView.id = "pRightView";
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

    resizeSprites(true);

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
        p.effects = [];
        p.statchanges = new StatChanges();
        if (p.init != undefined)
            p.init();
    }
    if (opponent.init != undefined)
        opponent.init();

    for (let p of team) {
        initDeck(p);
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
    cardsPlayed = 0;
    if (player) {
        switchesLeft = 1;
        for (let p of team) {
            drawMove(p, true);
        }
        drawHand();
        if (document.body.contains(battleFilter))
            document.body.removeChild(battleFilter);
    } else {
        drawMove(opponent, true);
        document.body.appendChild(battleFilter);
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

        resizeSprites();
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
        var move = copyMove(m);
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

function copyMove(m) {
    var move = JSON.parse(JSON.stringify(m));
    move.effect = m.effect.bind(move);
    if (m.postEffect != undefined)
        move.postEffect = m.postEffect.bind(move);
    return move;
}

function copyPokemon(poke) {
    var p = Object.assign({}, poke);
    p.statchanges = JSON.stringify(team[activePokemon].statchanges);
    if (poke.init != undefined)
        p.init = poke.init.bind(p);
    if (poke.boost != undefined)
        p.boost = poke.boost.bind(p);
    if (poke.revenge != undefined)
        p.revenge = poke.revenge.bind(p);
    if (poke.endTurn != undefined)
        p.endTurn = poke.endTurn.bind(p);
    if (poke.endBattle != undefined)
        p.endBattle = poke.endBattle.bind(p);
}

function drawMove(p, newHand) {
    if (p.currenthp > 0) {
        n = 1;
        if (newHand) {
            p.discard = p.discard.concat(p.hand);
            p.hand = [];
            n = 1 + Math.round(p.speed * statsChangeMultiplier ** p.statchanges.speed / 35);
            var i = p.effects.findIndex(e => e.name === "Extra Draw");
            if (i >= 0)
                n += p.effects[i].stacks;
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

        if (player && move.cat === "status")
            statusMovesUsed += 1;
        cardsPlayed++;
        if (player)
            cardsPerTurn = Math.max(cardsPerTurn, cardsPlayed);

        var pDummy;
        if ((player && team[activePokemon].talent !== "Unseen Fist") || (!player && opponent.talent !== "Unseen Fist"))
            pDummy = new MissingNo();

        //cancelling status effects
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
        } else {
            for (let e of opponent.effects) {
                if (e.cancel != undefined && e.stacks > 0) {
                    if (!cancelled) {
                        cancelled = true;
                        e.effect(opponent, team[activePokemon]);
                        message = e.specialMessage;
                        drawEffects(false);
                    }
                }
            }
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

        //taunt
        if (player && isTaunted(team[activePokemon]) && move.cat === "status") {
            cancelled = true;
            desc.innerHTML += team[activePokemon].name + "can't use " + move.name + " after the taunt!<br />";
        } else if (!player && isTaunted(opponent) && move.cat === "status") {
            cancelled = true;
            desc.innerHTML += opponent.name + "can't use " + move.name + " after the taunt!<br />";
        }

        //protection break
        if (move.noBlock != undefined) {
            removeEffect(player ? opponent : team[activePokemon], "Protection");
            removeEffect(player ? opponent : team[activePokemon], "King's Protection");
            drawEffects(!player);
        }

        var boostMul = 1;
        //move effects
        var target;
        if (player)
            target = doesBlock(opponent) && pDummy != undefined ? pDummy : opponent;
        else
            target = doesBlock(team[activePokemon]) && pDummy != undefined ? pDummy : team[activePokemon];
        if (!cancelled) {
            if (player && (move.cat === "status" || effectiveMultiplier(move, opponent) > 0)) {
                move.effect(move, team[activePokemon], target);
                if (team[activePokemon].boost != undefined)
                    boostMul *= team[activePokemon].boost(move);
            } else if (!player && (move.cat === "status" || effectiveMultiplier(move, team[activePokemon]) > 0)) {
                move.effect(move, opponent, target);
                if (opponent.boost != undefined)
                    boostMul *= opponent.boost(move);
            }
            if (move.fails)
                cancelled = true;
        }

        if (player && move.cat !== "status" && doesBlock(opponent) && pDummy != undefined) {
            desc.innerHTML += opponent.name + " protected itself!<br />";
        } else if (!player && move.cat !== "status" && doesBlock(team[activePokemon]) && pDummy != undefined) {
            desc.innerHTML += team[activePokemon].name + " protected itself!<br />";
            blockedHits += 1;
        }

        if (move.fails && message === "") {
            desc.innerHTML += "But it failed!<br />";
        }

        if (!cancelled && ((player && (!doesBlock(opponent) || pDummy == undefined)) || (!player && (!doesBlock(team[activePokemon]) || pDummy == undefined)))) {
            var effMul = effectiveMultiplier(move, player ? opponent : team[activePokemon]);
            if (move.cat !== "status") {
                if (move.crit && effMul > 0)
                    desc.innerHTML += "Critical hit!<br />";
                if (effMul > 1)
                    desc.innerHTML += "It's super effective!<br />";
                else if (effMul == 0)
                    desc.innerHTML += "It doesn't affect " + (player ? opponent : team[activePokemon]).name + "...<br />";
                else if (effMul < 1)
                    desc.innerHTML += "It's not very effective...<br />";
            }

            var hits = 1;
            if (move.multihit != undefined)
                hits = move.multihit;
            if (player) {
                for (let i = 0; i < hits; i++) {
                    var damage = Math.floor(damageCalculator(move, team[activePokemon], opponent) * boostMul);
                    dealDamage(damage, opponent, move);
                    if (move.recoil != undefined)
                        dealDamage(Math.floor(move.recoil * damage), team[activePokemon]);
                }

            } else {
                for (let i = 0; i < hits; i++) {
                    var damage = Math.floor(damageCalculator(move, opponent, team[activePokemon]) * boostMul);
                    dealDamage(damage, team[activePokemon], move);
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

        if (!cancelled && move.postEffect != undefined) {
            if (player && (move.cat === "status" || effectiveMultiplier(move, opponent) > 0) && team[activePokemon].currenthp > 0)
                move.postEffect(move, team[activePokemon], opponent);
            else if (!player && (move.cat === "status" || effectiveMultiplier(move, team[activePokemon]) > 0) && opponent.currenthp > 0)
                move.postEffect(move, opponent, team[activePokemon]);
        }

        if (player && doesBlock(opponent) && pDummy != undefined) {
            var i = opponent.effects.findIndex(e => e.block != undefined);
            opponent.effects[i].bEffect(move, opponent, team[activePokemon]);
            drawEffects(false);
        } else if (!player && doesBlock(team[activePokemon]) && pDummy != undefined) {
            var i = team[activePokemon].effects.findIndex(e => e.block != undefined);
            team[activePokemon].effects[i].bEffect(move, team[activePokemon], opponent);
            drawEffects(true);
        }

    }
}

function dealDamage(damage, p, move) {
    if (p.currenthp > 0 && (p.currenthp == 1 || p.talent !== "Sturdy"))
        p.currenthp = Math.min(Math.max(0, Math.floor(p.currenthp - damage)), p.maxhp);
    else if (p.currenthp > 0)
        p.currenthp = Math.min(Math.max(1, Math.floor(p.currenthp - damage)), p.maxhp);
    refreshHealthBar(true);
    refreshHealthBar(false);
    checkKO();
    moveAnimation(move, damage, p);

    if (damage != 0) {
        var pD = contains(team, p) ? opponent : team[activePokemon];
        if (p.revenge != undefined)
            p.revenge(move, pD);
        for (let j of p.items) {
            if (j.revenge != undefined)
                j.effectR(move, p, pD);
        }
    }

    if (damage > 0 && move != undefined && p === team[activePokemon]) {
        if (move.cat === "physical")
            physicalDamageTaken += damage;
        else if (move.cat === "special")
            specialDamageTaken += damage;
    } else if (damage > 0 && p === opponent) {
        damageDealt += damage;
        if (move != undefined && move.type === "rock" && p.currenthp == 0)
            rockIceKO++;
    }
    if (p === team[activePokemon])
        flawlessBattle = false;
}

function checkKO() {
    if (team[activePokemon].currenthp == 0) {
        leftSprite.className += " fainted";
        var gameO = true;
        for (let p of team) {
            gameO = gameO && p.currenthp == 0;
        }
        if (gameO && gameOverTimeout == -1) {
            gameOverTimeout = setTimeout(gameOver, 3000);
            if (document.body.contains(battleFilter))
                document.body.removeChild(battleFilter);
        }
        flawless = false;
    }
    if (opponent.currenthp == 0) {
        rightSprite.className += " fainted";
        for (let p of team) {
            if (p.endBattle != undefined)
                p.endBattle();
        }
        if (rewardTimeout == -1) {
            defeatedPokemon++;
            if (area == 10 && turn <= 3)
                fastBoss++;
            for (let p of team) {
                if (p.currenthp == 1)
                    survive1hp++;
            }

            if (document.body.contains(battleFilter))
                document.body.removeChild(battleFilter);
            if (area < 10 || world < 3)
                rewardTimeout = setTimeout(rewardScreen, 3000);
            else
                rewardTimeout = setTimeout(nextEncounter, 3000);
        }
    }
}

function moveAnimation(move, damage, target) {
    damage = Math.floor(damage);

    if (move != undefined && move.cat !== "status" && damage > 0) {
        if (player) {
            document.getElementById('rightSprite').classList.add("blink");
            setTimeout(endMoveAnimation, 600);
        } else {
            document.getElementById('leftSprite').classList.add("blink");
            setTimeout(endMoveAnimation, 600);
        }
    }

    if (damage != 0 && (target === opponent || target === team[activePokemon])) {
        var damageIndicator = document.createElement('div');
        damageIndicator.className = "damage-indicator";
        document.body.appendChild(damageIndicator);
        if (damage < 0) {
            damageIndicator.style.color = "green";
            damageIndicator.innerHTML = "+" + Math.abs(damage);
        } else
            damageIndicator.innerHTML = "-" + damage;
        var sprite = document.getElementById(!contains(team, target) ? 'rightSprite' : 'leftSprite');
        var xm = Math.floor(sprite.getBoundingClientRect().x);
        var xM = xm + sprite.clientWidth;
        var ym = Math.floor(sprite.getBoundingClientRect().y);
        var yM = ym + sprite.clientHeight;
        xm += (xM - xm) / 8;
        xM -= (xM - xm) / 8;
        ym += (yM - ym) / 8;
        yM -= (yM - ym) / 8;
        var x = 0;
        var y = 0;
        var c = 0;
        do {
            x = xm + Math.floor(Math.random() * (xM - xm));
            y = ym + Math.floor(Math.random() * (yM - ym));
            damageIndicator.style.left = x + 'px';
            damageIndicator.style.top = y + 'px';
            c++;
            if (c > 30) {
                c = 0;
                xm -= (xM - xm) / 8;
                xM += (xM - xm) / 8;
                ym -= (yM - ym) / 16;
                yM += (yM - ym) / 16;
            }
        } while (x + damageIndicator.clientWidth > xM || y + damageIndicator.clientHeight > yM)
        setTimeout(() => { document.body.removeChild(damageIndicator); }, 1000);
    }
}

function endMoveAnimation() {
    document.getElementById('rightSprite').classList.remove("blink");
    document.getElementById('leftSprite').classList.remove("blink");
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
        if (team[activePokemon].endTurn != undefined)
            team[activePokemon].endTurn(opponent);
        if (opponent.endTurn != undefined)
            opponent.endTurn(team[activePokemon]);
        player = !player;
        if (player) {
            turn++;
            maxRound = Math.max(turn, maxRound);
        }
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
    if (i >= 0 && opponent.currenthp > 0 && team[activePokemon].currenthp > 0) {
        useMove(opponent.hand[i]);
        setTimeout(aiActions, 1000);
    } else {
        if (team[activePokemon].currenthp == 0) {
            desc.innerHTML += team[activePokemon].name + ' fainted!<br />Choose a new Pokémon to send out.<br />';
        }
        endTurn();
    }
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
    adjustBST(opponent, 400 + 10 * area + 100 * world + 100 * (encounter === "boss"), (encounter === "boss"));

    opponent.moves = [].concat(opponent.opponentMoves[Math.floor(Math.random() * opponent.opponentMoves.length)]);
    if (area < 10) {
        for (let i = 0; i <= Math.floor(Math.random() * 3); i++) {
            if (opponent.moves.length > 0)
                opponent.moves.splice(Math.floor(Math.random() * opponent.moves.length), 1);
        }
    }
    while (opponent.moves.length < 10) {
        opponent.moves.push(createMove(opponent.movepool[Math.floor(Math.random() * opponent.movepool.length)]));
    }

    return opponent;
}

function nextEncounter() {
    saveProgress();
    if (area == 10) {
        if (world == 3) {
            victoryScreen();
            return;
        } else {
            for (let p of team) {
                p.currenthp = Math.floor(Math.min(p.maxhp, p.currenthp + .5 * p.maxhp));
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

    victories += 1;
    if (flawless)
        flawlessVictories += 1;
    if (contains(pSelected, "venusaur") && contains(pSelected, "charizard") && contains(pSelected, "blastoise"))
        starterVictories += 1;
    var i = team.findIndex(e => e.name === "Pikachu");
    if (i >= 0 && team[i].currenthp == 0)
        pikachuVictory += 1;
    saveProgress();
}






/* ------------------------------------------------------ */
/* ------------------ Reward selection ------------------ */
/* ------------------------------------------------------ */

function rewardScreen() {
    var audios = document.getElementsByTagName('audio');
    for (let a of audios) {
        a.pause();
        a = null;
    }
    ambientMusic = "resources/sounds/musics/victory.mp3";
    if (music)
        playMusic(ambientMusic, true);

    money += 10 * Math.round(Math.sqrt(75 * (10 * world + area)));
    earnedMoney += 10 * Math.round(Math.sqrt(75 * (10 * world + area)));

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
        earnedMoney += 100;
        if (Math.random() < extraLoot || tuto || area == 10) {
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
        earnedMoney += 150;
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

    ambientMusic = "resources/sounds/musics/pokemon_center.mp3";
    if (music)
        playMusic(ambientMusic, true);

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
        p.currenthp = Math.floor(Math.min(p.maxhp, p.currenthp + .5 * p.maxhp));
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

    ambientMusic = "resources/sounds/musics/pokemart.mp3";
    if (music)
        playMusic(ambientMusic, true);

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

    saveProgress();
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
        case "heatran":
            return new Heatran();
        case "mewtwo":
            return new Mewtwo();
        case "hoopa":
            return new Hoopa();
        case "groudon":
            return new Groudon();
        case "kyogre":
            return new Kyogre();
        case "rayquaza":
            return new Rayquaza();
        case "giratina":
            return new Giratina();
        case "eternatus":
            return new Eternatus();
        case "regigigas":
            return new Regigigas();
        case "diancie":
            return new Diancie();
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
    this.description = "A specially oriented attacker with decent bulk, capable of spreading poison and benefitting from the sun."
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
    this.movepool = ["vine_whip", "poison_powder", "leech_seed", "double_edge", "earthquake", "rest", "toxic", "mega_drain", "giga_drain", "sludge", "bulldoze", "bullet_seed", "curse", "energy_ball", "frenzy_plant", "growth", "hidden_power", "ingrain", "leaf_storm", "outrage", "power_whip", "razor_leaf", "sleep_powder", "sludge_bomb", "solar_beam", "substitute", "sunny_day", "synthesis", "venoshock", "weather_ball", "venom_drench", "toxic_spikes"];
    this.opponentMoves =
        [[createMove("vine_whip"), createMove("synthesis"), createMove("power_whip"), createMove("sunny_day"), createMove("solar_beam"), createMove("mega_drain"), createMove("growth"), createMove("energy_ball"), createMove("sludge_bomb"), createMove("double_edge")],
        [createMove("poison_powder"), createMove("poison_powder"), createMove("sludge"), createMove("toxic"), createMove("mega_drain"), createMove("leech_seed"), createMove("venom_drench"), createMove("toxic"), createMove("sludge_bomb"), createMove("sludge_bomb")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/venusaur.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/venusaur.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Overgrow";
    this.talentDesc = "Increases the power of grass type moves by 50% when under 30% HP."
    this.boost = function (move) { return 1 + .5 * (this.currenthp < .3 * this.maxhp && move.type === "grass"); };
    this.unlocked = true;
}

function Charizard() {
    this.name = "Charizard";
    this.description = "A mixed attacker with good coverage, capable of spreading burns and benefitting from the sun."
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
    this.opponentMoves =
        [[createMove("ember"), createMove("blast_burn"), createMove("flamethrower"), createMove("sunny_day"), createMove("solar_beam"), createMove("weather_ball"), createMove("air_cutter"), createMove("dragon_pulse"), createMove("heat_wave"), createMove("hurricane")],
        [createMove("outrage"), createMove("dragon_claw"), createMove("breaking_swipe"), createMove("swords_dance"), createMove("crunch"), createMove("wing_attack"), createMove("wing_attack"), createMove("dual_wingbeat"), createMove("flare_blitz"), createMove("flame_charge")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/charizard.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/charizard.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Blaze";
    this.talentDesc = "Increases the power of fire type moves by 50% when under 30% HP."
    this.boost = function (move) { return 1 + .5 * (this.currenthp < .3 * this.maxhp && move.type === "fire"); };
    this.unlocked = true;
}

function Blastoise() {
    this.name = "Blastoise";
    this.description = "A mixed attacker with good bulk, benefitting from the rain."
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
    this.opponentMoves =
        [[createMove("water_gun"), createMove("water_pulse"), createMove("rain_dance"), createMove("flip_turn"), createMove("weather_ball"), createMove("earthquake"), createMove("shell_smash"), createMove("brine"), createMove("hydro_pump"), createMove("ice_beam")],
        [createMove("rapid_spin"), createMove("curse"), createMove("iron_defense"), createMove("iron_tail"), createMove("liquidation"), createMove("skull_bash"), createMove("water_spout"), createMove("rest"), createMove("dive"), createMove("waterfall")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/blastoise.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/blastoise.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Torrent";
    this.talentDesc = "Increases the power of water type moves by 50% when under 30% HP."
    this.boost = function (move) { return 1 + .5 * (this.currenthp < .3 * this.maxhp && move.type === "water"); }
    this.unlocked = true;
}

function Pikachu() {
    this.name = "Pikachu";
    this.description = "A fast powerful mixed attacker, capable of spreading paralysis."
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
    this.opponentMoves =
        [[createMove("thunder_shock"), createMove("nasty_plot"), createMove("charge"), createMove("charge_beam"), createMove("agility"), createMove("electro_ball"), createMove("thunderbolt"), createMove("grass_knot"), createMove("discharge"), createMove("electroweb")],
        [createMove("nuzzle"), createMove("quick_attack"), createMove("fake_out"), createMove("iron_tail"), createMove("volt_tackle"), createMove("play_rough"), createMove("spark"), createMove("extreme_speed"), createMove("double_kick"), createMove("facade")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/pikachu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/pikachu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Static";
    this.talentDesc = "Attackers making contact with this Pokémon with not very effective attacks are paralyzed."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) < 1 && move.cat === "physical") applyEffect("paralysis", 1, pD); }
    this.unlocked = defeatedPokemon >= 5;
    this.hint = "Defeat 5 Pokémon\n" + defeatedPokemon + "/5";
}

function Garchomp() {
    this.name = "Garchomp";
    this.description = "A well-rounded physical attacker with decent bulk, with powerful dragon type moves."
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
    this.opponentMoves =
        [[createMove("swords_dance"), createMove("outrage"), createMove("dragon_claw"), createMove("dual_chop"), createMove("dragon_rush"), createMove("dragon_tail"), createMove("earthquake"), createMove("scale_shot"), createMove("rock_slide"), createMove("iron_tail")],
        [createMove("earthquake"), createMove("sand_tomb"), createMove("stomping_tantrum"), createMove("hone_claws"), createMove("stone_edge"), createMove("rock_slide"), createMove("sandstorm"), createMove("stealth_rock"), createMove("bulldoze"), createMove("fire_blast")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/garchomp.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/garchomp.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Rough skin"
    this.talentDesc = "Attackers making contact with this Pokémon take 10 damage."
    this.revenge = function (move, pD) { if (move != undefined && move.cat === "physical") dealDamage(10, pD); }
    this.unlocked = defeatedPokemon >= 20;
    this.hint = "Defeat 20 Pokémon\n" + defeatedPokemon + "/20";
}

function Cinderace() {
    this.name = "Cinderace";
    this.description = "An all-purpose fast physical attacker with great coverage, capable of hitting hard any foe."
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
    this.opponentMoves =
        [[createMove("fire_punch"), createMove("fire_fang"), createMove("pyro_ball"), createMove("flame_charge"), createMove("flare_blitz"), createMove("blaze_kick"), createMove("sunny_day"), createMove("double_edge"), createMove("iron_head"), createMove("bounce")],
        [createMove("pyro_ball"), createMove("quick_attack"), createMove("u_turn"), createMove("iron_head"), createMove("bounce"), createMove("gunk_shot"), createMove("high_jump_kick"), createMove("zen_headbutt"), createMove("super_fang"), createMove("bulk_up")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/cinderace.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/cinderace.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Libero"
    this.talentDesc = "Changes type to match that of used moves. Reduced STAB damage bonus."
    this.init = function () { this.types = ["fire"]; }
    this.boost = function (move) {
        this.types = [move.type];
        removeEffect(this, "Type changed");
        applyEffect("type_changed", 1, this, move.type);
        return .9;
    }
    this.unlocked = defeatedPokemon >= 50;
    this.hint = "Defeat 50 Pokémon\n" + defeatedPokemon + "/50";
}

function Lucario() {
    this.name = "Lucario";
    this.description = "A powerful mixed attacker, capable of buffing itself to deal heavy damage."
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
    this.opponentMoves =
        [[createMove("rock_smash"), createMove("metal_claw"), createMove("brick_break"), createMove("bulk_up"), createMove("bullet_punch"), createMove("extreme_speed"), createMove("high_jump_kick"), createMove("meteor_mash"), createMove("iron_tail"), createMove("bone_rush")],
        [createMove("aura_sphere"), createMove("calm_mind"), createMove("dark_pulse"), createMove("dragon_pulse"), createMove("flash_cannon"), createMove("focus_blast"), createMove("nasty_plot"), createMove("psychic"), createMove("vacuum_wave"), createMove("steel_beam")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/lucario.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/lucario.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Inner focus"
    this.talentDesc = "This Pokémon cannot be made to flinch."
    this.revenge = function (move, pD) { removeEffect(this, "Fear"); }
    this.unlocked = defeatedPokemon >= 100;
    this.hint = "Defeat 100 Pokémon\n" + defeatedPokemon + "/100";
}

function Volcarona() {
    this.name = "Volcarona";
    this.description = "A powerful special attacker, capable of buffing itself to deal heavy damage and benefitting from the sun."
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
    this.opponentMoves =
        [[createMove("quiver_dance"), createMove("struggle_bug"), createMove("giga_drain"), createMove("fiery_dance"), createMove("bug_buzz"), createMove("signal_beam"), createMove("silver_wind"), createMove("hurricane"), createMove("psychic"), createMove("flamethrower")],
        [createMove("quiver_dance"), createMove("fiery_dance"), createMove("bug_buzz"), createMove("giga_drain"), createMove("fire_blast"), createMove("sunny_day"), createMove("heat_wave"), createMove("fire_blast"), createMove("mystical_fire"), createMove("ember")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/volcarona.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/volcarona.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Flame body";
    this.talentDesc = "Attackers making contact with this Pokémon with not very effective attacks are burned."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) < 1 && move.cat === "physical") applyEffect("burn", 1, pD); }
    this.unlocked = defeatedPokemon >= 150;
    this.hint = "Defeat 150 Pokémon\n" + defeatedPokemon + "/150";
}

function Eevee() {
    this.name = "Eevee";
    this.description = "A well-rounded Pokémon, capable of dealing decent normal type damage and helping its teammates."
    this.hp = 55;
    this.attack = 55;
    this.defense = 50;
    this.spattack = 45;
    this.spdefense = 65;
    this.speed = 55;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("tackle"), createMove("facade"), createMove("quick_attack"), createMove("wish"), createMove("baton_pass"), createMove("hidden_power")];
    this.movepool = ["quick_attack", "last_resort", "double_edge", "baton_pass", "bite", "echoed_voice", "facade", "hidden_power", "mimic", "protect", "shadow_ball", "skull_bash", "wish", "psychic", "flamethrower", "ice_beam", "thunderbolt", "hydro_pump", "extreme_evoboost", "stored_power", "body_slam", "charm", "fake_tears", "flail", "headbutt", "heal_bell", "hyper_voice", "iron_tail", "tickle", "leaf_blade", "moonblast", "snarl"];
    this.opponentMoves =
        [[createMove("extreme_evoboost"), createMove("quick_attack"), createMove("double_edge"), createMove("tackle"), createMove("shadow_ball"), createMove("skull_bash"), createMove("echoed_voice"), createMove("bite"), createMove("stored_power"), createMove("hyper_voice")],
        [createMove("extreme_evoboost"), createMove("hidden_power"), createMove("psychic"), createMove("flamethrower"), createMove("ice_beam"), createMove("thunderbolt"), createMove("hydro_pump"), createMove("leaf_blade"), createMove("moonblast"), createMove("snarl")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/eevee.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/eevee.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Adaptability";
    this.talentDesc = "Increased STAB damage bonus."
    this.boost = function (move) { return 1 + .3 * (contains(this.types, move.type)); }
    this.unlocked = victories >= 1;
    this.hint = "Beat the game"
}

function Gardevoir() {
    this.name = "Gardevoir";
    this.description = "A powerful special attacker with good coverage, capable of spreading various status conditions."
    this.hp = 68;
    this.attack = 65;
    this.defense = 65;
    this.spattack = 125;
    this.spdefense = 115;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic", "fairy"];
    this.moves = [createMove("confusion"), createMove("psychic"), createMove("disarming_voice"), createMove("dazzling_gleam"), createMove("calm_mind"), createMove("hypnosis")];
    this.movepool = ["confusion", "disarming_voice", "hypnosis", "dazzling_gleam", "ally_switch", "calm_mind", "charge_beam", "draining_kiss", "dream_eater", "echoed_voice", "energy_ball", "focus_blast", "grass_knot", "heal_pulse", "hidden_power", "hyper_beam", "hyper_voice", "moonblast", "psychic", "shadow_ball", "shock_wave", "signal_beam", "stored_power", "thunderbolt", "will_o_wisp", "wish", "confuse_ray", "future_sight", "magical_leaf", "memento", "psych_up", "thunder_wave", "psybeam"];
    this.opponentMoves =
        [[createMove("calm_mind"), createMove("hypnosis"), createMove("hypnosis"), createMove("dream_eater"), createMove("psychic"), createMove("dazzling_gleam"), createMove("moonblast"), createMove("shadow_ball"), createMove("confusion"), createMove("draining_kiss")],
        [createMove("calm_mind"), createMove("charge_beam"), createMove("psychic"), createMove("disarming_voice"), createMove("dazzling_gleam"), createMove("moonblast"), createMove("energy_ball"), createMove("heal_pulse"), createMove("hyper_beam"), createMove("confuse_ray")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gardevoir.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gardevoir.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Synchronize";
    this.talentDesc = "At the end of each turn, copies all status conditions onto the opponent in limited amounts."
    this.endTurn = function (pD) {
        if (isPoisoned(this)) applyEffect("poison", 4, pD);
        if (isBurned(this)) applyEffect("burn", 1, pD);
        if (isParalyzed(this)) applyEffect("paralysis", 1, pD);
        if (isFrozen(this)) applyEffect("freeze", 1, pD);
        if (isAsleep(this)) applyEffect("sleep", 1, pD);
    }
    this.unlocked = flawlessVictories >= 1;
    this.hint = "Beat the game without any Pokémon fainting"
}

function Dragonite() {
    this.name = "Dragonite";
    this.description = "A strong physical attacker with decent bulk, with powerful dragon type moves."
    this.hp = 91;
    this.attack = 134;
    this.defense = 95;
    this.spattack = 100;
    this.spdefense = 100;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dragon", "flying"];
    this.moves = [createMove("aerial_ace"), createMove("thunder_punch"), createMove("wing_attack"), createMove("twister"), createMove("ice_punch"), createMove("fire_punch")];
    this.movepool = ["wing_attack", "air_cutter", "air_slash", "aqua_jet", "aqua_tail", "breaking_swipe", "brick_break", "bulldoze", "defog", "draco_meteor", "dragon_claw", "dragon_dance", "dragon_pulse", "dragon_rush", "dragon_tail", "dual_wingbeat", "earthquake", "extreme_speed", "fire_punch", "hone_claws", "hurricane", "hydro_pump", "iron_tail", "outrage", "rain_dance", "rock_slide", "roost", "scale_shot", "stone_edge", "superpower", "surf", "twister", "waterfall", "aerial_ace", "fly", "ice_punch", "steel_wing", "thunder_punch"];
    this.opponentMoves =
        [[createMove("dragon_dance"), createMove("breaking_swipe"), createMove("dragon_claw"), createMove("dragon_rush"), createMove("dragon_tail"), createMove("draco_meteor"), createMove("extreme_speed"), createMove("hone_claws"), createMove("earthquake"), createMove("wing_attack")],
        [createMove("wing_attack"), createMove("dual_wingbeat"), createMove("roost"), createMove("fly"), createMove("steel_wing"), createMove("draco_meteor"), createMove("extreme_speed"), createMove("brick_break"), createMove("aqua_tail"), createMove("rock_slide")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/dragonite.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/dragonite.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Inner focus"
    this.talentDesc = "This Pokémon cannot be made to flinch."
    this.revenge = function (move, pD) { removeEffect(this, "Fear"); }
    this.unlocked = starterVictories >= 1;
    this.hint = "Beat the game with the starters"
}

function Ferrothorn() {
    this.name = "Ferrothorn";
    this.description = "A utility Pokémon boasting great bulk, capable of buffing itself, spreading status conditions and setting traps."
    this.hp = 74;
    this.attack = 94;
    this.defense = 131;
    this.spattack = 54;
    this.spdefense = 116;
    this.speed = 20;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["grass", "steel"];
    this.moves = [createMove("gyro_ball"), createMove("seed_bomb"), createMove("vine_whip"), createMove("metal_claw"), createMove("leech_seed"), createMove("spikes")];
    this.movepool = ["vine_whip", "metal_claw", "leech_seed", "assurance", "body_press", "brutal_swing", "bullet_seed", "curse", "facade", "gyro_ball", "hone_claws", "ingrain", "iron_defense", "iron_head", "payback", "pin_missile", "poison_jab", "power_whip", "protect", "rest", "rock_polish", "rollout", "sandstorm", "shadow_claw", "stealth_rock", "swagger", "swords_dance", "thunder_wave", "toxic", "explosion", "heavy_slam", "revenge", "seed_bomb", "spikes"];
    this.opponentMoves =
        [[createMove("curse"), createMove("leech_seed"), createMove("iron_defense"), createMove("body_press"), createMove("gyro_ball"), createMove("protect"), createMove("stealth_rock"), createMove("ingrain"), createMove("spikes"), createMove("vine_whip")],
        [createMove("curse"), createMove("gyro_ball"), createMove("power_whip"), createMove("bullet_seed"), createMove("iron_head"), createMove("payback"), createMove("poison_jab"), createMove("swords_dance"), createMove("seed_bomb"), createMove("metal_claw")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/ferrothorn.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/ferrothorn.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Iron barbs"
    this.talentDesc = "Attackers making contact with this Pokémon take 10 damage."
    this.revenge = function (move, pD) { if (move != undefined && move.cat === "physical") dealDamage(10, pD); }
    this.unlocked = physicalDamageTaken >= 15000;
    this.hint = "Take 15,000 physical damage\n" + physicalDamageTaken + "/15000";
}

function Blissey() {
    this.name = "Blissey";
    this.description = "A cleric with specially offensive options, boasting stellar special bulk despite a dangerously low defense."
    this.hp = 255;
    this.attack = 10;
    this.defense = 10;
    this.spattack = 75;
    this.spdefense = 135;
    this.speed = 55;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("echoed_voice"), createMove("toxic"), createMove("soft_boiled"), createMove("heal_pulse"), createMove("heal_bell"), createMove("teleport")];
    this.movepool = ["echoed_voice", "soft_boiled", "heal_pulse", "toxic", "blizzard", "bubble_beam", "calm_mind", "charge_beam", "charm", "dazzling_gleam", "disarming_voice", "flamethrower", "focus_blast", "grass_knot", "heal_bell", "hyper_voice", "ice_beam", "life_dew", "metronome", "mimic", "protect", "psychic", "shadow_ball", "stealth_rock", "substitute", "thunderbolt", "thunder_wave", "toxic", "water_pulse", "wish", "rain_dance", "sunny_day", "hail", "sandstorm", "sing", "sweet_kiss", "teleport", "tri_attack", "uproar"];
    this.opponentMoves =
        [[createMove("soft_boiled"), createMove("wish"), createMove("heal_pulse"), createMove("calm_mind"), createMove("charge_beam"), createMove("echoed_voice"), createMove("focus_blast"), createMove("hyper_voice"), createMove("toxic"), createMove("psychic")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/blissey.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/blissey.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Natural cure"
    this.talentDesc = "Status conditions are removed at the end of each turn, after taking effect."
    this.endTurn = function (pD) {
        if (isPoisoned(this)) removeEffect(this, "Poison");
        if (isBurned(this)) removeEffect(this, "Burn");
        if (isParalyzed(this)) removeEffect(this, "Paralysis");
        if (isFrozen(this)) removeEffect(this, "Freeze");
        if (isAsleep(this)) removeEffect(this, "Sleep");
    }
    this.unlocked = specialDamageTaken >= 15000;
    this.hint = "Take 15,000 special damage\n" + specialDamageTaken + "/15000";
}

function Sableye() {
    this.name = "Sableye";
    this.description = "A utility Pokémon with a large array of options, capable of using countless status moves and hitting hard occasionally."
    this.hp = 50;
    this.attack = 75;
    this.defense = 75;
    this.spattack = 65;
    this.spdefense = 65;
    this.speed = 50;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dark", "ghost"];
    this.moves = [createMove("will_o_wisp"), createMove("hex"), createMove("detect"), createMove("recover"), createMove("foul_play"), createMove("spite")];
    this.movepool = ["shadow_sneak", "detect", "toxic", "ally_switch", "brick_break", "calm_mind", "confuse_ray", "dark_pulse", "dazzling_gleam", "fake_out", "hone_claws", "metronome", "mimic", "nasty_plot", "payback", "poison_jab", "protect", "psych_up", "recover", "rest", "seismic_toss", "shadow_ball", "shadow_claw", "snarl", "substitute", "sucker_punch", "swagger", "taunt", "tickle", "will_o_wisp", "zen_headbutt", "astonish", "disable", "flatter", "foul_play", "hex", "lash_out", "mean_look", "moonlight", "night_shade", "poltergeist", "power_gem", "spite"];
    this.opponentMoves =
        [[createMove("detect"), createMove("toxic"), createMove("will_o_wisp"), createMove("confuse_ray"), createMove("swagger"), createMove("hex"), createMove("foul_play"), createMove("flatter"), createMove("taunt"), createMove("disable")],
        [createMove("shadow_sneak"), createMove("will_o_wisp"), createMove("hex"), createMove("recover"), createMove("dark_pulse"), createMove("metronome"), createMove("psych_up"), createMove("payback"), createMove("seismic_toss"), createMove("snarl")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/sableye.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/sableye.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Prankster";
    this.talentDesc = "When using a status move, draw a card."
    this.boost = function (move) {
        if (move.cat === "status")
            drawMove(this, false);
        return 1;
    }
    this.unlocked = statusMovesUsed >= 150;
    this.hint = "Use 150 status moves\n" + statusMovesUsed + "/150";
}

function Scizor() {
    this.name = "Scizor";
    this.description = "A powerful physical attacker with decent bulk, capable of buffing itself to deal heavy damage."
    this.hp = 70;
    this.attack = 130;
    this.defense = 100;
    this.spattack = 55;
    this.spdefense = 80;
    this.speed = 65;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["bug", "steel"];
    this.moves = [createMove("metal_claw"), createMove("bullet_punch"), createMove("fury_cutter"), createMove("wing_attack"), createMove("x_scissor"), createMove("u_turn")];
    this.movepool = ["metal_claw", "fury_cutter", "wing_attack", "aerial_ace", "agility", "assurance", "baton_pass", "brick_break", "bullet_punch", "cross_poison", "curse", "defog", "dual_wingbeat", "facade", "fling", "iron_defense", "iron_head", "morning_sun", "night_slash", "reversal", "rock_smash", "roost", "sand_tomb", "slash", "steel_wing", "superpower", "swords_dance", "u_turn", "bug_bite", "psycho_cut", "x_scissor"];
    this.opponentMoves =
        [[createMove("swords_dance"), createMove("metal_claw"), createMove("bullet_punch"), createMove("iron_defense"), createMove("iron_head"), createMove("steel_wing"), createMove("x_scissor"), createMove("fury_cutter"), createMove("wing_attack"), createMove("slash")],
        [createMove("swords_dance"), createMove("fury_cutter"), createMove("u_turn"), createMove("bug_bite"), createMove("x_scissor"), createMove("metal_claw"), createMove("roost"), createMove("dual_wingbeat"), createMove("night_slash"), createMove("psycho_cut")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/scizor.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/scizor.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Technician";
    this.talentDesc = "Damaging moves with a cost of 1 or less deal 20% extra damage."
    this.boost = function (move) { return 1 + .2 * (move.bp > 0 && move.cost <= 1); }
    this.unlocked = damageDealt >= 50000;
    this.hint = "Deal 50,000 damage\n" + damageDealt + "/50000";
}

function Aegislash() {
    this.name = "Aegislash";
    this.description = "A mighty mixed attacker and impenetrable wall at the same time, provided it can switch stance accordingly."
    this.hp = 60;
    this.attack = 50;
    this.defense = 140;
    this.spattack = 50;
    this.spdefense = 140;
    this.speed = 60;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["steel", "ghost"];
    this.moves = [createMove("metal_claw"), createMove("shadow_sneak"), createMove("swords_dance"), createMove("kings_shield"), createMove("sacred_sword"), createMove("shadow_ball")];
    this.movepool = ["metal_claw", "shadow_sneak", "swords_dance", "kings_shield", "kings_shield", "kings_shield", "kings_shield", "air_slash", "brick_break", "close_combat", "flash_cannon", "fury_cutter", "gyro_ball", "hyper_beam", "iron_defense", "iron_head", "magnet_rise", "night_slash", "psycho_cut", "reversal", "rock_slide", "shadow_ball", "shadow_claw", "shock_wave", "slash", "spite", "steel_beam", "swagger", "toxic", "autotomize", "brutal_swing", "head_smash", "metal_sound", "sacred_sword", "solar_blade"];
    this.opponentMoves =
        [[createMove("kings_shield"), createMove("kings_shield"), createMove("swords_dance"), createMove("metal_claw"), createMove("shadow_sneak"), createMove("sacred_sword"), createMove("gyro_ball"), createMove("iron_head"), createMove("shadow_claw"), createMove("rock_slide")],
        [createMove("kings_shield"), createMove("kings_shield"), createMove("flash_cannon"), createMove("flash_cannon"), createMove("shadow_ball"), createMove("shadow_ball"), createMove("metal_sound"), createMove("shock_wave"), createMove("air_slash"), createMove("magnet_rise")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/aegislash.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/aegislash.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Stance change";
    this.talentDesc = "Switch to blade form by using damaging moves and shield form by using King's Shield.";
    this.stance = "shield";
    this.init = function () { switchAegislash(this, true); }
    this.boost = function (move) {
        if (move.bp > 0)
            switchAegislash(this, false);
        else if (move.name === "King's Shield")
            switchAegislash(this, true);
        return 1;
    }
    this.unlocked = blockedHits >= 30;
    this.hint = "Block 30 attacks\n" + blockedHits + "/30";
}

function switchAegislash(p, shield) {
    if (p.name === "Aegislash") {
        if (shield && p.stance !== "shield") {
            var temp = p.attack;
            p.attack = p.defense;
            p.defense = temp;
            temp = p.spattack;
            p.spattack = p.spdefense;
            p.spdefense = temp;
            p.imgf = 'resources/sprites/pokemon_battle_icons/front/aegislash.gif';
            p.imgb = 'resources/sprites/pokemon_battle_icons/back/aegislash.gif';
            resizeSprites(true);
            p.stance = "shield";
            if (team[activePokemon] === p) {
                document.getElementById("leftSprite").src = p.imgb;
            } else if (opponent === p) {
                document.getElementById("rightSprite").src = p.imgf;
            }
        } else if (!shield && p.stance === "shield") {
            var temp = p.attack;
            p.attack = p.defense;
            p.defense = temp;
            temp = p.spattack;
            p.spattack = p.spdefense;
            p.spdefense = temp;
            p.imgf = 'resources/sprites/pokemon_battle_icons/front/aegislash_blade.gif';
            p.imgb = 'resources/sprites/pokemon_battle_icons/back/aegislash_blade.gif';
            resizeSprites(true);
            p.stance = "blade";
            if (team[activePokemon] === p) {
                document.getElementById("leftSprite").src = p.imgb;
            } else if (opponent === p) {
                document.getElementById("rightSprite").src = p.imgf;
            }
        }
    }
}

function Meowth() {
    this.name = "Meowth";
    this.description = "A weaker mixed attacker with great speed, capable of increasing battle loot."
    this.hp = 40;
    this.attack = 45;
    this.defense = 35;
    this.spattack = 40;
    this.spdefense = 40;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("scratch"), createMove("assurance"), createMove("pay_day"), createMove("fury_swipes"), createMove("feint"), createMove("fake_out")];
    this.movepool = ["pay_day", "fury_swipes", "assurance", "bite", "bubble_beam", "charm", "dark_pulse", "dig", "double_edge", "echoed_voice", "facade", "fake_out", "flail", "foul_play", "gunk_shot", "happy_hour", "hone_claws", "hyper_voice", "hypnosis", "iron_tail", "lash_out", "last_resort", "nasty_plot", "night_slash", "payback", "scratch", "seed_bomb", "shadow_claw", "slash", "swagger", "taunt", "thunderbolt", "uproar", "u_turn", "water_pulse", "feint", "happy_hour", "screech"];
    this.opponentMoves =
        [[createMove("scratch"), createMove("fury_swipes"), createMove("fake_out"), createMove("bite"), createMove("flail"), createMove("gunk_shot"), createMove("hone_claws"), createMove("night_slash"), createMove("slash"), createMove("feint")],
        [createMove("nasty_plot"), createMove("charm"), createMove("dark_pulse"), createMove("echoed_voice"), createMove("hyper_voice"), createMove("hypnosis"), createMove("thunderbolt"), createMove("water_pulse"), createMove("screech"), createMove("uproar")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/meowth.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/meowth.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pickup";
    this.talentDesc = "Increased chance to find held items after a battle.";
    this.endBattle = function () { extraLoot += .1; }
    this.unlocked = earnedMoney >= 10000;
    this.hint = "Earn " + String.fromCharCode(08381) + "10,000\n" + earnedMoney + "/10000";
}

function Metagross() {
    this.name = "Metagross";
    this.description = "A powerful physical attacker, capable of buffing itself to deal heavy damage."
    this.hp = 80;
    this.attack = 135;
    this.defense = 130;
    this.spattack = 95;
    this.spdefense = 90;
    this.speed = 70;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["steel", "psychic"];
    this.moves = [createMove("metal_claw"), createMove("hammer_arm"), createMove("confusion"), createMove("bullet_punch"), createMove("meteor_mash"), createMove("giga_impact")];
    this.movepool = ["metal_claw", "confusion", "bullet_punch", "hammer_arm", "agility", "body_press", "brutal_swing", "bulldoze", "double_edge", "dynamic_punch", "earthquake", "explosion", "flash_cannon", "giga_impact", "gyro_ball", "headbutt", "hone_claws", "iron_defense", "iron_head", "magnet_rise", "meteor_mash", "power_up_punch", "psychic", "psycho_cut", "rest", "rock_slide", "sandstorm", "shadow_ball", "sludge_bomb", "stealth_rock", "steel_beam", "stomping_tantrum", "zen_headbutt", "meteor_beam"];
    this.opponentMoves =
        [[createMove("gyro_ball"), createMove("metal_claw"), createMove("bullet_punch"), createMove("iron_defense"), createMove("iron_head"), createMove("meteor_mash"), createMove("zen_headbutt"), createMove("dynamic_punch"), createMove("body_press"), createMove("giga_impact")],
        [createMove("agility"), createMove("hammer_arm"), createMove("bullet_punch"), createMove("metal_claw"), createMove("zen_headbutt"), createMove("confusion"), createMove("earthquake"), createMove("magnet_rise"), createMove("psycho_cut"), createMove("psychic")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/metagross.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/metagross.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Clear body"
    this.talentDesc = "Lowered stats are restored at the end of eah turn."
    this.endTurn = function () {
        this.statchanges.attack = Math.max(0, this.statchanges.attack);
        this.statchanges.defense = Math.max(0, this.statchanges.defense);
        this.statchanges.spattack = Math.max(0, this.statchanges.spattack);
        this.statchanges.spdefense = Math.max(0, this.statchanges.spdefense);
        this.statchanges.speed = Math.max(0, this.statchanges.speed);
        drawStats(contains(team, this));
    }
    this.unlocked = drawnCards >= 1000;
    this.hint = "Draw 1,000 cards\n" + drawnCards + "/1000";
}

function Weavile() {
    this.name = "Weavile";
    this.description = "A fast powerful physical attacker, capable of using many moves to deal heavy damage and benefitting from the hail."
    this.hp = 70;
    this.attack = 120;
    this.defense = 65;
    this.spattack = 45;
    this.spdefense = 85;
    this.speed = 125;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dark", "ice"];
    this.moves = [createMove("icicle_crash"), createMove("ice_shard"), createMove("assurance"), createMove("beat_up"), createMove("hail"), createMove("feint")];
    this.movepool = ["ice_shard", "assurance", "beat_up", "assurance", "avalanche", "bite", "brick_break", "detect", "double_edge", "fake_out", "fake_tears", "feint", "fling", "focus_punch", "foul_play", "fury_cutter", "fury_swipes", "hail", "hone_claws", "ice_punch", "iron_tail", "lash_out", "low_kick", "metal_claw", "night_slash", "payback", "poison_jab", "psycho_cut", "revenge", "shadow_claw", "slash", "swords_dance", "taunt", "x_scissor", "crush_claw", "icicle_crash", "icicle_spear", "throat_chop", "triple_axel"];
    this.opponentMoves =
        [[createMove("ice_shard"), createMove("avalanche"), createMove("hail"), createMove("ice_punch"), createMove("icicle_crash"), createMove("icicle_spear"), createMove("triple_axel"), createMove("assurance"), createMove("foul_play"), createMove("night_slash")],
        [createMove("assurance"), createMove("bite"), createMove("fake_out"), createMove("fake_tears"), createMove("low_kick"), createMove("slash"), createMove("night_slash"), createMove("hone_claws"), createMove("icicle_spear"), createMove("ice_shard")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/weavile.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/weavile.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
    this.unlocked = fastBoss >= 1;
    this.hint = "Defeat a boss in 3 turns or less";
}

function Zeraora() {
    this.name = "Zeraora";
    this.description = "A fast powerful mixed attacker, capable of buffing itself to power up its electric and fighting type moves."
    this.hp = 88;
    this.attack = 112;
    this.defense = 75;
    this.spattack = 102;
    this.spdefense = 80;
    this.speed = 143;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["electric"];
    this.moves = [createMove("plasma_fists"), createMove("volt_switch"), createMove("spark"), createMove("power_up_punch"), createMove("bulk_up"), createMove("charge")];
    this.movepool = ["spark", "power_up_punch", "volt_switch", "aerial_ace", "assurance", "aura_sphere", "blaze_kick", "bounce", "bulk_up", "calm_mind", "charge", "close_combat", "discharge", "drain_punch", "dual_chop", "electro_ball", "electroweb", "focus_blast", "focus_punch", "grass_knot", "hone_claws", "iron_tail", "low_kick", "outrage", "plasma_fists", "play_rough", "revenge", "shock_wave", "slash", "throat_chop", "thunder", "thunderbolt", "thunder_punch", "thunder_wave", "wild_charge"];
    this.opponentMoves =
        [[createMove("plasma_fists"), createMove("spark"), createMove("power_up_punch"), createMove("bulk_up"), createMove("blaze_kick"), createMove("throat_chop"), createMove("play_rough"), createMove("drain_punch"), createMove("thunder_punch"), createMove("wild_charge")],
        [createMove("volt_switch"), createMove("aura_sphere"), createMove("calm_mind"), createMove("charge"), createMove("discharge"), createMove("electro_ball"), createMove("electroweb"), createMove("focus_blast"), createMove("grass_knot"), createMove("thunderbolt")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/zeraora.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/zeraora.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Volt absorb"
    this.talentDesc = "Electric immunity."
    this.init = function () { applyEffect("immunity", 1, this, "electric"); }
    this.unlocked = cardsPerTurn >= 8;
    this.hint = "Use 8 cards in a single turn\n" + cardsPerTurn + "/8";
}

function Omanyte() {
    this.name = "Omanyte";
    this.description = "A physically bulky wall with good specially offensive presence despite a low speed, benefitting greatly from the rain and sometimes from the hail or the sandstorm."
    this.hp = 35;
    this.attack = 40;
    this.defense = 100;
    this.spattack = 90;
    this.spdefense = 55;
    this.speed = 35;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["rock", "water"];
    this.moves = [createMove("water_gun"), createMove("icy_wind"), createMove("rollout"), createMove("ancient_power"), createMove("bubble_beam"), createMove("withdraw")];
    this.movepool = ["water_gun", "rollout", "ancient_power", "aurora_beam", "blizzard", "brine", "bubble_beam", "earth_power", "hail", "hidden_power", "hydro_pump", "ice_beam", "iron_defense", "meteor_beam", "rain_dance", "rest", "rock_polish", "scald", "shell_smash", "spikes", "stealth_rock", "surf", "toxic_spikes", "water_gun", "water_pulse", "whirlpool", "haze", "icy_wind", "muddy_water", "withdraw"];
    this.opponentMoves =
        [[createMove("rain_dance"), createMove("water_gun"), createMove("ancient_power"), createMove("brine"), createMove("bubble_beam"), createMove("hydro_pump"), createMove("meteor_beam"), createMove("scald"), createMove("water_pulse"), createMove("stealth_rock")],
        [createMove("hail"), createMove("scald"), createMove("blizzard"), createMove("aurora_beam"), createMove("ice_beam"), createMove("icy_wind"), createMove("withdraw"), createMove("stealth_rock"), createMove("spikes"), createMove("ancient_power")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/omanyte.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/omanyte.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Swift swim"
    this.talentDesc = "Draw 2 extra cards at the beginning of each turn in the rain."
    this.endTurn = function () {
        if (drawsExtra(this)) removeEffect(this, "Extra Draw");
        if (weather != undefined && weather.name === "Rain") applyEffect("extra_draw", 2, this);
    }
    this.unlocked = helixQuest >= 1;
    this.hint = "???";
}

function Tyranitar() {
    this.name = "Tyranitar";
    this.description = "A slow powerful physical attacker with great bulk, capable of setting and benefitting greatly from the sandstorm."
    this.hp = 100;
    this.attack = 134;
    this.defense = 110;
    this.spattack = 95;
    this.spdefense = 100;
    this.speed = 61;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["rock", "dark"];
    this.moves = [createMove("rock_blast"), createMove("stomping_tantrum"), createMove("rock_throw"), createMove("payback"), createMove("crunch"), createMove("dragon_dance")];
    this.movepool = ["rock_throw", "payback", "stomping_tantrum", "aqua_tail", "assurance", "avalanche", "bite", "body_press", "breaking_swipe", "brutal_swing", "crunch", "dragon_claw", "dragon_tail", "dragon_dance", "dynamic_punch", "earthquake", "fire_fang", "fling", "foul_play", "giga_impact", "heavy_slam", "hone_claws", "ice_fang", "iron_defense", "iron_head", "lash_out", "outrage", "payback", "revenge", "rock_polish", "rock_slide", "sandstorm", "sand_tomb", "shadow_claw", "stealth_rock", "stone_edge", "superpower", "thrash", "thunder_fang", "rock_blast", "rock_tomb", "smack_down"];
    this.opponentMoves =
        [[createMove("sandstorm"), createMove("rock_throw"), createMove("dragon_dance"), createMove("rock_slide"), createMove("stone_edge"), createMove("rock_blast"), createMove("rock_tomb"), createMove("stealth_rock"), createMove("crunch"), createMove("stomping_tantrum")],
        [createMove("sandstorm"), createMove("payback"), createMove("assurance"), createMove("brutal_swing"), createMove("crunch"), createMove("hone_claws"), createMove("stone_edge"), createMove("rock_blast"), createMove("earthquake"), createMove("bite")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/tyranitar.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/tyranitar.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Sand stream"
    this.talentDesc = "Whips up a sandstorm at the beginning of the battle."
    this.init = function () { setWeather("sandstorm", 10); }
    this.unlocked = sandstormDamage >= 300;
    this.hint = "???";
}

function Gyarados() {
    this.name = "Gyarados";
    this.description = "A powerful physical attacker with limited options offset by its ever increasing attack."
    this.hp = 95;
    this.attack = 125;
    this.defense = 79;
    this.spattack = 60;
    this.spdefense = 100;
    this.speed = 81;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["water", "flying"];
    this.moves = [createMove("aqua_tail"), createMove("bite"), createMove("waterfall"), createMove("rain_dance"), createMove("splash"), createMove("bounce")];
    this.movepool = ["bite", "waterfall", "rain_dance", "aqua_tail", "avalanche", "body_slam", "bounce", "bulldoze", "brutal_swing", "crunch", "dive", "double_edge", "dragon_dance", "dragon_tail", "earthquake", "flail", "giga_impact", "headbutt", "ice_fang", "iron_head", "iron_tail", "lash_out", "payback", "power_whip", "rock_smash", "scale_shot", "stone_edge", "thrash", "scary_face", "splash"];
    this.opponentMoves =
        [[createMove("rain_dance"), createMove("waterfall"), createMove("aqua_tail"), createMove("dive"), createMove("dragon_dance"), createMove("flail"), createMove("power_whip"), createMove("bounce"), createMove("ice_fang"), createMove("thrash")],
        [createMove("aqua_tail"), createMove("dive"), createMove("bounce"), createMove("dragon_dance"), createMove("dragon_tail"), createMove("scale_shot"), createMove("crunch"), createMove("earthquake"), createMove("bulldoze"), createMove("rock_smash")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gyarados.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gyarados.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Moxie"
    this.talentDesc = "Slightly increases this Pokémon's attack at the end of each battle."
    this.endBattle = function () { this.attack *= 1.01; }
    this.unlocked = survive1hp >= 1;
    this.hint = "???";
}

function Ditto() {
    this.name = "Ditto";
    this.description = "An all-purpose Pokémon, capable of copying whatever its foe can do."
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
    this.talent = "Imposter"
    this.talentDesc = "Transforms into the opponent at the beginning of the battle, copying its stats, types and moves."
    this.init = function () {
        this.types = [].concat(opponent.types);
        this.attack = opponent.attack;
        this.defense = opponent.defense;
        this.spattack = opponent.spattack;
        this.spdefense = opponent.spdefense;
        this.speed = opponent.speed;
        this.imgb = opponent.imgb;
        this.moves = [].concat(opponent.moves);
        if (this === team[activePokemon])
            document.getElementById("leftSprite").src = this.imgb;
        transformed++;
    }
    this.endBattle = function () {
        this.moves = [createMove("struggle")];
        this.imgb = 'resources/sprites/pokemon_battle_icons/back/ditto.gif';
    }
    this.unlocked = unlockedPokemon >= 10;
    this.hint = "???";
}

function Mew() {
    this.name = "Mew";
    this.description = "An all-purpose Pokémon with well-rounded stats, capable of learning any move."
    this.hp = 100;
    this.attack = 100;
    this.defense = 100;
    this.spattack = 100;
    this.spdefense = 100;
    this.speed = 100;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic"];
    this.moves = [createMove("aura_sphere"), createMove("psychic"), createMove("ancient_power"), createMove("metronome"), createMove("nasty_plot"), createMove("life_dew")];
    this.movepool = movesList;
    this.opponentMoves = [[]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mew.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mew.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Synchronize";
    this.talentDesc = "At the end of each turn, copies all status conditions onto the opponent in limited amounts."
    this.endTurn = function (pD) {
        if (isPoisoned(this)) applyEffect("poison", 4, pD);
        if (isBurned(this)) applyEffect("burn", 1, pD);
        if (isParalyzed(this)) applyEffect("paralysis", 1, pD);
        if (isFrozen(this)) applyEffect("freeze", 1, pD);
        if (isAsleep(this)) applyEffect("sleep", 1, pD);
    }
    this.unlocked = transforms >= 50;
    this.hint = "???";
}

function Urshifu() {
    this.name = "Urshifu";
    this.description = "A powerful physical attacker, capable of breaking through walls with its signature moves."
    this.hp = 100;
    this.attack = 130;
    this.defense = 100;
    this.spattack = 63;
    this.spdefense = 60;
    this.speed = 97;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fighting", "dark"];
    this.moves = [createMove("rock_smash"), createMove("wicked_blow"), createMove("surging_strikes"), createMove("detect"), createMove("close_combat"), createMove("beat_up")];
    this.movepool = ["rock_smash", "wicked_blow", "surging_strikes", "detect", "aqua_jet", "sucker_punch", "assurance", "beat_up", "body_press", "brick_break", "bulk_up", "close_combat", "crunch", "drain_punch", "dynamic_punch", "facade", "fire_punch", "fling", "focus_punch", "foul_play", "ice_punch", "iron_defense", "iron_head", "lash_out", "low_kick", "payback", "poison_jab", "revenge", "reversal", "rock_tomb", "scary_face", "stone_edge", "superpower", "throat_chop", "thunder_punch", "u_turn", "zen_headbutt", "darkest_lariat"];
    this.opponentMoves =
        [[createMove("wicked_blow"), createMove("sucker_punch"), createMove("assurance"), createMove("crunch"), createMove("foul_play"), createMove("darkest_lariat"), createMove("bulk_up"), createMove("drain_punch"), createMove("zen_headbutt"), createMove("rock_smash")],
        [createMove("surging_strikes"), createMove("aqua_jet"), createMove("rock_smash"), createMove("bulk_up"), createMove("brick_break"), createMove("close_combat"), createMove("drain_punch"), createMove("poison_jab"), createMove("revenge"), createMove("stone_edge")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/urshifu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/urshifu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Unseen Fist";
    this.talentDesc = "This Pokémon's attacks ignore protections."
    this.unlocked = flawlessKO >= 5;
    this.hint = "???";
}

function Gengar() {
    this.name = "Gengar";
    this.description = "A fast powerful special attacker with great coverage, capable of spreading poison."
    this.hp = 60;
    this.attack = 65;
    this.defense = 60;
    this.spattack = 130;
    this.spdefense = 75;
    this.speed = 110;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "poison"];
    this.moves = [createMove("shadow_ball"), createMove("confuse_ray"), createMove("hypnosis"), createMove("dream_eater"), createMove("sludge_wave"), createMove("poison_gas")];
    this.movepool = ["shadow_ball", "hypnosis", "dream_eater", "ally_switch", "confuse_ray", "curse", "dark_pulse", "dazzling_gleam", "energy_ball", "focus_blast", "giga_drain", "haze", "hex", "hyper_beam", "icy_wind", "lick", "mega_drain", "metronome", "nasty_plot", "night_shade", "poison_gas", "psychic", "scary_face", "shadow_ball", "sludge_bomb", "spite", "swagger", "taunt", "thunder", "thunderbolt", "toxic", "venoshock", "will_o_wisp", "zap_cannon", "clear_smog", "sludge_wave", "smog"];
    this.opponentMoves =
        [[createMove("shadow_ball"), createMove("hypnosis"), createMove("hypnosis"), createMove("dream_eater"), createMove("dark_pulse"), createMove("hex"), createMove("hex"), createMove("sludge_bomb"), createMove("toxic"), createMove("will_o_wisp")],
        [createMove("shadow_ball"), createMove("nasty_plot"), createMove("sludge_wave"), createMove("sludge_bomb"), createMove("toxic"), createMove("focus_blast"), createMove("giga_drain"), createMove("thunderbolt"), createMove("dazzling_gleam"), createMove("clear_smog")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/gengar.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/gengar.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Levitation"
    this.talentDesc = "Levitates above the ground, granting ground type immunity."
    this.init = function () { applyEffect("levitation", 99, this); }
    this.unlocked = area1loss >= 1;
    this.hint = "???";
}

function Shuckle() {
    this.name = "Shuckle";
    this.description = "A slow and incredibly weak Pokémon with stellar defenses, capable of taking hits while setting traps and dealing chip damage."
    this.hp = 40; //adjusted
    this.attack = 10;
    this.defense = 230;
    this.spattack = 10;
    this.spdefense = 230;
    this.speed = 20; //adjusted
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["bug", "rock"];
    this.moves = [createMove("rollout"), createMove("struggle_bug"), createMove("sticky_web"), createMove("rest"), createMove("stealth_rock"), createMove("infestation")];
    this.movepool = ["rollout", "struggle_bug", "sticky_web", "rest", "ancient_power", "curse", "iron_defense", "mimic", "protect", "rock_polish", "sandstorm", "stealth_rock", "string_shot", "substitute", "swagger", "toxic", "withdraw", "acupressure", "bind", "infestation", "skitter_smack"];
    this.opponentMoves =
        [[createMove("struggle_bug"), createMove("rollout"), createMove("sticky_web"), createMove("rock_polish"), createMove("sandstorm"), createMove("string_shot"), createMove("swagger"), createMove("stealth_rock"), createMove("infestation"), createMove("rest")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/shuckle.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/shuckle.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Sturdy"
    this.talentDesc = "This Pokémon cannot be knocked out unless at 1HP already."
    this.unlocked = maxRound >= 20;
    this.hint = "???";
}

function Mimikyu() {
    this.name = "Mimikyu";
    this.description = "A physical attacker with good defensive utility, capable of taking some hits before striking back hard."
    this.hp = 55;
    this.attack = 90;
    this.defense = 80;
    this.spattack = 50;
    this.spdefense = 105;
    this.speed = 96;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "fairy"];
    this.moves = [createMove("shadow_claw"), createMove("shadow_sneak"), createMove("play_rough"), createMove("swords_dance"), createMove("drain_punch"), createMove("astonish")];
    this.movepool = ["shadow_sneak", "play_rough", "swords_dance", "astonish", "beat_up", "bulk_up", "charm", "curse", "drain_punch", "facade", "fling", "hone_claws", "last_resort", "mimic", "payback", "protect", "screech", "shadow_claw", "spite", "swagger", "toxic", "x_scissor", "slash", "taunt", "leech_life", "phantom_force", "wood_hammer", "feint_attack"];
    this.opponentMoves =
        [[createMove("swords_dance"), createMove("play_rough"), createMove("shadow_claw"), createMove("bulk_up"), createMove("drain_punch"), createMove("leech_life"), createMove("wood_hammer"), createMove("phantom_force"), createMove("astonish"), createMove("feint_attack")],
        [createMove("swords_dance"), createMove("play_rough"), createMove("shadow_claw"), createMove("curse"), createMove("charm"), createMove("spite"), createMove("x_scissor"), createMove("drain_punch"), createMove("payback"), createMove("hone_claws")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mimikyu.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mimikyu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Disguise";
    this.talentDesc = "Start the battle with a protection.";
    this.disguise = true;
    this.init = function () {
        switchMimikyu(this, true);
        applyEffect("disguise", 2, this);
    }
    this.unlocked = pikachuVictory >= 1;
    this.hint = "???";
}

function switchMimikyu(p, disguise) {
    if (p.name === "Mimikyu") {
        if (disguise && !p.disguise) {
            p.imgf = 'resources/sprites/pokemon_battle_icons/front/mimikyu.gif';
            p.imgb = 'resources/sprites/pokemon_battle_icons/back/mimikyu.gif';
            resizeSprites(true);
            p.disguise = true;
            if (team[activePokemon] === p) {
                document.getElementById("leftSprite").src = p.imgb;
            } else if (opponent === p) {
                document.getElementById("rightSprite").src = p.imgf;
            }
        } else if (!disguise && p.disguise) {
            p.imgf = 'resources/sprites/pokemon_battle_icons/front/mimikyu_busted.gif';
            p.imgb = 'resources/sprites/pokemon_battle_icons/back/mimikyu_busted.gif';
            resizeSprites(true);
            p.disguise = false;
            if (team[activePokemon] === p) {
                document.getElementById("leftSprite").src = p.imgb;
            } else if (opponent === p) {
                document.getElementById("rightSprite").src = p.imgf;
            }
        }
    }
}

function Mamoswine() {
    this.name = "Mamoswine";
    this.description = "A powerful physical attacker with high damage, expensive moves, benefitting from the hail."
    this.hp = 110;
    this.attack = 130;
    this.defense = 80;
    this.spattack = 70;
    this.spdefense = 60;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ground", "ice"];
    this.moves = [createMove("icicle_crash"), createMove("ice_shard"), createMove("earthquake"), createMove("ancient_power"), createMove("bulldoze"), createMove("heavy_slam")];
    this.movepool = ["ice_shard", "earthquake", "ancient_power", "amnesia", "avalanche", "bite", "body_press", "bulldoze", "curse", "detect", "dig", "double_edge", "facade", "flail", "giga_impact", "hail", "headbutt", "heavy_slam", "ice_fang", "icicle_crash", "icicle_spear", "iron_head", "rock_blast", "rock_slide", "rock_tomb", "sandstorm", "sand_tomb", "stealth_rock", "stomping_tantrum", "stone_edge", "superpower", "thrash", "high_horsepower"];
    this.opponentMoves =
        [[createMove("hail"), createMove("ice_shard"), createMove("avalanche"), createMove("icicle_crash"), createMove("icicle_spear"), createMove("earthquake"), createMove("giga_impact"), createMove("double_edge"), createMove("bulldoze"), createMove("body_press")],
        [createMove("sandstorm"), createMove("earthquake"), createMove("bulldoze"), createMove("sand_tomb"), createMove("stomping_tantrum"), createMove("high_horsepower"), createMove("stone_edge"), createMove("rock_blast"), createMove("rock_slide"), createMove("icicle_crash")]];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mamoswine.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mamoswine.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Thick fat";
    this.talentDesc = "Lowers the damage of incoming ice and fire type moves.";
    this.init = function () { applyEffect("thick_fat", 1, this); }
    this.unlocked = rockIceKO >= 1;
    this.hint = "???";
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
    this.moves = [];
    this.opponentMoves = [[createMove("judgment"), createMove("judgment"), createMove("hyper_beam"), createMove("extreme_speed"), createMove("extreme_speed"), createMove("ancient_power"), createMove("shadow_claw"), createMove("earth_power"), createMove("calm_mind"), createMove("swords_dance")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/arceus.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/arceus.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Multitype";
    this.talentDesc = "Changes type to a random one at the end of each turn.";
    this.init = function () { this.types = ["normal"]; }
    this.endTurn = function () {
        this.types = [types[Math.floor(Math.random() * types.length)]];
        removeEffect(this, "Type changed");
        applyEffect("type_changed", 1, this, this.types[0]);
    }
}

function Heatran() {
    this.name = "Heatran";
    this.hp = 91;
    this.attack = 90;
    this.defense = 106;
    this.spattack = 130;
    this.spdefense = 106;
    this.speed = 77;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fire", "steel"];
    this.moves = [];
    this.opponentMoves = [[createMove("magma_storm"), createMove("sunny_day"), createMove("solar_beam"), createMove("lava_plume"), createMove("flash_cannon"), createMove("flash_cannon"), createMove("earth_power"), createMove("will_o_wisp"), createMove("fire_blast"), createMove("stone_edge")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/heatran.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/heatran.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Flash fire";
    this.talentDesc = "Immunity to fire type moves.";
    this.init = function () { applyEffect("immunity", 1, this, "fire"); }
}

function Mewtwo() {
    this.name = "Mewtwo";
    this.hp = 106;
    this.attack = 110;
    this.defense = 90;
    this.spattack = 154;
    this.spdefense = 90;
    this.speed = 130;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic"];
    this.moves = [];
    this.opponentMoves = [[createMove("psystrike"), createMove("psystrike"), createMove("psychic"), createMove("fire_blast"), createMove("ice_beam"), createMove("focus_blast"), createMove("nasty_plot"), createMove("calm_mind"), createMove("energy_ball"), createMove("shadow_ball")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/mewtwo.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/mewtwo.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
}

function Hoopa() {
    this.name = "Hoopa";
    this.hp = 80;
    this.attack = 110;
    this.defense = 60;
    this.spattack = 150;
    this.spdefense = 130;
    this.speed = 70;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic", "ghost"];
    this.moves = [];
    this.opponentMoves = [[createMove("nasty_plot"), createMove("shadow_ball"), createMove("shadow_ball"), createMove("hyperspace_hole"), createMove("focus_blast"), createMove("thunderbolt"), createMove("substitute"), createMove("hyperspace_hole"), createMove("grass_knot"), createMove("psychic")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/hoopa.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/hoopa.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Confined"
    this.talentDesc = "Breaks free after 3 turns."
    this.init = function () { applyEffect("confined", 3, this); }
}

function switchHoopa(p) {
    if (p.name === "Hoopa") {
        p.imgf = 'resources/sprites/pokemon_battle_icons/front/hoopa_unbound.gif';
        p.imgb = 'resources/sprites/pokemon_battle_icons/back/hoopa_unbound.gif';
        resizeSprites(true);
        p.types = ["psychic", "dark"];
        if (team[activePokemon] === p) {
            document.getElementById("leftSprite").src = p.imgb;
        } else if (opponent === p) {
            document.getElementById("rightSprite").src = p.imgf;
        }
        p.attack = Math.floor(p.attack * 16 / 11);
        p.spattack = Math.floor(p.spattack * 17 / 15);
        p.speed = Math.floor(p.speed * 8 / 7);
        dealDamage(-.3 * p.maxhp, p);
        p.moves = [createMove("hyperspace_fury"), createMove("hyperspace_fury"), createMove("gunk_shot"), createMove("hyperspace_hole"), createMove("hyperspace_hole"), createMove("drain_punch"), createMove("power_up_punch"), createMove("phantom_force"), createMove("fire_punch"), createMove("foul_play")];
        initDeck(p);
    }
}

function Groudon() {
    this.name = "Groudon";
    this.hp = 100;
    this.attack = 150;
    this.defense = 140;
    this.spattack = 100;
    this.spdefense = 90;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ground"];
    this.moves = [];
    this.opponentMoves = [[createMove("swords_dance"), createMove("precipice_blades"), createMove("precipice_blades"), createMove("stone_edge"), createMove("rock_tomb"), createMove("heat_crash"), createMove("heat_crash"), createMove("rock_polish"), createMove("bulldoze"), createMove("rock_smash")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/groudon.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/groudon.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Drought"
    this.talentDesc = "Changes the weather to sun at the beginning of the battle."
    this.init = function () { setWeather("sun", 99); }
}

function Kyogre() {
    this.name = "Kyogre";
    this.hp = 100;
    this.attack = 100;
    this.defense = 90;
    this.spattack = 150;
    this.spdefense = 140;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["water"];
    this.moves = [];
    this.opponentMoves = [[createMove("calm_mind"), createMove("origin_pulse"), createMove("origin_pulse"), createMove("water_spout"), createMove("ice_beam"), createMove("ice_beam"), createMove("thunder"), createMove("scald"), createMove("hydro_pump"), createMove("thunder")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/kyogre.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/kyogre.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Drizzle"
    this.talentDesc = "Changes the weather to rain at the beginning of the battle."
    this.init = function () { setWeather("rain", 99); }
}

function Rayquaza() {
    this.name = "Rayquaza";
    this.hp = 105;
    this.attack = 150;
    this.defense = 90;
    this.spattack = 150;
    this.spdefense = 90;
    this.speed = 95;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dragon", "flying"];
    this.moves = [];
    this.opponentMoves = [[createMove("dragon_ascent"), createMove("dragon_ascent"), createMove("v_create"), createMove("haze"), createMove("extreme_speed"), createMove("earthquake"), createMove("dragon_claw"), createMove("draco_meteor"), createMove("dragon_dance"), createMove("scale_shot")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/rayquaza.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/rayquaza.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Air lock"
    this.talentDesc = "Prevents weather changes."
    this.init = function () { setWeather("air_lock", 99); }
}

function Giratina() {
    this.name = "Giratina";
    this.hp = 150;
    this.attack = 100;
    this.defense = 120;
    this.spattack = 100;
    this.spdefense = 120;
    this.speed = 90;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "dragon"];
    this.moves = [];
    this.opponentMoves = [[createMove("will_o_wisp"), createMove("hex"), createMove("shadow_force"), createMove("shadow_claw"), createMove("draco_meteor"), createMove("shadow_force"), createMove("dragon_claw"), createMove("dragon_claw"), createMove("dragon_tail"), createMove("steel_wing")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/giratina.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/giratina.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) {
        if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1);
        if (this.currenthp < .5 * this.maxhp) switchGiratina(this);
    }
}

function switchGiratina(p) {
    if (p.name === "Giratina") {
        p.imgf = 'resources/sprites/pokemon_battle_icons/front/giratina_origin.gif';
        p.imgb = 'resources/sprites/pokemon_battle_icons/back/giratina_origin.gif';
        if (team[activePokemon] === p) {
            document.getElementById("leftSprite").src = p.imgb;
        } else if (opponent === p) {
            document.getElementById("rightSprite").src = p.imgf;
        }
        resizeSprites(true);
        var temp = p.attack;
        p.attack = p.defense;
        p.defense = temp;
        temp = p.spattack;
        p.spattack = p.spdefense;
        p.spdefense = temp;
        dealDamage(-.1 * p.maxhp, p);
        this.revenge = function (move, pD) { };
        applyEffect("levitation", 99, p);
        p.talent = "Levitation"
        p.talentDesc = "Levitates above the ground, granting ground type immunity."
    }
}

function Eternatus() {
    this.name = "Eternatus";
    this.hp = 140;
    this.attack = 85;
    this.defense = 95;
    this.spattack = 145;
    this.spdefense = 95;
    this.speed = 130;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["poison", "dragon"];
    this.moves = [];
    this.opponentMoves = [[createMove("sludge_bomb"), createMove("sludge_wave"), createMove("toxic"), createMove("toxic"), createMove("venoshock"), createMove("eternabeam"), createMove("dynamax_cannon"), createMove("dragon_pulse"), createMove("flamethrower"), createMove("shadow_ball")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/eternatus.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/eternatus.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
}

function Regigigas() {
    this.name = "Regigigas";
    this.hp = 110;
    this.attack = 160;
    this.defense = 110;
    this.spattack = 80;
    this.spdefense = 110;
    this.speed = 100;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [];
    this.opponentMoves = [[createMove("crush_grip"), createMove("crush_grip"), createMove("body_slam"), createMove("body_slam"), createMove("drain_punch"), createMove("brick_break"), createMove("darkest_lariat"), createMove("payback"), createMove("high_horsepower"), createMove("smack_down")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/regigigas.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/regigigas.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.slowStart = true;
    this.talent = "Slow start"
    this.talentDesc = "Reduced attack at the beginning of the battle."
    this.boost = function (move) { return 1 - .4 * (this.slowStart && move.cat === "physical"); }
    this.init = function (move, pD) { applyEffect("slow_start", 3, this); }
}

function Diancie() {
    this.name = "Diancie";
    this.hp = 50;
    this.attack = 100;
    this.defense = 150;
    this.spattack = 100;
    this.spdefense = 150;
    this.speed = 50;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["rock", "fairy"];
    this.moves = [];
    this.opponentMoves = [[createMove("diamond_storm"), createMove("diamond_storm"), createMove("body_press"), createMove("body_press"), createMove("moonblast"), createMove("moonblast"), createMove("sandstorm"), createMove("rock_polish"), createMove("power_gem"), createMove("draining_kiss")]];
    this.movepool = ["struggle"];
    this.imgf = 'resources/sprites/pokemon_battle_icons/front/diancie.gif';
    this.imgb = 'resources/sprites/pokemon_battle_icons/back/diancie.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Clear body"
    this.talentDesc = "Lowered stats are restored at the end of eah turn."
    this.endTurn = function () {
        this.statchanges.attack = Math.max(0, this.statchanges.attack);
        this.statchanges.defense = Math.max(0, this.statchanges.defense);
        this.statchanges.spattack = Math.max(0, this.statchanges.spattack);
        this.statchanges.spdefense = Math.max(0, this.statchanges.spdefense);
        this.statchanges.speed = Math.max(0, this.statchanges.speed);
        drawStats(contains(team, this));
    }
}

function StatChanges() {
    this.attack = 0;
    this.defense = 0;
    this.spattack = 0;
    this.spdefense = 0;
    this.speed = 0;
}

function adjustBST(pokemon, target, boss) {
    n = pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spattack + pokemon.spdefense + pokemon.speed;
    ratio = target / n;
    pokemon.hp = Math.round(pokemon.hp * ratio);
    pokemon.attack = Math.round(pokemon.attack * ratio);
    pokemon.defense = Math.round(pokemon.defense * ratio);
    pokemon.spattack = Math.round(pokemon.spattack * ratio);
    pokemon.spdefense = Math.round(pokemon.spdefense * ratio);
    pokemon.speed = Math.round(pokemon.speed * ratio);
    pokemon.maxhp = (5 + 3 * boss) * pokemon.hp;
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
    "string_shot", "signal_beam", "silver_wind", "extreme_evoboost", "stored_power", "body_slam", "charm", "fake_tears", "flail", "headbutt", "heal_bell",
    "hyper_voice", "tickle", "leaf_blade", "moonblast", "snarl", "confuse_ray", "future_sight", "magical_leaf", "memento", "psych_up", "thunder_wave",
    "psybeam", "aerial_ace", "fly", "ice_punch", "steel_wing", "superpower", "explosion", "heavy_slam", "revenge", "seed_bomb", "spikes", "body_press",
    "pin_missile", "rock_polish", "sing", "sweet_kiss", "teleport", "tri_attack", "uproar", "aqua_jet", "astonish", "disable", "flatter", "foul_play",
    "hex", "lash_out", "mean_look", "moonlight", "night_shade", "poltergeist", "power_gem", "spite", "recover", "bug_bite", "psycho_cut", "x_scissor",
    "cross_poison", "fling", "night_slash", "slash", "autotomize", "brutal_swing", "head_smash", "metal_sound", "sacred_sword", "solar_blade", "feint",
    "happy_hour", "screech", "meteor_beam", "crush_claw", "icicle_crash", "icicle_spear", "throat_chop", "triple_axel", "hail", "plasma_fists", "haze",
    "icy_wind", "muddy_water", "withdraw", "rock_blast", "rock_tomb", "smack_down", "scary_face", "splash", "acupressure", "bind", "infestation",
    "skitter_smack", "ice_fang", "thunder_fang", "darkest_lariat", "clear_smog", "sludge_wave", "smog", "poison_gas", "lick", "phantom_force", "wood_hammer",
    "feint_attack", "high_horsepower", "leech_life", "aurora_beam", "magma_storm", "lava_plume", "psystrike", "hyperspace_fury", "hyperspace_hole",
    "precipice_blades", "heat_crash", "origin_pulse", "dragon_ascent", "v_create", "shadow_force", "eternabeam", "dynamax_cannon", "crush_grip",
    "diamond_storm"];

function createMove(move) {
    switch (move) {
        case "absorb":
            return new Absorb();
        case "acupressure":
            return new Acupressure();
        case "aerial_ace":
            return new AerialAce();
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
        case "aqua_jet":
            return new AquaJet();
        case "aqua_tail":
            return new AquaTail();
        case "assurance":
            return new Assurance();
        case "astonish":
            return new Astonish();
        case "aura_sphere":
            return new AuraSphere();
        case "aurora_beam":
            return new AuroraBeam();
        case "autotomize":
            return new Autotomize();
        case "avalanche":
            return new Avalanche();
        case "baton_pass":
            return new BatonPass();
        case "beat_up":
            return new BeatUp();
        case "bind":
            return new Bind();
        case "bite":
            return new Bite();
        case "blast_burn":
            return new BlastBurn();
        case "blaze_kick":
            return new BlazeKick();
        case "blizzard":
            return new Blizzard();
        case "body_press":
            return new BodyPress();
        case "body_slam":
            return new BodySlam();
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
        case "brutal_swing":
            return new BrutalSwing();
        case "bubble_beam":
            return new BubbleBeam();
        case "bug_bite":
            return new BugBite();
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
        case "charm":
            return new Charm();
        case "clear_smog":
            return new ClearSmog();
        case "close_combat":
            return new CloseCombat();
        case "confuse_ray":
            return new ConfuseRay();
        case "confusion":
            return new Confusion();
        case "cross_chop":
            return new CrossChop();
        case "cross_poison":
            return new CrossPoison();
        case "crunch":
            return new Crunch();
        case "crush_claw":
            return new CrushClaw();
        case "crush_grip":
            return new CrushGrip();
        case "curse":
            return new Curse();
        case "darkest_lariat":
            return new DarkestLariat();
        case "dark_pulse":
            return new DarkPulse();
        case "dazzling_gleam":
            return new DazzlingGleam();
        case "defog":
            return new Defog();
        case "detect":
            return new Detect();
        case "diamond_storm":
            return new DiamondStorm();
        case "dig":
            return new Dig();
        case "disable":
            return new Disable();
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
        case "dragon_ascent":
            return new DragonAscent();
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
        case "dynamax_cannon":
            return new DynamaxCannon();
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
        case "eternabeam":
            return new Eternabeam();
        case "explosion":
            return new Explosion();
        case "extreme_evoboost":
            return new ExtremeEvoboost();
        case "extreme_speed":
            return new ExtremeSpeed();
        case "facade":
            return new Facade();
        case "fake_out":
            return new FakeOut();
        case "fake_tears":
            return new FakeTears();
        case "feint":
            return new Feint();
        case "feint_attack":
            return new FeintAttack();
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
        case "flail":
            return new Flail();
        case "flame_charge":
            return new FlameCharge();
        case "flamethrower":
            return new Flamethrower();
        case "flare_blitz":
            return new FlareBlitz();
        case "flash_cannon":
            return new FlashCannon();
        case "flatter":
            return new Flatter();
        case "fling":
            return new Fling();
        case "flip_turn":
            return new FlipTurn();
        case "fly":
            return new Fly();
        case "focus_blast":
            return new FocusBlast();
        case "focus_punch":
            return new FocusPunch();
        case "force_palm":
            return new ForcePalm();
        case "foul_play":
            return new FoulPlay();
        case "frenzy_plant":
            return new FrenzyPlant();
        case "fury_cutter":
            return new FuryCutter();
        case "fury_swipes":
            return new FurySwipes();
        case "future_sight":
            return new FutureSight();
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
        case "hail":
            return new Hail();
        case "hammer_arm":
            return new HammerArm();
        case "happy_hour":
            return new HappyHour();
        case "haze":
            return new Haze();
        case "headbutt":
            return new Headbutt();
        case "head_smash":
            return new HeadSmash();
        case "heal_bell":
            return new HealBell();
        case "heal_pulse":
            return new HealPulse();
        case "heat_crash":
            return new HeatCrash();
        case "heat_wave":
            return new HeatWave();
        case "heavy_slam":
            return new HeavySlam();
        case "hex":
            return new Hex();
        case "hidden_power":
            return new HiddenPower();
        case "high_horsepower":
            return new HighHorsepower();
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
        case "hyperspace_fury":
            return new HyperspaceFury();
        case "hyperspace_hole":
            return new HyperspaceHole();
        case "hyper_voice":
            return new HyperVoice();
        case "hypnosis":
            return new Hypnosis();
        case "ice_beam":
            return new IceBeam();
        case "ice_fang":
            return new IceFang();
        case "ice_punch":
            return new IcePunch();
        case "ice_shard":
            return new IceShard();
        case "icicle_crash":
            return new IcicleCrash();
        case "icicle_spear":
            return new IcicleSpear();
        case "icy_wind":
            return new IcyWind();
        case "inferno":
            return new Inferno();
        case "infestation":
            return new Infestation();
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
        case "lash_out":
            return new LashOut();
        case "last_resort":
            return new LastResort();
        case "lava_plume":
            return new LavaPlume();
        case "leaf_blade":
            return new LeafBlade();
        case "leaf_storm":
            return new LeafStorm();
        case "leech_life":
            return new LeechLife();
        case "leech_seed":
            return new LeechSeed();
        case "lick":
            return new Lick();
        case "life_dew":
            return new LifeDew();
        case "liquidation":
            return new Liquidation();
        case "low_kick":
            return new LowKick();
        case "low_sweep":
            return new LowSweep();
        case "magical_leaf":
            return new MagicalLeaf();
        case "magma_storm":
            return new MagmaStorm();
        case "magnet_rise":
            return new MagnetRise();
        case "mean_look":
            return new MeanLook();
        case "mega_drain":
            return new MegaDrain();
        case "mega_kick":
            return new MegaKick();
        case "memento":
            return new Memento();
        case "metal_claw":
            return new MetalClaw();
        case "meteor_beam":
            return new MeteorBeam();
        case "meteor_mash":
            return new MeteorMash();
        case "metal_sound":
            return new MetalSound();
        case "metronome":
            return new Metronome();
        case "mimic":
            return new Mimic();
        case "moonblast":
            return new Moonblast();
        case "moonlight":
            return new Moonlight();
        case "morning_sun":
            return new MorningSun();
        case "muddy_water":
            return new MuddyWater();
        case "mystical_fire":
            return new MysticalFire();
        case "nasty_plot":
            return new NastyPlot();
        case "night_shade":
            return new NightShade();
        case "night_slash":
            return new NightSlash();
        case "nuzzle":
            return new Nuzzle();
        case "origin_pulse":
            return new OriginPulse();
        case "outrage":
            return new Outrage();
        case "overheat":
            return new Overheat();
        case "payback":
            return new Payback();
        case "pay_day":
            return new PayDay();
        case "phantom_force":
            return new PhantomForce();
        case "pin_missile":
            return new PinMissile();
        case "plasma_fists":
            return new PlasmaFists();
        case "play_rough":
            return new PlayRough();
        case "poison_gas":
            return new PoisonGas();
        case "poison_jab":
            return new PoisonJab();
        case "poison_powder":
            return new PoisonPowder();
        case "poltergeist":
            return new Poltergeist();
        case "pound":
            return new Pound();
        case "power_gem":
            return new PowerGem();
        case "power_up_punch":
            return new PowerUpPunch();
        case "power_whip":
            return new PowerWhip();
        case "precipice_blades":
            return new PrecipiceBlades();
        case "protect":
            return new Protect();
        case "psybeam":
            return new Psybeam();
        case "psychic":
            return new Psychic();
        case "psycho_cut":
            return new PsychoCut();
        case "psych_up":
            return new PsychUp();
        case "psystrike":
            return new Psystrike();
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
        case "recover":
            return new Recover();
        case "rest":
            return new Rest();
        case "revenge":
            return new Revenge();
        case "reversal":
            return new Reversal();
        case "rock_blast":
            return new RockBlast();
        case "rock_polish":
            return new RockPolish();
        case "rock_slide":
            return new RockSlide();
        case "rock_smash":
            return new RockSmash();
        case "rock_throw":
            return new RockThrow();
        case "rock_tomb":
            return new RockTomb();
        case "rollout":
            return new Rollout();
        case "roost":
            return new Roost();
        case "sacred_sword":
            return new SacredSword();
        case "sandstorm":
            return new Sandstorm();
        case "sand_tomb":
            return new SandTomb();
        case "scald":
            return new Scald();
        case "scale_shot":
            return new ScaleShot();
        case "scary_face":
            return new ScaryFace();
        case "scorching_sands":
            return new ScorchingSands();
        case "scratch":
            return new Scratch();
        case "screech":
            return new Screech();
        case "seed_bomb":
            return new SeedBomb();
        case "seismic_toss":
            return new SeismicToss();
        case "shadow_ball":
            return new ShadowBall();
        case "shadow_claw":
            return new ShadowClaw();
        case "shadow_force":
            return new ShadowForce();
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
        case "sing":
            return new Sing();
        case "skitter_smack":
            return new SkitterSmack();
        case "skull_bash":
            return new SkullBash();
        case "slash":
            return new Slash();
        case "sleep_powder":
            return new SleepPowder();
        case "sludge":
            return new Sludge();
        case "sludge_bomb":
            return new SludgeBomb();
        case "sludge_wave":
            return new SludgeWave();
        case "smack_down":
            return new SmackDown();
        case "smog":
            return new Smog();
        case "snarl":
            return new Snarl();
        case "soft_boiled":
            return new SoftBoiled();
        case "solar_beam":
            return new SolarBeam();
        case "solar_blade":
            return new SolarBlade();
        case "spark":
            return new Spark();
        case "spikes":
            return new Spikes();
        case "spite":
            return new Spite();
        case "splash":
            return new Splash();
        case "stealth_rock":
            return new StealthRock();
        case "steel_beam":
            return new SteelBeam();
        case "steel_wing":
            return new SteelWing();
        case "sticky_web":
            return new StickyWeb();
        case "stomping_tantrum":
            return new StompingTantrum();
        case "stone_edge":
            return new StoneEdge();
        case "stored_power":
            return new StoredPower();
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
        case "superpower":
            return new Superpower();
        case "surf":
            return new Surf();
        case "surging_strikes":
            return new SurgingStrikes();
        case "swagger":
            return new Swagger();
        case "sweet_kiss":
            return new SweetKiss();
        case "swords_dance":
            return new SwordsDance();
        case "synthesis":
            return new Synthesis();
        case "tackle":
            return new Tackle();
        case "taunt":
            return new Taunt();
        case "teleport":
            return new Teleport();
        case "thunder":
            return new Thunder();
        case "thunderbolt":
            return new Thunderbolt();
        case "thunder_fang":
            return new ThunderFang();
        case "thunder_punch":
            return new ThunderPunch();
        case "thunder_shock":
            return new ThunderShock();
        case "thunder_wave":
            return new ThunderWave();
        case "thrash":
            return new Thrash();
        case "throat_chop":
            return new ThroatChop();
        case "tickle":
            return new Tickle();
        case "toxic":
            return new Toxic();
        case "toxic_spikes":
            return new ToxicSpikes();
        case "tri_attack":
            return new TriAttack();
        case "triple_axel":
            return new TripleAxel();
        case "twister":
            return new Twister();
        case "uproar":
            return new Uproar();
        case "u_turn":
            return new UTurn();
        case "vacuum_wave":
            return new VacuumWave();
        case "v_create":
            return new VCreate();
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
        case "whirlpool":
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
        case "withdraw":
            return new Withdraw();
        case "wood_hammer":
            return new WoodHammer();
        case "x_scissor":
            return new XScissor();
        case "zap_cannon":
            return new ZapCannon();
        case "zen_headbutt":
            return new ZenHeadbutt();
        case "struggle":
            return new Struggle();
        default:
            alert("Unknown move: " + move);
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

function Acupressure() {
    this.name = "Acupressure";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        switch (pA.currenthp % 10) {
            case 0:
            case 1:
                boostStat(pA, "speed", 2);
                break;
            case 2:
            case 3:
                boostStat(pA, "attack", 2);
                break;
            case 4:
            case 5:
                boostStat(pA, "defense", 2);
                break;
            case 6:
            case 7:
                boostStat(pA, "spattack", 2);
                break;
            case 8:
            case 9:
                boostStat(pA, "spdefense", 2);
                break;
            default:
        }
    };
    this.description = "Raises a specific user stat by 2 stages depending on user's current HP.";
}

function AerialAce() {
    this.name = "Aerial Ace";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        this.bp = 35 + 25 * (pA.draw.length == 0);
    };
    this.postEffect = function (move, pA, pD) {
        drawMove(pA, false);
    };
    this.description = "Deals 35 base power damage to the opponent. Draw a card. Base power increases if it was the last card in the draw pile.";
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
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
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

function AquaJet() {
    this.name = "Aqua Jet";
    this.type = "water";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function AquaTail() {
    this.name = "Aqua Tail";
    this.type = "water";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.statchanges.attack > 0) energy++; };
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

function Astonish() {
    this.name = "Astonish";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pA.hand.findIndex(e => e.exhaust != undefined) >= 0) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's hand contains a card with exhaust.";
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

function AuroraBeam() {
    this.name = "Aurora Beam";
    this.type = "ice";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (weather != undefined && weather.name === "Hail") boostStat(pD, "attack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's attack by 1 stage in the hail.";
}

function Autotomize() {
    this.name = "Autotomize";
    this.type = "steel";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "speed", 2); };
    this.description = "Raises user's speed by 2 stages.";
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
    this.exhaust = true;
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
    this.description = "User shoves off all trapping effects, switches places with the first other party member and transfers all of its stats changes. Resets user's stats changes in the process. Exhaust.";
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

function Bind() {
    this.name = "Bind";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 2, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 2 turns.";
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

function BodyPress() {
    this.name = "Body Press";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 90 * 1.2 ** pA.statchanges.defense; };
    this.description = "Deals 90 base power damage to the opponent. Base power varies with user's defense stat changes.";
}

function BodySlam() {
    this.name = "Body Slam";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.statchanges.speed > 0) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target if the user's speed has been raised.";
}

function BoneRush() {
    this.name = "Bone Rush";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 18;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
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

function BrutalSwing() {
    this.name = "Brutal Swing";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 1;
    this.fails = false;
    this.effect = function (move, pA, pD) {
        var i = pA.hand.findIndex(e => e === this);
        if (i < pA.hand.length - 1) {
            discardCard(pA.hand[i + 1]);
            this.fails = false;
        } else
            this.fails = true;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Discard the next move in hand to use. Fails if no move can be discarded.";
}

function BubbleBeam() {
    this.name = "Bubble Beam";
    this.type = "water";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage in the rain.";
}

function BugBite() {
    this.name = "Bug Bite";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        this.bp = 30;
        for (let m of pA.moves) {
            if (m.type === "bug")
                this.bp += 5;
        } };
    this.description = "Deals 35 base power damage to the opponent. Base power increases with each bug type move in the user's deck.";
}

function BugBuzz() {
    this.name = "Bug Buzz";
    this.type = "bug";
    this.cat = "special";
    this.bp = 85;
    this.cost = 2;
    this.doPost = false;
    this.effect = function (move, pA, pD) { this.doPost = (pA.discard.length > 0 && pA.discard[pA.discard.length - 1].type === "bug"); };
    this.postEffect = function (move, pA, pD) { if (this.doPost) boostStat(pD, "spdefense", -1); };
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage.";
}

function BulletPunch() {
    this.name = "Bullet Punch";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.posEffect = function (move, pA, pD) { drawMove(pA, false); };
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        if (energy + this.cost >= 5) {
            energy++;
            boostStat(pA, "spattack", 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises the user's special attack by 1 stage and restores 1 energy if energy is at least 5 upon use.";
}

function Charm() {
    this.name = "Charm";
    this.type = "fairy";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "attack", -2); };
    this.description = "Lowers target's attack by 2 stages.";
}

function ClearSmog() {
    this.name = "Clear Smog";
    this.type = "poison";
    this.cat = "special";
    this.bp = 30;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { pD.statchanges = new StatChanges(); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Resets target's stat changes.";
}

function CloseCombat() {
    this.name = "Close Combat";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        if (pA.currenthp < pD.currenthp) {
            boostStat(pA, "defense", -1);
            boostStat(pA, "spdefense", -1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's defense and special defense by 1 stage unless its HP is higher than the target's.";
}

function ConfuseRay() {
    this.name = "Confuse Ray";
    this.type = "ghost";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("confusion", 1, pD); };
    this.description = "Applies 1 stack of confusion to the target.";
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

function CrossPoison() {
    this.name = "Cross Poison";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 70;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) {
        this.crit = isPoisoned(pD);
        applyEffect("poison", 6 * isPoisoned(pD), pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit and applies 6 stacks of poison to the target if it is poisoned.";
}

function Crunch() {
    this.name = "Crunch";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function CrushClaw() {
    this.name = "Crush Claw";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pD.statchanges.defense >= 0) boostStat(pD, "defense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers its defense by 1 stage if it hasn't been lowered already.";
}

function CrushGrip() {
    this.name = "Crush Grip";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, 125 * pD.currenthp / pD.maxhp); };
    this.description = "Deals up to 125 base power damage to the opponent, depending on how high its HP is.";
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

function DarkestLariat() {
    this.name = "Darkest Lariat";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 85 * statsChangeMultiplier ** pD.statchanges.defense; };
    this.description = "Deals 85 base power damage to the opponent. Base power varies with the target's defense stat changes.";
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
        for (let p of team) {
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

function DiamondStorm() {
    this.name = "Diamond Storm";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) >= 1) boostStat(pA, "defense", 2); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's defense by 2 stages unless this move is not very effective.";
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

function Disable() {
    this.name = "Disable";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { if (pD.discard.length > 0) pD.discard.pop(); };
    this.description = "Banishes the last card in the target's discard pile. Exhaust.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.hand) {
            if (m.type === "dragon")
                c++;
        }
        if (c < 2)
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

function DragonAscent() {
    this.name = "Dragon Ascent";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 130;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        boostStat(pA, "defense", -1);
        boostStat(pA, "spdefense", -1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's defense and special defense by 1 stage.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
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

function DynamaxCannon() {
    this.name = "Dynamax Cannon";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 90 + 40 * (pD.currenthp > .9 * pD.maxhp); };
    this.description = "Deals 90 base power damage to the opponent. Base power increases against healthy foes.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pD, "spdefense", -1); };
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        this.bp += 20;
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sun") boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special defense by 1 stage under the sun.";
}

function Eternabeam() {
    this.name = "Eternabeam";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 210;
    this.cost = 3;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new Recharge());
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Shuffles 2 Recharge into the user's draw pile.";
}

function Explosion() {
    this.name = "Explosion";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 250;
    this.cost = 0;
    this.postEffect = function (move, pA, pD) { dealDamage(9999, pA); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. User faints.";
}

function ExtremeEvoboost() {
    this.name = "Extreme Evoboost";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 4;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "attack", 2);
        boostStat(pA, "defense", 2);
        boostStat(pA, "spattack", 2);
        boostStat(pA, "spdefense", 2);
        boostStat(pA, "speed", 2);
    };
    this.description = "Raises all of user's stats by 2 stages. Exhaust.";
}

function ExtremeSpeed() {
    this.name = "Extreme Speed";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); drawMove(pA, false); };
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
        if (energy + this.cost >= 5) {
            applyEffect("fear", 1, pD);
            this.fails = false;
        } else
            this.fails = true;
    };
    this.postEffect = function (move, pA, pD) { if (!this.fails) drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target. Draw a card. Fails if energy is below 5 upon use.";
}

function FakeTears() {
    this.name = "Fake Tears";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "spattack", -2); };
    this.description = "Lowers target's special attack by 2 stages.";
}

function Feint() {
    this.name = "Feint";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 15;
    this.cost = 0;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function FeintAttack() {
    this.name = "Feint Attack";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 30;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function FieryDance() {
    this.name = "Fiery Dance";
    this.type = "fire";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pA, "spattack", 1) };
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
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 2, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 2 turns.";
}

function Flail() {
    this.name = "Flail";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, 100 * (1 - pA.currenthp / pA.maxhp)); };
    this.description = "Deals up to 100 base power damage to the opponent, depending on how low user's HP is.";
}

function FlameCharge() {
    this.name = "Flame Charge";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pA, "speed", 1); };
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

function Flatter() {
    this.name = "Flatter";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pD, "spattack", 1); applyEffect("confusion", 2, pD); };
    this.description = "Raises target's special attack by 1 stage and applies 2 stacks of confusion to it.";
}

function Fling() {
    this.name = "Fling";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.multihit = 0;
    this.effect = function (move, pA, pD) { this.multihit = pA.items.length; };
    this.description = "Deals 35 base power damage to the opponent per held item.";
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

function Fly() {
    this.name = "Fly";
    this.type = "flying";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new FlyStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Fly Strike into its deck.";
}

function FlyStrike() {
    this.name = "Fly Strike";
    this.type = "flying";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function FocusBlast() {
    this.name = "Focus Blast";
    this.type = "fighting";
    this.cat = "special";
    this.bp = 130;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.currenthp < .3 * pA.maxhp) boostStat(pD, "spdefense", -1); };
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

function FoulPlay() {
    this.name = "Foul Play";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 90 * 1.2 ** pD.statchanges.attack; };
    this.description = "Deals 90 base power damage to the opponent. Base power varies with target's attack stat changes.";
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
    this.effect = function (move, pA, pD) {
        this.bp += 20;
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

function FutureSight() {
    this.name = "FutureSight";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ForeseenAttack());
    };
    this.description = "Shuffles a Foreseen Attack into the user's deck.";
}

function ForeseenAttack() {
    this.name = "Foreseen Attack";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 120;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
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
    this.name = "Giga Impact";
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

function Hail() {
    this.name = "Hail";
    this.type = "ice";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { setWeather("hail", 5); };
    this.description = "Sets the weather to hail for 5 turns.";
}

function HammerArm() {
    this.name = "Hammer Arm";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pA, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's speed by one stage.";
}

function HappyHour() {
    this.name = "Happy Hour";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 3;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        if (player) {
            money += 100;
            earnedMoney += 100;
        }
    };
    this.description = "Gain " + String.fromCharCode(08381) + "100. Exhaust.";
}

function Haze() {
    this.name = "Haze";
    this.type = "ice";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        team[activePokemon].statchanges = new StatChanges();
        opponent.statchanges = new StatChanges();
        drawStats(true);
        drawStats(false);
    };
    this.description = "Resets both Pokémon's stat changes.";
}

function Headbutt() {
    this.name = "Headbutt";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pA.statchanges.attack > 0) applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target if the user's attack has been raised.";
}

function HeadSmash() {
    this.name = "Head Smash";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 200;
    this.cost = 3;
    this.recoil = .5;
    this.effect = function (move, pA, pD) { this.recoil = .5 * (weather == undefined || weather.name !== "Sandstorm"); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 50% recoil when not in a sandstorm.";
}

function HealBell() {
    this.name = "Heal Bell";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (contains(team, pA)) {
            for (let p of team) {
                removeEffect(p, "Poison");
                removeEffect(p, "Burn");
                removeEffect(p, "Paralysis");
                removeEffect(p, "Sleep");
                removeEffect(p, "Freeze");
            }
        } else {
            removeEffect(pA, "Poison");
            removeEffect(pA, "Burn");
            removeEffect(pA, "Paralysis");
            removeEffect(pA, "Sleep");
            removeEffect(pA, "Freeze");
        }
    };
    this.description = "Removes all status conditions from the user's party.";
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

function HeatCrash() {
    this.name = "Heat Crash";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 80 + 30 * (weather != undefined && weather.name === "Sun"); };
    this.description = "Deals 80 base power damage to the opponent. Base power increases in the sun.";
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

function HeavySlam() {
    this.name = "Heavy Slam";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = Math.min(250, Math.max(50, 50 * (pD.speed * statsChangeMultiplier ** pD.statchanges.speed + 1) / (pA.speed * statsChangeMultiplier ** pA.statchanges.speed + 1))) };
    this.description = "Deals between 50 and 250 base power damage to the opponent, depending on how slow the user is compared to the target.";
}

function Hex() {
    this.name = "Hex";
    this.type = "ghost";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 70 + 70 * (isParalyzed(pD) || isBurned(pD) || isAsleep(pD) || isPoisoned(pD) || isFrozen(pD)); };
    this.description = "Deals 70 base power damage to the opponent. Base power doubles against targets affected by status conditions.";
}

function HiddenPower() {
    this.name = "Hidden Power";
    this.type = types[Math.floor(Math.random() * types.length)];
    this.cat = "special";
    this.bp = 60;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { this.type = types[Math.floor(Math.random() * types.length)]; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Changes type randomly after each use.";
}

function HighHorsepower() {
    this.name = "High Horsepower";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
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

function HyperspaceFury() {
    this.name = "Hyperspace Fury";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.noBlock = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Breaks protections.";
}

function HyperspaceHole() {
    this.name = "Hyperspace Hole";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.noBlock = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Breaks protections.";
}

function HyperVoice() {
    this.name = "Hyper Voice";
    this.type = "normal";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { removeEffect("Sleep", pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Wakes up the target if it is alseep.";
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

function IceFang() {
    this.name = "Ice Fang";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Hail") applyEffect("freeze", 1, pD);
        if (pA.statchanges.attack > 0) applyEffect("fear", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of freeze to the target in the hail. Applies 1 stack of fear to the target if the user's attack has been raised.";
}

function IcePunch() {
    this.name = "Ice Punch";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (isFrozen(pD)) applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of freeze to the target if it's frozen already.";
}

function IceShard() {
    this.name = "Ice Shard";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function IcicleCrash() {
    this.name = "Icicle Crash";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather != undefined && weather.name === "Hail") applyEffect("fear", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of fear to the target in the hail.";
}

function IcicleSpear() {
    this.name = "Icicle Spear";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 15;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { this.multihit = 3 + 2 * (weather != undefined && weather.name === "Hail"); };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times. Hits 2 extra times in the hail.";
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

function IcyWind() {
    this.name = "Icy Wind";
    this.type = "ice";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if ((weather != undefined && weather.name === "Hail") || effectiveMultiplier(this, pD) > 1) boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage if this move is super effective or in the hail.";
}

function Infestation() {
    this.name = "Infestation";
    this.type = "bug";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 2, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 2 turns.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.statchanges.defense > 0) boostStat(pD, "defense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lower's target's defense by 1 stage if user's defense has been raised.";
}

function Judgment() {
    this.name = "Judgment";
    this.type = "normal";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.type = pA.types[0]; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Changes type on use to match that of the user.";
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

function LashOut() {
    this.name = "Lash Out";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var c = 0;
        c += Math.max(0, -pA.statchanges.attack);
        c += Math.max(0, -pA.statchanges.defense);
        c += Math.max(0, -pA.statchanges.spattack);
        c += Math.max(0, -pA.statchanges.spdefense);
        c += Math.max(0, -pA.statchanges.speed);
        this.bp = 20 * (c + 1);
    };
    this.description = "Deals 20 base power damage to the opponent, plus 20 base power multiplied by the amount of negative stat changes on the user.";
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

function LavaPlume() {
    this.name = "Lava Plume";
    this.type = "fire";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (!isBurned(pD)) applyEffect("burn", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of burn to the target if it's not burned already.";
}

function LeafBlade() {
    this.name = "Leaf Blade";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 60;
    this.cost = 2;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function LeafStorm() {
    this.name = "Leaf Storm";
    this.type = "grass";
    this.cat = "special";
    this.bp = 150;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pA, "spattack", -2); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's special attack by 2 stages.";
}

function LeechLife() {
    this.name = "Leech Life";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.recoil = -.5;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Heals user for 50% of damage dealt.";
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

function LowKick() {
    this.name = "Low Kick";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = Math.max(1, Math.min(125, 25 * 180 / (pD.speed * statsChangeMultiplier ** pD.statchanges.speed + 1))) };
    this.description = "Deals up to 125 base power damage to the opponent depending on how slow it is.";
}

function LowSweep() {
    this.name = "Low Sweep";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage.";
}

function Lick() {
    this.name = "Lick";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (weather != undefined && weather.name === "Rain") boostStat(pD, "defense", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's defense by 1 stage in the rain.";
}

function MagicalLeaf() {
    this.name = "Magical Leaf";
    this.type = "grass";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = 40 + 15 * Math.max(0, pA.statchanges.spattack); };
    this.description = "Deals 40 base power damage to the opponent. Base power increases with user's special attack boosts.";
}

function MagmaStorm() {
    this.name = "Magma Storm";
    this.type = "fire";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 1 turn.";
}

function MagnetRise() {
    this.name = "Magnet Rise";
    this.type = "electric";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) { applyEffect("levitation", 5, pA); };
    this.description = "Applies 5 stacks of levitation to the user.";
}

function MeanLook() {
    this.name = "Mean Look";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) { applyEffect("trap", 1, pD); };
    this.description = "Target can no longer switch out.";
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

function Memento() {
    this.name = "Memento";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) {
        boostStat(pD, "attack", -2);
        boostStat(pD, "spattack", -2);
        dealDamage(9999, pA);
    };
    this.description = "Lowers target's attack and special attack by 2 stages. User faints.";
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

function MetalSound() {
    this.name = "Metal Sound";
    this.type = "steel";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "spdefense", -2); };
    this.description = "Lowers target's special defense by 2 stages.";
}

function MeteorBeam() {
    this.name = "Meteor Beam";
    this.type = "rock";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pA, "spattack", 1);
        if (weather != undefined && weather.name === "Sandstorm")
            pA.hand.push(new ChargedMeteorBeam());
        else
            pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ChargedMeteorBeam());
    };
    this.description = "Raises user's special attack by 1 stage. Shuffles a Charged Meteor Beam into the user's deck. In a sandstorm, places it in the user's hand instead.";
}

function ChargedMeteorBeam() {
    this.name = "Charged Meteor Beam";
    this.type = "rock";
    this.cat = "special";
    this.bp = 80;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function MeteorMash() {
    this.name = "Meteor Mash";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.statchanges.defense > 0) boostStat(pA, "attack", 1); };
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
            var m = copyMove(pD.discard[pD.discard.length - 1]);
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

function Moonblast() {
    this.name = "Moonblast";
    this.type = "fairy";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.currenthp == pA.maxhp) boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special attack by 1 stage if user's HP is full.";
}

function Moonlight() {
    this.name = "Moonlight";
    this.type = "fairy";
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

function MuddyWater() {
    this.name = "Muddy Water";
    this.type = "water";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
}

function MysticalFire() {
    this.name = "Mystical Fire";
    this.type = "fire";
    this.cat = "special";
    this.bp = 75;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
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

function NightShade() {
    this.name = "Night Shade";
    this.type = "ghost";
    this.cat = "special";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { dealDamage(40, pD); };
    this.description = "Deals 40 damage to the opponent.";
}

function NightSlash() {
    this.name = "Night Slash";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) { this.crit = pA.discard.length >= 5; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit if the user's discard pile contains at least 5 cards.";
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

function OriginPulse() {
    this.name = "Origin Pulse";
    this.type = "water";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather == undefined || weather.name !== "Rain") setWeather("rain", 3); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Sets the weather to rain for 3 turns if not in the rain.";
}

function Outrage() {
    this.name = "Outrage";
    this.type = "dragon";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        pA.hand.push(copyMove(this));
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Remains in hand.";
}

function Overheat() {
    this.name = "Overheat";
    this.type = "fire";
    this.cat = "special";
    this.bp = 150;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pA, "spattack", -2); };
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
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        if (player) {
            money += 25;
            earnedMoney += 25;
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Gain " + String.fromCharCode(08381) + "25. Exhaust.";
}

function PhantomForce() {
    this.name = "Phantom Force";
    this.type = "ghost";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new PhantomForceStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Phantom Force Strike into its deck.";
}

function PhantomForceStrike() {
    this.name = "Phantom Force Strike";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
}

function PinMissile() {
    this.name = "Pin Missile";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 18;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times.";
}

function PlasmaFists() {
    this.name = "Plasma Fists";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 95;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        for (let m of pD.draw) {
            if (m.type === "normal") {
                m.type = "electric";
                return;
            }
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. First normal type move in the target's draw pile becomes electric type.";
}

function PlayRough() {
    this.name = "Play Rough";
    this.type = "fairy";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (effectiveMultiplier(this, pD) > 1) boostStat(pD, "attack", -1); };
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

function PoisonGas() {
    this.name = "Poison Gas";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { applyEffect("poison", 4, pD); };
    this.description = "Applies 4 stacks of poison to the opponent. Exhaust.";
}

function PoisonJab() {
    this.name = "Poison Jab";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (isPoisoned(pD)) boostStat(pA, "attack", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's attack by 1 stage if target is poisoned.";
}

function PoisonPowder() {
    this.name = "Poison Powder";
    this.type = "poison";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("poison", 6, pD); };
    this.description = "Applies 6 stacks of poison to the opponent.";
}

function Poltergeist() {
    this.name = "Poltergeist";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.fails = false;
    this.effect = function (move, pA, pD) { this.fails = pA.items.length == 0; };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fails unless user holds an item.";
}

function PowerGem() {
    this.name = "Power Gem";
    this.type = "rock";
    this.cat = "special";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 85 + 35 * (weather != undefined && weather.name === "Sandstorm"); };
    this.description = "Deals 85 base power damage to the opponent. Base power increases in the sandstorm.";
}

function PowerUpPunch() {
    this.name = "Power-Up Punch";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pA, "attack", 1); };
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

function PrecipiceBlades() {
    this.name = "Precipice Blades";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (weather == undefined || weather.name !== "Sun") setWeather("sun", 3); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Sets the weather to sun for 3 turns if not in the sun.";
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

function Psybeam() {
    this.name = "Psybeam";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pA.draw.length >= 5) applyEffect("confusion", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of confusion to the target if the user's draw pile contains at least 5 cards.";
}

function Psychic() {
    this.name = "Psychic";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.draw.length >= 5) boostStat(pD, "spdefense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers its special defense by one stage if the user's draw pile contains at least 5 cards.";
}

function PsychoCut() {
    this.name = "Psycho Cut";
    this.type = "psychic";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) { this.crit = (pA.draw.length >= 5); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit if the user's draw pile contains at least 5 cards.";
}

function PsychUp() {
    this.name = "Psych Up";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { (player ? team[activePokemon] : opponent).statchanges = JSON.parse(JSON.stringify((player ? opponent : team[activePokemon]).statchanges)); };
    this.description = "User copies target's stat changes.";
}

function Psystrike() {
    this.name = "Psystrike";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 100;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 100 * (pD.spdefense * statsChangeMultiplier ** pD.statchanges.spdefense) / (pD.defense * statsChangeMultiplier ** pD.statchanges.defense) };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power varies depending on target's defense.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
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
    this.effect = function (move, pA, pD) { drawMove(pA, false); };
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

function Recover() {
    this.name = "Recover";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { dealDamage(-pA.maxhp * .2, pA); };
    this.description = "Recover 20% of maximum HP.";
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

function Revenge() {
    this.name = "Revenge";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 60;
    this.cost = 2;
    this.effect = function (move, pA, pD) { if (pA.currenthp <= pA.maxhp / 2) this.bp = 120; else this.bp = 60; };
    this.description = "Deals 60 base power damage to the opponent. Power doubles if user's HP is below 50%.";
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

function RockBlast() {
    this.name = "Rock Blast";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 15;
    this.cost = 1;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { this.multihit = 3 + 2 * (weather != undefined && weather.name === "Sandstorm"); };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times. Hits 2 extra times in the sandstorm.";
}

function RockPolish() {
    this.name = "Rock Polish";
    this.type = "rock";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pA, "speed", 2); };
    this.description = "Raises user's speed by 2 stages.";
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

function RockTomb() {
    this.name = "Rock Tomb";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (weather != undefined && weather.name === "Sandstorm") boostStat(pD, "speed", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's speed by 1 stage in the sandstorm.";
}

function Rollout() {
    this.name = "Rollout";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        this.bp += 20;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
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

function SacredSword() {
    this.name = "Sacred Sword";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 85 * statsChangeMultiplier ** pD.statchanges.defense; };
    this.description = "Deals 85 base power damage to the opponent. Base power varies with the target's defense stat changes.";
}

function SandTomb() {
    this.name = "Sand Tomb";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 2, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 2 turns.";
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
    this.cost = 2;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        boostStat(pA, "speed", 1);
        boostStat(pA, "defense", -1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times. Raises the user's speed by 1 stage and lowers its defense by 1 stage.";
}

function ScaryFace() {
    this.name = "Scary Face";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -2); };
    this.description = "Lowers target's speed by 2 stages. Exhaust.";
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

function Screech() {
    this.name = "Screech";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "defense", -2); };
    this.description = "Lowers target's defense by 2 stages.";
}

function SeedBomb() {
    this.name = "Seed Bomb";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        applyEffect("ingrain", 1, pD);
        applyEffect("trap", 1, pD);
        applyEffect("grounded", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Target is rooted.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
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

function ShadowForce() {
    this.name = "Shadow Force";
    this.type = "ghost";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ShadowForceStrike());
        applyEffect("protection", 1, pA);
    };
    this.description = "Applies 1 stack of protection to the user and shuffles a Shadow Force Strike into its deck.";
}

function ShadowForceStrike() {
    this.name = "Shadow Force Strike";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 0;
    this.exhaust = true;
    this.noBlock = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Breaks protections. Exhaust.";
}

function ShadowSneak() {
    this.name = "Shadow Sneak";
    this.type = "ghost";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
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
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
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

function Sing() {
    this.name = "Sing";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("sleep", 1, pD); };
    this.description = "Applies 1 stack of sleep to the target.";
}

function SkitterSmack() {
    this.name = "Skitter Smack";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent and lowers its special attack by one stage.";
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

function Slash() {
    this.name = "Slash";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 30;
    this.cost = 1;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit.";
}

function Sludge() {
    this.name = "Sludge";
    this.type = "poison";
    this.cat = "special";
    this.bp = 40;
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
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var i = pD.effects.findIndex(e => e.name === "Poison");
        if (i == -1 || pD.effects[i].stacks > 0)
            applyEffect("poison", 6, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If target is poisoned, applies 6 stacks of poison to it.";
}

function SludgeWave() {
    this.name = "Sludge Wave";
    this.type = "poison";
    this.cat = "special";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 85 + 35 * (isPoisoned(pD)); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases against poisoned targets.";
}

function Smog() {
    this.name = "Smog";
    this.type = "poison";
    this.cat = "special";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("poison", 4, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 4 stacks of poison to the target.";
}

function Snarl() {
    this.name = "Snarl";
    this.type = "dark";
    this.cat = "special";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers target's special attack by 1 stage.";
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

function SolarBlade() {
    this.name = "Solar Blade";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Sun")
            pA.hand.push(new ChargedSolarBlade());
        else
            pA.draw.splice(Math.floor(Math.random() * pA.draw.length + 1), 0, new ChargedSolarBlade());
    };
    this.description = "Shuffles a Charged Solar Blade into the user's deck. Under the sun, places it in the user's hand instead.";
}

function ChargedSolarBlade() {
    this.name = "Charged Solar Blade";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Exhaust.";
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

function SmackDown() {
    this.name = "Smack Down";
    this.type = "rock";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("grounded", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Grounds target.";
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

function Spikes() {
    this.name = "Spikes";
    this.type = "ground";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (player)
            applyEffect("spikes", 1, pD)
        else {
            for (let p of team) {
                applyEffect("spikes", 1, p)
            }
        }
    };
    this.description = "Scatters spikes around the opposing team, dealing 10 damage per stack of spikes (maximum 5) to grounded Pokémon at the end of each turn.";
}

function Spite() {
    this.name = "Spite";
    this.type = "ghost";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        if (pD.draw.length > 0 && !pD.draw[pD.draw.length-1].description.includes("Exhaust.")) {
            pD.draw[pD.draw.length - 1].description += " Exhaust.";
            pD.draw[pD.draw.length - 1].exhaust = true;
        }
    };
    this.description = "First move in target's draw pile acquires exhaust. Exhaust.";
}

function Splash() {
    this.name = "Splash";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.fails = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Does nothing.";
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

function SteelWing() {
    this.name = "Steel Wing";
    this.type = "steel";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (pA.statchanges.defense <= 0) boostStat(pA, "defense", 1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Raises user's defense by 1 stage if it hasn't been raised already.";
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

function StoredPower() {
    this.name = "Stored Power";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        var c = 0;
        c += Math.max(0, pA.statchanges.attack);
        c += Math.max(0, pA.statchanges.defense);
        c += Math.max(0, pA.statchanges.spattack);
        c += Math.max(0, pA.statchanges.spdefense);
        c += Math.max(0, pA.statchanges.speed);
        this.bp = 20 * (c + 1);
    };
    this.description = "Deals 20 base power damage to the opponent, plus 20 base power multiplied by the amount of positive stat changes on the user.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { boostStat(pD, "spattack", -1); };
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
        dealDamage(40, pA);
        applyEffect("protection", 2, pA);
    };
    this.description = "User takes 40 damage and gains 2 stacks of protection.";
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
    };
    this.effect = function (move, pA, pD) { if (!this.fails) drawMove(pA, false); };
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

function Superpower() {
    this.name = "Superpower";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        if (pA.currenthp < .6 * pA.maxhp) {
            boostStat(pA, "defense", -1);
            boostStat(pA, "attack", -1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's attack and defense by 1 stage unless its HP is higher than 70% of maximum HP.";
}

function Surf() {
    this.name = "Surf";
    this.type = "water";
    this.cat = "special";
    this.bp = 75;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { setWeather("rain", 1); };
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

function SweetKiss() {
    this.name = "Sweet Kiss";
    this.type = "fairy";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("confusion", 1, pD); };
    this.description = "Applies 1 stack of confusion to the target.";
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

function Taunt() {
    this.name = "Taunt";
    this.type = "dark";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("taunt", 2, pD); };
    this.description = "Applies 2 stacks of taunt to the target.";
}

function Teleport() {
    this.name = "Teleport";
    this.type = "psychic";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.effect = function (move, pA, pD) { switchesLeft = Math.max(1, switchesLeft); };
    this.description = "User regains the opportunity to switch out.";
}

function Thrash() {
    this.name = "Thrash";
    this.type = "normal";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        pA.hand.push(copyMove(this));
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Remains in hand.";
}

function ThroatChop() {
    this.name = "Throat Chop";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (isScared(pD)) boostStat(pD, "spattack", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers the target's special attack by 1 stage if it's scared.";
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

function ThunderFang() {
    this.name = "Thunder Fang";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        if (weather != undefined && weather.name === "Rain") applyEffect("paralysis", 1, pD);
        if (pA.statchanges.attack > 0) applyEffect("fear", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target in the rain. Applies 1 stack of fear to the target if the user's attack has been raised.";
}

function ThunderPunch() {
    this.name = "Thunder Punch";
    this.type = "electric";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.effect = function (move, pA, pD) { if (isParalyzed(pD)) applyEffect("paralysis", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the target if it's already paralyzed.";
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

function ThunderWave() {
    this.name = "Thunder Wave";
    this.type = "electric";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("paralysis", 1, pD); };
    this.description = "Applies 1 stack of paralysis to the target.";
}

function Tickle() {
    this.name = "Tickle";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        boostStat(pD, "attack", -1);
        boostStat(pD, "defense", -1);
    };
    this.description = "Lowers target's attack and defense by 1 stage.";
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

function TriAttack() {
    this.name = "Tri Attack";
    this.type = "normal";
    this.cat = "special";
    this.bp = 80;
    this.cost = 2;
    this.effect = function (move, pA, pD) {
        if (weather != undefined) {
            if (weather.name === "Rain") applyEffect("paralysis", 1, pD);
            if (weather.name === "Sun") applyEffect("burn", 1, pD);
            if (weather.name === "Freeze") applyEffect("freeze", 1, pD);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies status conditions depending on the weather.";
}

function TripleAxel() {
    this.name = "Triple Axel";
    this.type = "ice";
    this.cat = "physical";
    this.bp = 45;
    this.cost = 3;
    this.multihit = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent 3 times.";
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

function Uproar() {
    this.name = "Uproar";
    this.type = "normal";
    this.cat = "special";
    this.bp = 90;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        pA.hand.push(copyMove(this));
    };
    this.postEffect = function (move, pA, pD) { removeEffect("Sleep", pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Remains in hand. Wakes up sleeping Pokémon.";
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Draw a card.";
}

function VCreate() {
    this.name = "V-Create";
    this.type = "fire";
    this.cat = "physical";
    this.bp = 170;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        boostStat(pA, "defense", -1);
        boostStat(pA, "spdefense", -1);
        boostStat(pA, "speed", -1);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's defense, special defense and speed by 1 stage.";
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
    this.effect = function (move, pA, pD) { applyEffect("trap_damage", 2, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Deals residual damage at the end of each turn for 2 turns.";
}

function WickedBlow() {
    this.name = "Wicked Blow";
    this.type = "dark";
    this.cat = "physical";
    this.bp = 90;
    this.cost = 3;
    this.crit = true;
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

function Withdraw() {
    this.name = "Withdraw";
    this.type = "water";
    this.cat = "status";
    this.bp = 0;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { boostStat(pA, "defense", 1); };
    this.description = "Raises user's defense by 1 stage. Exhaust.";
}

function WoodHammer() {
    this.name = "Wood Hammer";
    this.type = "grass";
    this.cat = "physical";
    this.bp = 120;
    this.cost = 2;
    this.recoil = .33;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent. 33% recoil.";
}

function XScissor() {
    this.name = "X-Scissor";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.hand) {
            c += m.type === "bug";
        }
        this.crit = c > 1;
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit if the user's hand contains another bug type move.";
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

function applyEffect(type, stacks, p, extra) {
    var effect = createEffect(type, stacks, extra);
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

function createEffect(type, stacks, extra) {
    switch (type) {
        case "burn":
            return new Burn(stacks);
        case "charge":
            return new ChargeE(stacks);
        case "confined":
            return new Confined(stacks);
        case "confusion":
            return new ConfusionE(stacks);
        case "curse":
            return new CurseE(stacks);
        case "disguise":
            return new Disguise(stacks);
        case "extra_draw":
            return new ExtraDraw(stacks);
        case "fear":
            return new Fear(stacks);
        case "freeze":
            return new Freeze(stacks);
        case "grounded":
            return new Grounded(stacks);
        case "immunity":
            return new Immunity(stacks, extra);
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
        case "slow_start":
            return new SlowStart(stacks);
        case "spikes":
            return new SpikesE(stacks);
        case "stealth_rock":
            return new StealthRockE(stacks);
        case "sticky_web":
            return new StickyWebE(stacks);
        case "taunt":
            return new TauntE(stacks);
        case "thick_fat":
            return new ThickFat(stacks);
        case "toxic_spikes":
            return new ToxicSpikesE(stacks);
        case "trap":
            return new Trap(stacks);
        case "trap_damage":
            return new TrapDamage(stacks);
        case "type_changed":
            return new TypeChanged(stacks, extra);
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
    this.immune = ["fire"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function ChargeE(stacks) {
    this.name = "Charge";
    this.description = "Charge\nIncreases the damage of eletric type moves. Remove 1 stack at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/charge.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function Confined(stacks) {
    this.name = "Confined";
    this.description = "Confined\nTries to break free from its prison bottle...";
    this.icon = 'resources/sprites/effect_icons/confined.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        this.stacks--;
        if (this.stacks == 0)
            switchHoopa(pA);
    };
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

function Disguise(stacks) {
    this.name = "Disguise";
    this.description = "Disguise\nCancel next attack targetting this Pokémon.";
    this.icon = 'resources/sprites/effect_icons/shield.webp';
    this.stacks = stacks;
    this.block = true;
    this.effect = (pA, pD) => { };
    this.bEffect = (move, pA, pD) => {
        if (move.cat !== "status")
            this.stacks--;
        if (this.stacks == 0)
            switchMimikyu(pA, false);
    };
}

function ExtraDraw(stacks) {
    this.name = "Extra Draw";
    this.description = "Extra Draw\nDraw an extra card for each stack at the beginning of the turn.";
    this.icon = 'resources/sprites/ui_icons/deck.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
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

function Freeze(stacks) {
    this.name = "Freeze";
    this.description = "Freeze\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'resources/sprites/effect_icons/freeze.webp';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is frozen solid!<br/>"
    this.immune = ["ice"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function Grounded(stacks) {
    this.name = "Grounded";
    this.description = "Grounded";
    this.icon = 'resources/sprites/ui_icons/debuff.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function Immunity(stacks, type) {
    this.name = "Immunity (" + type + ")";
    this.description = "Immunity (" + type + ")\nImmune to " + type + " type moves.";
    this.icon = 'resources/sprites/effect_icons/immunity.png';
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

function SlowStart(stacks) {
    this.name = "Slow Start";
    this.description = "Slow Start\nPhysical damage reduced by 40%.";
    this.icon = 'resources/sprites/effect_icons/slow_start.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        this.stacks--;
        if (this.stacks == 0)
            pA.slowStart = false;
    };
}

function SpikesE(stacks) {
    this.name = "Spikes";
    this.description = "Spikes\nDeals 10 damage at the end of the turn. Airborne Pokémon are immune.";
    this.icon = 'resources/sprites/effect_icons/spike.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (isGrounded(pA))
            dealDamage(Math.min(50, this.stacks * 10), pA);
    };
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

function TauntE(stacks) {
    this.name = "Taunt";
    this.description = "Taunt\nPrevents the use of status moves.";
    this.icon = 'resources/sprites/effect_icons/taunt.webp';
    this.stacks = stacks;
    this.specialMessage = " can't use non damaging moves after the taunt!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function ThickFat(stacks) {
    this.name = "Thick Fat";
    this.description = "Thick Fat\nLowers the damage of incoming ice and fire type moves.";
    this.icon = 'resources/sprites/effect_icons/thick_fat.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function ToxicSpikesE(stacks) {
    this.name = "Toxic Spikes";
    this.description = "Toxic Spikes\nApplies 4 stacks of poison at the end of the turn. Airborne Pokémon are immune.";
    this.icon = 'resources/sprites/effect_icons/spike.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (isGrounded(pA))
            applyEffect("poison", Math.min(8, this.stacks * 4), pA);
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

function TypeChanged(stacks, type) {
    this.name = "Type changed";
    this.description = "Type changed\nType changed to " + type + ".";
    this.icon = 'resources/sprites/effect_icons/type_changed.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { }
}

function WishE(stacks) {
    this.name = "Wish";
    this.description = "Wish\nRestores 20% of maximum HP once this effect ends. Remove 1 stack at the end of each turn.";
    this.icon = 'resources/sprites/effect_icons/wish.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        this.stacks--;
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

function isFrozen(p) {
    var i = p.effects.findIndex(e => e.name === "Freeze");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isTaunted(p) {
    var i = p.effects.findIndex(e => e.name === "Taunt");
    return i >= 0 && p.effects[i].stacks > 0;
}

function isImmune(p, type) {
    var i = p.effects.findIndex(e => e.name === "Immunity (" + type + ")");
    return i >= 0 && p.effects[i].stacks > 0;
}

function drawsExtra(p) {
    var i = p.effects.findIndex(e => e.name === "Extra Draw");
    return i >= 0 && p.effects[i].stacks > 0;
}

function hasThickFat(p) {
    var i = p.effects.findIndex(e => e.name === "Thick Fat");
    return i >= 0 && p.effects[i].stacks > 0;
}






/* ------------------------------------------------------ */
/* ---------------- Environment creation ---------------- */
/* ------------------------------------------------------ */

function setWeather(w, turns) {
    if (weather == undefined || weather.name !== "Air Lock") {
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
            case "air_lock":
                weather = new AirLock(turns);
                break;
            default:
        }
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
        if (!contains(opponent.types, "rock") && !contains(opponent.types, "ground") && !contains(opponent.types, "steel")) {
            dealDamage(10, opponent);
            sandstormDamage += 10;
        }
        this.turns--;
    };
}

function HailW(turns) {
    this.name = "Hail";
    this.turns = turns;
    this.description = "Non ice type Pokémon take 10 damage at the end of each turn.";
    this.effect = () => {
        if (!contains(team[activePokemon].types, "ice"))
            dealDamage(10, team[activePokemon]);
        if (!contains(opponent.types, "ice"))
            dealDamage(10, opponent);
        this.turns--;
    };
}

function AirLock(turns) {
    this.name = "Air Lock";
    this.turns = turns;
    this.description = "Cannot be replaced by another weather.";
    this.effect = () => {
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
        if (move != undefined && move.cat === "physical")
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
        if ( move != undefined && effectiveMultiplier(move, pA) > 1 && !this.consumed) {
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


