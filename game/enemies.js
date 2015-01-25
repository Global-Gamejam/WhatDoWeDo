var enemies;
var enemie = new Array;
var enemiepos = new Array;
var enemiekind = new Array;

var initEnemies = function(game, playerCollisionGroup, enemiesCollisionGroup, obstacleCollisionGroup) {

  enemies = game.add.group();

  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.P2JS;
  enemies.setAll('checkWorldBounds', true);
  enemies.setAll('outOfBoundsKill', false);


  for (var i = 0; i < 5; i++)
  {
    enemiepos[i] = (i * 1000) + 3000;
    enemiekind[i] = Math.floor(Math.random() * 3);

    var y = 1200;
    if (enemiekind[i] == 0)
      y = 700;


    enemie[i] = enemies.create(enemiepos[i], y, 'monster' + String(enemiekind[i]));
    enemie[i].body.clearShapes();
    enemie[i].body.loadPolygon('physicsData', 'monster' + String(enemiekind[i] + 1));
    enemie[i].body.mass = 1;
    enemie[i].body.fixedRotation = true;
    enemie[i].body.collideWorldBounds = true;
    enemie[i].body.setCollisionGroup(enemiesCollisionGroup);
    enemie[i].body.collides([playerCollisionGroup, obstacleCollisionGroup]);
    enemie[i].body.allowGravity = false;

    enemie[i].loadTexture('monsterAnimation' + String(enemiekind[i]));
    enemie[i].animations.add('run');
    enemie[i].animations.play('run', 6, true);

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
