export class Entity {
    constructor(position = { x: 0, y: 0 }, velocity = { x: 0, y: 0 }) {
        this.position = position;
        this.velocity = velocity;
    }
}