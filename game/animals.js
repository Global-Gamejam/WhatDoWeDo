function Animals() {
  var kind;
  var sprite;
}

var animals;

var initAnimals = function(game, bulletCollisionGroup, animalCollisionGroup) {
  animals = game.add.group();
  animals.enableBody = true;
  animals.physicsBodyType = Phaser.Physics.P2JS;
  animals.setAll('checkWorldBounds', true);
  animals.setAll('outOfBoundsKill', true);

  currentAimal = animals.create(1500, game.world.bounds.height / 2 + 200, 'animal1');
  currentAimal.body.fixedRotation = true;
  currentAimal.body.clearShapes();
  currentAimal.body.setCollisionGroup(animalCollisionGroup);
  currentAimal.body.collides(bulletCollisionGroup);
}

var moveAnimals = function(game, player) {
  animals.forEach(function(currentAimal) {
    currentAimal.body.setZeroVelocity();

    if (currentAimal.position.y >= player.position.y - 100 && currentAimal.position.y <= player.position.y + 100) {
      if (currentAimal.position.x < player.position.x && player.position.x - currentAimal.position.x <= 400) {
        currentAimal.body.moveLeft(800);
      }
      if (currentAimal.position.x > player.position.x && currentAimal.position.x - player.position.x <= 400) {
        currentAimal.body.moveRight(800);
      }
    }
  });
}
