var initWindow = function() {
  window.onload =  function() {

    var P2Game = {};
    var hit = 0;


    P2Game.StateA = function (game) {

    var cursors;
    var upKey;
    var rkey;


    var enemiesCollisionGroup;
    var playerCollisionGroup;
    var bulletCollisionGroup;
    var animalCollisionGroup;
  };

  P2Game.StateA.prototype = {

    preload: function () {
      preloadRessource(game);
      game.time.advancedTiming = true;
    },



  create: function () {
      var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

      logo.anchor.setTo(0.5, 0.5);

      hit = 0;
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

      rkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      initPLayer(game, playerCollisionGroup, enemiesCollisionGroup);
      initEnemies(game, playerCollisionGroup, enemiesCollisionGroup);
      player.body.collides(enemiesCollisionGroup, hitEnemies, this);

      game.physics.p2.enable(player);

      cursors = game.input.keyboard.createCursorKeys();
      background1.fixedToCamera = true;
      game.camera.follow(player);

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.input.onDown.add(gofull, this);
      initFront(game);
    },

    spiritHitsAnimal: function (body1, body2) {
        console.log("hit spirit");
    },

    update: function () {
      updateBullet(game);
      moveFrog(player, game);
      catchDeplacementPlayer(game, cursors);
      moveEnemies(game, cursors, player);
      moveAnimals(game, player);

      if ( rkey.justPressed(/*optional duration*/))
      {
        this.state.start('StateA');
      }
    },

    render: function () {
    }
};


    var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, 'phaser-example');
    game.state.add('StateA', P2Game.StateA);
    game.state.start('StateA');

   function hitEnemies (body1, body2) {
      console.log("hit hitEnemies");
      hit += 1;
      console.log(hit);

      if (hit == 3)
      {
        var text = "-Tu est MORT !-\n";
        var style = { font: "120px Arial", fill: "#ff0044", align: "center" };
        var t = game.add.text(player.x - 300,player.y - 500, text, style);
        setTimeout(function () {
          game.state.start('StateA');
        }, 1000);

      }


      if (isAnimal && isJumping) {

        // body2.body.reset(player.position.x, player.position.y);
        body2.sprite.loadTexture('deadmonster1');
        body2.sprite.animations.add('runAni1');
        body2.sprite.animations.play('runAni1', 4, true);

        setTimeout(function () {
          body2.sprite.kill();
        }, 900);
      }
    }



    function gofull() {
      game.scale.startFullScreen(false);
      targetPlayer(game, animalCollisionGroup, bulletCollisionGroup);
    }


  };
}
