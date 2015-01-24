var preloadRessource = function(game) {
  game.load.image('player','ressources/player/player1.png');
  game.load.atlasJSONHash('playerAnimation', 'ressources/player/playerAnimation.png', 'ressources/player/playerAnimation.json');
  game.load.image('bullet','ressources/t.png');
  game.load.image('background','ressources/background.png');
  game.load.image('frog1','ressources/frog/frog1.png');
  game.load.image('frog2','ressources/frog/frog2.png');
  game.load.image('frog3','ressources/frog/frog3.png');
  game.load.image('sol','ressources/sol.png');
  game.load.image('monster1','ressources/monster/monster1.png');
  game.load.image('animal0','ressources/animals/pangolin.png');
  game.load.image('animal1','ressources/animals/pangolin.png');
  game.load.image('animal2','ressources/animals/pangolin.png');
  game.load.image('animal3','ressources/animals/pangolin.png');
  game.load.image('animal4','ressources/animals/pangolin.png');

  game.load.physics('physicsData', 'ressources/sprites.json');
}

// floor management
var initFloor = function(game) {
  floors = game.add.group();
  for (var index = 0; index < game.world.bounds.width; index += game.width) {
    floors.create(index, game.world.bounds.height / 2, 'sol');
  }
}

// frog management
var frogRessources = ['frog1', 'frog2', 'frog3', 'frog4', 'frog5'];
var spriteFrog1;
var spriteFrog2;
var spriteFrog3;

var initFrog = function(game) {
  spriteFrog1 = game.add.sprite(0, -300, 'frog1');
  spriteFrog2 = game.add.sprite(game.width, -300, 'frog2');
  spriteFrog3 = game.add.sprite(Math.floor(Math.random() * game.width) + 400, -300, 'frog3');
}

var moveFrog = function(player, game) {
  spriteFrog1.position.x -= 20;
  spriteFrog2.position.x -= 10;
  spriteFrog3.position.x -= 15;
  if (spriteFrog1.position.x <= player.position.x - game.width - (game.width / 2)) {
    spriteFrog1.position.x = player.position.x + game.width;
  }
  if (spriteFrog2.position.x <= player.position.x - game.width - (game.width / 2)) {
    spriteFrog2.position.x = player.position.x + game.width;
  }
  if (spriteFrog3.position.x <= player.position.x - game.width - (game.width / 2)) {
    spriteFrog3.position.x = player.position.x + game.width;
  }
}
