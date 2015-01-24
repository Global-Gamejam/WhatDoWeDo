var enemies;

var initEnemies = function(game, playerCollisionGroup, enemiesCollisionGroup) {

  enemies = game.add.group();

  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.P2JS;

  for (var i = 0; i < 4; i++)
  {
    var enemie = enemies.create(300 + (i * 100), game.world.height - 200, 'player');
    enemie.body.setRectangle(40, 40);
    enemie.body.setCollisionGroup(enemiesCollisionGroup);
    enemie.body.collides([enemiesCollisionGroup, playerCollisionGroup]);
  }
}

var moveEnemies = function(game, cursors) {
 // AI
}
