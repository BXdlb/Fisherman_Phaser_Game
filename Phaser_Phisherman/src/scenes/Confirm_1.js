import Phaser from '../lib/phaser.js'
import Eventbus from '../Eventbus.js';


export default class Confirm_1 extends Phaser.Scene
{
    constructor()
    {
        super('confirm_1')
    }
    init(data) {
        this.gameislaunched = data.gameislaunched;
    }
    preload ()
    {
        // this.physics.start();
        this.load.image('sea', 'imgs/sea.png');

    }
    create ()
    {
        // Add a background image
        this.add.image(650, 100, 'sea')
            .setScale(1.3);

        this.add.text(
            this.game.config.width / 6,
            this.game.config.height/ 6,
            'You are starting a new game, previous game progress will be lost.\nDo you want to continue?\n\n\nTips\nPress Down Arrow to release the fishhook\nCatch a fish can have chance to answer a question\nAnswer a question correctly can get 10 points\nYou have 18s to get 10 points at least in this level',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );


        // Add a back button
        const continue_button = this.add.text(
        this.game.config.width / 3,
        this.game.config.height *3/ 4,
        'Continue',
        {fontFamily: 'Arial', fontSize: '32px', fill: 'red' }
        );
        continue_button.setInteractive();

        // Add a Exit button
        const back_button = this.add.text(
            this.game.config.width*2 / 3,
            this.game.config.height *3/ 4,
            'Back',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
        back_button.setInteractive();
           

        continue_button.on('pointerdown', () => {
            this.scene.stop('confirm_1');
            Eventbus.emit('checkgameislaunched',true)
            this.scene.launch('game',{level:1,sum_score:0});  
        });

        back_button.on('pointerdown', () => {
            this.scene.stop('confirm_1')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            Eventbus.emit('checkgameislaunched', this.gameislaunched);
            });
    }
    update()
    {

    }
}