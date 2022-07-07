/* ----------------------------------------------------- */
/* -------------------- Home screen -------------------- */
/* ----------------------------------------------------- */

music = false;
fastBattle = false;

function loadResources() {
    var filter = document.createElement('div');
    filter.className = "filter-black";
    document.body.appendChild(filter);

    loadProgress();

    async function loadAssets(imageUrlArray, isImage) {
        const promiseArray = [];

        for (let imageUrl of imageUrlArray) {
            promiseArray.push(new Promise(resolve => {
                const img = isImage ? new Image() : document.createElement('audio');
                if (isImage)
                    img.onload = () => {
                        assetsLoaded++;
                        var progress = 100 * assetsLoaded / totalAssets;
                        progressSpan.style.width = progress + "%";
                        progressText.innerHTML = Math.floor(progress) + "%";
                        if (progress == 100) {
                            text.innerHTML = "Click to continue";
                            filter.onclick = () => {
                                fadeOutTransition(2);
                                setTimeout(drawStartingMenu, 1000);
                            }
                        }
                        resolve();
                    }
                else
                    img.addEventListener('canplay', () => {
                        assetsLoaded++;
                        var progress = 100 * assetsLoaded / totalAssets;
                        progressSpan.style.width = progress + "%";
                        progressText.innerHTML = Math.floor(progress) + "%";
                        img.id = imageUrl;
                        document.body.appendChild(img);
                        if (progress == 100) {
                            text.innerHTML = "Click to continue";
                            filter.onclick = () => {
                                fadeOutTransition(2);
                                setTimeout(drawStartingMenu, 1000);
                            }
                        }
                        resolve();
                    });
                img.src = imageUrl;
            }));
        }

        await Promise.all(promiseArray);
        return;
    }

    imgs = [];
    sounds = [];

    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/homescreen.jpg");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/plains.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/forest.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/cave3.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/beach2.png");

    for (let e of effectList) {
        imgs.push(createEffect(e, 0).icon);
    }
    for (let i of heldItems) {
        imgs.push(createHeldItem(i).img);
    }
    for (let i of specialItems) {
        imgs.push(createHeldItem(i).img);
    }
    for (let t of types) {
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/" + t + ".png");
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/" + t + ".webp");
    }

    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/boss.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/boss.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/pokemart.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/pokemon_center.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/physical.webp");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/special.webp");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/status.webp");

    for (let poke of pokemonList) {
        var p = createPokemon(poke);
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/" + poke + ".gif");
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/" + poke + ".gif");
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/" + p.id + ".png");
        sounds.push(p.cry);
    }
    for (let poke of bossList) {
        var p = createPokemon(poke);
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/" + poke + ".gif");
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/" + poke + ".gif");
        sounds.push(p.cry);
    }
    for (let poke of eventPokemonList) {
        var p = createPokemon(poke);
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/" + poke + ".gif");
        imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/" + poke + ".gif");
        sounds.push(p.cry);
    }

    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/aegislash_blade.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/aegislash_blade.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mimikyu_busted.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mimikyu_busted.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/hoopa_unbound.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/hoopa_unbound.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/giratina_origin.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/giratina_origin.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_fan.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_fan.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_heat.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_heat.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_frost.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_frost.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_wash.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_wash.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_mow.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_mow.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_rainy.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_rainy.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_sunny.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_sunny.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_snowy.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_snowy.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/darmanitan_zen.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/darmanitan_zen.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/nidoqueen.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/nidoqueen.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/nidoking.gif");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/nidoking.gif");

    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/deck.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/discard.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/energy.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/mute.webp");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/random.webp");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/remove.png");
    imgs.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/sound.webp");

    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/battle.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/boss.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/crossroads.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/game_over.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/pokemart.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/pokemon_center.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/run_complete.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/title_screen.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/victory.mp3");

    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/healer.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/hit.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/pc.mp3");
    sounds.push("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/super_effective_hit.mp3");

    var assetsLoaded = 0;
    var totalAssets = imgs.length + sounds.length;

    var grid = document.createElement('div');
    grid.className = "settings-grid";
    filter.appendChild(grid);

    var progressBar = document.createElement('div');
    progressBar.className = "meter";
    grid.appendChild(progressBar);
    var progressSpan = document.createElement('span');
    progressSpan.style.width = 0;
    progressBar.appendChild(progressSpan);
    var progressText = document.createElement('div');
    progressText.innerHTML = "0%";
    progressBar.appendChild(progressText);

    var text = document.createElement('div');
    text.innerHTML = "Loading assets...";
    text.style.fontSize = "3vw";
    grid.appendChild(text);

    var disclaimer = document.createElement('div');
    disclaimer.className = "disclaimer";
    disclaimer.innerHTML = "Loading speed may depend on the network. Please ensure you have a good Internet connection if loading takes too long.<br/>© 2022 Pokémon. © 1995–2022 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character names, Nintendo Switch, Nintendo 3DS, Nintendo DS, Wii, Wii U, and WiiWare are trademarks of Nintendo.";
    filter.appendChild(disclaimer);

    music = window.localStorage.getItem('music') != null ? JSON.parse(window.localStorage.getItem('music')) : true;
    masterVolume = window.localStorage.getItem('masterVolume') != null ? JSON.parse(window.localStorage.getItem('masterVolume')) : 1;
    musicVolume = window.localStorage.getItem('musicVolume') != null ? JSON.parse(window.localStorage.getItem('musicVolume')) : 1;
    sfxVolume = window.localStorage.getItem('sfxVolume') != null ? JSON.parse(window.localStorage.getItem('sfxVolume')) : 1;
    fastBattle = window.localStorage.getItem('fastBattle') != null ? JSON.parse(window.localStorage.getItem('fastBattle')) : false;

    loadAssets(imgs, true);
    loadAssets(sounds, false);
}

function clearBody() {
    var nodes = Array.prototype.slice.call(document.body.childNodes);
    var audios = Array.prototype.slice.call(document.getElementsByTagName('audio'));
    for (let i = 0; i < nodes.length; i++) {
        if (!contains(audios, nodes[i])) {
            document.body.removeChild(nodes[i]);
        }
    }
    stopMusic();
}

function drawStartingMenu() {
    clearBody();
    fadeInTransition();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/title_screen.mp3";
    if (music)
        playMusic(ambientMusic, true);

    var startButton = document.createElement('button');
    startButton.className = "start";
    startButton.innerText = "start";
    startButton.addEventListener('click', () => {
        tuto = false;
        fadeOutTransition(2);
        setTimeout(drawTeamSelection, 2000);
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    });
    document.body.appendChild(startButton);
    var tutoButton = document.createElement('button');
    tutoButton.className = "launch-tuto";
    tutoButton.innerText = "how to play?";
    tutoButton.addEventListener('click', () => {
        tuto = true;
        fadeOutTransition(2);
        setTimeout(drawTeamSelection, 2000);
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    });
    document.body.appendChild(tutoButton);
    var soundButton = document.createElement('div');
    soundButton.className = "sound-button";
    soundButton.addEventListener('click', () => {
        if (music) {
            soundImage.src = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/mute.webp"
            stopMusic();
            music = false;
        } else {
            soundImage.src = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/sound.webp"
            playMusic(ambientMusic, true);
            music = true;
        }
        window.localStorage.setItem('music', JSON.stringify(music));
    });
    document.body.appendChild(soundButton);
    var soundImage = new Image();
    soundImage.id = "soundImage";
    soundImage.className = "pixel-sprite";
    soundImage.src = music ? "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/sound.webp" : "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/mute.webp"
    soundButton.appendChild(soundImage);
    var gArea = new gameArea("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/homescreen.jpg", () => { });
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
    loadResources();
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

function resizeSprites(left, right) {
    if (left) {
        console.log("left")
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
            }
            if (sprite != undefined)
                sprite.src = team[activePokemon].imgb;
        }
    }

    if (right) {
        console.log("right")
        var scale2 = .25 * document.body.getBoundingClientRect().height / 100;
        var sprite2 = document.getElementById("rightSprite");
        sprite2.onload = () => {
            var view2 = document.getElementById("pRightView");
            if (view2 != undefined) {
                view2.style.gridTemplateRows = "auto " + Math.min(130, sprite2.naturalHeight) * scale2 + "px auto";
                view2.style.top = .5 * document.body.getBoundingClientRect().height - Math.min(130, sprite2.naturalHeight) * scale2 + "px";
            }
            if (sprite2.naturalHeight > 130)
                sprite2.style.transform = "scale(" + sprite2.naturalHeight / 130 + "," + sprite2.naturalHeight / 130 + ")";
            else
                sprite2.style.transform = "scale(1,1)";
        }
        if (sprite2 != undefined)
            sprite2.src = opponent.imgf;
    }
}

baseVolume = .5;
masterVolume = 1;
musicVolume = 1;
sfxVolume = 1;

function playMusic(src, repeat) {
    var music = document.getElementById(src);
    if (music != undefined) {
        music.volume = baseVolume * masterVolume;
        if (repeat)
            music.volume *= musicVolume;
        else
            music.volume *= sfxVolume;
        music.currentTime = 0;
        music.loop = repeat;
        music.play();
    }
}

function stopMusic() {
    var audios = document.getElementsByTagName('audio');
    for (let a of audios)
        a.pause();
}

function toggleEscapeScreen() {
    if (document.getElementById('escapeScreen') != undefined)
        document.body.removeChild(document.getElementById('escapeScreen'));
    else {
        var filter = document.createElement('div');
        filter.className = "filter";
        filter.id = "escapeScreen";
        filter.style.zIndex = "10";
        document.body.appendChild(filter);
        var grid = document.createElement('div');
        grid.className = "settings-grid";
        filter.appendChild(grid);

        var title = document.createElement('div');
        title.innerHTML = "settings";
        grid.appendChild(title);

        var settingsOptionsGrid = document.createElement('div');
        settingsOptionsGrid.className = "dual-column-grid";
        grid.appendChild(settingsOptionsGrid);

        var soundSwitch = document.createElement('label');
        soundSwitch.className = "switch";
        settingsOptionsGrid.appendChild(soundSwitch);
        var soundSwitchInput = document.createElement('input');
        soundSwitchInput.type = "checkbox";
        soundSwitchInput.checked = music;
        soundImage = document.getElementById('soundImage');
        soundSwitchInput.onclick = () => {
            if (music) {
                if (soundImage != undefined)
                    soundImage.src = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/mute.webp"
                stopMusic()
                music = false;
            } else {
                if (soundImage != undefined)
                    soundImage.src = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/sound.webp"
                playMusic(ambientMusic, true);
                music = true;
            }
            soundSwitchInput.checked = music;
            window.localStorage.setItem('music', JSON.stringify(music));
        }
        soundSwitch.appendChild(soundSwitchInput);
        var soundSwitchSlider = document.createElement('span');
        soundSwitchSlider.className = "slider round";
        soundSwitch.appendChild(soundSwitchSlider);
        var soundSwitchText = document.createElement('div');
        soundSwitchText.innerHTML = "Activate music";
        settingsOptionsGrid.appendChild(soundSwitchText);

        var masterSoundSlider = document.createElement('div');
        masterSoundSlider.className = "slidecontainer";
        settingsOptionsGrid.appendChild(masterSoundSlider);
        var masterSoundInput = document.createElement('input');
        masterSoundInput.className = "sliderbar";
        masterSoundInput.type = "range";
        masterSoundInput.min = 0;
        masterSoundInput.max = 100;
        masterSoundInput.value = Math.floor(100 * masterVolume);
        masterSoundInput.onchange = () => {
            masterVolume = masterSoundInput.value / 100;
            for (let a of document.getElementsByTagName('audio')) {
                if (a.loop)
                    a.volume = baseVolume * masterVolume * musicVolume;
                else
                    a.volume = baseVolume * masterVolume * sfxVolume;
            }
            window.localStorage.setItem('masterVolume', JSON.stringify(masterVolume));
        }
        masterSoundSlider.appendChild(masterSoundInput);
        var masterSoundText = document.createElement('div');
        masterSoundText.innerHTML = "Main volume";
        settingsOptionsGrid.appendChild(masterSoundText);

        var musicSoundSlider = document.createElement('div');
        musicSoundSlider.className = "slidecontainer";
        settingsOptionsGrid.appendChild(musicSoundSlider);
        var musicSoundInput = document.createElement('input');
        musicSoundInput.className = "sliderbar";
        musicSoundInput.type = "range";
        musicSoundInput.min = 0;
        musicSoundInput.max = 100;
        musicSoundInput.value = Math.floor(100 * musicVolume);
        musicSoundInput.onchange = () => {
            musicVolume = musicSoundInput.value / 100;
            for (let a of document.getElementsByTagName('audio')) {
                if (a.loop)
                    a.volume = baseVolume * masterVolume * musicVolume;
            }
            window.localStorage.setItem('musicVolume', JSON.stringify(musicVolume));
        }
        musicSoundSlider.appendChild(musicSoundInput);
        var musicSoundText = document.createElement('div');
        musicSoundText.innerHTML = "Music volume";
        settingsOptionsGrid.appendChild(musicSoundText);

        var sfxSoundSlider = document.createElement('div');
        sfxSoundSlider.className = "slidecontainer";
        settingsOptionsGrid.appendChild(sfxSoundSlider);
        var sfxSoundInput = document.createElement('input');
        sfxSoundInput.className = "sliderbar";
        sfxSoundInput.type = "range";
        sfxSoundInput.min = 0;
        sfxSoundInput.max = 100;
        sfxSoundInput.value = Math.floor(100 * sfxVolume);
        sfxSoundInput.onchange = () => {
            sfxVolume = sfxSoundInput.value / 100;
            for (let a of document.getElementsByTagName('audio')) {
                if (!a.loop)
                    a.volume = baseVolume * masterVolume * sfxVolume;
            }
            window.localStorage.setItem('sfxVolume', JSON.stringify(sfxVolume));
        }
        sfxSoundSlider.appendChild(sfxSoundInput);
        var sfxSoundText = document.createElement('div');
        sfxSoundText.innerHTML = "Sound effect volume";
        settingsOptionsGrid.appendChild(sfxSoundText);

        var sep1 = document.createElement('hr');
        sep1.className = "separator";
        settingsOptionsGrid.appendChild(sep1);

        var fastBattleSwitch = document.createElement('label');
        fastBattleSwitch.className = "switch";
        settingsOptionsGrid.appendChild(fastBattleSwitch);
        var fastBattleSwitchInput = document.createElement('input');
        fastBattleSwitchInput.type = "checkbox";
        fastBattleSwitchInput.id = "soundsSwitchInput";
        fastBattleSwitchInput.checked = fastBattle;
        fastBattleSwitchInput.onclick = () => {
            fastBattle = !fastBattle;
            fastBattleSwitchInput.checked = fastBattle;
            window.localStorage.setItem('fastBattle', JSON.stringify(fastBattle));
        }
        fastBattleSwitch.appendChild(fastBattleSwitchInput);
        var fastBattleSwitchSlider = document.createElement('span');
        fastBattleSwitchSlider.className = "slider round";
        fastBattleSwitch.appendChild(fastBattleSwitchSlider);
        var fastBattleSwitchText = document.createElement('div');
        fastBattleSwitchText.innerHTML = "Faster battles";
        settingsOptionsGrid.appendChild(fastBattleSwitchText);

        var sep2 = document.createElement('hr');
        sep2.className = "separator";
        settingsOptionsGrid.appendChild(sep2);

        var exitButton = document.createElement('div');
        exitButton.className = "settings-option";
        exitButton.innerHTML = "Exit to title screen";
        exitButton.onclick = () => {
            toggleEscapeScreen();
            fadeOutTransition(2);
            setTimeout(drawStartingMenu, 2000);
        }
        settingsOptionsGrid.appendChild(exitButton);
    }
}

function fadeOutTransition(n) {
    var fadeFilter = document.createElement('div');
    fadeFilter.className = "fade-dark" + n;
    document.body.appendChild(fadeFilter);

    var m;
    var audios = document.getElementsByTagName('audio');
    for (let a of audios) {
        if (a.loop)
            m = a;
    }
    if (m != undefined) {
        volume = m.volume;
        interval = setInterval(fadeOutMusic, 15);
    }
    function fadeOutMusic() {
        if (m == undefined)
            clearInterval(interval);

        var newVolume = m.volume - 0.02 * volume / n;
        if (newVolume >= 0) {
            m.volume = newVolume;
        }
        else {
            clearInterval(interval);
            m.volume = 0;
            m.pause();
            m.currentTIme = 0;
        }
    }
}

function fadeInTransition() {
    var fadeFilter = document.createElement('div');
    fadeFilter.className = "fade-in";
    document.body.appendChild(fadeFilter);
    setTimeout(() => { document.body.removeChild(fadeFilter); }, 1000);
}





/* ------------------------------------------------------ */
/* ------------------- Team selection ------------------- */
/* ------------------------------------------------------ */

const pokemonList = ["venusaur", "charizard", "blastoise", "pikachu", "garchomp", "cinderace", "lucario", "volcarona", "eevee", "gardevoir", "dragonite", "ferrothorn", "blissey", "sableye", "scizor", "aegislash", "meowth", "metagross", "weavile", "zeraora", "darmanitan", "rotom", "castform", "whimsicott", "kommo-o", "nidoking", "ninetales_alola", "omanyte", "tyranitar", "gyarados", "ditto", "mew", "urshifu", "gengar", "shuckle", "mimikyu", "mamoswine"]

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
    recoilMoves = window.localStorage.getItem('recoilMoves') != null ? parseInt(JSON.parse(window.localStorage.getItem('recoilMoves'))) : 0;
    bossesDefeated = window.localStorage.getItem('bossesDefeated') != null ? parseInt(JSON.parse(window.localStorage.getItem('bossesDefeated'))) : 0;
    weatherChanged = window.localStorage.getItem('weatherChanged') != null ? parseInt(JSON.parse(window.localStorage.getItem('weatherChanged'))) : 0;
    statRaised = window.localStorage.getItem('statRaised') != null ? parseInt(JSON.parse(window.localStorage.getItem('statRaised'))) : 0;
    poisonApplied = window.localStorage.getItem('poisonApplied') != null ? parseInt(JSON.parse(window.localStorage.getItem('poisonApplied'))) : 0;
    loweredStats = window.localStorage.getItem('loweredStats') != null ? parseInt(JSON.parse(window.localStorage.getItem('loweredStats'))) : 0;
    hailStarted = window.localStorage.getItem('hailStarted') != null ? parseInt(JSON.parse(window.localStorage.getItem('hailStarted'))) : 0;
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
    window.localStorage.setItem('recoilMoves', JSON.stringify(recoilMoves));
    window.localStorage.setItem('bossesDefeated', JSON.stringify(bossesDefeated));
    window.localStorage.setItem('weatherChanged', JSON.stringify(weatherChanged));
    window.localStorage.setItem('statRaised', JSON.stringify(statRaised));
    window.localStorage.setItem('poisonApplied', JSON.stringify(poisonApplied));
    window.localStorage.setItem('loweredStats', JSON.stringify(loweredStats));
    window.localStorage.setItem('hailStarted', JSON.stringify(hailStarted));
}

function unlockAll() {
    window.localStorage.setItem('defeatedPokemon', JSON.stringify(150));
    window.localStorage.setItem('victories', JSON.stringify(1));
    window.localStorage.setItem('flawlessVictories', JSON.stringify(1));
    window.localStorage.setItem('starterVictories', JSON.stringify(1));
    window.localStorage.setItem('physicalDamageTaken', JSON.stringify(15000));
    window.localStorage.setItem('specialDamageTaken', JSON.stringify(15000));
    window.localStorage.setItem('statusMovesUsed', JSON.stringify(150));
    window.localStorage.setItem('damageDealt', JSON.stringify(50000));
    window.localStorage.setItem('blockedHits', JSON.stringify(30));
    window.localStorage.setItem('earnedMoney', JSON.stringify(10000));
    window.localStorage.setItem('drawnCards', JSON.stringify(1000));
    window.localStorage.setItem('fastBoss', JSON.stringify(1));
    window.localStorage.setItem('cardsPerTurn', JSON.stringify(8));
    window.localStorage.setItem('helixQuest', JSON.stringify(1));
    window.localStorage.setItem('sandstormDamage', JSON.stringify(300));
    window.localStorage.setItem('survive1hp', JSON.stringify(1));
    window.localStorage.setItem('unlockedPokemon', JSON.stringify(10));
    window.localStorage.setItem('transforms', JSON.stringify(50));
    window.localStorage.setItem('flawlessKO', JSON.stringify(1));
    window.localStorage.setItem('area1loss', JSON.stringify(1));
    window.localStorage.setItem('maxRound', JSON.stringify(20));
    window.localStorage.setItem('pikachuVictory', JSON.stringify(1));
    window.localStorage.setItem('rockIceKO', JSON.stringify(1));
    window.localStorage.setItem('recoilMoves', JSON.stringify(30));
    window.localStorage.setItem('bossesDefeated', JSON.stringify(10));
    window.localStorage.setItem('weatherChanged', JSON.stringify(50));
    window.localStorage.setItem('statRaised', JSON.stringify(100));
    window.localStorage.setItem('poisonApplied', JSON.stringify(300));
    window.localStorage.setItem('loweredStats', JSON.stringify(50));
    window.localStorage.setItem('hailStarted', JSON.stringify(10));
}

