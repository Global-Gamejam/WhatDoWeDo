var player;
var bullets;
var state;
var isAnimated;
var isAnimal;
var kindAnimal;

var fireRate = 750;
var nextFire = 500;

var initPLayer = function(game, playerCollisionGroup, enemiesCollisionGroup) {
  player = game.add.sprite(200, game.world.height - 200, 'player');

  game.physics.p2.enable(player, false);
  player.body.clearShapes();
  player.body.loadPolygon('physicsData', 'player1');

  player.body.fixedRotation = true;
  player.body.setCollisionGroup(playerCollisionGroup);

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.P2JS;

  bullets.createMultiple(5, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  isAnimal = false;
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

var targetPlayer = function(game, animalCollisionGroup, bulletCollisionGroup) {
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
      bullet.body.setCircle(30);
      bullet.body.setCollisionGroup(bulletCollisionGroup);
      bullet.body.collides(animalCollisionGroup, collidesSpiritAnimal, this);
    }    
  }
}

var collidesSpiritAnimal = function(b1, b2) {
  player.body.reset(b2.sprite.x, b2.sprite.y);
  if (b2.sprite.key == "monster1") {
    kindAnimal = 1;
  }
  b2.sprite.kill();
  player.loadTexture('animal1');
  isAnimal = true;
}

var movePlayerUp = function() {player.body.moveUp(700);}
var movePlayerDown = function() {player.body.moveDown(1000);}
var movePlayerLeft = function() {player.body.moveLeft(1000);}
var movePlayerRight = function() {player.body.moveRight(700);}

var animationPlayer = function() {
  if (!isAnimated && !isAnimal) {
    if (!isAnimal) {
      player.loadTexture('playerAnimation');
      player.animations.add('run');
      player.animations.play('run', 6, true);
    }
    else {
      play.loadTexture('animal1');
    }
    isAnimated = true;
  }
}

var catchDeplacementPlayer = function(game, cursors) {
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
    player.scale.x = -1;
  }
  else if (cursors.right.isDown) {
    movePlayerRight();
    player.scale.x = 1;
  }

  if (!cursors.up.isDown && !cursors.down.isDown &&
     !cursors.left.isDown && !cursors.right.isDown) {
       if (!isAnimal) {
         player.loadTexture('player');
       }
       else {
         player.loadTexture('animal1');
       }
       isAnimated = false;
  }
  else {
    if (!isAnimal) {
      animationPlayer();
    }
    else {
      player.loadTexture('animal1');
    }
  }
}
