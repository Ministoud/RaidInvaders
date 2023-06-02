import { Player } from './Player.js';
import { Projectile } from './Projectile.js';
import { Invader } from './Invader.js';
import { EventHelper } from '../utils/EventHelper.js';

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const eventHelper = new EventHelper();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Contains all entities in the game
let entities = [];

function update() {
    requestAnimationFrame(update);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => {
        entity.update(canvasContext);
        // Check if the entity is out of the screen and remove it if so
        if (entity.position.y > canvas.height || entity.position.y < 0 || entity.position.x < 0 || entity.position.x > canvas.width) {
            eventHelper.sendEvent("removeEntity", entity);
        }
    });

    // Show number of entities on the screen
    canvasContext.fillText(`Entities: ${entities.length}`, 10, 20);
}


// Detect mouse mouvement and change player's position accordingly without letting the player go out of the canvas
eventHelper.listenEvent('mousemove', ({ clientX }) => {
    player.moveTo(clientX);
});

// Detect mouse click and shoot a projectile
eventHelper.listenEvent('mouseup', () => {
    const projectileVelocity = -10;
    const projectile = new Projectile(player.position.x + player.width / 2, player.position.y, projectileVelocity, player);
    eventHelper.sendEvent("addEntity", projectile);
})

// TEMP EVENT FOR TESTING
eventHelper.listenEvent('keydown', ({ key }) => {
    if (key === ' ') {
        const invaderPosX = Math.random() * canvas.width;
        const invader = new Invader(invaderPosX);
        eventHelper.sendEvent("addEntity", invader);
    }
});

eventHelper.listenEvent('addEntity', ({ detail }) => {
    entities.push(detail);
})

eventHelper.listenEvent('removeEntity', ({ detail }) => {
    // Avoid flickering when removing entities
    setTimeout(() => {
        entities.splice(entities.indexOf(detail), 1);
    }, 0);
})

// Spawn a player
const player = new Player();
eventHelper.sendEvent("addEntity", player);

// Start the game
requestAnimationFrame(update);