function drawTeamSelection() {
    clearBody();
    fadeInTransition();
    gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/pokemon_center.mp3";
    if (music) {
        playMusic("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/pc.mp3", false);
        playMusic(ambientMusic, true);
    }

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
    for (let i = 0; i < 3; i++) {
        teamSelector.appendChild((new randomSelector(i)).cell);
    }

    teamSelectorScreen.appendChild(teamSelector);

    if (tuto) {
        var filter = document.createElement('div');
        filter.className = "filter";
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
}

function pokemonSelector(name) {
    this.cell = document.createElement('div');
    this.cell.p = createPokemon(name);
    name = this.cell.p.id;
    this.name = name;
    image = new Image();
    image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + name + '.png';
    image.className = 'selector-pixel-sprite';
    if (!this.cell.p.unlocked)
        image.className += " not-unlocked";
    title = document.createElement('div');
    title.innerHTML = this.cell.p.unlocked ? this.cell.p.name : "?????";
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
                    tsc.onclick = () => {
                        if (!tuto || (contains(pSelected, "venusaur") && contains(pSelected, "charizard")) && contains(pSelected, "blastoise")) {
                            fadeOutTransition(2);
                            setTimeout(launchGame, 2000);
                            if (music)
                                playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                        }
                    };
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

function randomSelector(n) {
    var name = "random" + n;
    this.cell = document.createElement('div');
    image = new Image();
    image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/random.webp';
    image.className = 'random-selector-pixel-sprite';
    image.style.filter = "invert()";
    title = document.createElement('div');
    title.innerHTML = "Random";
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
                tsc.onclick = () => {
                    if (!tuto || (contains(pSelected, "venusaur") && contains(pSelected, "charizard")) && contains(pSelected, "blastoise")) {
                        fadeOutTransition(2);
                        setTimeout(launchGame, 2000);
                        if (music)
                            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                    }
                };
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
            atkMul = Math.max(1, statsChangeMultiplier ** pA.statchanges.attack);
            defMul = Math.min(1, statsChangeMultiplier ** pD.statchanges.defense);
        } else {
            atkMul = statsChangeMultiplier ** pA.statchanges.attack;
            defMul = statsChangeMultiplier ** pD.statchanges.defense;
        }
        baseDam = 22 * move.bp * pA.attack * atkMul / (50 * pD.defense * defMul);
    } else if (move.cat === "special") {
        if (crit) {
            atkMul = Math.max(1, statsChangeMultiplier ** pA.statchanges.spattack);
            defMul = Math.min(1, statsChangeMultiplier ** pD.statchanges.spdefense) + .5 * (weather != undefined && weather.name === "Sandstorm" && contains(pD.types, "rock"));
        } else {
            atkMul = statsChangeMultiplier ** pA.statchanges.spattack;
            defMul = statsChangeMultiplier ** pD.statchanges.spdefense;
        }
        baseDam = 22 * move.bp * pA.spattack * atkMul / (50 * pD.spdefense * defMul);
    }
    if (crit)
        baseDam *= 1.5
    if (move.bp > 0)
        baseDam = Math.max(1, baseDam);

    var other = 1;
    if (move.cat === "physical" && isBurned(pA))
        other *= .6;
    if (weather != undefined) {
        if (weather.name === "Rain") {
            if (move.type === "water")
                other *= 1.3;
            if (move.type === "fire")
                other *= .7;
        } else if (weather.name === "Sun") {
            if (move.type === "water")
                other *= .7;
            if (move.type === "fire")
                other *= 1.3;
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
    pokemonCenterChance = 0;
    pokemartChance = 0;
    eventChance = 0;
    flawless = true;
    team = [];
    guaranteedPokemonCenter = false;
    guaranteedPokemart = false;

    for (let i = 0; i < pSelected.length; i++) {
        if (!pSelected[i].includes("random")) {
            pokemon = createPokemon(pSelected[i]);
            adjustBST(pokemon, 600, false);
            team[i] = pokemon;
        }
    }
    for (let i = 0; i < pSelected.length; i++) {
        if (team[i] == undefined) {
            var name = pokemonList[Math.floor(Math.random() * pokemonList.length)];
            var pokemon = createPokemon(name);
            var exists = false;
            for (let j = 0; j < i; j++)
                exists = exists || team[j].name === pokemon.name;
            while (exists || !pokemon.unlocked) {
                pokemon = createPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
                exists = false;
                for (let j = 0; j < i; j++)
                    exists = exists || team[j].name === pokemon.name;
            }
            adjustBST(pokemon, 600, false);
            team[i] = pokemon;
        }
    }

    mapSelection();
}






/* ------------------------------------------------------ */
/* ------------------- Path selection ------------------- */
/* ------------------------------------------------------ */

var types = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"]
var typeColors = ["#BCDE76", "#A8A3B1", "#5FAEF5", "#F5DB91", "#EFA5EA", "#DC7896", "#FF9D55", "#9CB3E2", "#8B9BC9", "#8DCE89", "#E29972", "#91D9CE", "#BABFC5", "#C093D7", "#FC989D", "#CDC19C", "#9FBECA", "#87B3E2"]

function mapSelection() {
    clearBody();
    fadeInTransition();
    gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/crossroads.mp3";
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

    var information = document.createElement('div');
    information.className = "path-information";
    document.body.appendChild(information);
    var balanceName = document.createElement('div');
    balanceName.innerHTML = "Balance:";
    balanceName.style.textAlign = "right";
    information.appendChild(balanceName);
    var balanceVal = document.createElement('div');
    balanceVal.innerHTML = String.fromCharCode(08381) + money;
    information.appendChild(balanceVal);

    var information2 = document.createElement('div');
    information2.className = "path-information2";
    document.body.appendChild(information2);
    for (let p of team) {
        var name = document.createElement('div');
        name.innerHTML = p.name + ":";
        name.style.textAlign = "right";
        information2.appendChild(name);
        var hp = document.createElement('div');
        hp.innerHTML = p.currenthp == 0 ? "fainted" : p.currenthp + "/" + p.maxhp;
        if (p.currenthp <= .2 * p.maxhp)
            hp.style.color = "red";
        else if (p.currenthp <= .5 * p.maxhp)
            hp.style.color = "yellow";
        information2.appendChild(hp);
    }
    
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
        image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/boss.png';
        title.innerHTML = "boss";
        cell.appendChild(image);
        cell.appendChild(title);
        cell.className = "team-selector-element";
        encounter = "boss";

        cell.onclick = function () {
            fadeOutTransition(1);
            setTimeout(() => { startEncounter(encounter) }, 1000);
            if (music)
                playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
        }
        grid.appendChild(cell);
    } else if (area == 9) {
        grid.className = "scripted-encounter";
        cell = document.createElement('div');
        image = new Image();
        image.className = 'pixel-sprite';
        title = document.createElement('div');
        image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/pokemon_center.png';
        title.innerHTML = "pokémon center";
        cell.appendChild(image);
        cell.appendChild(title);
        cell.className = "team-selector-element";
        encounter = "pokemon_center";

        cell.onclick = function () {
            fadeOutTransition(1);
            setTimeout(() => { startEncounter(encounter) }, 1000);
            if (music)
                playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
        }
        grid.appendChild(cell);
    } else {
        grid.className = "encounter-selector";
        while (grid.childNodes.length < 2 || grid.childNodes[0].encounter === grid.childNodes[1].encounter) {
            if (grid.childNodes.length == 2)
                grid.removeChild(grid.children[1]);

            var cell = document.createElement('div');
            var image = new Image();
            image.className = 'path-icon';
            var title = document.createElement('div');
            cell.appendChild(image);
            cell.appendChild(title);
            cell.className = "team-selector-element";
            if ((Math.random() < pokemonCenterChance && pokemonCenterChance > .15) || guaranteedPokemonCenter) {
                guaranteedPokemonCenter = false;
                pokemonCenterChance = .15;
                image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/pokemon_center.png';
                title.innerHTML = "pokémon center";
                encounter = "pokemon_center";
            } else if ((Math.random() < pokemartChance && pokemartChance > .15) || guaranteedPokemart) {
                guaranteedPokemart = false;
                pokemartChance = .15;
                image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/pokemart.png';
                title.innerHTML = "pokémart";
                encounter = "pokemart";
            } else if (Math.random() < eventChance) {
                eventChance = Math.min(eventChance, .15);
                image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/special.png';
                image.style.filter = "invert()";
                title.innerHTML = "special";
                encounter = "event";
            } else {
                type = types[Math.floor(Math.random() * 18)];
                image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/map_icons/' + type + '.png';
                title.innerHTML = type + " type battle";
                encounter = type;
            }
            cell.encounter = encounter;
            cell.onclick = function () {
                fadeOutTransition(1);
                setTimeout(() => { startEncounter(this.encounter) }, 1000);
                if (music)
                    playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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

opponentList = ["venusaur", "charizard", "blastoise", "pikachu", "garchomp", "cinderace", "lucario", "volcarona", "eevee", "gardevoir", "dragonite", "ferrothorn", "blissey", "sableye", "scizor", "aegislash", "meowth", "metagross", "weavile", "zeraora", "omanyte", "tyranitar", "gyarados", "mew", "urshifu", "gengar", "shuckle", "mimikyu", "mamoswine", "darmanitan", "rotom", "kommo-o", "whimsicott", "nidoking", "ninetales_alola"];
bossList = ["arceus", "heatran", "mewtwo", "hoopa", "groudon", "kyogre", "rayquaza", "giratina", "eternatus", "regigigas", "diancie"];
eventPokemonList = ["unown", "shedinja", "bidoof", "spiritomb"];

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
    } else if (encounter === "event") {
        eventEncounter();
    } else {
        battleEncounter(encounter);
    }
}

function battleEncounter(encounter, fixedPokemon) {
    pokemonCenterChance += .05;
    pokemartChance += .05;
    eventChance += .08;

    opponent = createOpponent(encounter, fixedPokemon);
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

    clearBody();
    fadeInTransition();

    var backgrounds = [["https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/cave3.png", ["ground", "rock", "steel", "ghost", "dark"]],
        ["https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/forest.png", ["grass", "bug", "poison", "fairy"]],
        ["https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/beach2.png", ["water", "ice", "dragon", "flying"]],
        ["https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/battle_backgrounds/plains.png", ["normal", "fire", "electric", "psychic", "fighting"]]];
    var background;
    for (let bg of backgrounds)
            if (contains(bg[1], opponent.types[0]))
                background = bg[0];

    gArea = new gameArea(background, () => { });
    gArea.start();

    if (area < 10)
        ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/battle.mp3";
    else
        ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/boss.mp3";
    if (music)
        playMusic(ambientMusic, true);

    pLeftView = document.createElement('div');
    pLeftView.className = "pokemon-displayer-left";
    pLeftView.id = "pLeftView";
    document.body.appendChild(pLeftView);
    leftHeader = document.createElement('div');
    leftHeader.id = "leftHeader";
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
    rightHeader.id = "rightHeader";
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
    pRightView.title = opponent.name + "\nTypes: ";
    for (let type of opponent.types) {
        var t = type.charAt(0).toUpperCase() + type.slice(1)
        pRightView.title += t + " ";
    }
    pRightView.title += "\nTalent: " + opponent.talent + "\n" + opponent.talentDesc;

    resizeSprites(true, true);

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
    discardIcon.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/discard.png';
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
    deckIcon.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/deck.png';
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
    energyIcon.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/energy.png';
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
    switchHeader1.id = "switchHeader1";
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
    switchHeader2.id = "switchHeader2";
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
        pImage.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
        pImage.className = "item-pokemon-sprite";
        itemSubsection.appendChild(pImage);

        for (let i of p.items) {
            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            itemSubsection.appendChild(wrapper);

            var pImage = new Image();
            pImage.src = i.img;
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
        initItems(p);
    }
    initDeck(opponent);
    initItems(opponent);

    startTurn();

    switch1.title = getMoveDescription(team[switchInd[0]]);
    switch2.title = getMoveDescription(team[switchInd[1]]);

    for (let p of team) {
        colorHeader(p);
    }
    colorHeader(opponent);

    if (music) {
        setTimeout(() => { playMusic(team[activePokemon].cry, false); }, 1000);
        setTimeout(() => { playMusic(opponent.cry, false) }, 2500);
    }

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
                    type.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/' + move.cat + '.webp'
                cat.className = "category-icon";
                bottom.appendChild(cat);
            }
            new moveCard(move);
        }
    }

    refreshIconCounts();
}

function colorHeader(p) {
    var header;
    if (p === opponent)
        header = document.getElementById("rightHeader");
    else if (p === team[activePokemon])
        header = document.getElementById("leftHeader");
    else if (p === team[switchInd[0]])
        header = document.getElementById("switchHeader1");
    else
        header = document.getElementById("switchHeader2");
    var c1 = typeColors[types.findIndex(e => e === p.types[0])];
    var c2 = p.types.length > 1 ? typeColors[types.findIndex(e => e === p.types[1])] : c1;
    header.style.background = c1;
    if (c2 !== c1)
        header.style.background = "linear-gradient(90deg, " + c1 + " 0%, " + c1 + " 40%, " + c2 + " 60%, " + c2 + " 100%)";
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
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png';
        else
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';

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
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png';
        else
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';

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
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png';
        else
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';

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
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png';
        else
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';

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
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/buff.png';
        else
            image.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';

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

        if (team[activePokemon].currenthp > 0)
            document.getElementById("leftSprite").className += " blink-transform2";
        setTimeout(() => {
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

            switchCastform(team[activePokemon]);
            resizeSprites(true, false);
            if (music)
                setTimeout(() => { playMusic(team[activePokemon].cry, false); }, 250);

            colorHeader(pA);
            colorHeader(pS);
            document.getElementById("leftSprite").classList.remove("blink-transform2");
            document.getElementById("leftSprite").className += " unblink-transform2";
        }, 300);
        setTimeout(() => {
            document.getElementById("leftSprite").classList.remove("unblink-transform2");
        }, 600);
    } else if (switchesLeft == 0) {
        var preview = document.getElementById("movePreview");
        preview.className = "preview-on";
        preview.innerHTML = "No switches left!";
    } else if (isTrapped(team[activePokemon])) {
        var preview = document.getElementById("movePreview");
        preview.className = "preview-on";
        preview.innerHTML = team[activePokemon].name + " is trapped!";
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
        if (move.name === "Hidden Power")
            move.type = types[Math.floor(Math.random() * types.length)];
        p.draw.push(move);
    }
    p.hand = [];
    p.discard = [];
    shuffle(p.draw);
}

function initItems(p) {
    for (let i of p.items) {
        if (i.init != undefined) {
            i.effect(p);
        }
    }
}

function copyMove(m) {
    var move = JSON.parse(JSON.stringify(m));
    if (m.effect != undefined)
        move.effect = m.effect.bind(move);
    if (m.postEffect != undefined)
        move.postEffect = m.postEffect.bind(move);
    if (m.preEffect != undefined)
        move.preEffect = m.preEffect.bind(move);
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
            if (!hasEverstone(p)) {
                p.discard = p.discard.concat(p.hand);
                p.hand = [];
            }
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
                if (contains(team, p))
                    drawnCards++;
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
        if (player && move.recoil != undefined && move.recoil > 0)
            recoilMoves++;

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
            desc.innerHTML += team[activePokemon].name + " can't use " + move.name + " after the taunt!<br />";
        } else if (!player && isTaunted(opponent) && move.cat === "status") {
            cancelled = true;
            desc.innerHTML += opponent.name + " can't use " + move.name + " after the taunt!<br />";
        }

        //move pre effects
        if (move.preEffect != undefined) {
            if (player)
                move.preEffect(move, team[activePokemon], opponent);
            else
                move.preEffect(move, opponent, team[activePokemon]);
        }

        //protection break
        if (move.noBlock != undefined) {
            removeEffect(player ? opponent : team[activePokemon], "Protection");
            removeEffect(player ? opponent : team[activePokemon], "King's Protection");
            drawEffects(!player);
        }

        var pD = player ? opponent : team[activePokemon];
        //bulletproof
        var name = move.name.toLowerCase();
        if ((name.includes("ball") || name.includes("focus blast") || name.includes("bullet seed") || name.includes("bomb") || name.includes("aura sphere") || name.includes("zap cannon")) && (pD.talent === "Bulletproof")) {
            cancelled = true;
            message = "bulletproof";
            desc.innerHTML += pD.name + "'s Bulletproof activated!<br />";
        }

        //wonder guard
        if (pD.talent === "Wonder guard" && effectiveMultiplier(move, pD) <= 1 && move.cat !== "status") {
            cancelled = true;
            message = "wonder guard";
            desc.innerHTML += pD.name + "'s Wonder guard activated!<br />";
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
                if (move.effect != undefined)
                    move.effect(move, team[activePokemon], target);
                if (team[activePokemon].boost != undefined)
                    boostMul *= team[activePokemon].boost(move);
            } else if (!player && (move.cat === "status" || effectiveMultiplier(move, team[activePokemon]) > 0)) {
                if (move.effect != undefined)
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
                    desc.innerHTML += "It's a critical hit!<br />";
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

        refreshIconCounts();
    } else
        document.getElementById("movePreview").className = "preview-off";
}

function dealDamage(damage, p, move) {
    if (p.talent === "Wonder guard" && damage > 1)
        damage = 1;
    if (p.currenthp > 0 && (p.currenthp == 1 || p.talent !== "Sturdy"))
        p.currenthp = Math.min(Math.max(0, Math.floor(p.currenthp - damage)), p.maxhp);
    else if (p.currenthp > 0)
        p.currenthp = Math.min(Math.max(1, Math.floor(p.currenthp - damage)), p.maxhp);
    refreshHealthBar(true);
    refreshHealthBar(false);

    moveAnimation(move, damage, p);
    if (music && move != undefined && damage > 0) {
        if (effectiveMultiplier(move, p) > 1)
            playMusic("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/super_effective_hit.mp3", false);
        else
            playMusic("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/hit.mp3", false);
    }

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

    checkKO();
}

