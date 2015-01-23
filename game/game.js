var preloadRessource = function(game) {
  game.load.image('player','ressources/t.png');
  game.load.image('background','ressources/background.png');
  game.load.image('frog1','ressources/frog1.png');
  game.load.image('frog2','ressources/frog2.png');
  game.load.image('frog3','ressources/frog3.png');
}

var moveFrog = function(spriteFrog) {
  var frogRessources = ['frog1', 'frog2', 'frog3'];

  spriteFrog.position.x -= 20;
  if (spriteFrog.position.x <= -1920) {
    spriteFrog.loadTexture(frogRessources[Math.floor(Math.random() * 3)]);
    spriteFrog.position.x = 1920;
  }
  return spriteFrog;
}
