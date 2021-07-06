/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title: Book It!
Date Completed: 7/5/2021
Creative Tilt Justification: 
*/
let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 480,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySpace;