var Game = {
  GAME_STATE_START: "start",
  GAME_STATE_PLAYING: "playing",
  GAME_STATE_PAUSED: "paused",

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

    // hero
    Game.assets.guy = Game.p.loadImage("assets/images/guy.png");
  },

  init: function(processing) {
    Game.p = processing;
    Game.ms = Game.p.millis();
    Game.keys = {};

    Game.p.setup = function() {
      Game.p.size(800, 600);
      Game.p.background(55);
      Game.gameState = Game.GAME_STATE_START;
      Game.halfWidth = Game.p.width >> 1;
      Game.halfHeight = Game.p.height >> 1;
      Game.generateAssets();
    };

    Game.p.keyPressed = function() {
      Game.keys[Game.p.keyCode] = true;
    };

    Game.p.keyReleased = function() {
      Game.keys[Game.p.keyCode] = false;
    };

    Game.anyKey = function() {
      for(var key in Game.keys) {
        if(Game.keys.hasOwnProperty(key) && Game.keys[key] == true) {
          return true;
        }
      }

      return false;
    };

    Game.clearInput = function() {
      Game.keys = {};
    };

    Game.p.update = function(gameTime) {
      switch(Game.gameState) {
        case Game.GAME_STATE_START:
          //if(Game.anyKey()) {
            Game.loadGame();
          //}
          break;

        case Game.GAME_STATE_PAUSED:
          if(Game.anyKey()) {
            Game.gameState = Game.GAME_STATE_PLAYING;
          }
          break;

        case Game.GAME_STATE_PLAYING:
          Game.world.update(gameTime);
          Game.player.update(gameTime);
          break;
      }
    };

    Game.loadGame = function() {
      Game.clearInput();
      Game.world = World.loadWorld(0);
      Game.player = Player.loadPlayer(Game.world.playerStart);
      Game.gameState = Game.GAME_STATE_PLAYING;
    };

    Game.clearScreen = function() {
      Game.p.background(55);
    }

    Game.drawStart = function() {
      Game.clearScreen();
      Game.p.textAlign(Game.p.CENTER, Game.p.CENTER);
      Game.p.fill(Game.p.color(255));
      Game.p.textSize(40);
      Game.p.text("CONNECTED WORLDS\n#LD30", Game.halfWidth, Game.halfHeight);
      Game.p.textSize(18);

      Game.p.text("Press Any Key", Game.halfWidth, Game.halfHeight + 100);
      Game.p.noFill();
      Game.p.stroke(255);
      Game.p.rect(Game.halfWidth - 100, Game.halfHeight + 100 - 20, 200, 40, 18);
    };

    Game.drawGame = function() {
      Game.clearScreen();
      Game.p.image(Game.assets.sky, 0, 0, Game.p.width, Game.halfHeight);
      Game.p.image(Game.assets.sky, 0, Game.halfHeight, Game.p.width, Game.halfHeight);
      Game.p.pushMatrix();
      Game.p.translate(0, 10);
      Game.world.draw();
      Game.player.draw();
      Game.p.popMatrix()
    };

    Game.p.draw = function() {
      // Calculate gameTime
      var cms = Game.p.millis();
      var gameTime = (cms - Game.ms) / 1000;
      Game.ms = cms;

      // Update
      Game.p.update(gameTime);

      // Render
      switch(Game.gameState) {
        case Game.GAME_STATE_START:
          Game.drawStart();
          break;

        case Game.GAME_STATE_PLAYING:
        case GAME_STATE_PAUSED:
          Game.drawGame();
          break;
      }
    };
  }
}
