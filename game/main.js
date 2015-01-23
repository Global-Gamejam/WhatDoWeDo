var initWindow = function() {
  window.onload = function() {



    var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, render:render, update:update});
    var player;
    var cursors;

    function preload () {
      preloadRessource(game);
    }

    function create () {
      var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      logo.anchor.setTo(0.5, 0.5);

      game.world.setBounds(0, 0, 1920, 1920);
      game.physics.startSystem(Phaser.Physics.P2JS);
      player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      game.physics.p2.enable(player);
      cursors = game.input.keyboard.createCursorKeys();
      game.camera.follow(player);
      game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    }

    function update() {
      player.body.setZeroVelocity();
      if (cursors.up.isDown) {
        player.body.moveUp(300)
      }
      else if (cursors.down.isDown) {
        player.body.moveDown(300);
      }
      if (cursors.left.isDown) {
        player.body.velocity.x = -300;
      }
      else if (cursors.right.isDown) {
        player.body.moveRight(300);
      }
    }

    function render() {
      var zone = game.camera.deadzone;

      game.context.fillStyle = 'rgba(255,0,0,0.6)';
      game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

      game.debug.cameraInfo(game.camera, 32, 32);
      game.debug.spriteCoords(player, 32, 500);

    }
  };
}
