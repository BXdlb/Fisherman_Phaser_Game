import Phaser from '../lib/phaser.js'


export default class Confirm_4 extends Phaser.Scene
{
    constructor()
    {
        super('confirm_4')
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
            this.game.config.height/ 4,
            'Would you like to exit the game? \nYou current score will be uploaded automatically!',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );


        // Add a back button
        const exit_button = this.add.text(
        this.game.config.width / 3,
        this.game.config.height *3/ 4,
        'Exit Anyway',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        exit_button.setInteractive();

        // Add a Exit button
        const back_button = this.add.text(
            this.game.config.width*2 / 3,
            this.game.config.height *3/ 4,
            'Back',
            {fontFamily: 'Arial', fontSize: '32px', fill: 'red' }
            );
        back_button.setInteractive();
           

        exit_button.on('pointerdown', () => {

            let userid = this.registry.get('Userid');
            let thisgame_score=this.registry.get('Thisgame_score');
            fetch('http://3.96.64.25:9090/fisherman/GPT/updateScoreAndTime', {
                method: 'PUT', // or 'PUT', depending on the API specification
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userid,
                    score: thisgame_score,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Score and time updated successfully:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.scene.stop('confirm_4');
            this.game.destroy(true);
        });

        back_button.on('pointerdown', () => {
            this.scene.stop('confirm_4')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            });
    }
    update()
    {

    }
}