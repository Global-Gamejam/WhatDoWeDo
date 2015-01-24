function Animals() {
  var kind;
  var sprite;
}

var animals;

var initAnimals = function(game) {
  animals = game.add.group();
  animals.enableBody = true;
  animals.physicsBodyType = Phaser.Physics.P2JS;
  animals.setAll('checkWorldBounds', true);
  animals.setAll('outOfBoundsKill', true);

  currentAimal = animals.create(1500, game.world.bounds.height / 2 + 100, 'animal1');
  currentAimal.body.fixedRotation = true;
  currentAimal.body.clearShapes();
}

var moveAnimals = function(game, player) {
  animals.forEach(function(currentAimal) {
    if (currentAimal.position.x - player.position.x < 300) {
      currentAimal.body.moveLeft(400);
    }
    if (currentAimal.position.x - player.position.x > 300) {
      currentAimal.body.moveRight(400);
    }
    if (currentAimal.position.x >= player.position.x - 50 && currentAimal.position.x <= player.position.x + 50 && currentAimal.position.y >= player.position.y - 150 && game.world.height - (currentAimal.position.y + currentAimal.height / 2) <= game.world.height / 2) {
      currentAimal.body.moveDown(200);
    }
    if (currentAimal.position.x >= player.position.x - 50 && currentAimal.position.x <= player.position.x + 50 && currentAimal.position.y <= player.position.y + 150) {
      currentAimal.body.moveUp(200);
    }

    // if (currentAimal.position.y - player.position.y < 100) {
    //   currentAimal.body.moveUp(200);
    // }
    // if (currentAimal.position.y - player.position.y > 100) {
    //   currentAimal.body.moveDown(200);
    // }
  });
}
