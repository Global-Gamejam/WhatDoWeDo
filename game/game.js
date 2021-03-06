var preloadRessource = function(game) {
  game.load.image('player','ressources/player/player1.png');
  game.load.atlasJSONHash('playerAnimation', 'ressources/player/playerAnimation.png', 'ressources/player/playerAnimation.json');
  game.load.atlasJSONHash('monsterAnimation0', 'ressources/monster/monster1Animation.png', 'ressources/monster/monster1Animation.json');
  game.load.atlasJSONHash('monsterAnimation1', 'ressources/monster/monster2Animation.png', 'ressources/monster/monster2Animation.json');
  game.load.atlasJSONHash('monsterAnimation2', 'ressources/monster/monster3Animation.png', 'ressources/monster/monster3Animation.json');
  game.load.atlasJSONHash('monsterAnimation3', 'ressources/monster/monster4Animation.png', 'ressources/monster/monster4Animation.json');

  game.load.atlasJSONHash('bossAnimation', 'ressources/monster/boss/bossAnimation.png', 'ressources/monster/boss/bossAnimation.json');
  game.load.atlasJSONHash('animal0Animation', 'ressources/animals/animal1Animation.png', 'ressources/animals/animal1Animation.json');
  game.load.atlasJSONHash('animal1Animation', 'ressources/animals/lapinAnimation.png', 'ressources/animals/lapinAnimation.json');
  game.load.atlasJSONHash('animal2Animation', 'ressources/animals/sanglierAnimation.png', 'ressources/animals/sanglierAnimation.json');
  game.load.atlasJSONHash('rouladeAnimation', 'ressources/animals/rouladeAnimation.png', 'ressources/animals/rouladeAnimation.json');
  game.load.atlasJSONHash('heroAnimation', 'ressources/player/heroAnimation.png', 'ressources/player/heroAnimation.json');

  game.load.atlasJSONHash('deadmonster0', 'ressources/monster/deadmonster0.png', 'ressources/monster/deadmonster0.json');
  game.load.atlasJSONHash('deadmonster1', 'ressources/monster/deadmonster1.png', 'ressources/monster/deadmonster1.json');
  game.load.atlasJSONHash('deadmonster2', 'ressources/monster/deadmonster2.png', 'ressources/monster/deadmonster2.json');
  game.load.atlasJSONHash('deadmonster3', 'ressources/monster/deadmonster3.png', 'ressources/monster/deadmonster3.json');

  game.load.atlasJSONHash('powerupAnimation', 'ressources/monster/boss/powerupAnimation.png', 'ressources/monster/boss/powerupAnimation.json');

  game.load.image('hero','ressources/player/hero.png');
  game.load.image('bullet','ressources/spirit.png');
  game.load.image('front1','ressources/front1.png');
  game.load.image('front2','ressources/front2.png');
  game.load.image('background','ressources/background.png');
  game.load.image('menu','ressources/menu/menu.png');
  game.load.image('credit','ressources/menu/credits.png');
  game.load.image('intro','ressources/menu/intro.png');


  game.load.image('button1','ressources/menu/button1.png');
  game.load.image('projectile','ressources/monster/boss/projectile.png');
  game.load.image('button2','ressources/menu/button2.png');
  game.load.image('fleche','ressources/menu/fleche.png');
  game.load.image('fleche2','ressources/menu/fleche2.png');

  game.load.audio('menu', ['ressources/sounds/menu/senilek.mp3','ressources/sounds/menu/senilek.ogg']);
  game.load.audio('angel', ['ressources/sounds/game/angel.mp3','ressources/sounds/game/angel.ogg']);
  game.load.audio('boss', ['ressources/sounds/boss/boss.mp3','ressources/sounds/boss/boss.ogg']);


  game.load.audio('snd1', ['ressources/sounds/ann/lapin.ogg']);
  game.load.audio('snd2', ['ressources/sounds/game/lapin.ogg']);
  game.load.audio('snd3', ['ressources/sounds/boss/pangolin.ogg']);


  game.load.image('fiss1','ressources/obstacle/fiss1.png');
  game.load.image('fiss2','ressources/obstacle/fiss2.png');
  game.load.image('fiss3','ressources/obstacle/fiss3.png');

  game.load.image('frog1','ressources/frog/frog1.png');
  game.load.image('frog2','ressources/frog/frog2.png');
  game.load.image('frog3','ressources/frog/frog3.png');
  game.load.image('sol','ressources/sol.png');
  game.load.image('sol2','ressources/sol2.png');
  game.load.image('obstacle1','ressources/obstacle/barrières.png');
  game.load.image('obstacle2','ressources/obstacle/carton fermé.png');
  game.load.image('obstacle3','ressources/obstacle/carton.png');
  game.load.image('obstacle4','ressources/obstacle/tonneaux.png');
  game.load.image('monster1','ressources/monster/monster1.png');
  game.load.image('monster2','ressources/monster/monster2.png');
  game.load.image('monster3','ressources/monster/monster3.png');
  game.load.image('animal0','ressources/animals/pangolin.png');
  game.load.image('animal1','ressources/animals/lapin.png');
  game.load.image('animal2','ressources/animals/sanglier.png');
  game.load.image('animal3','ressources/animals/pangolin.png');
  game.load.image('animal4','ressources/animals/pangolin.png');
  game.load.image('gameOver','ressources/gameOver.png');
  game.load.image('tuto','ressources/tuto.png');
  game.load.image('croiss','ressources/croise.png');
  game.load.image('sprite','ressources/spirit.png');
  game.load.physics('physicsData', 'ressources/lapin.json');
}

var obstacles = [];
var initObstacle = function(game, obstacleCollisionGroup, playerCollisionGroup, enemiesCollisionGroup) {
  indexObstacle = 0;
  for (var index = game.width; index < game.world.bounds.width; index += game.width) {
    //if (Math.floor(Math.random() * 2) == 0) {
    ob = Math.floor(Math.random() * 3);

    currentObstacle = game.add.sprite(index, 800, 'obstacle' + (ob + 1));
    game.physics.p2.enableBody(currentObstacle, false);
    currentObstacle.body.fixedRotation = true;
    currentObstacle.body.setCollisionGroup(obstacleCollisionGroup);
    console.log(currentObstacle.body);
    currentObstacle.body.mass = 100;
    currentObstacle.body.allowGravity = false;

    currentObstacle.body.collides([playerCollisionGroup, enemiesCollisionGroup, obstacleCollisionGroup]);
    obstacles[indexObstacle] = currentObstacle;
    indexObstacle += 1;

  }
}

var emitter;
var checkObstacles = function(game) {
  index = 0;
  obstacles.forEach(function(currentObstacle) {
    if (currentObstacle.position.y < 500) {
      if (currentObstacle.body) {
        console.log("add particule ok");
        emitter = game.add.emitter(currentObstacle.position.x, currentObstacle.position.y, 50);
        emitter.makeParticles('fiss1');
        emitter.lifespan = 1400;
        emitter.start(true, 700, null, 15);
      }
      //currentObstacle.position.x = currentObstacle.position.y = -1000;
      currentObstacle.kill();
      obstacles.splice(index,index + 1);
      index++;
    }
  });
}

var initFront = function(game) {
  front = game.add.group();
  var i = 0;
  for (var index = 0; index < game.world.bounds.width; index += game.width) {
    front.create(index, 0, (i % 2 == 0) ? 'front1' : 'front2');
    i++;
  }
}

var initFrontBack = function(game) {
  front = game.add.group();
  for (var index = 0; index < game.world.bounds.width; index += game.width) {
    front.create(index, 0, 'frontBack1');
  }
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
