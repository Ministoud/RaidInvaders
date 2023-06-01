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
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => {
        // Update the entity
        entity.update(canvasContext);
        // Check if the entity is out of the screen and remove it if so
        if (entity.position.y > canvas.height || entity.position.y < 0 || entity.position.x < 0 || entity.position.x > canvas.width) {
            entities.splice(entities.indexOf(entity), 1);
        }
    });
}

// Detect mouse mouvement and change player's position accordingly
addEventListener('mousemove', ({ clientX }) => {
    // Move the player horizontally with the mouse position without letting the player go out of the canvas
    if (clientX - player.width / 2 < 0) {
        player.position.x = 0;
    } else if (clientX + player.width / 2 > canvas.width) {
        player.position.x = canvas.width - player.width;
    } else {
        player.position.x = clientX - player.width / 2;
    }
});

// Detect spacebar and shoot a projectile
addEventListener('mouseup', () => {
        // Spawn a projectile
        const projectile = new Projectile(player.position.x + player.width / 2, player.position.y, -10, player);
        entities.push(projectile);
})