function checkKO() {
    if (team[activePokemon].currenthp == 0) {
        leftSprite.className += " fainted";
        if (music)
            setTimeout(() => { playMusic(team[activePokemon].cry, false); }, 750);
        var gameO = true;
        for (let p of team) {
            gameO = gameO && p.currenthp == 0;
        }
        if (gameO && gameOverTimeout == -1) {
            gameOverTimeout = setTimeout(() => {
                setTimeout(gameOver, 1000);
                fadeOutTransition(1);
            }, 3000);
            if (document.body.contains(battleFilter))
                document.body.removeChild(battleFilter);
        }
        flawless = false;
    }
    if (opponent.currenthp == 0) {
        rightSprite.className += " fainted";
        if (music)
            setTimeout(() => { playMusic(opponent.cry, false); }, 750);
        for (let p of team) {
            if (p.endBattle != undefined)
                p.endBattle();
        }
        if (rewardTimeout == -1) {
            defeatedPokemon++;
            if (area == 10 && turn <= 3)
                fastBoss++;
            if (area == 10)
                bossesDefeated++;
            for (let p of team) {
                if (p.currenthp == 1) {
                    survive1hp++;
                }
            }
            if (flawlessBattle)
                flawlessKO++;

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
    if (move.exhaust == undefined && i >= 0)
        p.discard.push(p.hand[i]);
    p.hand.splice(i, 1);
    if (player)
        drawHand();
}

function endTurn() {
    if ((!player || team[activePokemon].currenthp > 0) && opponent.currenthp > 0) {
        runEffects();
        if (player) {
            for (let p of team) {
                for (let i of p.items) {
                    if (i.turn_end != undefined)
                        i.effect(p);
                }
            }
            if (team[activePokemon].endTurn != undefined)
                team[activePokemon].endTurn(opponent);
        } else {
            for (let i of opponent.items) {
                if (i.turn_end != undefined)
                    i.effect(opponent);
            }
            if (opponent.endTurn != undefined)
                opponent.endTurn(team[activePokemon]);
        }
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
        switchCastform(team[activePokemon]);
        switchCastform(opponent);
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
        setTimeout(aiActions, 2000 - 1200 * fastBattle);
    } else {
        if (team[activePokemon].currenthp == 0)
            desc.innerHTML += team[activePokemon].name + ' fainted!<br />Choose a new Pokémon to send out.<br />';
        else
            desc.className = "preview-off";
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

function createOpponent(encounter, fixedOpponent) {
    var opponent;

    if (fixedOpponent == undefined)
        if (area < 10) {
            while (opponent == undefined || !contains(opponent.types, encounter)) {
                opponent = createPokemon(opponentList[Math.floor(Math.random() * opponentList.length)]);
            }
        } else {
            opponent = createPokemon(bossList[Math.floor(Math.random() * bossList.length)]);
        }
    else
        opponent = createPokemon(fixedOpponent);

    adjustBST(opponent, 400 + 10 * area + 100 * world + 100 * (encounter === "boss"), (encounter === "boss"));
    if (opponent.talent === "Wonder guard") {
        opponent.maxhp = 10;
        opponent.currenthp = opponent.maxhp;
    }

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

    fadeOutTransition(1);
    if (team[0].currenthp == 0 && team[1].currenthp == 0 && team[2].currenthp == 0) {
        setTimeout(gameOver, 1000);
    } else {
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
        setTimeout(mapSelection, 1000);
    }
}






/* ------------------------------------------------------- */
/* ----------------------- Victory ----------------------- */
/* ------------------------------------------------------- */

function victoryScreen() {
    clearBody();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/run_complete.mp3";
    if (music)
        playMusic(ambientMusic, true);
    fadeInTransition();
    var gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Victory!";

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "Play again";
    replay.onclick = () => {
        fadeOutTransition(2);
        setTimeout(drawTeamSelection, 2000);
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }

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
    for (let p of team) {
        for (let i of p.items) {
            if (i.name === "Helix Fossil")
                helixQuest++;
        }
    }
    saveProgress();
}






/* ------------------------------------------------------ */
/* ------------------ Reward selection ------------------ */
/* ------------------------------------------------------ */

function rewardScreen() {
    stopMusic();
    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/victory.mp3";
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
            sprite1.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
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
                    type.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/' + move.cat + '.webp'
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
                if (music)
                    playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                if (Math.random() < extraLoot || tuto || area == 10) {
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
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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
            sprite.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
            sprite.className = "reward-sprite";
            this.reward1.appendChild(sprite);

            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            this.reward1.appendChild(wrapper);

            var item = getFromItemPool(i == ind ? encounterType : undefined);
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
                if (music)
                    playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                if (this.item.pickup != undefined)
                    this.item.effect(this.p);
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
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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
        while (item == undefined || item.area !== t)
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
    pokemonCenterChance = 0;
    pokemartChance += .05;
    eventChance += .08;

    clearBody();
    fadeInTransition();
    gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/pokemon_center.mp3";
    if (music) {
        playMusic(ambientMusic, true);
        playMusic("https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/healer.mp3", false);
    }

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Pokémon Center";

    var progress = document.createElement('div');
    progress.className = "centered-subtitle";
    progress.innerHTML = "Your Pokémon have been healed";

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "continue";
    replay.onclick = () => {
        nextEncounter();
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }

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
    pokemonCenterChance += .05;
    pokemartChance = 0;
    eventChance += .08;

    clearBody();
    fadeInTransition();
    gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/pokemart.mp3";
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
            sprite1.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
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
                    type.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/' + move.type + '.webp'
                type.className = "type-icon";
                bottom.appendChild(type);
                var cat = new Image();
                cat.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/' + move.cat + '.webp'
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
                    if (music)
                        playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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
            sprite1.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
            sprite1.className = "reward-sprite";
            this.reward1.appendChild(sprite1);

            var wrapper = document.createElement('div');
            wrapper.className = "wrapper";
            this.reward1.appendChild(wrapper);

            var t = Math.random() < .3 ? types[Math.floor(Math.random() * types.length)] : undefined;
            var item = getFromItemPool(t);
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
                    if (music)
                        playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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
    deleteB.onclick = () => {
        drawRemoveCard();
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }
    grid.appendChild(deleteB);

    var wrapper = document.createElement('div');
    wrapper.className = "price-tag";
    deleteB.appendChild(wrapper);
    priceTag = document.createElement('div');
    priceTag.innerHTML = String.fromCharCode(08381) + removePrice;
    priceTag.id = "removePriceTag";
    wrapper.appendChild(priceTag);

    var deleteImage = new Image();
    deleteImage.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/remove.png';
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
    continueB.onclick = () => {
        nextEncounter();
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }
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
        var moves = p.moves2 == undefined ? p.moves : p.moves2.concat(p.moves);
        for (let move of moves) {
            function makeReward(p, move1) {
                this.reward1 = document.createElement('div');
                this.reward1.className = "reward";
                var sprite1 = new Image();
                sprite1.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
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
                        type.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/' + move.type + '.webp'
                    type.className = "type-icon";
                    bottom.appendChild(type);
                    var cat = new Image();
                    cat.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/' + move.cat + '.webp'
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
                        if (music)
                            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
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
    continueB.onclick = () => {
        hideCardRemove();
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }
    grid.appendChild(continueB);
}

function hideCardRemove() {
    document.getElementById('filter').remove();
}






/* ------------------------------------------------------- */
/* ---------------------- Game over ---------------------- */
/* ------------------------------------------------------- */

function gameOver() {
    clearBody();
    fadeInTransition();
    var gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    ambientMusic = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/musics/game_over.mp3";
    if (music)
        playMusic(ambientMusic, true);

    var title = document.createElement('div');
    title.className = "centered-title";
    title.innerHTML = "Game Over";

    var progress = document.createElement('div');
    progress.className = "centered-subtitle";
    progress.innerHTML = "Defeat on world " + world + " - area " + area;

    var replay = document.createElement('div');
    replay.className = "centered-subtitle replay";
    replay.innerHTML = "Try again";
    replay.onclick = () => {
        fadeOutTransition(2);
        setTimeout(drawTeamSelection, 2000);
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
    }

    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    grid.appendChild(title);
    grid.appendChild(progress);
    grid.appendChild(replay);
    document.body.appendChild(grid);

    if (area == 1 && world == 1)
        area1loss++;

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
        case "darmanitan":
            return new Darmanitan();
        case "rotom":
            return new Rotom();
        case "castform":
            return new Castform();
        case "kommo-o":
            return new KommoO();
        case "nidoking":
            return new Nidoking(true);
        case "nidoqueen":
            return new Nidoking(false);
        case "whimsicott":
            return new Whimsicott();
        case "ninetales_alola":
            return new AlolanNinetales();
        case "unown":
            return new Unown();
        case "shedinja":
            return new Shedinja();
        case "bidoof":
            return new Bidoof();
        case "spiritomb":
            return new Spiritomb();
        default:
            return new MissingNo();
    }
}

function MissingNo() {
    this.name = "MissingNo.";
    this.id = "missing_no"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/missingno.png';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/missingno.png';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
}

function Venusaur() {
    this.name = "Venusaur";
    this.id = "venusaur"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/venusaur.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/venusaur.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/venusaur.ogg"
}

function Charizard() {
    this.name = "Charizard";
    this.id = "charizard"
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
    this.moves = [createMove("ember"), createMove("heat_wave"), createMove("air_cutter"), createMove("dragon_pulse"), createMove("roost"), createMove("sunny_day")];
    this.movepool = ["ember", "wing_attack", "flamethrower", "ancient_power", "crunch", "double_edge", "outrage", "roost", "sunny_day", "solar_beam", "swords_dance", "weather_ball", "air_cutter", "air_slash", "blast_burn", "breaking_swipe", "brick_break", "defog", "dragon_claw", "dragon_dance", "dragon_pulse", "dual_wingbeat", "fire_blast", "fire_spin", "flame_charge", "flare_blitz", "focus_blast", "heat_wave", "hurricane", "inferno", "overheat", "scale_shot", "scorching_sands", "shadow_claw", "will_o_wisp"];
    this.opponentMoves =
        [[createMove("ember"), createMove("blast_burn"), createMove("flamethrower"), createMove("sunny_day"), createMove("solar_beam"), createMove("weather_ball"), createMove("air_cutter"), createMove("dragon_pulse"), createMove("heat_wave"), createMove("hurricane")],
        [createMove("outrage"), createMove("dragon_claw"), createMove("breaking_swipe"), createMove("swords_dance"), createMove("crunch"), createMove("wing_attack"), createMove("wing_attack"), createMove("dual_wingbeat"), createMove("flare_blitz"), createMove("flame_charge")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/charizard.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/charizard.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/charizard.ogg"
}

function Blastoise() {
    this.name = "Blastoise";
    this.id = "blastoise"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/blastoise.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/blastoise.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/blastoise.ogg"
}

function Pikachu() {
    this.name = "Pikachu";
    this.id = "pikachu"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/pikachu.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/pikachu.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/pikachu.ogg"
}

function Garchomp() {
    this.name = "Garchomp";
    this.id = "garchomp"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/garchomp.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/garchomp.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/garchomp.ogg"
}

function Cinderace() {
    this.name = "Cinderace";
    this.id = "cinderace"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/cinderace.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/cinderace.gif';
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
        colorHeader(this);
        removeEffect(this, "Type changed");
        applyEffect("type_changed", 1, this, move.type);
        return .9;
    }
    this.unlocked = defeatedPokemon >= 50;
    this.hint = "Defeat 50 Pokémon\n" + defeatedPokemon + "/50";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/cinderace.ogg"
}

function Lucario() {
    this.name = "Lucario";
    this.id = "lucario"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/lucario.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/lucario.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/lucario.ogg"
}

function Volcarona() {
    this.name = "Volcarona";
    this.id = "volcarona"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/volcarona.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/volcarona.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/volcarona.ogg"
}

function Eevee() {
    this.name = "Eevee";
    this.id = "eevee"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/eevee.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/eevee.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/eevee.ogg"
}

function Gardevoir() {
    this.name = "Gardevoir";
    this.id = "gardevoir"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/gardevoir.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/gardevoir.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/gardevoir.ogg"
}

function Dragonite() {
    this.name = "Dragonite";
    this.id = "dragonite"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/dragonite.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/dragonite.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/dragonite.ogg"
}

function Ferrothorn() {
    this.name = "Ferrothorn";
    this.id = "ferrothorn"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/ferrothorn.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/ferrothorn.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/ferrothorn.ogg"
}

function Blissey() {
    this.name = "Blissey";
    this.id = "blissey"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/blissey.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/blissey.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/blissey.ogg"
}

function Sableye() {
    this.name = "Sableye";
    this.id = "sableye"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/sableye.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/sableye.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/sableye.ogg"
}

function Scizor() {
    this.name = "Scizor";
    this.id = "scizor"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/scizor.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/scizor.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/scizor.ogg"
}

function Aegislash() {
    this.name = "Aegislash";
    this.id = "aegislash"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/aegislash.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/aegislash.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/aegislash.ogg"
}

function switchAegislash(p, shield) {
    if (p.name === "Aegislash") {
        if (shield && p.stance !== "shield") {
            var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
            img.className += " blink-transform1";
            setTimeout(() => {
                var temp = p.attack;
                p.attack = p.defense;
                p.defense = temp;
                temp = p.spattack;
                p.spattack = p.spdefense;
                p.spdefense = temp;
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/aegislash.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/aegislash.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.stance = "shield";
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                img.classList.remove("blink-transform1");
                img.className += " unblink-transform1";
            }, 100);
            setTimeout(() => {
                img.classList.remove("unblink-transform1");
            }, 200);
        } else if (!shield && p.stance === "shield") {
            var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
            img.className += " blink-transform1";
            setTimeout(() => {
                var temp = p.attack;
                p.attack = p.defense;
                p.defense = temp;
                temp = p.spattack;
                p.spattack = p.spdefense;
                p.spdefense = temp;
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/aegislash_blade.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/aegislash_blade.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.stance = "blade";
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                img.classList.remove("blink-transform1");
                img.className += " unblink-transform1";
            }, 100);
            setTimeout(() => {
                img.classList.remove("unblink-transform1");
            }, 200);
        }
    }
}

function Meowth() {
    this.name = "Meowth";
    this.id = "meowth"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/meowth.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/meowth.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/meowth.ogg"
}

function Metagross() {
    this.name = "Metagross";
    this.id = "metagross"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/metagross.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/metagross.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Clear body"
    this.talentDesc = "Lowered stats are restored at the end of each turn."
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/metagross.ogg"
}

function Weavile() {
    this.name = "Weavile";
    this.id = "weavile"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/weavile.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/weavile.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/weavile.ogg"
}

function Zeraora() {
    this.name = "Zeraora";
    this.id = "zeraora"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/zeraora.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/zeraora.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/zeraora.ogg"
}

function Omanyte() {
    this.name = "Omanyte";
    this.id = "omanyte"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/omanyte.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/omanyte.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/omanyte.ogg"
}

function Tyranitar() {
    this.name = "Tyranitar";
    this.id = "tyranitar"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/tyranitar.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/tyranitar.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/tyranitar.ogg"
}

function Gyarados() {
    this.name = "Gyarados";
    this.id = "gyarados"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/gyarados.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/gyarados.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/gyarados.ogg"
}

function Ditto() {
    this.name = "Ditto";
    this.id = "ditto"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/ditto.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/ditto.gif';
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
        n = opponent.hp + opponent.attack + opponent.defense + opponent.spattack + opponent.spdefense + opponent.speed;
        ratio = 500 / n;
        this.attack = Math.round(opponent.attack * ratio);
        this.defense = Math.round(opponent.defense * ratio);
        this.spattack = Math.round(opponent.spattack * ratio);
        this.spdefense = Math.round(opponent.spdefense * ratio);
        this.speed = Math.round(opponent.speed * ratio);
        this.imgb = opponent.imgb;
        this.moves = [].concat(opponent.moves);
        if (this === team[activePokemon])
            document.getElementById("leftSprite").src = this.imgb;
        transforms++;
    }
    this.endBattle = function () {
        this.moves = [createMove("struggle")];
        this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/ditto.gif';
    }
    this.unlocked = unlockedPokemon >= 10;
    this.hint = "???";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/ditto.ogg"
}

function Mew() {
    this.name = "Mew";
    this.id = "mew"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mew.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mew.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/mew.ogg"
}

function Urshifu() {
    this.name = "Urshifu";
    this.id = "urshifu"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/urshifu.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/urshifu.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Unseen Fist";
    this.talentDesc = "This Pokémon's attacks ignore protections."
    this.unlocked = flawlessKO >= 1;
    this.hint = "???";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/urshifu.ogg"
}

function Gengar() {
    this.name = "Gengar";
    this.id = "gengar"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/gengar.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/gengar.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/gengar.ogg"
}

function Shuckle() {
    this.name = "Shuckle";
    this.id = "shuckle"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/shuckle.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/shuckle.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Sturdy"
    this.talentDesc = "This Pokémon cannot be knocked out unless it is at 1HP already."
    this.unlocked = maxRound >= 20;
    this.hint = "???";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/shuckle.ogg"
}

function Mimikyu() {
    this.name = "Mimikyu";
    this.id = "mimikyu"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mimikyu.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mimikyu.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/mimikyu.ogg"
}

function switchMimikyu(p, disguise) {
    if (p.name === "Mimikyu") {
        if (disguise && !p.disguise) {
            var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
            img.className += " blink-transform1";
            setTimeout(() => {
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mimikyu.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mimikyu.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.disguise = true;
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                img.classList.remove("blink-transform1");
                img.className += " unblink-transform1";
            }, 100);
            setTimeout(() => {
                img.classList.remove("unblink-transform1");
            }, 200);
        } else if (!disguise && p.disguise) {
            var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
            img.className += " blink-transform1";
            setTimeout(() => {
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mimikyu_busted.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mimikyu_busted.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.disguise = false;
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                img.classList.remove("blink-transform1");
                img.className += " unblink-transform1";
            }, 100);
            setTimeout(() => {
                img.classList.remove("unblink-transform1");
            }, 200);
        }
    }
}

function Mamoswine() {
    this.name = "Mamoswine";
    this.id = "mamoswine"
    this.description = "A powerful physical attacker with high damage, expensive moves, benefitting from the hail."
    this.hp = 110;
    this.attack = 130;
    this.defense = 80;
    this.spattack = 70;
    this.spdefense = 60;
    this.speed = 80;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ice", "ground"];
    this.moves = [createMove("icicle_crash"), createMove("ice_shard"), createMove("earthquake"), createMove("ancient_power"), createMove("bulldoze"), createMove("heavy_slam")];
    this.movepool = ["ice_shard", "earthquake", "ancient_power", "amnesia", "avalanche", "bite", "body_press", "bulldoze", "curse", "detect", "dig", "double_edge", "facade", "flail", "giga_impact", "hail", "headbutt", "heavy_slam", "ice_fang", "icicle_crash", "icicle_spear", "iron_head", "rock_blast", "rock_slide", "rock_tomb", "sandstorm", "sand_tomb", "stealth_rock", "stomping_tantrum", "stone_edge", "superpower", "thrash", "high_horsepower"];
    this.opponentMoves =
        [[createMove("hail"), createMove("ice_shard"), createMove("avalanche"), createMove("icicle_crash"), createMove("icicle_spear"), createMove("earthquake"), createMove("giga_impact"), createMove("double_edge"), createMove("bulldoze"), createMove("body_press")],
        [createMove("sandstorm"), createMove("earthquake"), createMove("bulldoze"), createMove("sand_tomb"), createMove("stomping_tantrum"), createMove("high_horsepower"), createMove("stone_edge"), createMove("rock_blast"), createMove("rock_slide"), createMove("icicle_crash")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mamoswine.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mamoswine.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/mamoswine.ogg"
}

function Darmanitan() {
    this.name = "Darmanitan";
    this.id = "darmanitan"
    this.description = "A frail yet mighty attacker that can switch between physical and special sets."
    this.hp = 105;
    this.attack = 140;
    this.defense = 55;
    this.spattack = 30;
    this.spdefense = 55;
    this.speed = 95;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["fire"];
    this.moves = [createMove("flare_blitz"), createMove("fire_fang"), createMove("flame_charge"), createMove("belly_drum"), createMove("bite"), createMove("rock_tomb")];
    this.moves2 = [createMove("ember"), createMove("fire_blast"), createMove("fire_spin"), createMove("future_sight"), createMove("psychic"), createMove("grass_knot")];
    this.movepool = ["bite", "body_press", "body_slam", "earthquake", "fire_fang", "fire_punch", "flame_charge", "flare_blitz", "focus_punch", "giga_impact", "hammer_arm", "lash_out", "payback", "rock_tomb", "stone_edge", "superpower", "thrash", "zen_headbutt", "u_turn", "belly_drum"];
    this.movepool2 = ["ember", "fire_blast", "fire_spin", "flamethrower", "focus_blast", "future_sight", "grass_knot", "heat_wave", "mystical_fire", "overheat", "psychic", "rest", "solar_beam", "uproar", "hidden_power", "hyper_beam", "burning_jealousy", "extrasensory"];
    this.opponentMoves = [[createMove("flare_blitz"), createMove("fire_fang"), createMove("flame_charge"), createMove("bite"), createMove("rock_tomb"), createMove("hammer_arm"), createMove("earthquake"), createMove("stone_edge"), createMove("zen_headbutt"), createMove("body_slam")]];
    this.opponentMoves2 = [[createMove("ember"), createMove("fire_blast"), createMove("future_sight"), createMove("psychic"), createMove("extrasensory"), createMove("rest"), createMove("solar_beam"), createMove("burning_jealousy"), createMove("hidden_power"), createMove("focus_blast")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/darmanitan.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/darmanitan.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Zen mode";
    this.talentDesc = "Switches to zen mode when under 50% HP.";
    this.zen = false;
    this.init = function () {
        if (this === opponent) {
            for (let i = 0; i <= Math.floor(Math.random() * 3); i++) {
                this.opponentMoves2.splice(Math.floor(Math.random() * this.moves.length), 1);
            }
            while (this.opponentMoves2.length < 10) {
                this.opponentMoves2.push(createMove(this.movepool2[Math.floor(Math.random() * this.movepool2.length)]));
            }
            this.moves2 = this.opponentMoves2;
        }
        if (this.currenthp <= .5 * this.maxhp && !this.zen)
            switchDarmanitan(this, true);
        else if (this.currenthp > .5 * this.maxhp && this.zen)
            switchDarmanitan(this, false);
    }
    this.revenge = function (move, pD) {
        if (this.currenthp <= .5 * this.maxhp && !this.zen)
            switchDarmanitan(this, true);
        else if (this.currenthp > .5 * this.maxhp && this.zen)
            switchDarmanitan(this, false);
    }
    this.unlocked = recoilMoves >= 30;
    this.hint = "Use 30 moves with recoil\n" + recoilMoves + "/30";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/darmanitan.ogg"
}

function switchDarmanitan(p, zen) {
    if (p.name === "Darmanitan") {
        var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
        img.className += " blink-transform1";
        setTimeout(() => {
            if (zen && !p.zen) {
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/darmanitan_zen.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/darmanitan_zen.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.types = ["fire", "psychic"];
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                p.attack *= 3 / 14;
                p.defense *= 21 / 11;
                p.spattack *= 14 / 3;
                p.spdefense *= 21 / 11;
                p.speed *= 11 / 19;
                p.zen = true;
            } else {
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/darmanitan.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/darmanitan.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.types = ["fire"];
                if (team[activePokemon] === p) {
                    document.getElementById("leftSprite").src = p.imgb;
                } else if (opponent === p) {
                    document.getElementById("rightSprite").src = p.imgf;
                }
                p.attack *= 14 / 3;
                p.defense *= 11 / 21;
                p.spattack *= 3 / 14;
                p.spdefense *= 11 / 21;
                p.speed *= 19 / 11;
                p.zen = false;
            }
            var temp = [].concat(p.moves);
            p.moves = [].concat(p.moves2);
            p.moves2 = temp;
            var temp = [].concat(p.movepool);
            p.movepool = [].concat(p.movepool2);
            p.movepool2 = temp;

            colorHeader(p);
            initDeck(p);
            drawMove(p, true);
            img.classList.remove("blink-transform1");
            img.className += " unblink-transform1";
        }, 100);
        setTimeout(() => {
            img.classList.remove("unblink-transform1");
        }, 200);
    }
}

function Rotom() {
    this.name = "Rotom";
    this.id = "rotom"
    this.description = "A special attacker that can exploit its adaptative typing do deal significant damage and take some hits."
    this.hp = 50;
    this.attack = 65;
    this.defense = 107;
    this.spattack = 105;
    this.spdefense = 107;
    this.speed = 86;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["electric", "ghost"];
    this.moves = [createMove("shadow_ball"), createMove("hurricane"), createMove("blizzard"), createMove("overheat"), createMove("leaf_storm"), createMove("hydro_pump"), createMove("thunderbolt"), createMove("nasty_plot")];
    this.movepool = ["hurricane", "blizzard", "overheat", "leaf_storm", "hydro_pump", "charge", "charge_beam", "confuse_ray", "defog", "dark_pulse", "disarming_voice", "discharge", "electroweb", "hex", "hidden_power", "nasty_plot", "shadow_ball", "shock_wave", "swagger", "thunder", "thunder_shock", "thunderbolt", "thunder_wave", "toxic", "volt_switch", "will_o_wisp", "electro_ball", "hyper_voice", "spite", "eerie_impulse", "ominous_wind", "signal_beam"];
    this.opponentMoves =
        [[createMove("hurricane"), createMove("hurricane"), createMove("hurricane"), createMove("thunderbolt"), createMove("thunder"), createMove("shadow_ball"), createMove("hex"), createMove("thunder_wave"), createMove("ominous_wind"), createMove("shock_wave")],
        [createMove("blizzard"), createMove("blizzard"), createMove("blizzard"), createMove("thunderbolt"), createMove("thunder"), createMove("shadow_ball"), createMove("hex"), createMove("thunder_wave"), createMove("ominous_wind"), createMove("shock_wave")],
        [createMove("overheat"), createMove("overheat"), createMove("overheat"), createMove("thunderbolt"), createMove("nasty_plot"), createMove("shadow_ball"), createMove("hex"), createMove("thunder_wave"), createMove("ominous_wind"), createMove("nasty_plot")],
        [createMove("leaf_storm"), createMove("leaf_storm"), createMove("leaf_storm"), createMove("thunderbolt"), createMove("nasty_plot"), createMove("shadow_ball"), createMove("hex"), createMove("thunder_wave"), createMove("ominous_wind"), createMove("nasty_plot")],
        [createMove("hydro_pump"), createMove("hydro_pump"), createMove("hydro_pump"), createMove("thunderbolt"), createMove("thunder"), createMove("shadow_ball"), createMove("hex"), createMove("thunder_wave"), createMove("ominous_wind"), createMove("shock_wave")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Levitation"
    this.talentDesc = "Levitates above the ground, granting ground type immunity.\nSpecial: Switches to an alternate form when using certain moves."
    this.init = function () { applyEffect("levitation", 99, this); }
    this.boost = function (move) {
        switchRotom(this, move);
        return 1;
    }
    this.unlocked = bossesDefeated >= 10;
    this.hint = "Defeat 10 bosses\n" + bossesDefeated + "/10";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/rotom.ogg"
}

function switchRotom(p, move) {
    if (p.name === "Rotom" && !contains(p.types, move.type) && (move.type === "ghost" || move.type === "water" || move.type === "ice" || move.type === "fire" || move.type === "grass" || move.type === "flying")) {
        var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
        img.className += " blink-transform1";
        setTimeout(() => {
            switch (move.type) {
                case "ghost":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "ghost"];
                    break;
                case "flying":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_fan.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_fan.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "flying"];
                    break;
                case "ice":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_frost.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_frost.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "ice"];
                    break;
                case "fire":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_heat.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_heat.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "fire"];
                    break;
                case "grass":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_mow.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_mow.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "grass"];
                    break;
                case "water":
                    p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rotom_wash.gif';
                    p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rotom_wash.gif';
                    resizeSprites(p === team[activePokemon], p === opponent);
                    p.types = ["electric", "fire"];
                    break;
                default:
            }
            colorHeader(p);
            img.classList.remove("blink-transform1");
            img.className += " unblink-transform1";
        }, 100);
        setTimeout(() => {
            img.classList.remove("unblink-transform1");
        }, 200);
    }
}

function Castform() {
    this.name = "Castform";
    this.id = "castform"
    this.description = "A special attacker that can adapt to the weather to benefit from it to the fullest."
    this.hp = 70;
    this.attack = 70;
    this.defense = 70;
    this.spattack = 70;
    this.spdefense = 70;
    this.speed = 70;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [createMove("weather_ball"), createMove("weather_ball"), createMove("rain_dance"), createMove("sunny_day"), createMove("hail"), createMove("hydro_pump"), createMove("fire_blast"), createMove("blizzard")];
    this.movepool = ["amnesia", "blizzard", "avalanche", "body_slam", "clear_smog", "defog", "headbutt", "ember", "energy_ball", "facade", "fire_blast", "flamethrower", "future_sight", "hex", "hidden_power", "hurricane", "hydro_pump", "ice_beam", "icy_wind", "ominous_wind", "mimic", "scald", "shadow_ball", "toxic", "shock_wave", "solar_beam", "thunder", "thunderbolt", "water_gun", "water_pulse", "weather_ball", "hail", "rain_dance", "sunny_day", "sandstorm"];
    this.opponentMoves =
        [[createMove("weather_ball"), createMove("weather_ball"), createMove("rain_dance"), createMove("rain_dance"), createMove("hydro_pump"), createMove("thunder"), createMove("thunderbolt"), createMove("water_pulse"), createMove("hurricane"), createMove("scald")],
        [createMove("weather_ball"), createMove("weather_ball"), createMove("sunny_day"), createMove("sunny_day"), createMove("fire_blast"), createMove("ember"), createMove("flamethrower"), createMove("solar_beam"), createMove("energy_ball"), createMove("defog")],
        [createMove("weather_ball"), createMove("weather_ball"), createMove("hail"), createMove("hail"), createMove("blizzard"), createMove("ice_beam"), createMove("icy_wind"), createMove("avalanche"), createMove("blizzard"), createMove("defog")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Forecast"
    this.init = function () { switchCastform(this); };
    this.talentDesc = "Changes form depending on the current weather."
    this.unlocked = weatherChanged >= 50;
    this.hint = "Change the weather 50 times\n" + weatherChanged + "/50";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/castform.ogg"
}

function switchCastform(p) {
    if (p.name === "Castform") {
        var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
        if (!contains(p.types, "normal") && (weather == undefined || weather.name === "Air Lock" || weather.name === "Sandstorm")) {
            img.className += " blink-transform1";
            setTimeout(() => {
                p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform.gif';
                p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform.gif';
                resizeSprites(p === team[activePokemon], p === opponent);
                p.types = ["normal"];
                colorHeader(p);
                img.classList.remove("blink-transform1");
                img.className += " unblink-transform1";
            }, 100);
            setTimeout(() => {
                img.classList.remove("unblink-transform1");
            }, 200);
        } else if (weather != undefined) {
            switch (weather.name) {
                case "Sun":
                    if (!contains(p.types, "fire")) {
                        img.className += " blink-transform1";
                        setTimeout(() => {
                            p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_sunny.gif';
                            p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_sunny.gif';
                            resizeSprites(p === team[activePokemon], p === opponent);
                            p.types = ["fire"];
                            colorHeader(p);
                            img.classList.remove("blink-transform1");
                            img.className += " unblink-transform1";
                        }, 100);
                        setTimeout(() => {
                            img.classList.remove("unblink-transform1");
                        }, 200);
                    }
                    break;
                case "Rain":
                    if (!contains(p.types, "water")) {
                        img.className += " blink-transform1";
                        setTimeout(() => {
                            p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_rainy.gif';
                            p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_rainy.gif';
                            resizeSprites(p === team[activePokemon], p === opponent);
                            p.types = ["water"];
                            colorHeader(p);
                            img.classList.remove("blink-transform1");
                            img.className += " unblink-transform1";
                        }, 100);
                        setTimeout(() => {
                            img.classList.remove("unblink-transform1");
                        }, 200);
                    }
                    break;
                case "Hail":
                    if (!contains(p.types, "ice")) {
                        img.className += " blink-transform1";
                        setTimeout(() => {
                            p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/castform_snowy.gif';
                            p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/castform_snowy.gif';
                            resizeSprites(p === team[activePokemon], p === opponent);
                            p.types = ["ice"];
                            colorHeader(p);
                            img.classList.remove("blink-transform1");
                            img.className += " unblink-transform1";
                        }, 100);
                        setTimeout(() => {
                            img.classList.remove("unblink-transform1");
                        }, 200);
                    }
                    break;
                default:
            }
        }
    }
}

function KommoO() {
    this.name = "Kommo-o";
    this.id = "kommo-o"
    this.description = "A mixed attacker with good bulk that can sacrifice HP to grow stronger and play with its stat changes."
    this.hp = 75;
    this.attack = 110;
    this.defense = 125;
    this.spattack = 100;
    this.spdefense = 105;
    this.speed = 85;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["dragon", "fighting"];
    this.moves = [createMove("clangorous_soul"), createMove("clanging_scales"), createMove("boomburst"), createMove("close_combat"), createMove("dragon_claw"), createMove("drain_punch")];
    this.movepool = ["aqua_tail", "aura_sphere", "autotomize", "belly_drum", "body_press", "boomburst", "breaking_swipe", "brick_break", "bulk_up", "bulldoze", "clanging_scales", "clangorous_soul", "close_combat", "draco_meteor", "dragon_breath", "dragon_claw", "dragon_dance", "dragon_pulse", "dragon_tail", "drain_punch", "dual_chop", "earthquake", "flamethrower", "flash_cannon", "focus_blast", "focus_punch", "hyper_voice", "iron_tail", "low_kick", "outrage", "payback", "poison_jab", "reversal", "rock_slide", "scale_shot", "shadow_claw", "superpower", "x_scissor", "fire_punch", "ice_punch", "thunder_punch", "uproar", "water_pulse", "shock_wave", "echoed_voice"];
    this.opponentMoves =
        [[createMove("clangorous_soul"), createMove("clanging_scales"), createMove("clanging_scales"), createMove("boomburst"), createMove("focus_blast"), createMove("aura_sphere"), createMove("echoed_voice"), createMove("hyper_voice"), createMove("dragon_pulse"), createMove("aura_sphere")],
        [createMove("bulk_up"), createMove("dragon_dance"), createMove("close_combat"), createMove("drain_punch"), createMove("brick_break"), createMove("dragon_claw"), createMove("dragon_tail"), createMove("dual_chop"), createMove("rock_slide"), createMove("poison_jab")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/kommo-o.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/kommo-o.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Bulletproof"
    this.talentDesc = "Immunity to ballistic moves."
    this.unlocked = statRaised >= 100;
    this.hint = "Raise any stat 100 times\n" + statRaised + "/100";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/kommo-o.ogg"
}

function Nidoking(gender) {
    this.gender = gender != undefined ? gender : Math.floor(Math.random() * 2) == 0 ? true : false;
    this.name = this.gender ? "Nidoking" : "Nidoqueen";
    this.id = this.gender ? "nidoking" : "nidoqueen";
    this.description = "A mixed bulky attacker with the ability to spread poison."
    this.hp = this.gender ? 81 : 90;
    this.attack = this.gender ? 102 : 92;
    this.defense = this.gender ? 77 : 87;
    this.spattack = this.gender ? 85 : 75;
    this.spdefense = this.gender ? 75 : 85;
    this.speed = this.gender ? 85 : 76;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["poison", "ground"];
    this.moves = [createMove("drill_run"), createMove("earth_power"), createMove("toxic_spikes"), createMove("poison_jab"), createMove("toxic"), createMove("megahorn")];
    this.movepool = ["aqua_tail", "blizzard", "body_slam", "bulldoze", "curse", "dig", "double_edge", "double_kick", "drill_run", "earth_power", "earthquake", "flamethrower", "fire_punch", "giga_impact", "head_smash", "hex", "high_horsepower", "hone_claws", "ice_beam", "ice_punch", "iron_tail", "megahorn", "poison_jab", "poison_sting", "poison_tail", "rock_blast", "rock_slide", "sandstorm", "sand_tomb", "scorching_sands", "shadow_claw", "sludge_bomb", "sludge_wave", "stealth_rock", "stomping_tantrum", "stone_edge", "sucker_punch", "surf", "thunderbolt", "thunder_punch", "toxic", "toxic_spikes", "venom_drench", "venoshock"];
    this.opponentMoves =
        [[createMove("poison_jab"), createMove("toxic_spikes"), createMove("toxic"), createMove("poison_tail"), createMove("poison_sting"), createMove("venoshock"), createMove("venom_drench"), createMove("earthquake"), createMove("earth_power"), createMove("flamethrower")],
        [createMove("earthquake"), createMove("drill_run"), createMove("earth_power"), createMove("stomping_tantrum"), createMove("scorching_sands"), createMove("stealth_rock"), createMove("sandstorm"), createMove("stone_edge"), createMove("rock_slide"), createMove("ice_beam")]];
    this.imgf = this.gender ? 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/nidoking.gif' : 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/nidoqueen.gif';
    this.imgb = this.gender ? 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/nidoking.gif' : 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/nidoqueen.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Poison point"
    this.talentDesc = "Attackers making contact with this Pokémon with not very effective attacks are poisoned."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) < 1 && move.cat === "physical") applyEffect("poison", 6, pD); }
    this.unlocked = statRaised >= 100;
    this.hint = "Apply 300 poison stacks to foes\n" + poisonApplied + "/300";
    this.cry = this.gender ? "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/nidoking.ogg" : "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/nidoqueen.ogg"
}

function Whimsicott() {
    this.name = "Whimsicott";
    this.id = "whimsicott"
    this.description = "A fast utility Pokémon that can use status moves liberally to support its teammates while dealing decent damage."
    this.hp = 60;
    this.attack = 67;
    this.defense = 85;
    this.spattack = 77;
    this.spdefense = 75;
    this.speed = 116;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["grass", "fairy"];
    this.moves = [createMove("mega_drain"), createMove("giga_drain"), createMove("dazzling_gleam"), createMove("fairy_wind"), createMove("gust"), createMove("sunny_day"), createMove("leech_seed"), createMove("cotton_spore")];
    this.movepool = ["absorb", "beat_up", "charm", "cotton_guard", "cotton_spore", "dazzling_gleam", "defog", "energy_ball", "fairy_wind", "fling", "giga_drain", "grass_knot", "growth", "gust", "hurricane", "leech_seed", "mega_drain", "memento", "moonblast", "play_rough", "poison_powder", "psychic", "rest", "razor_leaf", "seed_bomb", "solar_beam", "shadow_ball", "stun_spore", "sunny_day", "swagger", "taunt", "toxic", "tickle", "u_turn", "fake_tears", "grass_whistle", "hidden_power"];
    this.opponentMoves =
        [[createMove("absorb"), createMove("mega_drain"), createMove("giga_drain"), createMove("dazzling_gleam"), createMove("solar_beam"), createMove("sunny_day"), createMove("growth"), createMove("leech_seed"), createMove("charm"), createMove("fake_tears")],
        [createMove("mega_drain"), createMove("energy_ball"), createMove("sunny_day"), createMove("dazzling_gleam"), createMove("moonblast"), createMove("fairy_wind"), createMove("grass_whistle"), createMove("stun_spore"), createMove("play_rough"), createMove("taunt")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/whimsicott.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/whimsicott.gif';
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
    this.unlocked = loweredStats >= 50;
    this.hint = "Lower the stats of foes 50 times\n" + loweredStats + "/50";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/whimsicott.ogg"
}

function AlolanNinetales() {
    this.name = "Ninetales";
    this.id = "ninetales_alola"
    this.description = "A fast special attacker that can set and exploit the hail."
    this.hp = 73;
    this.attack = 67;
    this.defense = 75;
    this.spattack = 81;
    this.spdefense = 100;
    this.speed = 109;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ice", "fairy"];
    this.moves = [createMove("aurora_beam"), createMove("blizzard"), createMove("ice_beam"), createMove("hail"), createMove("moonblast"), createMove("dazzling_gleam"), createMove("extrasensory"), createMove("calm_mind")];
    this.movepool = ["agility", "aurora_beam", "blizzard", "calm_mind", "charm", "confuse_ray", "dark_pulse", "dazzling_gleam", "extrasensory", "dream_eater", "freeze_dry", "frost_breath", "hail", "hex", "heal_bell", "hypnosis", "ice_beam", "ice_shard", "icy_wind", "moonblast", "nasty_plot", "psych_up", "rest", "stored_power", "swagger", "triple_axel", "weather_ball", "hidden_power", "hyper_beam", "spite"];
    this.opponentMoves =
        [[createMove("hail"), createMove("blizzard"), createMove("aurora_beam"), createMove("icy_wind"), createMove("ice_beam"), createMove("frost_breath"), createMove("freeze_dry"), createMove("moonblast"), createMove("extrasensory"), createMove("nasty_plot")],
        [createMove("blizzard"), createMove("frost_breath"), createMove("weather_ball"), createMove("dazzling_gleam"), createMove("moonblast"), createMove("hypnosis"), createMove("hypnosis"), createMove("dream_eater"), createMove("hex"), createMove("dark_pulse")]];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/ninetales_alola.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/ninetales_alola.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Snow warning"
    this.talentDesc = "Causes the hail to fall at the beginning of the battle."
    this.init = function () { setWeather("hail", 10); }
    this.unlocked = hailStarted >= 10;
    this.hint = "Make the hail fall 10 times\n" + hailStarted + "/10";
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/ninetales_alola.ogg"
}



function Unown() {
    this.name = "Unown";
    this.hp = 48;
    this.attack = 72;
    this.defense = 48;
    this.spattack = 72;
    this.spdefense = 48;
    this.speed = 48;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["psychic"];
    this.moves = [];
    this.opponentMoves = [[]];
    this.movepool = ["hidden_power"];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/unown.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/unown.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Levitate";
    this.talentDesc = "Levitates above the ground, granting ground type immunity."
    this.init = function () { applyEffect("levitation", 99, this); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/unown.ogg"
}

function Shedinja() {
    this.name = "Shedinja";
    this.hp = 100;
    this.attack = 90;
    this.defense = 45;
    this.spattack = 30;
    this.spdefense = 30;
    this.speed = 40;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["bug", "ghost"];
    this.moves = [];
    this.opponentMoves = [[createMove("swords_dance"), createMove("screech"), createMove("sucker_punch"), createMove("feint_attack"), createMove("x_scissor"), createMove("bug_bite"), createMove("slash"), createMove("shadow_claw"), createMove("shadow_sneak"), createMove("swagger")]];
    this.movepool = ["agility", "bug_bite", "confuse_ray", "dig", "feint_attack", "fury_cutter", "hone_claws", "metal_claw", "night_slash", "phantom_force", "shadow_claw", "shadow_sneak", "sucker_punch", "x_scissor", "will_o_wisp", "swords_dance", "swagger", "string_shot", "spite", "slash", "screech"];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/shedinja.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/shedinja.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Wonder guard";
    this.talentDesc = "This Pokémon can only be damaged by super effective damage and indirect damage. Takes at most 1 damage per hit."
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/shedinja.ogg"
}

function Bidoof() {
    this.name = "Bidoof";
    this.hp = 59;
    this.attack = 45;
    this.defense = 40;
    this.spattack = 35;
    this.spdefense = 40;
    this.speed = 31;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["normal"];
    this.moves = [];
    this.opponentMoves = [[createMove("swords_dance"), createMove("tackle"), createMove("double_edge"), createMove("super_fang"), createMove("aqua_tail"), createMove("facade"), createMove("fury_swipes"), createMove("amnesia"), createMove("skull_bash"), createMove("quick_attack")]];
    this.movepool = ["amnesia", "aqua_tail", "crunch", "dig", "curse", "double_edge", "facade", "fury_cutter", "fury_swipes", "headbutt", "iron_tail", "quick_attack", "rock_smash", "rollout", "skull_bash", "super_fang", "swords_dance", "tackle"];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/bidoof.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/bidoof.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Simple";
    this.talentDesc = "Double the stat changes received by this Pokémon."
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/bidoof.ogg"
}

function Spiritomb() {
    this.name = "Spiritomb";
    this.hp = 50;
    this.attack = 92;
    this.defense = 108;
    this.spattack = 92;
    this.spdefense = 108;
    this.speed = 35;
    this.maxhp = 0;
    this.currenthp = 0;
    this.types = ["ghost", "dark"];
    this.moves = [];
    this.opponentMoves = [[createMove("nasty_plot"), createMove("calm_mind"), createMove("dark_pulse"), createMove("dark_pulse"), createMove("shadow_ball"), createMove("shadow_ball"), createMove("hyper_beam"), createMove("feint_attack"), createMove("foul_play"), createMove("ominous_wind")]];
    this.movepool = ["calm_mind", "confuse_ray", "curse", "dark_pulse", "feint_attack", "foul_play", "hyper_beam", "nasty_plot", "ominous_wind", "psychic", "rock_tomb", "shadow_ball", "shadow_sneak", "snarl", "sucker_punch", "swagger", "taunt", "will_o_wisp"];
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/spiritomb.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/spiritomb.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/spiritomb.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/arceus.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/arceus.gif';
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
        colorHeader(this);
        removeEffect(this, "Type changed");
        applyEffect("type_changed", 1, this, this.types[0]);
    }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/arceus.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/heatran.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/heatran.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Flash fire";
    this.talentDesc = "Immunity to fire type moves.";
    this.init = function () { applyEffect("immunity", 1, this, "fire"); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/heatran.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/mewtwo.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/mewtwo.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/mewtwo.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/hoopa.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/hoopa.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Confined"
    this.talentDesc = "Breaks free after 3 turns."
    this.init = function () { applyEffect("confined", 3, this); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/hoopa.ogg"
}

function switchHoopa(p) {
    if (p.name === "Hoopa") {
        var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
        img.className += " blink-transform1";
        setTimeout(() => {
            p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/hoopa_unbound.gif';
            p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/hoopa_unbound.gif';
            resizeSprites(p === team[activePokemon], p === opponent);
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

            colorHeader(p);
            initDeck(p);
            drawMove(p, true);
            img.classList.remove("blink-transform1");
            img.className += " unblink-transform1";
        }, 100);
        setTimeout(() => {
            img.classList.remove("unblink-transform1");
        }, 200);
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/groudon.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/groudon.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Drought"
    this.talentDesc = "Changes the weather to sun at the beginning of the battle."
    this.init = function () { setWeather("sun", 99); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/groudon.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/kyogre.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/kyogre.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Drizzle"
    this.talentDesc = "Changes the weather to rain at the beginning of the battle."
    this.init = function () { setWeather("rain", 99); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/kyogre.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/rayquaza.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/rayquaza.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Air lock"
    this.talentDesc = "Prevents weather changes."
    this.init = function () { setWeather("air_lock", 99); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/rayquaza.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/giratina.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/giratina.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.origin = false;
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) {
        if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1);
        if (this.currenthp < .5 * this.maxhp && !this.origin) switchGiratina(this);
    }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/giratina.ogg"
}

function switchGiratina(p) {
    if (p.name === "Giratina") {
        var img = p === opponent ? document.getElementById("rightSprite") : document.getElementById("leftSprite");
        img.className += " blink-transform1";
        setTimeout(() => {
            p.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/giratina_origin.gif';
            p.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/giratina_origin.gif';
            if (team[activePokemon] === p) {
                document.getElementById("leftSprite").src = p.imgb;
            } else if (opponent === p) {
                document.getElementById("rightSprite").src = p.imgf;
            }
            resizeSprites(p === team[activePokemon], p === opponent);
            var temp = p.attack;
            p.attack = p.defense;
            p.defense = temp;
            temp = p.spattack;
            p.spattack = p.spdefense;
            p.spdefense = temp;
            this.revenge = function (move, pD) { };
            applyEffect("levitation", 99, p);
            p.talent = "Levitation"
            p.talentDesc = "Levitates above the ground, granting ground type immunity."
            dealDamage(-.1 * p.maxhp, p);
            p.origin = true;
            img.classList.remove("blink-transform1");
            img.className += " unblink-transform1";
        }, 100);
        setTimeout(() => {
            img.classList.remove("unblink-transform1");
        }, 200);
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/eternatus.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/eternatus.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Pressure"
    this.talentDesc = "Lowers opponent's energy by 1 when hit by a super effective move."
    this.revenge = function (move, pD) { if (move != undefined && effectiveMultiplier(move, this) > 1) energy = Math.max(0, energy - 1); }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/eternatus.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/regigigas.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/regigigas.gif';
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
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/regigigas.ogg"
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
    this.imgf = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/front/diancie.gif';
    this.imgb = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_battle_icons/back/diancie.gif';
    this.effects = [];
    this.statchanges = new StatChanges();
    this.draw = [];
    this.hand = [];
    this.discard = [];
    this.items = [];
    this.talent = "Clear body"
    this.talentDesc = "Lowered stats are restored at the end of each turn."
    this.endTurn = function () {
        this.statchanges.attack = Math.max(0, this.statchanges.attack);
        this.statchanges.defense = Math.max(0, this.statchanges.defense);
        this.statchanges.spattack = Math.max(0, this.statchanges.spattack);
        this.statchanges.spdefense = Math.max(0, this.statchanges.spdefense);
        this.statchanges.speed = Math.max(0, this.statchanges.speed);
        drawStats(contains(team, this));
    }
    this.cry = "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/cries/diancie.ogg"
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
    if (p === team[activePokemon] && stages > 0)
        statRaised++;
    if (p === opponent && stages < 0)
        loweredStats++;

    if (p.talent === "Simple")
        stages *= 2;
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
    "diamond_storm", "burning_jealousy", "extrasensory", "belly_drum", "eerie_impulse", "ominous_wind", "boomburst", "clanging_scales", "clangorous_soul",
    "drill_run", "megahorn", "poison_sting", "poison_tail", "cotton_guard", "cotton_spore", "fairy_wind", "stun_spore", "grass_whistle", "frost_breath",
    "freeze_dry", "dragon_breath"];

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
        case "belly_drum":
            return new BellyDrum();
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
        case "boomburst":
            return new Boomburst();
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
        case "burning_jealousy":
            return new BurningJealousy();
        case "calm_mind":
            return new CalmMind();
        case "charge":
            return new Charge();
        case "charge_beam":
            return new ChargeBeam();
        case "charm":
            return new Charm();
        case "clanging_scales":
            return new ClangingScales();
        case "clangorous_soul":
            return new ClangorousSoul();
        case "clear_smog":
            return new ClearSmog();
        case "close_combat":
            return new CloseCombat();
        case "confuse_ray":
            return new ConfuseRay();
        case "confusion":
            return new Confusion();
        case "cotton_guard":
            return new CottonGuard();
        case "cotton_spore":
            return new CottonSpore();
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
        case "dragon_breath":
            return new DragonBreath();
        case "dragon_tail":
            return new DragonTail();
        case "drill_run":
            return new DrillRun();
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
        case "eerie_impulse":
            return new EerieImpulse();
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
        case "extrasensory":
            return new Extrasensory();
        case "extreme_evoboost":
            return new ExtremeEvoboost();
        case "extreme_speed":
            return new ExtremeSpeed();
        case "facade":
            return new Facade();
        case "fairy_wind":
            return new FairyWind();
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
        case "freeze_dry":
            return new FreezeDry();
        case "frenzy_plant":
            return new FrenzyPlant();
        case "frost_breath":
            return new FrostBreath();
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
        case "grass_whistle":
            return new GrassWhistle();
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
        case "megahorn":
            return new Megahorn();
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
        case "ominous_wind":
            return new OminousWind();
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
        case "poison_sting":
            return new PoisonSting();
        case "poison_tail":
            return new PoisonTail();
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
        case "stun_spore":
            return new StunSpore();
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
        case "cursed":
            return new Cursed();
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

function BellyDrum() {
    this.name = "Belly Drum";
    this.type = "normal";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        dealDamage(.25 * pA.maxhp, pA);
        boostStat(pA, "attack", 12);
    };
    this.description = "User sacrifices 25% of its maximum HP to maximize its attack. Exhaust.";
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

function Boomburst() {
    this.name = "Boomburst";
    this.type = "normal";
    this.cat = "special";
    this.bp = 150;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
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
    this.postEffect = function (move, pA, pD) { drawMove(pA, false); };
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

function BurningJealousy() {
    this.name = "Burning Jealousy";
    this.type = "fire";
    this.cat = "special";
    this.bp = 20;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = 20 * (1 + Math.max(0, pD.statchanges.attack) + Math.max(0, pD.statchanges.defense) + Math.max(0, pD.statchanges.spattack) + Math.max(0, pD.statchanges.spdefense) + Math.max(0, pD.statchanges.speed)); };
    this.description = "Deals 20 base power damage to the opponent, plus 20 additional base power for each stat raise on the opponent.";
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

function ClangingScales() {
    this.name = "Clanging Scales";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 110;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.statchanges.spattack <= 0) boostStat(pA, "defense", -1); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Lowers user's defense by 1 stage unless its special attack has been raised.";
}

function ClangorousSoul() {
    this.name = "Clangorous Soul";
    this.type = "dragon";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.exhaust = true;
    this.effect = function (move, pA, pD) {
        dealDamage(.2 * pA.maxhp, pA);
        boostStat(pA, "attack", 1);
        boostStat(pA, "defense", 1);
        boostStat(pA, "spattack", 1);
        boostStat(pA, "spdefense", 1);
        boostStat(pA, "speed", 1);
    };
    this.description = "User sacrifices 20% of its maximum HP to raise all of its stats by 1 stage. Exhaust.";
}

function ClearSmog() {
    this.name = "Clear Smog";
    this.type = "poison";
    this.cat = "special";
    this.bp = 30;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        pD.statchanges = new StatChanges();
        drawStats(contains(team, pD));
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Resets target's stat changes.";
}

function CloseCombat() {
    this.name = "Close Combat";
    this.type = "fighting";
    this.cat = "physical";
    this.bp = 110;
    this.cost = 2;
    this.lower = false;
    this.effect = function (move, pA, pD) { this.lower = pA.currenthp < pD.currenthp; };
    this.postEffect = function (move, pA, pD) {
        if (this.lower) {
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

function CottonGuard() {
    this.name = "Cotton Guard";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { boostStat(pA, "defense", 3); };
    this.description = "Raises user's defense by 3 stages. Exhaust.";
}

function CottonSpore() {
    this.name = "Cotton Spore";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { boostStat(pD, "speed", -2); };
    this.description = "Lowers target's speed by 2 stages. Exhaust.";
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
    this.fails = false;
    this.effect = function (move, pA, pD) {
        if (energy >= 3)
            applyEffect("paralysis", 1, pD);
        this.fails = energy == 0;
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

function DragonBreath() {
    this.name = "Dragon Breath";
    this.type = "dragon";
    this.cat = "special";
    this.bp = 30;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        var c = 0;
        for (let m of pA.moves) {
            c += (m.type === "dragon")
        }
        if (c >= 3)
            applyEffect("paralysis", 1, pD);
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of paralysis to the opponent of the user's deck contains at least 2 other dragon type moves.";
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

function DrillRun() {
    this.name = "Drill Run";
    this.type = "ground";
    this.cat = "physical";
    this.bp = 75;
    this.cost = 2;
    this.crit = false;
    this.effect = function (move, pA, pD) { this.crit = (pA.speed < pD.speed); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit if the user's base speed is lower than its foe's.";
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
        this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
}

function EerieImpulse() {
    this.name = "Eerie Impulse";
    this.type = "electric";
    this.cat = "status";
    this.bp = 0;
    this.cost = 2;
    this.effect = function (move, pA, pD) { boostStat(pD, "spattack", -2); };
    this.description = "Lowers target's special attack by 2 stages.";
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
    this.cost = 2;
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
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { dealDamage(9999, pA); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. User faints.";
}

function Extrasensory() {
    this.name = "Extrasensory";
    this.type = "psychic";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { if (pA.draw.length > pD.draw.length) applyEffect("confusion", 1, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 1 stack of confusion to the target if the user's draw pile is bigger than its.";
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

function FairyWind() {
    this.name = "Fairy wind";
    this.type = "fairy";
    this.cat = "special";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) { this.bp = 40 + 20 * (effectiveMultiplier(move, pD) > 1); };
    this.description = "Deals 40 base power damage to the opponent. Base power increases if this attack is super effective.";
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
    this.bp = 20;
    this.cost = 0;
    this.exhaust = true;
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

function FreezeDry() {
    this.name = "Freeze Dry";
    this.type = "ice";
    this.cat = "special";
    this.bp = 85;
    this.cost = 2;
    this.effect = function (move, pA, pD) { this.bp = 85 + 85 * contains(pD.types, "water"); };
    this.description = "Deals 85 base power damage to the opponent. Base power increases drastically against water type foes.";
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

function FrostBreath() {
    this.name = "Frost Breath";
    this.type = "ice";
    this.cat = "special";
    this.bp = 35;
    this.cost = 1;
    this.crit = true;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals 35 base power damage to the opponent. Always results in a critical hit.";
}

function FuryCutter() {
    this.name = "Fury Cutter";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 40;
    this.cost = 1;
    this.effect = function (move, pA, pD) {
        this.bp += 20;
        this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
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
    this.name = "Future Sight";
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

function GrassWhistle() {
    this.name = "Grass Whistle";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("sleep", 1, pD); };
    this.description = "Applies 1 stack of sleep to the opponent.";
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
    this.fails = false;
    this.effect = function (move, pA, pD) {
        this.fails = energy == 0;
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
    this.postEffect = function (move, pA, pD) {
        if (isAsleep(pD))
            removeEffect("Sleep", pD);
    };
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
    this.preEffect = function (move, pA, pD) { this.type = pA.types[0]; };
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
    this.bp = 160;
    this.cost = 3;
    this.fails = false;
    this.effect = function (move, pA, pD) { this.fails = !(pA.statchanges.attack > 0 || pA.statchanges.defense > 0 || pA.statchanges.spattack > 0 || pA.statchanges.spdefense > 0 || pA.statchanges.speed > 0); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Fails unless user has a raised stat.";
}

function Megahorn() {
    this.name = "Megahorn";
    this.type = "bug";
    this.cat = "physical";
    this.bp = 140;
    this.cost = 3;
    this.effect = function (move, pA, pD) { };
    this.description = "Deals " + this.bp + " base power damage to the opponent.";
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

function OminousWind() {
    this.name = "Ominous Wind";
    this.type = "ghost";
    this.cat = "special";
    this.bp = 70;
    this.cost = 2;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) {
        if (pA.currenthp % 10 == 6) {
            if (pA.statchanges.attack <= 0) boostStat(pA, "attack", 1);
            if (pA.statchanges.defense <= 0) boostStat(pA, "defense", 1);
            if (pA.statchanges.spattack <= 0) boostStat(pA, "spattack", 1);
            if (pA.statchanges.spdefense <= 0) boostStat(pA, "spdefense", 1);
            if (pA.statchanges.speed <= 0) boostStat(pA, "speed", 1);
        }
    };
    this.description = "Deals " + this.bp + " base power damage to the opponent. If the user's HP ends with 6, raises all non-enhanced stats by one stage.";
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

function PoisonSting() {
    this.name = "Poison Sting";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 15;
    this.cost = 0;
    this.exhaust = true;
    this.effect = function (move, pA, pD) { };
    this.postEffect = function (move, pA, pD) { applyEffect("poison", 4, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Applies 4 stacks of poison to the target. Exhaust.";
}

function PoisonTail() {
    this.name = "Poison Tail";
    this.type = "poison";
    this.cat = "physical";
    this.bp = 35;
    this.cost = 1;
    this.crit = true;
    this.effect = function (move, pA, pD) { this.crit = isPoisoned(pD); };
    this.postEffect = function (move, pA, pD) { if (this.crit) applyEffect("poison", 4, pD); };
    this.description = "Deals " + this.bp + " base power damage to the opponent. Always results in a critical hit and applies 4 stacks of poison to the target if it's poisoned already.";
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
    this.effect = function (move, pA, pD) {
        (player ? team[activePokemon] : opponent).statchanges = JSON.parse(JSON.stringify((player ? opponent : team[activePokemon]).statchanges));
        drawStats(contains(team, pA));
    };
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
        this.description = "Deals " + this.bp + " base power damage to the opponent. Base power increases with each use.";
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
        if (i != -1 && pD.effects[i].stacks > 0)
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
    this.bp = 80;
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
    this.preEffect = function (move, pA, pD) { if (doesBlock(pD)) boostStat(pA, "attack", 1); };
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

function StunSpore() {
    this.name = "Stun Spore";
    this.type = "grass";
    this.cat = "status";
    this.bp = 0;
    this.cost = 1;
    this.effect = function (move, pA, pD) { applyEffect("paralysis", 1, pD); };
    this.description = "Applies 1 stack of paralysis to the opponent.";
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
        this.fails = pD.discard.findIndex(e => e.cat !== "status") < 0;
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
    this.postEffect = function (move, pA, pD) {
        if (isAsleep(pD))
            removeEffect("Sleep", pD);
    };
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
    this.preEffect = function (move, pA, pD) {
        if (weather != undefined && weather.name != "Air Lock") {
            if (weather.name === "Rain") this.type = "water";
            else if (weather.name === "Sun") this.type = "fire";
            else if (weather.name === "Hail") this.type = "ice";
            else if (weather.name === "Sandstorm") this.type = "rock";
            this.bp = 120;
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

function Cursed() {
    this.name = "Cursed";
    this.type = "ghost";
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

effectList = ["burn", "charge", "confined", "confusion", "curse", "disguise", "extra_draw", "fear", "freeze", "grounded", "immunity", "ingrain", "kings_protection",
    "leech_seed", "levitation", "paralysis", "poison", "protection", "sleep", "slow_start", "spikes", "stealth_rock", "sticky_web", "taunt", "thick_fat",
    "toxic_spikes", "trap", "trap_damage", "type_changed", "wish"];

function applyEffect(type, stacks, p, extra) {
    var effect = createEffect(type, stacks, extra);
    var fails = false;
    if (effect.immune != undefined) {
        for (let t of effect.immune) {
            fails = fails || contains(p.types, t);
        }
    }
    if (!fails) {
        if (type === "poison" && p === opponent)
            poisonApplied += stacks;

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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/burn.png';
    this.stacks = stacks;
    this.immune = ["fire"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function ChargeE(stacks) {
    this.name = "Charge";
    this.description = "Charge\nIncreases the damage of eletric type moves. Remove 1 stack at the end of each turn.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/charge.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function Confined(stacks) {
    this.name = "Confined";
    this.description = "Confined\nTries to break free from its prison bottle...";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/confined.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/confusion.png';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/curse.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { dealDamage(30, pA); };
}

function Disguise(stacks) {
    this.name = "Disguise";
    this.description = "Disguise\nCancel next attack targetting this Pokémon.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/shield.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/deck.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function Fear(stacks) {
    this.name = "Fear";
    this.description = "Fear\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/fear.webp';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " has flinched!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function Freeze(stacks) {
    this.name = "Freeze";
    this.description = "Freeze\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/freeze.webp';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is frozen solid!<br/>"
    this.immune = ["ice"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function Grounded(stacks) {
    this.name = "Grounded";
    this.description = "Grounded";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/ui_icons/debuff.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function Immunity(stacks, type) {
    this.name = "Immunity (" + type + ")";
    this.description = "Immunity (" + type + ")\nImmune to " + type + " type moves.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/immunity.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function IngrainE(stacks) {
    this.name = "Ingrain";
    this.description = "Ingrain\nRestore 20HP at the end of each turn.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/ingrain.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { dealDamage(-20, pA); };
}

function KingsProtection(stacks) {
    this.name = "King's Protection";
    this.description = "King's Protection\nCancel next attack targetting this Pokémon. Attackers making contact have their attack lowered by one stage.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/shield.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/levitation.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => { this.stacks--; };
}

function Paralysis(stacks) {
    this.name = "Paralysis";
    this.description = "Paralysis\nNullify next attack's effects, then remove 1 stack.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/paralysis.png';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is paralyzed and cannot move!<br/>"
    this.immune = ["electric"];
    this.effect = (pA, pD) => { this.stacks--; };
}

function Poison(stacks) {
    this.name = "Poison";
    this.description = "Poison\nTake 4 damage per stack at the end of the turn, then remove 1 stack.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/poison.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/shield.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/seed.png';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/sleep.png';
    this.stacks = stacks;
    this.cancel = true;
    this.specialMessage = " is fast asleep!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function SlowStart(stacks) {
    this.name = "Slow Start";
    this.description = "Slow Start\nPhysical damage reduced by 40%.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/slow_start.webp';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/spike.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (isGrounded(pA))
            dealDamage(Math.min(50, this.stacks * 10), pA);
    };
}

function StealthRockE(stacks) {
    this.name = "Stealth Rock";
    this.description = "Stealth Rock\nDeals 20 rock type damage at the end of each turn.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/stealth_rock.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        dealDamage(20 * effectiveMultiplier(new RockThrow(), pA), pA);
    };
}

function StickyWebE(stacks) {
    this.name = "Sticky Web";
    this.description = "Sticky Web\nLower speed by one stage at the end of each turn if it hasn't been lowered already. Airborne Pokémon are immune.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/sticky_web.webp';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (pA.statchanges.speed >= 0 && isGrounded(pA))
            boostStat(pA, "speed", -1);
    };
}

function TauntE(stacks) {
    this.name = "Taunt";
    this.description = "Taunt\nPrevents the use of status moves.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/taunt.webp';
    this.stacks = stacks;
    this.specialMessage = " can't use non damaging moves after the taunt!<br/>"
    this.effect = (pA, pD) => { this.stacks--; };
}

function ThickFat(stacks) {
    this.name = "Thick Fat";
    this.description = "Thick Fat\nLowers the damage of incoming ice and fire type moves.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/thick_fat.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { };
}

function ToxicSpikesE(stacks) {
    this.name = "Toxic Spikes";
    this.description = "Toxic Spikes\nApplies 4 stacks of poison at the end of the turn. Airborne Pokémon are immune.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/spike.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => {
        if (isGrounded(pA))
            applyEffect("poison", Math.min(8, this.stacks * 4), pA);
    };
}

function TrapDamage(stacks) {
    this.name = "Trap Damage";
    this.description = "Trap Damage\nTake 15 damage at the end of the turn, then remove 1 stack. Prevents switches.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/trap_damage.png';
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
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/trap.png';
    this.stacks = stacks;
    this.trapped = true;
    this.effect = (pA, pD) => { }
}

function TypeChanged(stacks, type) {
    this.name = "Type changed";
    this.description = "Type changed\nType changed to " + type + ".";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/type_changed.png';
    this.stacks = stacks;
    this.effect = (pA, pD) => { }
}

function WishE(stacks) {
    this.name = "Wish";
    this.description = "Wish\nRestores 20% of maximum HP once this effect ends. Remove 1 stack at the end of each turn.";
    this.icon = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/effect_icons/wish.webp';
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
    switchCastform(team[activePokemon]);
    switchCastform(opponent);
    drawEnvironment();

    if (player && opponent.talent !== "Sand stream" && opponent.talent !== "Snow warning")
        weatherChanged++;
    if (player && weather.name === "Hail" && opponent.talent != "Snow warning")
        hailStarted++;
}

function Rain(turns) {
    this.name = "Rain";
    this.turns = turns;
    this.description = "Powers up water type moves and weakens fire type moves.";
    this.effect = () => {
        this.turns--;
        switchCastform(team[activePokemon]);
        switchCastform(opponent);
    };
}

function Sun(turns) {
    this.name = "Sun";
    this.turns = turns;
    this.description = "Powers up fire type moves and weakens water type moves.";
    this.effect = () => {
        this.turns--;
        switchCastform(team[activePokemon]);
        switchCastform(opponent);
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
    "leftovers", "choice_band", "choice_specs", "choice_scarf", "rocky_helmet", "weakness_policy", "sitrus_berry", "life_orb", "helix_fossil", "air_balloon", "cheri_berry", "chesto_berry", "muscle_band", "wise_glasses", "rawst_berry", "big_root", "blunder_policy",
    "pecha_berry", "persim_berry", "mental_herb", "white_herb", "wide_lens", "scope_lens", "damp_rock", "heat_rock", "icy_rock", "smooth_rock", "bottle_cap", "gold_bottle_cap", "tm_xx", "shed_shell", "enigma_berry", "iron_ball", "quick_claw", "kings_rock",
    "destiny_knot", "revive", "pearl", "potion", "amulet_coin", "odd_keystone", "aspear_berry", "shell_bell", "everstone"];
specialItems = ["tm-1", "aguav_berry", "adamant_orb", "lustrous_orb", "griseous_orb", "red_chain", "rainbow_wing", "silver_wing"];

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
            return new MindPlate();
        case "pixie_plate":
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
        case "helix_fossil":
            return new HelixFossil();
        case "air_balloon":
            return new AirBalloon();
        case "cheri_berry":
            return new CheriBerry();
        case "chesto_berry":
            return new ChestoBerry();
        case "rawst_berry":
            return new RawstBerry();
        case "pecha_berry":
            return new PechaBerry();
        case "persim_berry":
            return new PersimBerry();
        case "muscle_band":
            return new MuscleBand();
        case "wise_glasses":
            return new WiseGlasses();
        case "mental_herb":
            return new MentalHerb();
        case "white_herb":
            return new WhiteHerb();
        case "scope_lens":
            return new ScopeLens();
        case "wide_lens":
            return new WideLens();
        case "damp_rock":
            return new DampRock();
        case "heat_rock":
            return new HeatRock();
        case "icy_rock":
            return new IcyRock();
        case "smooth_rock":
            return new SmoothRock();
        case "bottle_cap":
            return new BottleCap();
        case "gold_bottle_cap":
            return new GoldBottleCap();
        case "tm_xx":
            return new TMXX();
        case "shed_shell":
            return new ShedShell();
        case "enigma_berry":
            return new EnigmaBerry();
        case "iron_ball":
            return new IronBall();
        case "quick_claw":
            return new QuickClaw();
        case "kings_rock":
            return new KingsRock();
        case "big_root":
            return new BigRoot();
        case "blunder_policy":
            return new BlunderPolicy();
        case "destiny_knot":
            return new DestinyKnot();
        case "revive":
            return new Revive();
        case "pearl":
            return new Pearl();
        case "potion":
            return new Potion();
        case "amulet_coin":
            return new AmuletCoin();
        case "odd_keystone":
            return new OddKeystone();
        case "tm-1":
            return new TMm1();
        case "aspear_berry":
            return new AspearBerry();
        case "aguav_berry":
            return new AguavBerry();
        case "shell_bell":
            return new ShellBell();
        case "adamant_orb":
            return new AdamantOrb();
        case "lustrous_orb":
            return new LustrousOrb();
        case "griseous_orb":
            return new GriseousOrb();
        case "red_chain":
            return new RedChain();
        case "everstone":
            return new Everstone();
        case "rainbow_wing":
            return new RainbowWing();
        case "silver_wing":
            return new SilverWing();
        default:
            alert("Unkown item: " + item);
            return new Leftovers();
    }
}

function BlackBelt() {
    this.name = "Black Belt";
    this.description = "Raises the power of fighting type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/black_belt.webp';
    this.area = "fighting";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "fighting"); };
}

function BlackGlasses() {
    this.name = "Black Glasses";
    this.description = "Raises the power of dark type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/black_glasses.webp';
    this.area = "dark";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "dark"); };
}

function Charcoal() {
    this.name = "Charcoal";
    this.description = "Raises the power of fire type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/charcoal.webp';
    this.area = "fire";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "fire"); };
}

function DragonFang() {
    this.name = "Dragon Fang";
    this.description = "Raises the power of dragon type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/dragon_fang.webp';
    this.area = "dragon";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "dragon"); };
}

function HardStone() {
    this.name = "Hard Stone";
    this.description = "Raises the power of rock type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/hard_stone.webp';
    this.area = "rock";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "rock"); };
}

function Magnet() {
    this.name = "Magnet";
    this.description = "Raises the power of electric type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/magnet.webp';
    this.area = "electric";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "electric"); };
}

function MetalCoat() {
    this.name = "Metal Coat";
    this.description = "Raises the power of steel type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/metal_coat.webp';
    this.area = "steel";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "steel"); };
}

function MiracleSeed() {
    this.name = "Miracle Seed";
    this.description = "Raises the power of grass type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/miracle_seed.webp';
    this.area = "grass";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "grass"); };
}

function MysticWater() {
    this.name = "Mystic Water";
    this.description = "Raises the power of water type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/mystic_water.webp';
    this.area = "water";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "water"); };
}

function NeverMeltIce() {
    this.name = "Never-Melt Ice";
    this.description = "Raises the power of ice type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/never_melt_ice.webp';
    this.area = "ice";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "ice"); };
}

function PoisonBarb() {
    this.name = "Poison Barb";
    this.description = "Raises the power of poison type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/poison_barb.webp';
    this.area = "poison";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "poison"); };
}

function SharpBeak() {
    this.name = "Sharp Beak";
    this.description = "Raises the power of flying type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/sharp_beak.webp';
    this.area = "flying";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "flying"); };
}

function SilkScarf() {
    this.name = "Silk Scarf";
    this.description = "Raises the power of normal type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/silk_scarf.webp';
    this.area = "normal";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "normal"); };
}

function SilverPowder() {
    this.name = "Silver Powder";
    this.description = "Raises the power of bug type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/silver_powder.webp';
    this.area = "bug";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "bug"); };
}

function SoftSand() {
    this.name = "Soft Sand";
    this.description = "Raises the power of ground type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/soft_sand.webp';
    this.area = "ground";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "ground"); };
}

function SpellTag() {
    this.name = "Spell Tag";
    this.description = "Raises the power of ghost type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/spell_tag.webp';
    this.area = "ghost";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "ghost"); };
}

function TwistedSpoon() {
    this.name = "Twisted Spoon";
    this.description = "Raises the power of psychic type moves by 20%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/twisted_spoon.webp';
    this.area = "psychic";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .2 * (move.type === "psychic"); };
}

function DracoPlate() {
    this.name = "Draco Plate";
    this.description = "Creates a free random dragon type move with exhaust in the holder's hand at the beginning of the battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/draco_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/dread_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/earth_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/fist_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/flame_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/icicle_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/insect_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/iron_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/meadow_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/mind_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/pixie_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/sky_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/splash_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/spooky_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/stone_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/toxic_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/zap_plate.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/leftovers.webp';
    this.area = "";
    this.turn_end = true;
    this.effect = (p) => {
        dealDamage(-20, p);
    };
}

function ChoiceBand() {
    this.name = "Choice Band";
    this.description = "Discards all cards in hand after using a move. Doubles the damage of physical moves.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/choice_band.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/choice_specs.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/choice_scarf.webp';
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
    this.description = "Attackers making contact with the holder lose 10HP.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/rocky_helmet.webp';
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/weakness_policy.webp';
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
    this.description = "Restores 15% of maximum HP the first time an attack brings the holder below 50% of maximum HP.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/sitrus_berry.webp';
    this.area = "";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (pA.currenthp < .5 * pA.maxhp && !this.consumed) {
            this.consumed = true;
            dealDamage(-pA.maxhp * .15, pA);
        }
    };
    this.init = true;
    this.consumed = false;
    this.effect = (p) => {
        this.consumed = false;
    }
}

function AguavBerry() {
    this.name = "Aguav Berry";
    this.description = "Restores 25% of maximum HP the first time an attack brings the holder below 50% of maximum HP.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/aguav_berry.webp';
    this.area = "event";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (pA.currenthp < .5 * pA.maxhp && !this.consumed) {
            this.consumed = true;
            dealDamage(-pA.maxhp * .25, pA);
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
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/life_orb.webp';
    this.area = "boss";
    this.boost = true;
    this.effect = (move, p) => {
        if (move.cat !== "status")
            dealDamage(25, p);
        return 1.3;
    };
}

function HelixFossil() {
    this.name = "Helix Fossil";
    this.description = "The fossil of a forgotten Pokémon.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/helix_fossil.webp';
    this.area = "rock";
    this.effect = (move, p) => { };
}

function AirBalloon() {
    this.name = "Air Balloon";
    this.description = "Holder begins the battle with 3 stacks of levitation.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/air_balloon.webp';
    this.area = "flying";
    this.init = true;
    this.effect = (p) => { applyEffect("levitation", 3, p); };
}

function AspearBerry() {
    this.name = "Aspear Berry";
    this.description = "Holder is immune to frost.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/aspear_berry.webp';
    this.area = "ice";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Freeze"); };
}

function CheriBerry() {
    this.name = "Cheri Berry";
    this.description = "Holder is immune to paralysis.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/cheri_berry.webp';
    this.area = "electric";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Paralysis"); };
}

function ChestoBerry() {
    this.name = "Chesto Berry";
    this.description = "Holder is immune to sleep.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/chesto_berry.webp';
    this.area = "normal";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Sleep"); };
}

function MentalHerb() {
    this.name = "Mental Herb";
    this.description = "Holder is immune to taunt. Raises holder's attack and special attack by 1 stage when a Pokémon attempts to taunt it.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/mental_herb.webp';
    this.area = "dark";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (isTaunted(pA)) {
            removeEffect(pA, "Taunt");
            boostStat(pA, "attack", 1);
            boostStat(pA, "spattack", 1);
        }
    };
}

function MuscleBand() {
    this.name = "Muscle Band";
    this.description = "Increases physical damage by 10%.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/muscle_band.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.cat === "physical"); };
}

function WiseGlasses() {
    this.name = "Wise Glasses";
    this.description = "Increases special damage by 10%.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/wise_glasses.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .1 * (move.cat === "special"); };
}

function PechaBerry() {
    this.name = "Pecha Berry";
    this.description = "Holder is immune to poison.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/pecha_berry.webp';
    this.area = "poison";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Poison"); };
}

function PersimBerry() {
    this.name = "Persim Berry";
    this.description = "Holder is immune to confusion.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/persim_berry.webp';
    this.area = "psychic";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Confusion"); };
}

function RawstBerry() {
    this.name = "Rawst Berry";
    this.description = "Holder is immune to burn.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/rawst_berry.webp';
    this.area = "fire";
    this.revenge = true;
    this.effectR = (move, pA, pD) => { removeEffect(pA, "Burn"); };
}

function ShedShell() {
    this.name = "Shed Shell";
    this.description = "Holder is immune to trapping effects.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/shed_shell.webp';
    this.area = "ground";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        removeEffect(pA, "Trap");
        removeEffect(pA, "Trap Damage");
    };
}

function WhiteHerb() {
    this.name = "White Herb";
    this.description = "Holder's lowered stats are slowly restored at the end of each round.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/white_herb.webp';
    this.area = "boss";
    this.turn_end = true;
    this.effect = (p) => {
        if (p.statchanges.attack < 0)
            p.statchanges.attack++;
        if (p.statchanges.defense < 0)
            p.statchanges.defense++;
        if (p.statchanges.spattack < 0)
            p.statchanges.spattack++;
        if (p.statchanges.spdefense < 0)
            p.statchanges.spdefense++;
        if (p.statchanges.speed < 0)
            p.statchanges.speed++;
    }
}

function DampRock() {
    this.name = "Damp Rock";
    this.description = "Causes the rain to fall for 3 turns at the beginning of a battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/damp_rock.webp';
    this.area = "water";
    this.init = true;
    this.effect = (p) => { setWeather("rain", 3); }
}

function HeatRock() {
    this.name = "Heat Rock";
    this.description = "Causes the sun to shine for 3 turns at the beginning of a battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/heat_rock.webp';
    this.area = "fire";
    this.init = true;
    this.effect = (p) => { setWeather("sun", 3); }
}

function IcyRock() {
    this.name = "Icy Rock";
    this.description = "Causes the hail to fall for 3 turns at the beginning of a battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/icy_rock.webp';
    this.area = "ice";
    this.init = true;
    this.effect = (p) => { setWeather("hail", 3); }
}

function SmoothRock() {
    this.name = "Smooth Rock";
    this.description = "Whips up a sandstorm for 3 turns at the beginning of a battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/smooth_rock.webp';
    this.area = "rock";
    this.init = true;
    this.effect = (p) => { setWeather("sandstorm", 3); }
}

function EnigmaBerry() {
    this.name = "Enigma Berry";
    this.description = "Restores 15% of maximum HP the first time the holder is hit by a super effective move.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/enigma_berry.webp';
    this.area = "";
    this.revenge = true;
    this.consumed = false;
    this.effectR = (move, pA, pD) => {
        if (move != undefined && effectiveMultiplier(move, pA) > 1 && !this.consumed) {
            this.consumed = true;
            dealDamage(-pA.maxhp * .15, pA);
        }
    };
    this.init = true;
    this.effect = (p) => {
        this.consumed = false;
    }
}

function BottleCap() {
    this.name = "Bottle Cap";
    this.description = "Permanently grants a slight boost to a random holder's stat at the beginning of each battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/bottle_cap.webp';
    this.area = "";
    this.init = true;
    this.effect = (p) => {
        switch (Math.floor(Math.random() * 6)) {
            case 0:
                p.maxhp = Math.floor(p.maxhp * 1.01);
                break;
            case 1:
                p.attack *= 1.01;
                break;
            case 2:
                p.defense *= 1.01;
                break;
            case 3:
                p.spattack *= 1.01;
                break;
            case 4:
                p.spdefense *= 1.01;
                break;
            case 5:
                p.speed *= 1.01;
                break;
            default:
        }
        refreshHealthBar(contains(team, p));
    }
}

function GoldBottleCap() {
    this.name = "Gold Bottle Cap";
    this.description = "Permanently grants a slight boost to all of the holder's stat at the beginning of each battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/gold_bottle_cap.webp';
    this.area = "boss";
    this.init = true;
    this.effect = (p) => {
        p.maxhp = Math.floor(p.maxhp * 1.008);
        p.attack *= 1.008;
        p.defense *= 1.008;
        p.spattack *= 1.008;
        p.spdefense *= 1.008;
        p.speed *= 1.008;
        refreshHealthBar(contains(team, p));
    }
}

function IronBall() {
    this.name = "Iron Ball";
    this.description = "Grounds holder, lowers its speed by 1 stage and raises its defense by 1 stage.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/iron_ball.webp';
    this.area = "steel";
    this.init = true;
    this.effect = (p) => {
        applyEffect("grounded", 1, p);
        boostStat(p, "speed", -1);
        boostStat(p, "defense", 1);
    }
}

function KingsRock() {
    this.name = "King's Rock";
    this.description = "Holder's attacks hitting multiple times apply 1 stack of fear to the target if it's not scared already.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/kings_rock.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => {
        var pD = contains(team, p) ? opponent : team[activePokemon];
        if (move.multihit != undefined && move.multihit > 1 && !isScared(pD))
            applyEffect("fear", 1, pD);
        return 1;
    }
}

function QuickClaw() {
    this.name = "Quick Claw";
    this.description = "Holder draws an extra card at the beginning of the turn.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/quick_claw.webp';
    this.area = "";
    this.init = true;
    this.effect = (p) => { applyEffect("extra_draw", 1, p); }
}

function TMXX() {
    this.name = "TM??";
    this.description = "Shuffles a Judgment move into the holder's draw pile at the beginning of the battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/normal_tm.webp';
    this.area = "boss";
    this.init = true;
    this.effect = (p) => { p.draw.splice(Math.floor(Math.random() * p.draw.length + 1), 0, new Judgment()); }
}

function WideLens() {
    this.name = "Wide Lens";
    this.description = "Holder's attacks with a possibility to miss deal 25% extra damage.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/wide_lens.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .25 * (move.fails != undefined); }
}

function ScopeLens() {
    this.name = "Scope Lens";
    this.description = "Holder's critical hits deal 25% extra damage.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/scope_lens.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .25 * (move.crit != undefined && move.crit); }
}

function BigRoot() {
    this.name = "Big Root";
    this.description = "Holder's draining attacks deal 25% extra damage.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/big_root.webp';
    this.area = "grass";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .25 * (move.recoil != undefined && move.recoil < 0); }
}

function BlunderPolicy() {
    this.name = "Blunder Policy";
    this.description = "Whenever the holder is hit by an attack with the possibility to fail, raises its speed by 2 stages.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/weakness_policy.webp';
    this.area = "";
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (move != undefined && move.fails != undefined)
            boostStat(pA, "speed", 2);
    }
}

function DestinyKnot() {
    this.name = "Destiny Knot";
    this.description = "At the end of each turn, copies all of the holder's status conditions onto its opponent in limited amounts.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/destiny_knot.webp';
    this.area = "";
    this.turn_end = true;
    this.effect = (p) => {
        var pD = p === team[activePokemon] ? opponent : team[activePokemon];
        if (isPoisoned(p)) applyEffect("poison", 4, pD);
        if (isBurned(p)) applyEffect("burn", 1, pD);
        if (isParalyzed(p)) applyEffect("paralysis", 1, pD);
        if (isFrozen(p)) applyEffect("freeze", 1, pD);
        if (isAsleep(p)) applyEffect("sleep", 1, pD);
    }
}

function Revive() {
    this.name = "Revive";
    this.description = "The first time the holder faints, revives it with 30% HP. Single use.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/revive.webp';
    this.area = "";
    this.consumed = false;
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        if (pA.currenthp == 0 && !this.consumed) {
            this.consumed = true;
            dealDamage(.3 * pA.maxhp, pA);
        }
    }
}

function Pearl() {
    this.name = "Pearl";
    this.description = "Grants " + String.fromCharCode(08381) + "600 on pickup.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/pearl.webp';
    this.area = "";
    this.pickup = true;
    this.effect = (p) => {
        money += 600;
        earnedMoney += 600;
    }
}

function Potion() {
    this.name = "Potion";
    this.description = "Restores 50% of the holder's HP on pickup.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/potion.webp';
    this.area = "";
    this.pickup = true;
    this.effect = (p) => { p.currenthp = Math.min(p.maxhp, p.currenthp + Math.floor(.5 * p.maxhp)); }
}

function AmuletCoin() {
    this.name = "Amulet Coin";
    this.description = "Gain " + String.fromCharCode(08381) + "75 each battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/amulet_coin.webp';
    this.area = "";
    this.init = true;
    this.effect = (p) => {
        money += 75;
        earnedMoney += 75;
    }
}

function OddKeystone() {
    this.name = "Odd Keystone";
    this.description = "An old stone holding a mysterious power. Voices can be heard from it.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/odd_keystone.webp';
    this.area = "ghost";
    this.energy = 0;
    this.boost = true;
    this.effect = (move, p) => {
        this.energy += 1 + contains(p.types, move.type) + (move.cat === "status");
        if (this.energy >= 65) {
            dealDamage(108, contains(team, p) ? opponent : team[activePokemon]);
            this.energy -= 65;
        }
        return 1;
    }
    this.revenge = true;
    this.effectR = (move, pA, pD) => {
        this.energy += 2 * move != undefined;
        if (this.energy >= 65) {
            dealDamage(108, pD);
            this.energy -= 65;
        }
        if (pA.currenthp == 0) dealDamage(.3 * pA.maxhp, pA);
    }
}

function TMm1() {
    this.name = "TM-1";
    this.description = "???";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/psychic-tm.webp';
    this.area = "event";
    this.init = true;
    var move = new HiddenPower();
    move.cost = 0;
    move.name += "*";
    this.effect = (p) => { p.draw.splice(Math.floor(Math.random() * p.draw.length + 1), 0, move); }
}

function ShellBell() {
    this.name = "Shell Bell";
    this.description = "Holder recovers 5HP every time it deals damage with an offensive move.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/shell_bell.webp';
    this.area = "";
    this.boost = true;
    this.effect = (move, p) => {
        if (move.bp > 0)
            dealDamage(-5, p);
        return 1;
    };
}

function AdamantOrb() {
    this.name = "Adamant Orb";
    this.description = "Raises the power of dragon and steel type moves by 15%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/adamant_orb.webp';
    this.area = "event";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .15 * (move.type === "dragon" || move.type === "steel"); };
}

