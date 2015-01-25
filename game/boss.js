var boss;
var sensBoss;
var power;
var timerBoss;
var projectils;
var powerup;

var initBoss = function(game, playerCollisionGroup, powerupCollisionGroup) {
  boss = game.add.sprite(1920 - 500, 1080 - (1080 /3), 'boss');
  game.physics.p2.enableBody(boss, false);

  boss.body.fixedRotation = true;
  boss.body.mass = 100;
  boss.body.allowGravity = false;

  boss.loadTexture('bossAnimation');
  boss.animations.add('runBoss');
  boss.animations.play('runBoss', 6, true);

  projectils = game.add.group();
  projectils.enableBody = true;
  projectils.physicsBodyType = Phaser.Physics.P2JS;

  projectils.createMultiple(100, 'projectile');
  projectils.setAll('checkWorldBounds', true);
  projectils.setAll('outOfBoundsKill', true);

  powerup = game.add.sprite(1920 - 500, 1080 - (1080 /3), 't');
  powerup.loadTexture('powerupAnimation');
  powerup.animations.add('runBossUP');
  powerup.animations.play('runBossUP', 6, true);
  powerup.enableBody = true;
  game.physics.p2.enableBody(powerup, false);
  
  powerup.physicsBodyType = Phaser.Physics.P2JS;
  powerup.body.setCircle(100);
  powerup.body.setCollisionGroup(powerupCollisionGroup);
  powerup.body.collides([powerupCollisionGroup, playerCollisionGroup], collisionPowerUp, this);

  power = 0;
}

var collisionPowerUp = function(b1, b2) {
  console.log("ok");
}

var generatePower = function(game) {
  var bullet = projectils.getFirstExists(false);

  if (bullet) {
    bullet.revive();
  }
  if (boss.scale.x == 1) {
    bullet.reset(1800, 1080 - Math.floor(Math.random() * (1080 / 2) - 20));
    bullet.body.moveLeft(Math.floor(Math.random() * 400) + 900);
  }
  else {
    bullet.reset(100, 1080 - Math.floor(Math.random() * (1080 / 2) - 20));
    bullet.body.moveRight(Math.floor(Math.random() * 400) + 900);
  }
  bullet.body.clearShapes();
  bullet.body.move
}

var powerFunction = function(game) {
  timerBoss = game.time.create(false);
  timerBoss.start();
  timerBoss.loop(2500, resetPower, this);

  generatePower(game);
  generatePower(game);
  generatePower(game);
  generatePower(game);
  generatePower(game);
  //bullet.body.setCircle(100);
}

var resetPower = function() {
  power = 0;
  timerBoss.stop();
}


var updateMovementBoss = function(game, player) {
  boss.body.setZeroVelocity();
  if (power == 0 && boss.scale.x == 1) {
    boss.body.moveLeft(500);
    if (boss.position.x - 100 <= 0) {
      boss.scale.x = -1;
      power = 1;
      powerFunction(game);
      console.log("power left");
    }
  }
  if (power == 0 && boss.scale.x == -1) {
    boss.body.moveRight(500);
    if (boss.position.x + 100 >= 1920) {
      boss.scale.x = 1;
      power = 1;
      powerFunction(game);
      console.log("power right");
    }
  }
  if (power == 0) {
    if (player.position.y < boss.position.y) {
      boss.body.moveDown((player.position.y - boss.position.y) * 2);
    }
    else {
      boss.body.moveUp((boss.position.y - player.position.y) * 2);
    }
  }
}
