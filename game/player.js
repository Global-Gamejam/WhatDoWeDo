var player;
var bullets;

var fireRate = 750;
var nextFire = 500;

var initPLayer = function(game, playerCollisionGroup, enemiesCollisionGroup) {
  player = game.add.sprite(200, game.world.height - 200, 'player');
  player.rotation = 90;
  game.physics.p2.enable(player, false);
  player.body.setCircle(28);
  player.body.fixedRotation = true;
  player.body.setCollisionGroup(playerCollisionGroup);

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.P2JS;

  bullets.createMultiple(5, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
}

var updateBullet = function(game) {
  bullets.children.forEach(function(currentBullet) {
    if (currentBullet.position.y > game.height || currentBullet.position.y < 0 ||
       currentBullet.position.x > player.position.x + game.width ||
       currentBullet.position.x < player.position.x - game.width) {
         currentBullet.kill();
       }
  });
}

var targetPlayer = function(game) {
  player.rotation = game.physics.arcade.angleToPointer(player);

  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;

    var bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.revive();
    }
    bullet.reset(player.x - 8, player.y - 8);
    game.physics.arcade.moveToPointer(bullet, 1200);
  }
}

var movePlayer = function(game, cursors) {
  player.body.setZeroVelocity();
  if (cursors.up.isDown && game.world.height - player.position.y <= game.world.height / 2) {
    player.body.moveUp(300)
  }
  else if (cursors.down.isDown) {
    player.body.moveDown(300);
  }
  if (cursors.left.isDown) {
    player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown) {
    player.body.moveRight(300);
  }
}
