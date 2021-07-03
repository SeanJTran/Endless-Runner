class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        let isJumping;
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.isJumping = true;
            this.y -= 10
        }
    }
}