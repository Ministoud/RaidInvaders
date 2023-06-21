import { Entity } from './Entity.js';

export class Projectile extends Entity {
    constructor(posX, posY, velocityY, owner) {
        const sprite = new Image();
        sprite.src = '../../public/assets/sprites/laser.png';

        sprite.onload = () => {
            const spriteScale = 1;
            this.sprite = sprite;
            this.width = sprite.width * spriteScale;
            this.height = sprite.height * spriteScale;
            // Center the sprite
            this.position.x -= this.width / 2;
        }

        const initialPosition = {
            x: posX,
            y: posY,
        };
        const initialVelocity = {
            x: 0,
            y: velocityY,
        };
        super(initialPosition, initialVelocity);

        this.owner = owner;
    }

    update(canvasContext) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw(canvasContext);
    }

    draw(canvasContext) {
        if (this.sprite) {
            canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
        }
    }
}