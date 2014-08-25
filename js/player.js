/*
 * Connected Worlds
 * Completed for Ludum Dare 30/48
 * Author: Wesley Johnson @wesleyjohnson
 */


var Player = function(x, y, world) {
  this.x = x;
  this.y = y;
  this.world = world;
  this.width = 32;
  this.height = 32

  this.xVel = 0;
  this.yVel = 0;
  this.image = 0;
  this.imageTimer = 0;
  this.leftWalkSequence = [4,1,0,1,4,2,3,2];
  this.rightWalkSequence = [5,8,9,8,5,7,6,7];
  this.sequence = this.rightWalkSequence;

  this.teleports = 0;
  this.life = 3;
  this.hurtTimer = 0;

  this.name = "Switch";

  this.getTile = function(x, y) {
    if(!arguments.length) {
      x = this.x;
      y = this.y;
    }

    return {x: Game.p.floor(x / Game.world.tileSize),
            y: Game.p.floor(y / Game.world.tileSize)};
  };

  this.changeWorld = function() {
    var newWorld = this.world == "norm" ? "alt" : "norm";
    if(!Game.world.isColliding(newWorld, this.x, this.y)) {
      this.world = newWorld;
      this.teleports += 1;
      Game.assets.sndTeleport.play();
      Game.notify("teleport");
    }
  }

  this.isGrounded = function() {
    return Game.world.isColliding(this.world, this.x, this.y + this.height) && this.yVel == 0;
  }

  this.jump = function() {
    this.yVel = -275;
    Game.notify("jump");
    Game.assets.sndJump.play();
  }

  this.hurt = function(dmg, bounceDir) {
    // Can't be damaged again too quickly
    if(!this.hurtTimer > 0) {
      this.life -= dmg;
      this.hurtTimer = 2000;
    }

    if(this.life == 0) {
      Game.notify("death");
      return;
    }

    if(bounceDir >= 0) {
      switch(bounceDir) {
        case 0:
          break;

        case 1:
          this.yVel = -275;
          break;

        case 2:
          break;

        case 3:
          break;
      }
    }
  }

  this.update = function(gameTime) {
    // Update hurt hurTimer
    if(this.hurtTimer > 0) {
      this.hurtTimer -= 1000 * gameTime;
      if(this.hurtTimer <= 0) {
        this.hurtTimer = 0;
      }
    }

    // Update gravity if we're not on the ground
    if(!this.isGrounded()) {
      this.yVel += 9.8;
    }

    // Decelerate
    this.xVel *= 0.89;

    // Swap image
    if(this.isGrounded() && Game.p.abs(this.xVel) > 30) {
      this.imageTimer -= 1000 * gameTime;
      this.sequence = this.xVel < 0 ? this.leftWalkSequence : this.rightWalkSequence;
      if(this.imageTimer <= 0) {
        this.image = (this.image + 1) % this.sequence.length;
        this.imageTimer = 80;
      }
    }
    else {
      this.xVel = 0;
      this.image = 0;
      this.imageTimer = 0;
    }

    // Telport!
    if(Game.keys[32] || Game.keys[40]) {
      this.changeWorld();
      Game.keys[32] = Game.keys[40] = false;
    }

    // Move!
    if(Game.keys[39]) {
      this.xVel = 140;
    }

    if(Game.keys[37]) {
      this.xVel = -140;
    }

    // Jump!
    if(Game.keys[38]) {
      Game.keys[38] = false;
      this.isGrounded() && this.jump();
    }

    // Calculate where we would be if we applied movement
    var newX = Game.p.round(this.x + (this.xVel * gameTime));
    var newY = Game.p.round(this.y + (this.yVel * gameTime));
    this.tempNewX = newX;
    this.tempNewY = newY;

    // Only apply movement if we're not colliding
    if(newX > this.x) {
      if(Game.world.isColliding(this.world, newX + (this.width >> 1) + 1, this.y)) {
        //this.xVel = 0;
        newX = this.x;
      }
    }
    else if(newX < this.x)
    {
      if(Game.world.isColliding(this.world, newX - (this.width >> 1) - 1, this.y)) {
        //this.xVel = 0;
        newX = this.x;
      }
    }

    if(newY > this.y) {
      if(Game.world.isColliding(this.world, this.x, newY + (this.height >> 1) + 1)) {
        this.yVel = 0;
        newY = this.y;
      }
    }
    else if(newY < this.y)
    {
      if(Game.world.isColliding(this.world, this.x, newY - (this.height >> 1) - 1)) {
        this.yVel = 0;
        newY = this.y;
      }
    }

    this.x = newX;
    this.y = newY;
  };

  this.getPlayerY = function(alt) {
    if(alt) {
      return this.y + (this.world === "norm" ? Game.halfHeight : 0);
    }

    return this.y + (this.world === "norm" ? 0 : Game.halfHeight);
  };

  this.draw = function() {
    var outter = Game.p.random(3, 10);
    var lineLen = Game.p.random(10, this.width);
    Game.p.pushMatrix();
    Game.p.translate(this.x, this.getPlayerY(true));
    Game.p.rotate(Game.p.random(360));
    Game.p.noStroke();
    Game.p.fill(255, 255, 255, 50);
    Game.p.ellipse(0, 0, 5, 5);
    Game.p.stroke(255, 255, 255, 50);
    Game.p.noFill();
    Game.p.ellipse(0, 0, outter, outter);
    Game.p.fill(255, 255, 255, 50);
    Game.p.rect(-(lineLen >> 1), -1, lineLen, 1);
    Game.p.rect(-1, -(lineLen >> 1), 1, lineLen);
    Game.p.popMatrix();

    //Game.p.pushMatrix();
    if(this.hurtTimer == 0 || Game.p.floor(this.hurtTimer / 250) % 2 == 0) {
      Game.context.drawImage(Game.assets.tiles, this.sequence[this.image] * 32, 15 * 32, 32, 32, this.x - 16, this.getPlayerY() - 12, this.width, this.height);
    }
    //Game.p.popMatrix()

  }
};

Player.loadPlayer = function(playerStart) {
  return new Player(playerStart.x, playerStart.y, "norm");
}
