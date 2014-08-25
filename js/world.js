var worlds = [];
var nextWorld = {
  norm: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  alt: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  tutorial: [
    {
      text: "[player] has a unique ability. He can teleport between parallel worlds.\n" +
            "These worlds are very similar, but not identical. [player] can sometimes.\n" +
            "go places in one world he can't in the other. However, his position in\n" +
            "space remains connected between worlds.\n\n" +
            "Ask [player] to teleport by pressing [SPACE] or [DOWN].",
      dismiss: {
        type: "onTeleport"
     }
    },
    {
      text: "Well Done!\nTo complete each level, you must enter the portal.",
      dismiss: {
        type: "onLevelComplete"
      }
    }
  ]};
worlds.push(nextWorld);

var nextWorld = {
  norm: [
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,3,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  alt: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  tutorial: [
    {
      text: "Sometimes, when he can't get past something, [player] can\n teleport to the other world to continue moving.",
      dismiss: {
        type: "onTeleport"
     }
    },
    {
      text: "Okay, now keep moving [player] right and then teleport back\nonce he's cleard the wall.\n" +
            "You can see [player]'s spirit in the parallel world,\nthis indicates where [player] will be\nwhen he teleports back.",
      dismiss: {
        type: "onTeleport"
     }
    },
    {
      text: "Well Done!\nYou're moving right along.",
      dismiss: {
        type: "onLevelComplete"
      }
    }
  ]};
worlds.push(nextWorld);

var nextWorld = {
  norm: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,2,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  alt: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  tutorial: [
    {
      text: "[player] can also jump twice his height!\n" +
            "Use [UP] to get to higher platforms.",
      dismiss: {
        type: "onJump"
     }
    },
    {
      text: "There you go!\nNow, can you figure out how to " +
            "combine jumping and teleporting\nto get [player] to the portal?",
      dismiss: {
        type: "onLevelComplete"
      }
    }
  ]};
worlds.push(nextWorld);

var nextWorld = {
  norm: [
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,2,
    0,2,2,0,0,0,0,0,0,0,2,0,2,0,2,0,0,2,0,2,0,0,0,0,2,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,2,0,0,2,32,32,32,32,32,32,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  alt: [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,2,
    0,0,0,2,2,0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0,0,2,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,2,0,3,2,32,32,32,32,32,32,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  playerStart: {
    x: 2 * 32 + 16,
    y: 3 * 32 - 16
  },
  tutorial: [
    {
      text: "Unfortunately, [player] can't swim.\nWatch out for water!",
      dismiss: {
        type: "onJump"
     }
    }]};
worlds.push(nextWorld);

var nextWorld = {
  norm: [
    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,
    0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,0,2,
    0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,
    0,0,2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,0,0,2,
    0,0,2,0,0,2,0,0,0,0,2,32,32,32,32,32,32,32,32,32,32,32,32,32,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  alt: [
    0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,
    0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
    0,0,0,2,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,
    0,0,0,2,2,2,0,0,0,2,2,2,2,2,32,32,32,32,32,32,32,32,32,32,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  playerStart: {
    x: 0 * 32 + 16,
    y: 8 * 32 - 16
  }};
worlds.push(nextWorld)

var World = function(index) {
  this.world = worlds[index];
  this.tutorial = this.world.tutorial;
  this.normWorld = this.world.norm;
  this.altWorld = this.world.alt;
  this.len = this.normWorld.length;
  this.width = this.normWorld.length / 9;
  this.height = 9;
  this.tileSize = 32;
  this.playerStart = this.world.playerStart || {x: 0 * this.tileSize + 16,
                                                y: 7 * this.tileSize - 16};

  this.getWorld = function(w) {
    return w == "norm" ? this.normWorld : this.altWorld;
  };

  this.getTile = function(w, x, y) {
    x = Game.p.floor(x / this.tileSize);
    y = Game.p.floor(y / this.tileSize);

    var world = this.getWorld(w);
    var tile = world[y * this.width + x];

    return tile;
  }

  this.isColliding = function(w, x, y) {
    var tile = this.getTile(w, x, y);

    if(tile !== 0 && tile !== 3 && tile !== 32 && tile !== 33) {
      return 1;
    }

    return 0;
  };

  this.update = function(gameTime) {

    var tile = this.getTile(Game.player.world, Game.player.x, Game.player.y);
    if(tile === 3) {
      Game.notify("levelComplete");
    } else if(tile == 32 || tile == 33) {
      Game.player.hurt(1, 1);
    }

    for(var i = 0; i < this.len; i++) {
      var x = Game.p.floor(i % this.width);
      var y = Game.p.floor(i / this.width);
      var normTile = this.normWorld[i];
      var altTile = this.altWorld[i];

      if([32, 33].indexOf(normTile) >= 0) {
        this.normWorld[i] = Game.p.floor(Game.worldTime / 500) % 2 == 0 ? 32 : 33;
      }

      if([32, 33].indexOf(altTile) >= 0) {
        this.altWorld[i] = Game.p.floor(Game.worldTime / 500) % 2 == 0 ? 32 : 33;
      }
    }
  };

  this.highliteTile = function(t, alt) {
    var x = t.x;
    var y = t.y;
    Game.p.stroke(0, 0, 255);
    Game.p.noFill();
    if(alt) {
      Game.p.stroke(255, 0, 0);
    }
    Game.p.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    Game.p.rect(x * this.tileSize, y * this.tileSize + Game.halfHeight, this.tileSize, this.tileSize);
  }

  this.draw = function() {
    Game.p.stroke(55);

    for(var i = 0; i < this.len; i++) {
      var x = Game.p.floor(i % this.width);
      var y = Game.p.floor(i / this.width);
      var normTile = this.normWorld[i];
      var altTile = this.altWorld[i] + (16 * 32);

      if(normTile) {
        var tx = Game.p.floor(normTile % 32);
        var ty = Game.p.floor(normTile / 32);
        Game.context.drawImage(Game.assets.tiles, tx * 32, ty * 32, this.tileSize, this.tileSize, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }

      if(altTile) {
        var tx = Game.p.floor(altTile % 32);
        var ty = Game.p.floor(altTile / 32);
        Game.context.drawImage(Game.assets.tiles, tx * 32, ty * 32, this.tileSize, this.tileSize, x * this.tileSize, y * this.tileSize + Game.halfHeight, this.tileSize, this.tileSize);
      }
    }
  }
};

World.loadWorld = function(index) {
  return new World(index);
}
