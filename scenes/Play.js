class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.image('windows', './assets/Windows.png')
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
        let windows = this.add.image(0, 0, 'windows').setOrigin(0,0);
        //this.add.existing(windows);
        this.add.text(game.config.width/2, game.config.height/2, "YooHoo",);
    }

    update(){

    }
}