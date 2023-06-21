import { Entity } from "./Entity.js";
import { Projectile } from "./Projectile.js";
import { EventHelper } from "../utils/EventHelper.js";

export class Invader extends Entity {
    constructor(posX) {
        const maxInitialShootTimeInMs = 1000;
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
        this.timePreviousShot = Date.now();
        this.timeBeforeNextShot = Math.random() * maxInitialShootTimeInMs;
    }

    shoot() {
        const projectileVelocity = 1;
        const maxNextShootTimeInMs = 5000;
        this.timePreviousShot = Date.now();
        this.timeBeforeNextShot = Math.random() * maxNextShootTimeInMs;

        const eventHelper = new EventHelper();
        eventHelper.sendEvent("addEntity", new Projectile(this.position.x + this.width / 2, this.position.y + this.height, projectileVelocity + this.velocity.y, this));
    }

    update(canvasContext) {
        if (Date.now() - this.timePreviousShot > this.timeBeforeNextShot) {
            this.shoot();
        }

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