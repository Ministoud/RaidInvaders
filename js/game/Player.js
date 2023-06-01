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

        this.targetX = null;
        this.targetY = null;
    }

    moveTo(posX = null, posY = null) {
        this.targetX = posX !== null ? posX - this.width / 2 : null;
        this.targetY = posY !== null ? posY - this.height / 2 : null;
    }

    update(canvasContext) {
        const movementSpeed = 5;
        if (this.targetX !== null) {
            if (this.position.x > this.targetX + movementSpeed) {
                this.velocity.x = -movementSpeed;
            } else if (this.position.x < this.targetX - movementSpeed) {
                this.velocity.x = movementSpeed;
            } else {
                this.velocity.x = 0;
                this.targetX = null;
            }
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x < 0) {
            this.position.x = 0;
            this.targetX = null;
        } else if (this.position.x > canvasContext.canvas.width - this.width) {
            this.position.x = canvasContext.canvas.width - this.width;
            this.targetX = null;
        }

        this.draw(canvasContext);
    }

    draw(canvasContext) {
        if (this.sprite) {
            canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
        }
    }
}