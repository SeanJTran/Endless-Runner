class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.audio("playbgm", "./assets/bgm.mp3")
        this.load.image('windows', './assets/Windows.png');
        this.load.image('background', './assets/background.png');
        this.load.image('character', './assets/character.png');
        this.load.image('table1', './assets/table.png');
        this.load.image('floor', './assets/invisibleFloor.png');
    }

    create() {
        //Background music
        let playBGM = {
            mute: false,
            volume: 0.5,
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
        this.floorSize = 10;

        //text Config
        let playTextConfig = {
            fontSize: '32px',
            backgroundColor: '#ffffff',
            color: '#000',
            stroke: '#000',
            strokeThickness: '4',
            align: 'left'
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

        //Create Character sprite
        this.character = this.add.sprite(borderUISize + borderPadding, game.config.height - borderPadding*2 - borderUISize, 'character');
        this.physics.add.existing(this.character);
        this.physics.add.collider(this.floor, this.character, function(){
            console.log("can jump")
            this.canJump = true;
        }, null, this);
        this.character.body.pushable = false;

        //list of obsticles
        this.textureList = ['table1'];
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
        this.timerdisplay = this.add.text(borderUISize * 17 + borderPadding, borderUISize, "Score: 69", timerConfig);
        timerConfig.fixedWidth = 0;
        this.physics.disableUpdate();
    }

    update(){
        this.spaceDown = Phaser.Input.Keyboard.JustDown(keySpace)
        if(this.spaceDown && !this.gameStart && !this.gameOver){
            console.log("Should run once");
            this.gameStart = true;
            this.physics.enableUpdate();
            this.spawnObsticle(this.textureList[0]);
            console.log("preGame");
        }

        if(this.gameStart){
            //scroll background tile
            this.bg.tilePositionX += 1;

            //player jump
            if(this.spaceDown && this.canJump){
                this.character.body.setVelocity(0, -700);
                this.canJump = false;
            }
        }

        if(this.gameOver){
            this.physics.disableUpdate();
            //add text popup here to indicate players options

            //implement button listener here to restart or menu
            //maybe spacebar is restart? following the spacebar trend
        }
    }

    //experimental method
    spawnObsticle(texture){
        this.obsticle = this.add.sprite(game.config.width, game.config.height - borderPadding*2 - borderUISize, texture).setOrigin(0,0);
        this.physics.add.existing(this.obsticle);
        this.obsticle.body.setAllowGravity(false);
        this.obsticle.body.setVelocity(-100, 0);
        this.physics.add.collider(this.character, this.obsticle, function(){
            if(!this.gameOver){
                this.gameOver = true;
                this.gameStart = false;
            }
        }, null, this);
        this.obsticle.body.pushable = false;
    }
}