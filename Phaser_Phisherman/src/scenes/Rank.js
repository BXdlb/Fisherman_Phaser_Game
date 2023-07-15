import Phaser from '../lib/phaser.js'

export default class Rank extends Phaser.Scene
{
    constructor()
    {
        super('rank')
    }
    preload ()
    {
        // this.physics.start();
        this.load.image('sea', 'imgs/sea.png');

        //get rank
        const apiUrl = 'http://3.96.64.25:9090/fisherman/Rank/rankboard';
        
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            this.nicknames=[];
            this.scores=[];
            for(let i=0;i<data.data.length;i++){
                this.nicknames.push(data.data[i].nickname);
                this.scores.push(data.data[i].highest_score);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }
 
    create ()
    {
        // Add a background image
        this.add.image(650, 100, 'sea')
            .setScale(1.3);

        setTimeout(() => {
            this.add.text(
                this.game.config.width / 4,
                this.game.config.height/ 4,
                this.nicknames,
                {fontFamily: 'Arial', fontSize: '28px', fill: '#ffffff' }
                );

            this.add.text(
                this.game.config.width / 2,
                this.game.config.height/ 4,
                this.scores,
                {fontFamily: 'Arial', fontSize: '28px', fill: '#ffffff' }
                );

            this.add.text(
                this.game.config.width*3 / 4,
                this.game.config.height/ 4,
                'You highest score is '+this.registry.get('highest_score'),
                {fontFamily: 'Arial', fontSize: '28px', fill: '#ffffff' }
                );


        }, 1000);    
        

        // Add a Back button
        const back_button = this.add.text(
            this.game.config.width / 2,
            this.game.config.height *3/ 4,
            'Back',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
            back_button.setInteractive();
            

        back_button.on('pointerdown', () => {
            this.scene.stop('rank')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            });
    }
    update()
    {

    }
}