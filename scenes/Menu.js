class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){

    }

    create(){
      this.add.text(game.config.width/2, game.config.height/2, "YooHoo");
      this.scene.start('playScene');
    }

    update(){

    }
}