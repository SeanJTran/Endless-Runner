class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        let bg;
        let gameStart = false;
    }
    
    preload() {
        this.load.image('windows', './assets/Windows.png');
        this.load.image('background', './assets/background.png')
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
        //register key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //add background tilesprites
        this.bg = this.add.tileSprite(0, 0, 720 , 480, 'background').setOrigin(0, 0);

        //let windows = this.add.image(10, 10, 'windows').setOrigin(0,0);
        //this.add.existing(windows);
        //this.add.text(game.config.width/2, game.config.height/2, "YooHoo",);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.gameStart = true;
        }

        if(this.gameStart){
            this.bg.tilePositionX += 2;

        }
    }
}