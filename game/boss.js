var boss;
var sensBoss;
var power;
var timerBoss;
var projectils;
var powerup;
var gameCut;

var initBoss = function(game, playerCollisionGroup, powerupCollisionGroup, powerBossCollisionGroup, bulletCollision) {
  boss = game.add.sprite(1920 - 500, 1080 - (1080 /3), 'boss');
  game.physics.p2.enableBody(boss, true);
  boss.body.fixedRotation = true;
  boss.body.mass = 100;
  boss.body.allowGravity = false;

  boss.body.setCircle(100);
  boss.loadTexture('bossAnimation');
  boss.animations.add('runBoss');
  boss.animations.play('runBoss', 6, true);

  projectils = game.add.group();
  projectils.enableBody = true;
  projectils.physicsBodyType = Phaser.Physics.P2JS;

  projectils.createMultiple(100, 'projectile');
  projectils.setAll('checkWorldBounds', false);
  projectils.setAll('outOfBoundsKill', true);

  
  power = 0;
  gameCut = game;
}

var collisionPowerPlayer = function(b1, b2) {
  console.log("collision");
  game.add.sprite(player.position.x - 1920 / 2, 0, 'ver');
  killed = 100;
  setTimeout(function () {
    game.state.start('StateA');
  }, 1000);
}

var collisionPowerUp = function(b1, b2) {
  console.log("powerup");
}

var generatePower = function(game,  powerBossCollisionGroup, collisionPowerPlayer) {
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
  game.physics.p2.enableBody(bullet, true);
  bullet.body.clearShapes();
  bullet.body.setCircle(25);
  bullet.body.setCollisionGroup(powerBossCollisionGroup);
  bullet.body.collides(playerCollisionGroup);
  bullet.body.move
}

var powerFunction = function(game, powerBossCollisionGroup, collisionPowerPlayer) {
  timerBoss = game.time.create(false);
  timerBoss.start();
  timerBoss.loop(2500, resetPower, this);

  generatePower(game,  powerBossCollisionGroup, collisionPowerPlayer);
  //bullet.body.setCircle(100);
}

var resetPower = function() {
  power = 0;
  timerBoss.stop();
}

var updateMovementBoss = function(game, player, powerBossCollisionGroup, collisionPowerPlayer) {
  boss.body.setZeroVelocity();
  if (power == 0 && boss.scale.x == 1) {
    boss.body.moveLeft(500);
    if (boss.position.x - 100 <= 0) {
      boss.scale.x = -1;
      power = 1;
      powerFunction(game,  powerBossCollisionGroup, collisionPowerPlayer);
      console.log("power left");
    }
  }
  if (power == 0 && boss.scale.x == -1) {
    boss.body.moveRight(500);
    if (boss.position.x + 100 >= 1920) {
      boss.scale.x = 1;
      power = 1;
      powerFunction(game,  powerBossCollisionGroup, collisionPowerPlayer);
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
