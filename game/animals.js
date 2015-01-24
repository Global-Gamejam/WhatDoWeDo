function Animals() {
  var kind;
  var sprite;
}

var animals;

var initAnimals = function(game) {
  animals = game.add.group();
  floors.create(500, game.world.bounds.height / 2 + 100, 'animal1');
}

var moveAnimals = function(game, player) {
  if (!animals) return;
  animals.forEach(function(currentAimal) {
    //if (currentAimal.position.x)
  });
}
