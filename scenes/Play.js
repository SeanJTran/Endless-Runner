class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        //let bg;
        let gameStart = false;
        //let character;
    }
    
    preload() {
        this.load.image('windows', './assets/Windows.png');
        this.load.image('background', './assets/background.png');
        this.load.image('character', './assets/character.png');
        this.load.image('table1', './assets/table.png');
    }

    create() {
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

        //Create Character sprite
        this.character = new Character(this, borderUISize + borderPadding, game.config.height - borderPadding - borderUISize, 'character');
        this.physics.add.existing(this.character);
        this.character.body.setAllowGravity(false);
        //this.physics.disableUpdate();

        //list of obsticles
        this.textureList = ['table1'];
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) && !this.gameStart){
            this.gameStart = true;
            //this.physics.enableUpdate();
            this.spawnObsticle(this.textureList[0]);
        }

        if(this.gameStart){
            //scroll background tile
            this.bg.tilePositionX += 1;
            
        }
    }

    //experimental method
    spawnObsticle(texture){
        this.obsticle = this.add.sprite(game.config.width, game.config.height - borderPadding*2 - borderUISize, texture).setOrigin(0,0);
        this.physics.add.existing(this.obsticle);
        this.obsticle.body.setAllowGravity(false);
        this.obsticle.body.setVelocity(-100, 0);
    }
}