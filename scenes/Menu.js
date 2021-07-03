class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
    }

    create(){
      let menuTextConfig = {
        fontFamily: 'Courier',
        fontSize: '60px',
        backgroundColor: '#FFF', //'#000000',//#F3B141
        color: '#000',
        align: 'center',
        fontStyle: 'bold',
        strokeThickness: 0,
        stroke: '#000',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
    }

      this.add.text(game.config.width/2, game.config.height/2, "Press Space to start", menuTextConfig).setOrigin(0.5);
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
        this.scene.start("playScene");
      }
    }
}