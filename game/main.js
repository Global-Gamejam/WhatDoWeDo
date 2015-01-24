var initWindow = function() {
  window.onload = function() {
    var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, '', { preload: preload, create: create, render:render, update:update});
    var cursors;

    function preload () {
      preloadRessource(game);
    }

    function create () {
      var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      logo.anchor.setTo(0.5, 0.5);

      background1 = game.add.sprite(0, 0, 'background');
      game.world.setBounds(0, 0, 10000, 1080);
      game.physics.startSystem(Phaser.Physics.P2JS);

      initFrog(game);
      initFloor(game);
      initPLayer(game);

      game.physics.p2.enable(player);

      cursors = game.input.keyboard.createCursorKeys();
      background1.fixedToCamera = true;
      game.camera.follow(player);

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.input.onDown.add(gofull, this);
    }

    function gofull() {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      }
      else {
        game.scale.startFullScreen(false);
      }
    }

    function update() {
      moveFrog(player);
      movePlayer(game, cursors);
    }

    function render() {
      game.context.fillStyle = 'rgba(255,0,0,0.6)';
      game.debug.cameraInfo(game.camera, 32, 32);
      game.debug.spriteCoords(player, 32, 500);


    }
  };
}
