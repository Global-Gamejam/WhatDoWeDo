var initWindow = function() {
  window.onload = function() {
    var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, '', { preload: preload, create: create, render:render, update:update});
    var cursors;
    var upKey;

    var enemiesCollisionGroup;
    var playerCollisionGroup;
    var bulletCollisionGroup;
    var animalCollisionGroup;

    function preload () {
      preloadRessource(game);
      game.time.advancedTiming = true;
    }

    function create () {
      var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      logo.anchor.setTo(0.5, 0.5);

      background1 = game.add.sprite(0, 0, 'background');
      game.world.setBounds(0, 0, 10000, 1080 / 2);
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.setImpactEvents(true);
      game.physics.p2.restitution = 0.1;
      game.physics.p2.updateBoundsCollisionGroup();
      game.physics.arcade.enableBody(this);
      game.physics.arcade.gravity.y = 500;

      enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
      playerCollisionGroup = game.physics.p2.createCollisionGroup();
      bulletCollisionGroup = game.physics.p2.createCollisionGroup();
      animalCollisionGroup = game.physics.p2.createCollisionGroup();

      initFrog(game);
      initFloor(game);
      initAnimals(game, bulletCollisionGroup, animalCollisionGroup);

      initPLayer(game, playerCollisionGroup, enemiesCollisionGroup);
      initEnemies(game, playerCollisionGroup, enemiesCollisionGroup);
      player.body.collides(enemiesCollisionGroup, hitEnemies, this);

      game.physics.p2.enable(player);

      cursors = game.input.keyboard.createCursorKeys();
      background1.fixedToCamera = true;
      game.camera.follow(player);

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.input.onDown.add(gofull, this);
    }

    function spiritHitsAnimal(body1, body2) {
      console.log("hit spirit");
    }

    function hitEnemies(body1, body2) {
      console.log("hit hitEnemies");

    }

    function gofull() {
      game.scale.startFullScreen(false);
      targetPlayer(game, animalCollisionGroup, bulletCollisionGroup);
    }

    function update() {
      updateBullet(game);
      moveFrog(player, game);
      catchDeplacementPlayer(game, cursors);
      moveEnemies(game, cursors, player);
      moveAnimals(game, player);
    }

    function render() {
      game.debug.text( game.time.fps, 10, 30 );
      game.context.fillStyle = 'rgba(255,0,0,0.6)';
      game.debug.cameraInfo(game.camera, 32, 32);
      game.debug.spriteCoords(player, 32, 500);
    }
  };
}
