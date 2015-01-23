var preloadRessource = function(game) {
  game.load.image('player','ressources/t.png');
  game.load.image('background','ressources/background.png');
  game.load.image('frog1','ressources/frog1.png');
  game.load.image('frog2','ressources/frog2.png');
  game.load.image('frog3','ressources/frog3.png');
}


var frogRessources = ['frog1', 'frog2', 'frog3'];
var spriteFrog1;
var spriteFrog2;
var spriteFrog3;

var initFrog = function(game) {
  spriteFrog1 = game.add.sprite(0, 0, 'frog1');
  spriteFrog2 = game.add.sprite(1920, 0, 'frog2');
  spriteFrog3 = game.add.sprite(Math.floor(Math.random() * 1920) + 400, 0, 'frog2');
}

var moveFrog = function() {
  spriteFrog1.position.x -= 20;
  spriteFrog2.position.x -= 10;
  spriteFrog3.position.x -= 20;
  if (spriteFrog1.position.x <= -1920) {
    spriteFrog1.loadTexture(frogRessources[Math.floor(Math.random() * 3)]);
    spriteFrog1.position.x = 1920;
  }
  if (spriteFrog2.position.x <= -1920) {
    spriteFrog2.loadTexture(frogRessources[Math.floor(Math.random() * 3)]);
    spriteFrog2.position.x = 1920;
  }
  if (spriteFrog3.position.x <= -1920) {
    spriteFrog3.loadTexture(frogRessources[Math.floor(Math.random() * 3)]);
    spriteFrog3.position.x = Math.floor(Math.random() * 400) + 1920;
  }
}
