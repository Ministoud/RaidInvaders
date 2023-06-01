import { Entity } from './Entity.js';

export class Projectile extends Entity {
    constructor(x, y, velocityY, owner) {
        const sprite = new Image();
        sprite.src = '../../public/assets/sprites/laser.png';

        sprite.onload = () => {
            const spriteScale = 0.75;
            this.sprite = sprite;
            this.width = sprite.width * spriteScale;
            this.height = sprite.height * spriteScale;
            // Center the sprite
            this.position.x -= this.width / 2;
        }

        const initialPosition = {
            x: x,
            y: y,
        };
        const initialVelocity = {
            x: 0,
            y: velocityY,
        };
        super(initialPosition, initialVelocity);

        this.owner = owner;
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