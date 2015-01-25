var boss;
var sensBoss;

var initBoss = function(game) {
  boss = game.add.sprite(1920 - 500, 1080 - (1080 /3), 'boss');


  game.physics.p2.enableBody(boss, false);

  boss.body.fixedRotation = true;
  boss.body.mass = 100;
  boss.body.allowGravity = false;


  boss.loadTexture('bossAnimation');
  boss.animations.add('runBoss');
  boss.animations.play('runBoss', 6, true);

  console.log(boss.scale.x);
}

var updateMovementBoss = function(game, player) {
  console.log(boss);

  boss.body.setZeroVelocity();
  if (boss.scale.x == 1) {
    boss.body.moveLeft(500);
    if (boss.position.x - 100 <= 0) {
      boss.scale.x = -1;
    }
  }
  if (boss.scale.x == -1) {
    boss.body.moveRight(500);
    if (boss.position.x + 100 >= 1920) {
      boss.scale.x = 1;
    }
  }

  if (player.position.y < boss.position.y) {
    boss.body.moveDown(player.position.y - boss.position.y);
  }
  else {
    boss.body.moveUp(boss.position.y - player.position.y);
  }
}
