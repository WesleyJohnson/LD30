/*
 * Connected Worlds
 * Completed for Ludum Dare 30/48
 * Author: Wesley Johnson @wesleyjohnson
 */

var Game = {
  GAME_STATE_START: "start",
  GAME_STATE_PLAYING: "playing",
  GAME_STATE_LEVEL_COMPLETE: "levelComplete",
  GAME_STATE_PLAYER_DEAD: "dead",
  GAME_STATE_LEVEL_STATS: "levelStats",
  GAME_STATE_PAUSED: "paused",
  GAME_STATE_CREDITS: "credits",

  assets: {},
  generateAssets: function() {
    // sky
    var topColor = Game.p.color(39, 130, 140);
    var botColor = Game.p.color(122, 205, 220);
    Game.assets.sky = Game.p.createGraphics(40, Game.halfHeight - 40, Game.p.P2D)
    Game.assets.sky.beginDraw();
    for(var i = 0; i < Game.halfHeight - 40; i++) {
      Game.assets.sky.stroke(Game.p.lerpColor(topColor, botColor, i / (255 - 40)));
      Game.assets.sky.line(0, i, 40, i);
    }
    Game.assets.sky.endDraw();

    // dark sky
    var topColor = Game.p.color(0, 0, 0);
    var botColor = Game.p.color(50, 50, 50);
    Game.assets.darSky = Game.p.createGraphics(40, Game.halfHeight - 40, Game.p.P2D)
    Game.assets.darSky.beginDraw();
    for(var i = 0; i < Game.halfHeight - 40; i++) {
      Game.assets.darSky.stroke(Game.p.lerpColor(topColor, botColor, i / (255 - 40)));
      Game.assets.darSky.line(0, i, 40, i);
    }
    Game.assets.darSky.endDraw();

    // hero
    Game.assets.tiles = document.createElement("img");
    Game.assets.tiles.src = "assets/images/tiles.png";

    // sounds
    Game.assets.sndJump = new buzz.sound("assets/sounds/jump.mp3");
    Game.assets.sndTeleport = new buzz.sound("assets/sounds/telport.mp3");
    Game.assets.sndLevelCompleted = new buzz.sound("assets/sounds/levelcomplete.mp3");
  },

  init: function(canvas, context) {
    Game.canvas = canvas;
    Game.context = context;

    return Game.initProcessing;
  },

  initProcessing: function(processing) {
    Game.p = processing;
    Game.ms = Game.p.millis();
    Game.keys = {};
    Game.worldTime = 0;

    Game.p.setup = Game.setup;
    Game.p.draw = Game.draw;
    Game.p.keyPressed = Game.keyPressed;
    Game.p.keyReleased = Game.keyReleased;
  },

  setup: function() {
    Game.p.size(800, 600);
    Game.p.background(55);
    Game.gameState = Game.GAME_STATE_START;
    Game.halfWidth = Game.p.width >> 1;
    Game.halfHeight = Game.p.height >> 1;
    Game.generateAssets();
    Game.p.textAlign(Game.p.CENTER, Game.p.CENTER);
  },

  keyPressed: function() {
    Game.keys[Game.p.keyCode] = true;
  },

  keyReleased: function() {
    Game.keys[Game.p.keyCode] = false;
  },

  anyKey: function() {
    for(var key in Game.keys) {
      if(Game.keys.hasOwnProperty(key) && Game.keys[key] == true) {
        return true;
      }
    }

    return false;
  },

  clearInput: function() {
    Game.keys = {};
  },

  update: function(gameTime) {
    switch(Game.gameState) {
      case Game.GAME_STATE_START:
        if(Game.anyKey()) {
          Game.loadLevel(0);
        }
        break;

      case Game.GAME_STATE_PAUSED:
        if(Game.anyKey()) {
          Game.gameState = Game.GAME_STATE_PLAYING;
        }
        break;

      case Game.GAME_STATE_PLAYING:
        Game.worldTime += 1000 * gameTime;
        Game.world.update(gameTime);
        Game.player.update(gameTime);
        if(Game.anyKey()) {
          Game.notify("key");
        }
        break;

      case Game.GAME_STATE_LEVEL_COMPLETE:
        Game.levelCompleteTimer -= 1000 * gameTime;
        if(Game.levelCompleteTimer <= 0) {
          Game.levelCompleteTimer = 0;
          Game.gameState = Game.GAME_STATE_LEVEL_STATS;
        }
        break;

      case Game.GAME_STATE_LEVEL_STATS:
        if(Game.anyKey()) {
          if(Game.worldIndex === worlds.length -1) {
            Game.gameState = Game.GAME_STATE_CREDITS;
            return;
          }

          Game.loadLevel(Game.worldIndex + 1);
        }
        break;
    }
  },

  notify: function(type) {
    if(Game.world.tutorial && Game.world.tutorial.length) {
      var t = Game.world.tutorial[0];
      if(t.dismiss.type.toLowerCase() == "on" + type.toLowerCase()) {
        Game.world.tutorial.splice(0, 1);
      }
    }

    switch(type) {
      case "levelComplete":
        Game.levelComplete();
        break;

      case "death":
        Game.handleDeath();
        break;
    }
  },

  handleDeath: function() {
    Game.gameState = Game.GAME_STATE_PLAYER_DEAD;
    window.setTimeout(Game.loadLevel, 3000, Game.worldIndex);
  },

  loadLevel: function(level) {
    Game.clearInput();
    Game.worldIndex = level || 0;
    Game.world = World.loadWorld(Game.worldIndex);
    Game.player = Player.loadPlayer(Game.world.playerStart);
    Game.player.teleports = 0;
    Game.gameState = Game.GAME_STATE_PLAYING;
  },

  clearScreen: function() {
    Game.p.background(55);
  },

  levelComplete: function() {
    Game.assets.sndLevelCompleted.play();
    Game.gameState = Game.GAME_STATE_LEVEL_COMPLETE;
    Game.levelCompleteTimer = 3000;
    Game.levelCompleteText = ["Good Job!", "Great!", "Excellent!", "Well Done!", "Awesome!"][Game.p.floor(Game.p.random(5))];
  },

  drawStart: function() {
    Game.clearScreen();
    Game.p.textAlign(Game.p.CENTER, Game.p.CENTER);
    Game.p.fill(Game.p.color(255));

    Game.p.textSize(40);
    Game.p.text("Connected Worlds", Game.halfWidth, Game.halfHeight - 40);

    Game.p.textSize(18);
    Game.p.text("Staring Switch", Game.halfWidth, Game.halfHeight + 20);

    Game.p.textSize(12);
    Game.p.text("Completed for Ludum Dare #30/48", Game.halfWidth, Game.halfHeight + 50);

    Game.p.textSize(18);
    Game.p.text("Press Any Key", Game.halfWidth, Game.halfHeight + 140);

    Game.p.noFill();
    Game.p.stroke(255);
    Game.p.rect(Game.halfWidth - 100, Game.halfHeight + 140 - 20, 200, 40, 18);
  },

  drawGame: function() {
    Game.clearScreen();
    Game.p.image(Game.assets.sky, 0, 0, Game.p.width, Game.halfHeight);
    Game.p.image(Game.assets.darSky, 0, Game.halfHeight, Game.p.width, Game.halfHeight);
    Game.p.pushMatrix();
    Game.p.translate(0, 10);
    Game.world.draw();
    Game.player.draw();
    Game.p.popMatrix()
  },

  drawHUD: function() {
    //Game.p.fill(255);
    //Game.p.textSize(12);
    //Game.p.textAlign(Game.p.LEFT, Game.p.TOP);
    //Game.p.text("TIME: " + Game.p.floor(Game.worldTime / 1000), Game.p.width - 120, 20);
    //Game.p.text("TELEPORTS: " + Game.player.teleports, Game.p.width - 120, 40);

    if(Game.world.tutorial && Game.world.tutorial.length) {
      var t = Game.world.tutorial[0];
      Game.drawDialog(t.text.replace(/\[player\]/g, Game.player.name));
    }

    for(var i = 0; i < Game.player.life; i++) {
      Game.context.drawImage(Game.assets.tiles, 5 * 32, 0, 32, 32, i * 32, 0, 32, 32);
    }
  },

  drawDialog: function(text) {
    Game.p.textSize(12);
    Game.p.stroke(255);
    Game.p.fill(0, 0, 0, 160);
    Game.p.rect(200, Game.halfHeight - 50, Game.p.width - 400, 100, 8);
    Game.p.fill(255);
    Game.p.textAlign(Game.p.CENTER, Game.p.CENTER);
    Game.p.text(text, Game.halfWidth, Game.halfHeight);
  },

  drawLevelComplete: function() {
    Game.drawDialog(Game.levelCompleteText);
  },

  drawLevelStats: function() {
    Game.drawDialog("Press Any Key");
  },

  drawCredits: function() {
    Game.p.background(0);
    Game.drawDialog("THAT'S ALL..... FOR NOW\nTHANKS FOR PLAYING!\n\nFeedback: @wesleyjohnson");
  },

  draw: function() {
    // Calculate gameTime
    var cms = Game.p.millis();
    var gameTime = (cms - Game.ms) / 1000;
    Game.ms = cms;

    // Update
    Game.update(gameTime);

    // Render
    switch(Game.gameState) {
      case Game.GAME_STATE_START:
        Game.drawStart();
        break;

      case Game.GAME_STATE_PLAYING:
      case Game.GAME_STATE_PAUSED:
      case Game.GAME_STATE_LEVEL_COMPLETE:
        Game.drawGame();
        Game.drawHUD();
        if(Game.gameState == Game.GAME_STATE_LEVEL_COMPLETE) {
          Game.drawLevelComplete();
        }
        break;

      case Game.GAME_STATE_PLAYER_DEAD:
        Game.drawGame();
        Game.drawDialog("OUCH!\nYou'll have to start over.");
        break;

      case Game.GAME_STATE_LEVEL_STATS:
        Game.drawLevelStats();
        break;

      case Game.GAME_STATE_CREDITS:
        Game.drawCredits();
        break;
    }
  }
}
