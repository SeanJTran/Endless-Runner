/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title: Book It!
Date Completed: 7/5/2021

Creative Tilt Justification:

We are particularly proud of the visual style of our game (drawn in pixel art), 
and how the theme of a library really helped everything else fall in place to meet our design goal (i.e., something relaxing to play). 
In fact, the theme of a library also allowed us to implement calm, elevator music to match the overall theme of our game, 
and for us to pinpoint what mechanics we wanted to implement to complement our design goals.

We are also very proud of the scoring mechanic we implemented. For our scoring mechanic, we made it so that players will get a point 
for every time they jump. This way, players who wanted more of a challenge out of our game could choose to play more risky / greedy 
in order to get a higher score.
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
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySpace;