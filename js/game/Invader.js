import { Entity } from "./Entity.js";

export class Invader extends Entity {
    constructor(posX) {
        const sprite = new Image();
        sprite.src = "../../public/assets/sprites/invader.png";

        sprite.onload = () => {
            const spriteScale = 1.5;
            this.sprite = sprite;
            this.width = sprite.width * spriteScale;
            this.height = sprite.height * spriteScale;  
        }

        const initialPosition = {
            x: posX,
            y: 0,
        };
        const initialVelocity = {
            x: 0,
            y: 1,
        };
        super(initialPosition, initialVelocity);
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