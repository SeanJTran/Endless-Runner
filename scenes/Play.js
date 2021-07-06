class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.audio("playbgm", "./assets/bgm.mp3")
        this.load.image('windows', './assets/Windows.png');
        this.load.image('background', './assets/background.png');
        this.load.image('character', './assets/character.png');
        this.load.image('floor', './assets/invisibleFloor.png');

        this.load.image('table1', './assets/table.png');
        this.load.image('table2', './assets/table2.png');
        this.load.image('table3', './assets/table3.png');

        this.load.spritesheet('run', './assets/running.png', {frameWidth: 32, frameHeight: 64});
        this.load.image('jump', './assets/PlayerJump.png');
        
    }

    create() {
        //Background music
        let playBGM = {
            mute: false,
            volume: 0.2,
            rate: 0.9,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.sound.play("playbgm", playBGM);

        //initialize variables
        this.gameStart = false;
        this.gameOver = false;
        this.canJump = false;
        this.canSpawn = false;
        this.obsticleList = [];
        this.floorSize = 10;
        this.counter = 0;
        this.score = 0;
        this.endMenu = false;
        this.canRestart = false;

        //text Config
        this.playTextConfig = {
            fontFamily:'Helvetica',
            fontSize: '48px',
            backgroundColor: null,
            color: '#fff',
            stroke: '#000',
            strokeThickness: '3',
            align: 'left',
            padding: {
                x: 0,
                y: 0
            },

        }
        //register keyCode
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //add background tilesprites
        this.bg = this.add.tileSprite(0, 0, 720 , 480, 'background').setOrigin(0, 0);

        //invisible floor object
        this.floor = this.add.sprite(0, game.config.height - this.floorSize, 'floor').setOrigin(0,0);
        this.physics.add.existing(this.floor);
        this.floor.body.setAllowGravity(false);
        this.floor.body.setImmovable(true);


        //character animiation
        this.running = this.anims.create({
            key: 'running',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('run', {start: 0, end: 3, first: 0}),
            frameRate: 10
        })

        //Create Character sprite
        this.character = this.add.sprite(borderUISize + borderPadding, game.config.height - borderPadding*2 - borderUISize, 'run');
        this.physics.add.existing(this.character);
        this.physics.add.collider(this.floor, this.character, function(){
            this.canJump = true;
        }, null, this);
        this.character.body.pushable = false;

        //score display
        let timerConfig = {
            fontFamily: 'Garamond',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.timerdisplay = this.add.text(borderUISize * 17 + borderPadding, borderUISize, "Score: 0", timerConfig);
        timerConfig.fixedWidth = 0;
        this.physics.disableUpdate();
    }

    update(){
        this.spaceDown = Phaser.Input.Keyboard.JustDown(keySpace);
        this.timerdisplay.text = "Score: " + this.score;
        if(this.spaceDown && !this.gameStart && !this.gameOver){
            this.gameStart = true;
            this.physics.enableUpdate();
            this.character.play('running');
            //this.spawnObsticle(this.textureList[0]);
            console.log("preGame");
        }

        if(this.gameStart){
            //scroll background tile
            this.bg.tilePositionX += 1;
            //spawn obsticles
            if(this.canSpawn){
                this.canSpawn = false;
                this.obsticleList[this.counter] = this.spawnObsticle(Phaser.Math.RND.pick([
                    'table1',
                    'table2',
                    'table3'
                ]));
                this.counter++;
            }
            //canSpawn timer
            if(!this.canSpawn && !this.timer){
                this.canSpawn = true;
                this.timer = true;
                this.time.delayedCall(3000-(100*this.score), () => {
                    this.timer = false;
                });
            }

            if(this.canJump){
                this.running.resume();
            }else{
                this.running.pause();
                this.character.setTexture('jump');
            }
            //player jump
            if(this.spaceDown && this.canJump){
                this.character.body.setVelocity(0, -700);
                this.canJump = false;
                this.score += 1;
            }
        }

        if(this.gameOver){
            this.physics.disableUpdate();
            if(!this.endMenu){
                this.endMenu = true;
                //text popup here to indicate players options
                this.add.text(game.config.width/5 - 20, game.config.height/2 - 50, 'Press SPACE to restart', this.playTextConfig).setOrigin(0,0);
                this.time.delayedCall(2000, () => {
                    this.canRestart = true;
                });
            }
            //button listener here to restart
            if(this.spaceDown && this.canRestart){
                this.sound.stopAll();
                this.scene.restart();
            }
        }
    }

    //experimental method
    spawnObsticle(texture){
        this.obsticle = this.add.sprite(game.config.width, game.config.height - borderPadding*2 - borderUISize, texture).setOrigin(0,0);
        this.physics.add.existing(this.obsticle);
        this.obsticle.body.setAllowGravity(false);
        this.obsticle.body.setVelocity(-200 - (25*this.score), 0);
        this.physics.add.collider(this.character, this.obsticle, function(){
            if(!this.gameOver){
                this.gameOver = true;
                this.gameStart = false;
            }
        }, null, this);
        this.obsticle.body.pushable = false;
    }
}