/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title: Book It!
Date Completed: 7/5/2021
Point Breakdown:
Submit a link to your GitHub repository (5)
Submit a playable link on GitHub pages (5)
In main.js (or equivalent), include a header with collaborator names, 
game title, date completed, and your creative tilt justification (see below) (5) 
At least one git commit per team member (5)

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