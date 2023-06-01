import { Player } from './Player.js';
import { Projectile } from './Projectile.js';

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Contains all entities in the game
let entities = [];

// Start the game
requestAnimationFrame(update);

// Spawn a player
const player = new Player();
entities.push(player);

function update() {
    requestAnimationFrame(update);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => {
        // Update the entity
        entity.update(canvasContext);
        // Check if the entity is out of the screen and remove it if so
        if (entity.position.y > canvas.height || entity.position.y < 0 || entity.position.x < 0 || entity.position.x > canvas.width) {
            entities.splice(entities.indexOf(entity), 1);
        }
    });
}

// Detect mouse mouvement and change player's position accordingly without letting the player go out of the canvas
addEventListener('mousemove', ({ clientX }) => {
    player.moveTo(clientX);
});

// Detect mouse click and shoot a projectile
addEventListener('mouseup', () => {
    const projectileVelocity = -10;
    const projectile = new Projectile(player.position.x + player.width / 2, player.position.y, projectileVelocity, player);
    entities.push(projectile);
})