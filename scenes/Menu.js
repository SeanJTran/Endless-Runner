class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){

    }

    create(){
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.add.text(game.config.width/2, game.config.height/2, "YooHoo");
      
    }

    update(){
      if(Phaser.Input.Keyboard.JustDown(keySpace)){
        this.scene.start('playScene');
      }
    }
}