function Animals() {
  var kind;
  var sprite;
}

var animals;
var animal = new Array;

var initAnimals = function(game, bulletCollisionGroup, animalCollisionGroup) {
  animals = game.add.group();
  animals.enableBody = true;
  animals.physicsBodyType = Phaser.Physics.P2JS;
  animals.setAll('checkWorldBounds', true);
  animals.setAll('outOfBoundsKill', true);
  for (var i = 0; i < 1; i++)
  {
    animal[i] = animals.create(1500, game.world.bounds.height / 2 + 50 + (i * 80) , 'animal' + String(i));
    animal[i].body.fixedRotation = true;
    animal[i].body.clearShapes();
    animal[i].body.setRectangle(100, 100);
    animal[i].body.setCollisionGroup(animalCollisionGroup);
    animal[i].body.collides(bulletCollisionGroup);
    animal[i].body.mass = 1000000;
  }
}

var moveAnimals = function(game, player) {
  for (var i = 0; i < 1; i++)
  {
    animal[i].body.setZeroVelocity();

    if (animal[i].position.y >= player.position.y - 100 && animal[i].position.y <= player.position.y + 100) {
      if (animal[i].position.x < player.position.x && player.position.x - animal[i].position.x <= 500) {
        animal[i].body.sprite.scale.x = -1;
        animal[i].body.moveLeft(1000);
      }
      if (animal[i].position.x > player.position.x && animal[i].position.x - player.position.x <= 500) {
        animal[i].body.sprite.scale.x = 1;
        animal[i].body.moveRight(1000);
      }
    }
  }
}
