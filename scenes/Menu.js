class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
      this.load.image('backgroundmenu', './assets/backgroundtitle.png')
    }

    create(){
      this.backgroundmenu = this.add.tileSprite(0, 0, 720 , 480, 'backgroundmenu').setOrigin(0, 0);
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
        this.scene.start("playScene");
      }
    }
}