function LustrousOrb() {
    this.name = "Lustrous Orb";
    this.description = "Raises the power of dragon and water type moves by 15%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/lustrous_orb.webp';
    this.area = "event";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .15 * (move.type === "dragon" || move.type === "water"); };
}

function GriseousOrb() {
    this.name = "Griseous Orb";
    this.description = "Raises the power of dragon and ghost type moves by 15%";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/griseous_orb.webp';
    this.area = "event";
    this.boost = true;
    this.effect = (move, p) => { return 1 + .15 * (move.type === "dragon" || move.type === "ghost"); };
}

function RedChain() {
    this.name = "Red Chain";
    this.description = "Restores 100% of the holder's HP at the beginning of a boss battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/red_chain.webp';
    this.area = "event";
    this.init = true;
    this.effect = (p) => { if (area == 10) p.currenthp = p.maxhp; };
}

function Everstone() {
    this.name = "Everstone";
    this.description = "Moves are not discarded at the end of the turn.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/everstone.webp';
    this.area = "rock";
}

function hasEverstone(p) {
    return p.items.findIndex(e => e.name === "Everstone") >= 0;
}

function RainbowWing() {
    this.name = "Rainbow Wing";
    this.description = "The first time the holder faints, revives it with 50% HP. Single use. Can be given to a fainted Pokémon to revive it.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/rainbow_wing.webp';
    this.area = "event";
    this.consumed = false;
    this.revenge = true;
    this.pickup = true;
    this.effect = (p) => {
        if (p.currenthp == 0) {
            this.consumed = true;
            p.currenthp = Math.floor(.5 * p.maxhp);
        }
    }
    this.effectR = (move, pA, pD) => {
        if (pA.currenthp == 0 && !this.consumed) {
            this.consumed = true;
            dealDamage(.5 * pA.maxhp, pA);
        }
    }
}

