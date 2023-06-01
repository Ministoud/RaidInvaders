import { Entity } from './Entity.js';

export class Player extends Entity {
    constructor() {
        const sprite = new Image();
        sprite.src = '../../public/assets/sprites/spaceship.png';

        sprite.onload = () => {
            const spriteScale = 1;
            this.sprite = sprite;
            this.width = sprite.width * spriteScale;
            this.height = sprite.height * spriteScale;  
        }

        const posXOffset = 30;
        const initialPosition = {
            x: window.innerWidth / 2 - sprite.width / 2,
            y: window.innerHeight - sprite.height - posXOffset,
        };
        const initialVelocity = {
            x: 0,
            y: 0,
        };

        super(initialPosition, initialVelocity);
    }

    update(canvas) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw(canvas);
    }

    draw(canvas) {
        if (this.sprite) {
            canvas.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
        }
    }
}