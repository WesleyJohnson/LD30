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
  this.leftWalkSequence = [0, 1, 0, 2];
  this.rightWalkSequence = [3, 4, 3, 5];
  this.sequence = this.rightWalkSequence;

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
    }
  }

  this.isGrounded = function() {
    return Game.world.isColliding(this.world, this.x, this.y + this.height);
  }

  this.jump = function() {
    this.yVel -= 240;
  }

  this.update = function(gameTime) {
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
        this.imageTimer = 160;
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
        this.xVel = 0;
        newX = this.x;
      }
    }
    else if(newX < this.x)
    {
      if(Game.world.isColliding(this.world, newX - (this.width >> 1) - 1, this.y)) {
        this.xVel = 0;
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
    Game.p.noStroke();
    Game.p.fill(255);
    //Game.p.ellipse(this.x, this.getPlayerY(), this.width, this.height);

    Game.p.stroke(255);
    Game.p.noFill();
    Game.p.ellipse(this.x, this.getPlayerY(true), this.width, this.height);
    Game.p.fill(255);
    Game.p.text(this.xVel, this.x  + 50, this.y);

    Game.p.pushMatrix();
    Game.p.blend(Game.assets.guy, this.sequence[this.image] * 32, 0, 32, 32, this.x - 16, this.getPlayerY(), this.width, this.height, Game.p.BLEND );
    Game.p.popMatrix()

  }
};

Player.loadPlayer = function(playerStart) {
  return new Player(playerStart.x, playerStart.y, "norm");
}
