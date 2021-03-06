var player;
var bullets;
var state;
var isAnimated;
var isAnimal;
var kindAnimal;
var isJumping;
var fireRate = 750;
var nextFire = 500;
var timer;
var isBoss;

var speedX = 1000, speedY = 700;

var initPLayer = function(game, playerCollisionGroup, enemiesCollisionGroup) {
  player = game.add.sprite(200, game.world.height - 200, 'player');

  game.physics.p2.enable(player, false);
  player.body.clearShapes();
  player.body.loadPolygon('physicsData', 'player1');
  //player.enableBody = true;
  player.body.fixedRotation = true;
  player.body.setCollisionGroup(playerCollisionGroup);
  // player.body.allowGravity = true;
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.P2JS;

  bullets.createMultiple(5, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  isAnimal = false;
  isJumping = false;
  isBoss = false;
}

var updateBullet = function(game) {
  bullets.children.forEach(function(currentBullet) {
    if (currentBullet.position.y > game.height || currentBullet.position.y < 0 ||
       currentBullet.position.x > player.position.x + game.width / 4 ||
       currentBullet.position.x < player.position.x - game.width / 4) {
         currentBullet.kill();
       }
  });
}

var targetPlayer = function(game, animalCollisionGroup, bulletCollisionGroup, bossCollisionGroup) {
  if (!isAnimal) {
    if (game.time.now > nextFire && bullets.countDead() > 0) {
      nextFire = game.time.now + fireRate;
      var bullet = bullets.getFirstExists(false);


      if (bullet) {
        bullet.revive();
      }
      bullet.reset(player.x - 8, player.y - 8);
      bullet.body.clearShapes();
      game.physics.arcade.moveToPointer(bullet, 1200);
      bullet.body.setCircle(100);
      bullet.body.setCollisionGroup(bulletCollisionGroup);
      if (isBoss == false) {
        bullet.body.collides(animalCollisionGroup, collidesSpiritAnimal, this);
      }
      else {
        bullet.body.collides(bossCollisionGroup, collidesSpiritAnimal, this);
      }
    }
  }
  else {
    if (kindAnimal == 0) {
      player.body.reset(player.position.x, player.position.y);

      var music = game.add.audio('snd3');
      music.play();
      music.volume = 1;



      console.log("saut");
      timer = game.time.create(false);
      timer.start();
      timer.loop(2500, resetStatSpec, this);
      speedX = speedY = 2000;
      isJumping = true

      player.loadTexture('rouladeAnimation');
      player.animations.add('rouladeAnimation');
      player.animations.play('rouladeAnimation', 6, true);

      if (player.scale.x == 1) {
        player.body.moveRight(1000);
      }
      else if (player.scale.x == -1) {
        player.body.moveLeft(1000);
      }
    }
  }
}

var resetJump = function() {
  player.body.velocity.y = 200;
  player.body.setZeroVelocity();
}

var resetStatSpec = function() {
  speedX = 1000;
  speedY = 700;
  isJumping = false;
  timer.stop();
}

var collidesSpiritAnimal = function(b1, b2) {
  speedX = 1000;
  speedY = 700;
  player.body.reset(b2.sprite.x, b2.sprite.y);
  if (b2.sprite.key == "animal0") {
    kindAnimal = 0;
  }
  else if (b2.sprite.key == "animal1") {
    speedX = 2000;
    speedY = 1400;
    kindAnimal = 1;
  }
  else if (b2.sprite.key == "animal2") {
    kindAnimal = 2;
  }
  b2.sprite.kill();
  player.loadTexture('animal' + kindAnimal);
  isAnimal = true;
}

var movePlayerUp = function() {player.body.moveUp(speedY);}
var movePlayerDown = function() {player.body.moveDown(speedY);}
var movePlayerLeft = function() {player.body.moveLeft(speedX);}
var movePlayerRight = function() {player.body.moveRight(speedX);}

var animationPlayer = function() {
  if (!isAnimated) {
    if (isAnimal == false) {
      if (isBoss == false) {
        player.loadTexture('playerAnimation');
      }
      else {
        player.loadTexture('heroAnimation');
      }
      player.animations.add('run');
      player.animations.play('run', 6, true);
    }
    else {
      player.body.reset(player.position.x, player.position.y);
      player.loadTexture('animal' + kindAnimal + 'Animation');
      player.animations.add('runAni');
      player.animations.play('runAni', 6, true);
    }
    isAnimated = true;
  }
}

var catchDeplacementPlayer = function(game, cursors) {
  if (isJumping) {
    return ;
  }
  player.body.setZeroVelocity();

  if (cursors.up.isDown &&
     game.world.height - (player.position.y + player.height / 2) <= game.world.height / 2 - 100) {
    movePlayerUp();
  }
  else if (cursors.down.isDown) {
    movePlayerDown();
  }
  if (cursors.left.isDown) {
    movePlayerLeft();
    if (isAnimal && (kindAnimal == 1 || kindAnimal == 2)) {
      player.scale.x = 1;
    }
    else {
      player.scale.x = -1;
    }
  }
  else if (cursors.right.isDown) {
    movePlayerRight();
    if (isAnimal && (kindAnimal == 1 || kindAnimal == 2)) {
      player.scale.x = -1;
    }
    else {
      player.scale.x = 1;
    }
  }

  if (!cursors.up.isDown && !cursors.down.isDown &&
     !cursors.left.isDown && !cursors.right.isDown) {
       if (!isAnimal) {
         if (isBoss == false) {
           player.loadTexture('player');
         }
         else {
           player.loadTexture('hero');
         }
       }
       else {
         player.loadTexture('animal' + kindAnimal);
       }
       isAnimated = false;
  }
  else {
    animationPlayer();
  }
}
