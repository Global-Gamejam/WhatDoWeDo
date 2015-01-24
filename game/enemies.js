var enemies;
var enemie = new Array;

var initEnemies = function(game, playerCollisionGroup, enemiesCollisionGroup) {

  enemies = game.add.group();

  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.P2JS;

  for (var i = 0; i < 1; i++)
  {
    enemie[i] = enemies.create(1000 + (i * 100), game.world.height - 200, 'monster1');

    enemie[i].body.clearShapes();
    enemie[i].body.loadPolygon('physicsData', 'monster1');

    enemie[i].body.fixedRotation = true;


    // enemie[i].body.setRectangle(40, 40);
    enemie[i].body.setCollisionGroup(enemiesCollisionGroup);
    enemie[i].body.collides( playerCollisionGroup);
  }
}

var moveEnemies = function(game, cursors) {
 // AI
 for (var i = 0; i < 4; i++)
 {
  //  console.log(Math.floor(Math.random() * 10));
  if ( (Math.floor(Math.random() * 25)) == 1)
  {
    enemie[i].body.moveDown( (player.y -  enemie[i].y) );
    enemie[i].body.moveRight( (player.x -  enemie[i].x));
  }


    // enemie[i].position = player.y - enemie[i].y;
    // enemie[i].position = player.x -  enemie[i].x;
  }

}
