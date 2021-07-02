class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
    }

    create(){
      this.add.text(game.config.width/2, game.config.height/2, "Menu");
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
        this.scene.start("playScene");
      }
    }
}