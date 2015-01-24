var enemies;
var enemie = new Array;
var enemiepos = new Array;

var initEnemies = function(game, playerCollisionGroup, enemiesCollisionGroup) {

  enemies = game.add.group();

  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.P2JS;
  enemies.setAll('checkWorldBounds', true);
  enemies.setAll('outOfBoundsKill', false);


  for (var i = 0; i < 5; i++)
  {
    enemiepos[i] = (i * 1000) + 3000;

    enemie[i] = enemies.create(enemiepos[i], game.world.height - 200, 'monster1');
    enemie[i].body.clearShapes();
    enemie[i].body.loadPolygon('physicsData', 'monster1');
    enemie[i].body.mass = 10000;
    enemie[i].body.fixedRotation = true;
    enemie[i].body.collideWorldBounds = true;
    enemie[i].body.setCollisionGroup(enemiesCollisionGroup);
    enemie[i].body.collides(playerCollisionGroup);
  }
}

var moveEnemies = function(game, cursors, player) {
 // AI

 for (var i = 0; i < enemie.length; i++)
 {
   if ( (Math.floor(Math.random() * 10)) == 1)
   {

//     console.log(enemie[i] );


      if (player.position.x < enemie[i].body.sprite.position.x) {
        enemie[i].body.sprite.scale.x = 1;
      }
      else {
        enemie[i].body.sprite.scale.x = -1;
      }


     if ((player.x > (enemiepos[i] - 1000) && player.x < (enemiepos[i] + 1000)) || enemiepos[i] == 0)
     {

       enemiepos[i] = 0;
       enemie[i].body.moveDown( (player.y -  enemie[i].y) );
       enemie[i].body.moveRight( (player.x -  enemie[i].x));
    }


   }
 }
}
