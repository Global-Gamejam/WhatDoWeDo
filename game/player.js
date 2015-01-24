var player;

var initPLayer = function(game, playerCollisionGroup, enemiesCollisionGroup) {
  player = game.add.sprite(200, game.world.height - 200, 'player');
  game.physics.p2.enable(player, false);
  player.body.setCircle(28);
  player.body.fixedRotation = true;


  player.body.setCollisionGroup(playerCollisionGroup);

  //  The ship will collide with the pandas, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
  //  When pandas collide with each other, nothing happens to them.
  // player.body.collides(enemiesCollisionGroup, hitEnemies, this);

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
