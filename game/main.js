var initWindow = function() {
  window.onload =  function() {

    var P2Game = {};
    var hit = 0;
    var credit = true;
    var killed = 0;


    P2Game.StateB = function (game) {
      var cursors;
    };

    P2Game.StateB.prototype = {
      preload: function () {
        preloadRessource(game);
        game.time.advancedTiming = true;
      },

      create: function () {
        killed = 0;
        background1 = game.add.sprite(0, 0, 'background');
        game.world.setBounds(0, 0, 1920, 1080 / 2);
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
        obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
        powerupCollisionGroup = game.physics.p2.createCollisionGroup();
        powerBossCollisionGroup = game.physics.p2.createCollisionGroup();

        cursors = game.input.keyboard.createCursorKeys();

        initFrog(game);
        game.add.sprite(0, game.world.bounds.height / 2, 'sol2');
        initPLayer(game, playerCollisionGroup, enemiesCollisionGroup, obstacleCollisionGroup);
        initBoss(game, playerCollisionGroup, powerupCollisionGroup, powerBossCollisionGroup);
        player.body.collides([powerupCollisionGroup, powerBossCollisionGroup]);
      },
      
      update: function () {
        // updateBullet(game);
        moveFrog(player, game);
        catchDeplacementPlayer(game, cursors);
        updateMovementBoss(game, player,  powerBossCollisionGroup, collisionPowerPlayer);
        // moveEnemies(game, cursors, player);
        // moveAnimals(game, player);
        // checkObstacles(game);
      },
      render: function () {
      }
    };

    P2Game.StateA = function (game) {
      var cursors;
      var upKey;
      var rkey;
      var tuto;

      var enemiesCollisionGroup;
      var playerCollisionGroup;
      var bulletCollisionGroup;
      var animalCollisionGroup;
      var obstacleCollisionGroup;
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
        tuto = game.add.sprite(0, 110, 'tuto');

        //tuto = game.add.sprite(0, 0, 'tuto');
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
        obstacleCollisionGroup = game.physics.p2.createCollisionGroup();

        initFrog(game);
        initFloor(game);
        initAnimals(game, bulletCollisionGroup, animalCollisionGroup);

        rkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        initPLayer(game, playerCollisionGroup, enemiesCollisionGroup, obstacleCollisionGroup);
        initEnemies(game, playerCollisionGroup, enemiesCollisionGroup, obstacleCollisionGroup);
        player.body.collides(enemiesCollisionGroup, hitEnemies, this);

        game.physics.p2.enable(player);

        cursors = game.input.keyboard.createCursorKeys();
        background1.fixedToCamera = true;
        game.camera.follow(player);


        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(gofull, this);
        initObstacle(game, obstacleCollisionGroup, playerCollisionGroup, enemiesCollisionGroup);
        initFront(game);
      },

      spiritHitsAnimal: function (body1, body2) {
        console.log("hit spirit");
      },


      actionOnClick: function() {
        tuto.kill();
      },
      update: function () {
        updateBullet(game);
        moveFrog(player, game);
        catchDeplacementPlayer(game, cursors);
        moveEnemies(game, cursors, player);
        moveAnimals(game, player);
        checkObstacles(game);


        if (killed == 5 )
          this.state.start('StateB');

        if ( rkey.justPressed(/*optional duration*/))
        {
          this.state.start('StateA');
        }
      },

      render: function () {
      }
    };


    P2Game.MENU = function (game) {

      var back;
    };

    P2Game.MENU.prototype = {

      preload: function () {
        preloadRessource(game);
        game.time.advancedTiming = true;
      },


      create: function () {

          back = game.add.sprite(0, 0, 'menu');


          emitter = game.add.emitter(1000, 600, 3000);

          //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
          emitter.makeParticles(['croiss', 'croiss', 'croiss']);

          emitter.start(false, 5000, 20);


          var start = game.add.sprite(250, 415, 'button2');
          start.anchor.set(0.5);
          start.inputEnabled = true;
          start.events.onInputDown.add(startgame, this);


          var credits = game.add.sprite(280, 500, 'button1');
          credits.anchor.set(0.5);
          credits.inputEnabled = true;
          credits.events.onInputDown.add(startcredit, this);

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.input.onDown.add(menuclick, this);
        //initFront(game);

      },


      credits: function (event) {

        console.log("click");
      },

      update: function () {
      },

      render: function () {
      }
    };


    var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, 'phaser-example');
    game.state.add('StateA', P2Game.StateA);
    game.state.add('StateB', P2Game.StateB);
    game.state.add('StateA', P2Game.StateA);
    game.state.add('MENU', P2Game.MENU);

    game.state.start('MENU');



    function startcredit (event) {

      game.add.sprite(0, 0, 'credit');
      var fleche = game.add.sprite(1770, 960, 'fleche');
      fleche.anchor.set(0.5);
      fleche.inputEnabled = true;
      fleche.events.onInputDown.add(flechefunc, event);
    }


    function flechefunc (event) {
      back = game.add.sprite(0, 0, 'menu');


      var start = game.add.sprite(250, 415, 'button2');
      start.anchor.set(0.5);
      start.inputEnabled = true;
      start.events.onInputDown.add(startgame, this);


      var credits = game.add.sprite(280, 500, 'button1');
      credits.anchor.set(0.5);
      credits.inputEnabled = true;
      credits.events.onInputDown.add(startcredit, this);
    }

    function startgame (event) {
      game.add.sprite(0, 0, 'intro');

      var intro = game.add.sprite(1770, 960, 'fleche2');
      intro.anchor.set(0.5);
      intro.inputEnabled = true;
      intro.events.onInputDown.add(introfunc, event);
      // game.scale.startFullScreen(false);
      // game.state.start('StateB');
    }


    function introfunc (event) {
      game.scale.startFullScreen(false);

      game.state.start('StateB');
    }

    // function credits (event) {
    //   game.state.start('StateA');
    //   var back = game.add.sprite(0, 0, 'player');
    //   credit = true;
    // }
    //

    // function menuclick (event) {
    //
    //   game.scale.startFullScreen(false);
    //
    // }

    function hitEnemies (body1, body2) {
      console.log("hit hitEnemies");
      hit += 1;
      console.log(hit);

      if (hit == 8)
      {
        game.add.sprite(player.position.x - 1920 / 2, 0, 'gameOver');
        // var text = "-Tu est MORT !-\n";
        // var style = { font: "120px Arial", fill: "#ff0044", align: "center" };
        // var t = game.add.text(player.x - 300,player.y - 500, text, style);
        killed = 0;
        setTimeout(function () {
          game.state.start('StateA');
        }, 1000);

      }
      console.log(body2.sprite.key);


      if (isAnimal && isJumping) {

        // body2.body.reset(player.position.x, player.position.y);

        console.log(body2.sprite.key);
        // console.log(body2.kind);

        if (body2.sprite.key == "monsterAnimation0")
          body2.sprite.loadTexture('deadmonster0');
        else if (body2.sprite.key == "monsterAnimation1")
          body2.sprite.loadTexture('deadmonster1');
        else if (body2.sprite.key == "monsterAnimation2")
          body2.sprite.loadTexture('deadmonster2');
        else
          body2.sprite.loadTexture('deadmonster3');

        body2.sprite.animations.add('runAni1');
        body2.sprite.animations.play('runAni1', 4, true);
        resetStatSpec();
        //
        setTimeout(function () {
          body2.sprite.kill();
          killed += 1;
        }, 900);
}
    }




    function gofull() {
      targetPlayer(game, animalCollisionGroup, bulletCollisionGroup);
    }

    function actionOnClick() {
      console.log("click button");
      tuto.kill();
    }

  };
}