function SilverWing() {
    this.name = "Silver Wing";
    this.description = "Prevents any weather change at the beginning of the battle.";
    this.img = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/held_items/silver_wing.webp';
    this.area = "event";
    this.init = true;
    this.effect = (p) => { setWeather("air_lock", 5); }
}






/* ------------------------------------------------------ */
/* ----------------------- Events ----------------------- */
/* ------------------------------------------------------ */

function eventEncounter() {
    pokemonCenterChance += .05;
    pokemartChance += .05;
    eventChance = 0;

    clearBody();
    fadeInTransition();
    gArea = new gameArea('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/teamscreen.webp', () => { });
    gArea.start();

    runEvent(createEvent());
}

function runEvent(event) {
    var grid = document.createElement('div');
    grid.className = "gameover-grid";
    document.body.appendChild(grid);

    var title = document.createElement('div');
    title.className = "event-title";
    title.innerHTML = event.description;
    grid.appendChild(title);

    var options = document.createElement('div');
    options.className = "event-option-grid";
    grid.appendChild(options);
    for (let i = 1; i <= event.options.length; i++) {
        var o = event.options[i-1];
        var num = document.createElement('div');
        num.innerHTML = i + ".";
        num.style.textAlign = "right";
        options.appendChild(num);

        function optionDiv() {
            this.div = document.createElement('div');
            this.div.o = o;
            this.div.className = "event-option";
            this.div.innerHTML = o.text;
            this.div.onclick = function () {
                if (music)
                    playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                grid.innerHTML = "";

                var title = document.createElement('div');
                title.className = "event-title";
                title.innerHTML = this.o.description;
                grid.appendChild(title);

                if (this.o.subdescription != undefined) {
                    var subtitle = document.createElement('div');
                    subtitle.className = "event-title";
                    subtitle.style.fontSize = "2vw";
                    subtitle.innerHTML = this.o.subdescription;
                    grid.appendChild(subtitle);
                }

                var click = document.createElement('div');
                click.className = "event-title";
                click.style.fontSize = "1.5vw";
                click.innerHTML = "click to continue";
                grid.appendChild(click);

                var filter = document.createElement('div');
                filter.className = "filter-clear";
                filter.onclick = () => {
                    if (music)
                        playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                    grid.innerHTML = "";
                    this.o.effect();
                }
                document.body.appendChild(filter);
            }
            options.appendChild(this.div);
        }
        new optionDiv();
    }
}

