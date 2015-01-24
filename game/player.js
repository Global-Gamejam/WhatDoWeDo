var player;

var initPLayer = function(game, playerCollisionGroup, enemiesCollisionGroup) {
  player = game.add.sprite(200, game.world.height - 200, 'player');
  player.rotation = 90;
  game.physics.p2.enable(player, false);
  player.body.setCircle(28);
  player.body.fixedRotation = true;
  player.body.setCollisionGroup(playerCollisionGroup);
}

var targetPlayer = function(game) {
  player.rotation = game.physics.arcade.angleToPointer(player);
  if (game.input.activePointer.isDown) {
    //fire();
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
