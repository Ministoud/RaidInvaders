export class Player {
    constructor(canvas) {
        const spriteGap = 30;
        const sprite = new Image();
        sprite.src = '../../public/assets/sprites/spaceship.png';

        this.position = {
            x: window.innerWidth / 2 - sprite.width / 2,
            y: window.innerHeight - sprite.height - spriteGap,
        },
        this.velocity = {
            x: 0,
            y: 0,
        }

        sprite.onload = () => {
            const spriteScale = 1;
            this.sprite = sprite;
            this.width = sprite.width * spriteScale;
            this.height = sprite.height * spriteScale;  
        }
    }

    update(canvas) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw(canvas)
    }

    draw(canvas) {
        if (this.sprite) {
            canvas.clearRect(0, 0, canvas.width, canvas.height);
            canvas.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
        }
    }
}