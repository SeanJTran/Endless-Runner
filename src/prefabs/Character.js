class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            
        }
    }
}