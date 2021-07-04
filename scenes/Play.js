class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.gameStart = false;
        this.gameOver = false;
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
        this.floorSize = 10;
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
        this.floor = this.add.sprite(0, game.config.height - this.floorSize, 'floor');
        this.physics.add.existing(this.floor);
        this.floor.body.setAllowGravity(false);
        this.floor.body.setImmovable(true);

        //Create Character sprite
        this.character = this.add.sprite(borderUISize + borderPadding, game.config.height - borderPadding*2 - borderUISize, 'character');
        this.physics.add.existing(this.character);
        this.physics.add.collider(this.floor, this.character);
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
            this.gameStart = true;
            this.physics.enableUpdate();
            this.spawnObsticle(this.textureList[0]);
            console.log("preGame");
        }

        if(this.gameStart){
            //scroll background tile
            this.bg.tilePositionX += 1;

            //player jump
            if(this.spaceDown){
                this.character.body.setVelocity(0, -700);
            }
        }

        if(this.gameOver){
            //add text popup here to indicate players options

            //implement button listener here to restart or menu
            //maybe spacebar is restart? following the spacebar trend
        }
    }

    checkCollision(sprite1, sprite2) {
        if(sprite1.x < sprite2.x + sprite2.width &&
            sprite1.x + sprite1.width > sprite2.x &&
            sprite1.y < sprite2.y + sprite2.height &&
            sprite1.height + sprite1.y > sprite2.y) {
               return true;
        } else {
            return false;
        }
    }

    endGame(){
        this.gameStart = false;
        this.gameOver = true;
    }
    //experimental method
    spawnObsticle(texture){
        this.obsticle = this.add.sprite(game.config.width, game.config.height - borderPadding*2 - borderUISize, texture).setOrigin(0,0);
        this.physics.add.existing(this.obsticle);
        this.obsticle.body.setAllowGravity(false);
        this.obsticle.body.setVelocity(-100, 0);
        this.physics.add.collider(this.character, this.obsticle, endGame);
        this.obsticle.body.pushable = false;
    }
}