function createReward(isItem, r1, r2, r3) {
    var filter = document.createElement('div');
    filter.className = "filter-clear";
    document.body.appendChild(filter);

    var grid = document.createElement('div');
    grid.className = "reward-selector";
    filter.appendChild(grid);

    var title = document.createElement('div');
    title.className = "centered-subtitle";
    title.innerHTML = "Choose your reward";
    grid.appendChild(title);

    var rewards;
    if (r1 != undefined) {
        if (r3 == undefined)
            r3 = r1;
        if (r2 == undefined)
            r2 = r1;
        rewards = [r1, r2, r3];
    }

    if (isItem) {
        for (let i = 0; i < team.length; i++) {
            function makeReward(i) {
                var p = team[i];
                this.reward1 = document.createElement('div');
                this.reward1.className = "reward";

                var sprite = new Image();
                sprite.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
                sprite.className = "reward-sprite";
                this.reward1.appendChild(sprite);

                var wrapper = document.createElement('div');
                wrapper.className = "wrapper";
                this.reward1.appendChild(wrapper);

                var item = createHeldItem(rewards[i]);
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
                    if (music)
                        playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                    if (this.item.pickup != undefined)
                        this.item.effect(this.p);
                    nextEncounter();
                };
            }
            grid.appendChild((new makeReward(i)).reward1);
        }
    } else {
        for (let i = 0; i < team.length; i++) {
            function makeReward(i) {
                var p = team[i];
                this.reward1 = document.createElement('div');
                this.reward1.className = "reward";
                var sprite1 = new Image();
                sprite1.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/pokemon_icons/' + p.id + '.png';
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
                        type.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/types/' + move.type + '.webp'
                    type.className = "type-icon";
                    bottom.appendChild(type);
                    var cat = new Image();
                    cat.src = 'https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sprites/move_icons/category/' + move.cat + '.webp'
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
                    if (music)
                        playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
                    nextEncounter();
                };
            }
            grid.appendChild((new makeReward(i)).reward1);
        }
    }

    var skip = document.createElement('div');
    skip.className = "centered-subtitle replay";
    skip.innerHTML = "skip";
    skip.onclick = () => {
        if (music)
            playMusic('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Gandalf-le-Gris/JSPokemon/main/resources/sounds/sfx/button_click.mp3', false);
        nextEncounter();
    };
    grid.appendChild(skip);
}

