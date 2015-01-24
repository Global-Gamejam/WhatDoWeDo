function Animals() {
  var kind;
  var sprite;
}

var animals;

var initAnimals = function(game) {
  animals = game.add.group();
  animals.enableBody = true;
  animals.physicsBodyType = Phaser.Physics.P2JS;


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
    // if (currentAimal.position.y - player.position.y < 100) {
    //   currentAimal.body.moveUp(200);
    // }
    // if (currentAimal.position.y - player.position.y > 100) {
    //   currentAimal.body.moveDown(200);
    // }
  });
}