function createEvent(event) {
    event = event != undefined ? event : Math.floor(Math.random() * 10);
    switch (event) {
        case 0:
            return new Event0();
        case 1:
            return new Event1();
        case 2:
            return new Event2();
        case 3:
            return new Event3();
        case 4:
            return new Event4();
        case 5:
            return new Event5();
        case 6:
            return new Event6();
        case 7:
            return new Event7();
        case 8:
            return new Event8();
        case 9:
            return new Event9();
    }
}

function Event0() {
    this.description = "You enter old ruins. The walls are covered in mysterious glyphs written in an ancient alphabet, that you cannot decipher. In front of you lie two paths.";
    var reward = Math.random() < .5;
    this.options = [];
    this.options.push({
        text: "Take the left path",
        effect: () => {
            if (!reward) {
                fadeOutTransition(1);
                setTimeout(() => { battleEncounter("", "unown") }, 1000);
            } else {
                function getRock() {
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            return "heat_rock";
                        case 1:
                            return "damp_rock";
                        case 2:
                            return "icy_rock";
                        case 3:
                            return "smooth_rock";
                        default:
                    }
                }
                createReward(true, getRock(), getRock(), getRock());
            }
        },
        description: reward ? "You find some strangely shaped rocks at the end of the tunnel. You decide to take one." : "You venture into the dark. After some time, you come across a hostile Pokémon!"
    })
    this.options.push({
        text: "Take the right path",
        effect: () => {
            if (!reward) {
                fadeOutTransition(1);
                setTimeout(() => { battleEncounter("psychic", "unown") }, 1000);
            } else {
                function getPlate() {
                    var item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    while (!item.includes('_plate'))
                        item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    return item;
                }
                createReward(true, getPlate(), getPlate(), getPlate());
            }
        },
        description: reward ? "You find some ancient looking plates at the end of the tunnel. You decide to take one." : "You venture into the dark. After some time, you come across a hostile Pokémon!"
    })
    var fire = team.findIndex(e => contains(e.types, "fire"));
    if (fire >= 0) {
        this.options.push({
            text: "[Fire] Make " + team[fire].name + " light up the tunnels",
            effect: () => {
                money += 750;
                earnedMoney += 750;
                nextEncounter();
            },
            description: "As " + team[fire].name + " lights up the ruins with its flame, you spot a shiny gold nugget in a corner. You greedily shove it into your bag.",
            subdescription: "You got " + String.fromCharCode(08381) + "750."
        })
    }
    var psychic = team.findIndex(e => contains(e.types, "psychic"));
    if (psychic >= 0) {
        this.options.push({
            text: "[Psychic] Let " + team[psychic].name + " decipher the glyphs",
            effect: () => { createReward(true, "tm-1"); },
            description: "After reading the glyphs, " + team[psychic].name + " leads you to a third hidden passage. At the end of the tunnel, you find an old TM you don't recognize."
        })
    }
}

function Event1() {
    this.description = "An old man approaches you. He presents himself as a move tutor and offers to teach new moves to your Pokémon.";
    this.options = [];
    this.options.push({
        text: "Accept his offer",
        effect: () => { createReward(false); },
        description: "The move tutor shows your Pokémon some new techniques."
    })
    this.options.push({
        text: "Ask for directions",
        effect: () => {
            guaranteedPokemonCenter = true;
            guaranteedPokemart = true;
            nextEncounter();
        },
        description: "The man explains to you how to get to the nearest town.",
        subdescription: "Next encounters will be a Pokémon Center and a Pokémart."
    })
    var ditto = team.findIndex(e => e.name === "Ditto");
    if (ditto >= 0) {
        this.options.push({
            text: "[Ditto] Show your Ditto to the old man",
            effect: () => {
                money += 800;
                earnedMoney += 800;
                nextEncounter();
            },
            description: "The move tutor giggles in excitement as he examines your Ditto, before handing you a handful of Pokédollars as a thank you gift for letting him see such a fascinating Pokémon.",
            subdescription: "You got " + String.fromCharCode(08381) + "800."
        })
    }
    var tmxx = undefined;
    for (let p of team) {
        for (let it of p.items) {
            if (it.name === 'TMXX')
                tmxx = it;
        }
    }
    if (tmxx != undefined) {
        this.options.push({
            text: "[TMXX] Ask him to duplicate the TM",
            effect: () => { createReward(true, "tm_xx"); },
            description: "The move tutor takes the TM and enters his shed. After some time, he comes back with a large smile on his face and hands you a copy of your TM.",
        })
    }
    var tmm1 = undefined;
    for (let p of team) {
        for (let it of p.items) {
            if (it.name === 'TM-1')
                tmm1 = it;
        }
    }
    if (tmm1 != undefined) {
        this.options.push({
            text: "[TM-1] Ask him to duplicate the TM",
            effect: () => { createReward(true, "tm-1"); },
            description: "The move tutor takes the TM and enters his shed. After some time, he comes back with a large smile on his face and hands you a copy of your TM.",
        })
    }
}

function Event2() {
    this.description = "A drunk gambler is willing to bet some Pokédollars with you in a simple card game. This could be easy money.";
    this.options = [];
    var reward = Math.random() < .5;

    var amuletCoin = false;
    for (let p of team)
        for (let i of p.items)
            amuletCoin = amuletCoin || i.name === "Amulet Coin";
    var dark = team.findIndex(e => contains(e.types, "dark"));
    if (!amuletCoin && !(dark >= 0)) {
        if (money >= 500) {
            this.options.push({
                text: "Bet " + String.fromCharCode(08381) + "500",
                effect: () => {
                    if (reward) {
                        money += 500;
                        earnedMoney += 500;
                    } else {
                        money -= 500;
                    }
                    nextEncounter();
                },
                description: reward ? "You won the game! The money is all yours." : "Sadly, you lost the game and your money.",
                subdescription: reward ? "You got " + String.fromCharCode(08381) + "500." : "You lost " + String.fromCharCode(08381) + "500."
            })
        }
        if (money >= 1000) {
            this.options.push({
                text: "Bet " + String.fromCharCode(08381) + "1000",
                effect: () => {
                    if (reward) {
                        money += 1000;
                        earnedMoney += 1000;
                    } else {
                        money -= 1000;
                    }
                    nextEncounter();
                },
                description: reward ? "You won the game! The money is all yours." : "Sadly, you lost the game and your money.",
                subdescription: reward ? "You got " + String.fromCharCode(08381) + "1000." : "You lost " + String.fromCharCode(08381) + "1000."
            })
        }
        if (money >= 2000) {
            this.options.push({
                text: "Bet " + String.fromCharCode(08381) + "2000",
                effect: () => {
                    if (reward) {
                        money += 2000;
                        earnedMoney += 2000;
                    } else {
                        money -= 2000;
                    }
                    nextEncounter();
                },
                description: reward ? "You won the game! The money is all yours." : "Sadly, you lost the game and your money.",
                subdescription: reward ? "You got " + String.fromCharCode(08381) + "2000." : "You lost " + String.fromCharCode(08381) + "2000."
            })
        }
    } else {
        if (money >= 500) {
            this.options.push({
                text: dark >= 0 ? "[Dark] Bet " + String.fromCharCode(08381) + "500" : "[Amulet Coin] Bet " + String.fromCharCode(08381) + "500",
                effect: () => {
                    money += 500;
                    earnedMoney += 500;
                    nextEncounter();
                },
                description: dark >= 0 ? "After " + team[dark].name + " swaps the deck of cards with a prepared one, your victory is inevitable." : "The amulet coin brings you luck, and it is no surprise that you win your bet.",
                subdescription: "You got " + String.fromCharCode(08381) + "500."
            })
        }
        if (money >= 1000) {
            this.options.push({
                text: dark >= 0 ? "[Dark] Bet " + String.fromCharCode(08381) + "1000" : "[Amulet Coin] Bet " + String.fromCharCode(08381) + "1000",
                effect: () => {
                    money += 1000;
                    earnedMoney += 1000;
                    nextEncounter();
                },
                description: dark >= 0 ? "After " + team[dark].name + " swaps the deck of cards with a prepared one, your victory is inevitable." : "The amulet coin brings you luck, and it is no surprise that you win your bet.",
                subdescription: "You got " + String.fromCharCode(08381) + "1000."
            })
        }
        if (money >= 2000) {
            this.options.push({
                text: dark >= 0 ? "[Dark] Bet " + String.fromCharCode(08381) + "2000" : "[Amulet Coin] Bet " + String.fromCharCode(08381) + "2000",
                effect: () => {
                    money += 2000;
                    earnedMoney += 2000;
                    nextEncounter();
                },
                description: dark >= 0 ? "After " + team[dark].name + " swaps the deck of cards with a prepared one, your victory is inevitable." : "The amulet coin brings you luck, and it is no surprise that you win your bet.",
                subdescription: "You got " + String.fromCharCode(08381) + "2000."
            })
        }
    }
    this.options.push({
        text: "Refuse the bet and leave",
        effect: () => { nextEncounter(); },
        description: "You refuse the offer and resume your adventure.",
    })
    var meowth = team.findIndex(e => e.name === "Meowth");
    if (meowth >= 0) {
        this.options.push({
            text: "[Meowth] Steal the gambling man",
            effect: () => {
                money += 500;
                earnedMoney += 500;
                nextEncounter();
            },
            description: "As you keep the man busy, your Meowth sneaks up behind him and steals whatever it can find in his pockets.",
            subdescription: "You got " + String.fromCharCode(08381) + "500."
        })
    }
}

function Event3() {
    this.description = "As you explore some underground tunnels nearby, you come across a large room built centuries ago. An old pillar with a strange keystone on top are the only decorations of this otherwise empty place. You hear the voices of spirits echoing around you, making you feel uneasy.";
    this.options = [];
    var ghost = team.findIndex(e => contains(e.types, "ghost"));
    if (ghost < 0) {
        this.options.push({
            text: "Take the keystone",
            effect: () => { battleEncounter("ghost", "spiritomb"); },
            description: "You reach for the keystone, but before you can touch it, angry spirits start coming out of it. You made a mistake!"
        })
    } else {
        this.options.push({
            text: "[Ghost] Take the keystone",
            effect: () => { createReward(true, "odd_keystone"); },
            description: "You let " + team[ghost].name + " talk to the spirits. After some time, they allow you to take their keystone."
        })
    }
    this.options.push({
        text: "Examine the keystone",
        effect: () => {
            for (let p of team)
                p.moves.push(new Cursed());
            nextEncounter();
        },
        description: "You feel more and more unseasy as you approach the keystone. You didn't discover anything, but you have a bad feeling about this.",
        subdescription: "You have been cursed."
    })
    var fighting = team.findIndex(e => contains(e.types, "fighting"));
    if (fighting < 0) {
        this.options.push({
            text: "Destroy the pillar",
            effect: () => {
                battleEncounter("ghost", "spiritomb");
            },
            description: "You start striking the pillar with your whole strength, but before you can take it down, spirits sealed in the keystone attack you!",
        })
    } else {
        this.options.push({
            text: "[Fighting] Destroy the pillar",
            effect: () => {
                createReward(true, "hard_stone");
            },
            description: team[fighting].name + " lands a mighty blow on the pillar, which crumbles and crashes heavily in front of you. There is not much left to scavenge, if not a pretty looking rock that rolled over to your feet.",
        })
    }
    var fairy = team.findIndex(e => contains(e.types, "fairy"));
    if (fairy >= 0) {
        this.options.push({
            text: "[Fairy] Purify the keystone",
            effect: () => {
                for (let p of team)
                    p.currenthp = Math.floor(Math.min(p.maxhp, p.currenthp + .15 * p.maxhp));
                nextEncounter();
            },
            description: team[fairy].name + " purifies the keystone. The voices of the spirits fade, and you decide to rest in the now peaceful room.",
            subdescription: "Your Pokémon have been slightly healed."
        })
    }
}

function Event4() {
    this.description = "You come across an inviting looking lush forest. You could use some rest, and start looking for some place to lay down.";
    this.options = [];
    var reward = Math.random() < .5;
    this.options.push({
        text: "Rest for a while",
        effect: () => {
            if (reward) {
                for (let p of team)
                    p.currenthp = Math.floor(Math.min(p.maxhp, p.currenthp + .15 * p.maxhp));
                nextEncounter();
            } else {
                battleEncounter(Math.random() < .5 ? "grass" : "bug");
            }
        },
        description: reward ? "You lie down in a peaceful glade and take a nap." : "As you were about to fall alseep, you realize you were on the territory of a wild Pokémon a little too late...",
        subdescription: reward ? "Your Pokémon have been slightly healed." : undefined
    })
    var grass = team.findIndex(e => contains(e.types, "grass"));
    this.options.push({
        text: grass < 0 ? "Harvest some berries" : "[Grass] Harvest some berries",
        effect: () => {
            if (i < 0) {
                function getBerry() {
                    var item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    while (!item.includes('_berry') || item.includes('aguav_berry'))
                        item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    return item;
                }
                createReward(true, getBerry(), getBerry(), getBerry());
            } else
                createReward(true, "aguav_berry");
        },
        description: grass < 0 ? "You look around you and quickly spot a small berry bush. You harvest a few of them for your Pokémon." : team[grass].name + " leaves to find some berries. After some time, it returns with some fruits you had never seen before.",
    })
    var bug = team.findIndex(e => contains(e.types, "bug"));
    this.options.push({
        text: bug < 0 ? "Venture deeper into the forest" : "[Bug] Venture deeper into the forest",
        effect: () => {
            if (bug < 0)
                battleEncounter("bug", "shedinja");
            else
                createReward(true, "shed_shell");
        },
        description: bug < 0 ? "You head deeper into the forest. At some point, you come across empty bug shells scattered everywhere around you. Suddenly, one of them starts moving and attacks you!" : "You head deeper into the forest. At some point, you come across empty bug shells scattered everywhere around you. " + team[bug].name + " looks insistantly at one of them, as if to show you it could be useful.",
    })
    var rock = team.findIndex(e => contains(e.types, "rock"));
    if (rock >= 0) {
        this.options.push({
            text: "[Rock] Follow " + team[rock].name + " to a large boulder",
            effect: () => {
                createReward(true, "everstone");
            },
            description: team[rock].name + " leads you to an enormous, ordinary looking stone. However, after climbing on it, you discover a smaller rock humming with undescribable energy.",
        })
    }
}

function Event5() {
    this.description = "You encounter three statues representing the legendary Creation Trio of Sinnoh. Which one should receive your offering?";
    this.options = [];
    this.options.push({
        text: "Ask for Dialga's blessing",
        effect: () => {
            area = Math.max(0, area - 3);
            nextEncounter();
        },
        description: "After a while, you start feeling dizzy. The world around you starts spinning, and everything goes dark.",
        subdescription: "You have travelled back in time."
    })
    this.options.push({
        text: "Ask for Palkia's blessing",
        effect: () => {
            area = Math.min(8, area + 3);
            nextEncounter();
        },
        description: "After a while, you start feeling dizzy. The world around you starts spinning, and everything goes dark.",
        subdescription: "You have travelled forward in space."
    })
    this.options.push({
        text: "Ask for Giratina's blessing",
        effect: () => {
            for (let i = 0; i < team.length; i++) {
                var p = team[i];
                var poke = createPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
                adjustBST(poke, 600, false);
                poke.currenthp = Math.floor(p.currenthp / p.maxhp * poke.maxhp);
                for (let j = 0; j < 3; j++)
                    poke.moves.push(createMove(poke.movepool[Math.floor(Math.random() * poke.movepool.length)]));
                for (let j = 0; j < p.items.length; j++)
                    poke.items.push(createHeldItem(heldItems[Math.floor(Math.random() * heldItems.length)]));
                team[i] = poke;
            }
            nextEncounter();
        },
        description: "After a while, you start feeling dizzy. The world around you starts spinning, and everything goes dark.",
        subdescription: "You have travelled through chaos."
    })
    var dragon = team.findIndex(e => contains(e.types, "dragon"));
    if (dragon >= 0) {
        this.options.push({
            text: "[Dragon] Request the power of the three dragons",
            effect: () => {
                var rewards = ["adamant_orb", "lustrous_orb", "griseous_orb"];
                shuffle(rewards);
                createReward(true, rewards[0], rewards[1], rewards[2]);
            },
            description: "Joined by " + team[dragon].name + ", you close your eyes and beg the legendary dragons to grant you some of their power. After you open your eyes, you notice three orbs in front of you that weren't there before.",
        })
    }
}

function Event6() {
    this.description = "You find an entrance to the Underground. You decide to dive down in hope of useful treasure.";
    this.options = [];
    var reward = Math.random() < .5;
    var ground = team.findIndex(e => contains(e.types, "ground"));
    this.options.push({
        text: ground < 0 ? "Dig for treasure" : "[Ground] Dig for treasure",
        effect: () => {
            if (ground >= 0 || reward) {
                function getDiggingReward() {
                    var item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    while (!item.includes('_plate') && !item.includes('_rock') && !item.includes('stone') && !item.includes('_fossil'))
                        item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    return item;
                }
                createReward(true, getDiggingReward(), getDiggingReward(), getDiggingReward());
            } else {
                for (let p of team)
                    p.currenthp = Math.floor(Math.max(0, p.currenthp - .15 * p.maxhp));
                nextEncounter();
            }
        },
        description: ground < 0 && !reward ? "You start digging, but the tunnel is very unstable and ends up collapsing on you and your team." : (ground < 0 ? "You grab your tools and start digging. You quickly find interesting items and decide to extract one of them." : "With the help of " + team[ground].name + ", you extract useful items without endangering the tunnel's integrity."),
        subdescription: ground < 0 && !reward ? "Your Pokémon have taken moderate damage." : undefined
    })
    this.options.push({
        text: "Take abandonned tools",
        effect: () => {
            createReward(true, "rocky_helmet");
        },
        description: "You found an abandonned helmet nearby. You decide to take it, no one will miss it.",
    })
    var steel = team.findIndex(e => contains(e.types, "steel"));
    if (steel >= 0) {
        this.options.push({
            text: "[Steel] Let " + team[steel].name + " recycle your tools",
            effect: () => {
                function getRecycleReward() {
                    return Math.random() < .5 ? "metal_coat" : "iron_ball";
                }
                createReward(true, getRecycleReward(), getRecycleReward(), getRecycleReward());
            },
            description: "You wouldn't find anything with these old tools anyway, it's better to turn them into something more useful. Luckily, " + team[steel].name + " knows just how to do that.",
        })
    }
    var fire = team.findIndex(e => contains(e.types, "fire"));
    if (fire >= 0) {
        this.options.push({
            text: "[Fire] Ask " + team[fire].name + " to smelt some gold ore",
            effect: () => {
                money += 700;
                earnedMoney += 700;
                nextEncounter();
            },
            description: "You find gold ore in your surroundings. " + team[fire].name + " helps you smelt it. You should be able to sell it for a good price.",
            subdescription: "You got " + String.fromCharCode(08381) + "700."
        })
    }
}

function Event7() {
    this.description = "After a long walk, you see a Pokémon Center in the distance. Unfortunately, it seems empty and no one works there anymore.";
    this.options = [];
    var blissey = team.findIndex(e => e.name === "Blissey") >= 0;
    this.options.push({
        text: blissey ? "[Blissey] Use a healer" : "Use a healer",
        effect: () => {
            for (let p of team)
                p.currenthp = Math.floor(Math.max(0, p.currenthp + (.1 + .2 * blissey) * p.maxhp));
            nextEncounter();
        },
        description: blissey ? "Blissey shows you how to use the healers in the Pokémon Center. With its help, you manage to give your Pokémon some well-needed healing." : "You approach a seemingly functional healer and place your Pokéballs inside. Despite its bad shape, it still heals your party. Somewhat.",
        subdescription: blissey ? "Your Pokémon have been moderately healed." : "Your Pokémon have been slightly healed."
    })
    this.options.push({
        text: "Use a PC",
        effect: () => {
            createReward(true, "weakness_policy");
        },
        description: "You turn a PC on and browse the Internet. You end up finding some interesting information about your Pokémon's weaknesses.",
    })
    var poison = team.findIndex(e => contains(e.types, "poison"));
    if (poison >= 0) {
        this.options.push({
            text: "[Poison] Ask " + team[poison].name + " to brew a potion",
            effect: () => {
                createReward(true, "potion");
            },
            description: "Lots of ingredients are waiting on the shelves. Surely " + team[poison].name + " will know how to turn them into something useful.",
        })
    }
    var electric = team.findIndex(e => contains(e.types, "electric"));
    if (electric >= 0) {
        this.options.push({
            text: "[Electric] Let " + team[electric].name + " drain the power of the Center",
            effect: () => {
                for (let p of team) {
                    p.attack *= 1.05;
                    p.spattack *= 1.05;
                }
                nextEncounter();
            },
            description: team[electric].name + " connects itself to the electrical grid and starts absorbing power. After a few seconds, it shares the accumulated energy with its teammates.",
            subdescription: "Your Pokémon's attack and special attack have slighlty increased."
        })
    }
}

function Event8() {
    this.description = "You finally come out of a large forest, only to realize the bridge you were about to cross has been destroyed. The current strong, and you don't see another passage nearby.";
    this.options = [];
    this.options.push({
        text: "Go back on your steps",
        effect: () => {
            area = Math.max(0, area - 3);
            nextEncounter();
        },
        description: "You are forced to go back into the forest to try to find another path to follow. This is going to take you some time.",
        subdescription: "You have moved back."
    })
    var water = team.findIndex(e => contains(e.types, "water"));
    this.options.push({
        text: water < 0 ? "Try to swim" : "[Water] Try to swim",
        effect: () => {
            if (water < 0) {
                for (let p of team)
                    p.currenthp = Math.floor(Math.max(0, p.currenthp - .15 * p.maxhp));
                nextEncounter();
            } else
                createReward(true, "bottle_cap");
        },
        description: water < 0 ? "You dive into the river, only to realize the current is too strong for you to swim. You struggle to stay afloat, but you eventually hit a rock and lose consciousness. When you wake up, you are on the other side of the river, but your whole body aches." : "You hop on " + team[water].name + "'back and start crossing the river safely. You spot a shiny item at the bottom of the river, and dive to grab it before reaching the other river bank.",
        subdescription: water < 0 ? "Your Pokémon have lost some HP." : undefined
    })
    var ice = team.findIndex(e => contains(e.types, "ice"));
    if (ice >= 0) {
        this.options.push({
            text: "[Ice] Make " + team[ice].name + " freeze the river",
            effect: () => {
                var move = new FreezeDry();
                move.bp += 20;
                move.name += "*";
                team[ice].moves.push(move);
                nextEncounter();
            },
            description: team[ice].name + " makes the temperature drop and the water in front of you starts to freeze. You soon have a new bridge to cross.",
            subdescription: team[ice].name + " has learnt a new move."
        })
    }
    var flying = team.findIndex(e => contains(e.types, "flying"));
    if (flying >= 0) {
        this.options.push({
            text: "[Flying] Fly across the river on " + team[flying].name + "'s back",
            effect: () => {
                function getBerry() {
                    var item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    while (!item.includes('_berry') || item.includes('aguav_berry'))
                        item = heldItems[Math.floor(Math.random() * heldItems.length)];
                    return item;
                }
                createReward(true, getBerry(), getBerry(), getBerry());
            },
            description: team[flying].name + " lets you climb on its back and flies up in the air towards the other bank. From the air, you notice a large berry bush not too far away and decide to go pick up some fruits.",
        })
    }
}

function Event9() {
    this.description = "You encounter three statues representing the legendary Lake Trio of Sinnoh. Below each of them lies an inscription, inviting you to attempt their trial.";
    this.options = [];
    var pList = pokemonList.concat(bossList).concat(eventPokemonList);
    var p1 = createPokemon(pList[Math.floor(Math.random() * pList.length)]);
    var p2 = createPokemon(pList[Math.floor(Math.random() * pList.length)]);
    function isStrong(p1, p2) {
        var mul = 1;
        for (let t1 of p1.types) {
            for (let t2 of p2.types)
                mul *= typetable[types.findIndex(e => e === t1)][types.findIndex(e => e === t2)];
        }
        return mul;
    }
    function winner(p1, p2) {
        if (isStrong(p1, p2) > 1 && isStrong(p2, p1) <= 1)
            return p1;
        else if (isStrong(p1, p2) <= 1 && isStrong(p2, p1) > 1)
            return p2;
        else
            return undefined;
    }
    while (winner(p1, p2) == undefined) {
        p1 = createPokemon(pList[Math.floor(Math.random() * pList.length)]);
        p2 = createPokemon(pList[Math.floor(Math.random() * pList.length)]);
    }
    this.options.push({
        text: "Trial of knowledge",
        effect: () => {
            runEvent(new Event9a(p1, p2, winner(p1, p2)));
        },
        description: "You approach Uxie's statue and you close your eyes. You soon hear the Pokémon's voice inside your head.",
    })
    var healthy = true;
    for (let p of team)
        healthy = healthy && p.currenthp > .4 * p.maxhp;
    this.options.push({
        text: "Trial of emotion",
        effect: () => {
            if (healthy)
                for (let p of team)
                    p.maxhp = Math.floor(1.1 * p.maxhp);
            else
                for (let p of team) {
                    p.maxhp = Math.floor(.9 * p.maxhp);
                    p.currenthp = Math.min(p.currenthp, p.maxhp);
                }
            nextEncounter();
        },
        description: "You approach Mesprit's statue and you close your eyes. You soon hear the Pokémon's voice inside your head. " + (healthy ? "\"You are close to your Pokémon and take good care of them. You have earned my reward.\"" : "\"You haven't shown enough empathy towards your Pokémon. You do not deserve their strength.\""),
        subdescription: healthy ? "Your Pokémon's HP has increased." : "Your Pokémon's HP has decreased."
    })
    var revive = !flawless;
    for (let p of team)
        revive = revive && p.currenthp > 0;
    this.options.push({
        text: "Trial of willpower",
        effect: () => {
            if (revive)
                for (let p of team)
                    p.currenthp = Math.floor(Math.max(0, p.currenthp + .15 * p.maxhp));
            else
                for (let p of team)
                    p.currenthp = Math.floor(Math.max(0, p.currenthp - .1 * p.maxhp));
            nextEncounter();
        },
        description: "You approach Azelf's statue and you close your eyes. You soon hear the Pokémon's voice inside your head. " + (revive ? "\"You have proven your resilience. You have earned my reward.\"" : "\"You do not know difficulty. I will show you.\""),
        subdescription: revive ? "Your Pokémon have been healed." : "Your Pokémon have taken moderate damage."
    })
    var mew = team.findIndex(e => e.name === "Mew");
    if (mew >= 0) {
        this.options.push({
            text: "[Mew] Request the blessing of the three beings",
            effect: () => {
                createReward(true, "red_chain");
            },
            description: "Mew approaches the statues and starts communicating with them. Suddenly, a ruby chain appears out of thin air in front of the Pokémon.",
        })
    }
}

function Event9a(p1, p2, winner) {
    this.description = "\"Who would win if " + p1.name + " and " + p2.name + " were to battle?\"";
    this.options = [];
    this.options.push({
        text: p1.name,
        effect: () => {
            if (p1 === winner)
                createReward(false);
            else {
                for (let p of team)
                    p.moves.splice(Math.floor(Math.random() * p.moves.length), 1);
                nextEncounter();
            }
        },
        description: (p1 === winner) ? "\"Good answer. You have earned my reward.\"" : "\"Wrong answer! You are not worthy of your Pokémon's knowledge.\"",
        subdescription: (p1 === winner) ? undefined : "Your Pokémon have lost some of their memories."
    })
    this.options.push({
        text: p2.name,
        effect: () => {
            if (p2 === winner)
                createReward(false);
            else {
                for (let p of team)
                    p.moves.splice(Math.floor(Math.random() * p.moves.length), 1);
                nextEncounter();
            }
        },
        description: (p2 === winner) ? "Good answer. You have earned my reward." : "Wrong answer! You are not worthy of your Pokémon's knowledge.",
        subdescription: (p2 === winner) ? undefined : "Your Pokémon have lost some of their memories."
    })
}

function Event10(p1, p2, winner) {
    this.description = "You see a majestic tower in the distance. After getting closer, you also notice another burnt down tower close to it. The chime of bells resonates around them.";
    this.options = [];
    var difftypes = true;
    for (let i = 0; i < team.length; i++)
        for (let t of team[i].types)
            for (let j = i + 1; j < team.length; j++)
                difftypes = difftypes && !contains(team[j].types, t);
    this.options.push({
        text: difftypes ? "[Type variety] Enter Bell Tower" : "Enter bell tower",
        effect: () => {
            if (difftypes)
                createReward(true, "rainbow_wing");
            else
                battleEncounter(Math.random() < 1 / 3 ? "fire" : (Math.random() < .5 ? "water" : "electric"));
        },
        description: difftypes ? "You enter the tower and start climbing the stairs inside. Once you reach the top, you see nothing but an empty, dusty space. You couldn't find the bell you were hearing earlier. As you were about to leave, you notice a rainbow feather on the ground. You're certain it wasn't there before." : "You enter the tower and start climbing the stairs inside. Once you reach the top, you see nothing but an empty, dusty space. You couldn't find the bell you were hearing earlier. As you were about to leave, a wild Pokémon you scared attacks you!.",
    })
    var fire = team.findIndex(e => contains(e.types, "fire"));
    var water = team.findIndex(e => contains(e.types, "water"));
    var electric = team.findIndex(e => contains(e.types, "electric"));
    this.options.push({
        text: fire < 0 ? (water < 0 ? (electric < 0 ? "Enter Burned Tower" : "[Electric] Enter Burned Tower") : "[Water] Enter Burned Tower") : "[Fire] Enter Burned Tower",
        effect: () => {
            if (fire >= 0 || water >= 0 || electric >= 0)
                createReward(true, "silver_wing");
            else
                battleEncounter(Math.random() < 1 / 3 ? "fire" : (Math.random() < .5 ? "water" : "electric"));
        },
        description: fire < 0 && water < 0 && electric < 0 ? "You enter the tower and start climbing the stairs inside. Once you reach the top, you see nothing but an empty, dusty space. You couldn't find the bell you were hearing earlier. As you were about to leave, a wild Pokémon you scared attacks you!." : "You enter the tower and start climbing the stairs inside. Once you reach the top, you see nothing but an empty, dusty space. You couldn't find the bell you were hearing earlier. As you were about to leave, you notice a rainbow feather on the ground. You're certain it wasn't there before.",
        subdescription: (p2 === winner) ? undefined : "Your Pokémon have lost some of their memories."
    })
    var kommoo = team.findIndex(e => e.name === "Kommo-o");
    if (kommoo >= 0) {
        this.options.push({
            text: "[Kommo-o] Let Kommo-o sing along with the bells",
            effect: () => {
                for (let p of team) {
                    p.currenthp = Math.floor(Math.max(0, p.currenthp + .1 * p.maxhp));
                    p.defense *= 1.05;
                    p.spdefense *= 1.05;
                }
            },
            description: "Kommo-o starts to sing in unison with the chime echoing around you. The beautiful melody inspires your team and soothes their wounds. Suddenly, you look up to the skies but nothing seems to be there. You would have sworn two giant birds had passed right over you.",
            subdescription: "Your Pokémon have been slightly healed and their defenses have grown."
        })
    }
    var eevee = team.findIndex(e => e.name === "Eevee");
    if (eevee >= 0) {
        this.options.push({
            text: "[Eevee] Follow Eevee into the city nearby",
            effect: () => {
                var move = new ExtremeEvoboost();
                move.cost -= 1;
                move.name += "*";
                team[eevee].moves.push(move);
            },
            description: "Eevee excitedly rushes towards some of its evolutions. They all look really happy to see each other.",
            subdescription: "Eevee has learnt a new move."
        })
    }
}






/* ------------------------------------------------------ */
/* ---------------------- Tutorial ---------------------- */
/* ------------------------------------------------------ */

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


