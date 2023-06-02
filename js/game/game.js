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
    // Start image calculation timer at the beginning of the frame [DEBUG]
    const now = Date.now();

    requestAnimationFrame(update);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => {
        entity.update(canvasContext);
        // Check if the entity is out of the screen and remove it if so
        if (entity.position.y > canvas.height || entity.position.y < 0 || entity.position.x < 0 || entity.position.x > canvas.width) {
            eventHelper.sendEvent("removeEntity", entity);
        }

        // Handle collisions between entities
        if (entity instanceof Projectile) {
            entities.forEach(otherEntity => {
                if (entity !== otherEntity && doesOverlap(entity, otherEntity)) {
                    switch(otherEntity.constructor) {
                        case Invader:
                            if (entity.owner instanceof Player) {
                                console.log('invader hit');
                                eventHelper.sendEvent("removeEntity", entity);
                                eventHelper.sendEvent("removeEntity", otherEntity);
                            }
                            break;

                        case Player:
                            if (entity.owner instanceof Invader) {
                                console.log('player hit');
                                eventHelper.sendEvent("removeEntity", entity);
                                eventHelper.sendEvent("removeEntity", otherEntity);
                            }
                            break;

                        case Projectile:
                            if (entity.owner instanceof Invader && otherEntity.owner instanceof Player || entity.owner instanceof Player && otherEntity.owner instanceof Invader) {
                                console.log('Projectile hit');
                                eventHelper.sendEvent("removeEntity", entity);
                                eventHelper.sendEvent("removeEntity", otherEntity);
                            }
                            break;

                        default:
                            console.error(`Unknown entity type`, otherEntity.constructor);
                            break;
                    }
                }
            })
        } else if (entity instanceof Invader && doesOverlap(entity, player)) {
            eventHelper.sendEvent("removeEntity", entity);
            eventHelper.sendEvent("removeEntity", player);
        }
    });

    // Show number of entities on the screen [DEBUG]
    canvasContext.fillText(`Entities: ${entities.length}`, 10, 20);

    // Show how many ms it takes to update the canvas [DEBUG]
    canvasContext.fillText(`Update time: ${Date.now() - now}ms`, 10, 40);
}

function doesOverlap(entity1, entity2) {
    return (
        entity1.position.x < entity2.position.x + entity2.width &&
        entity1.position.x + entity1.width > entity2.position.x &&
        entity1.position.y < entity2.position.y + entity2.height &&
        entity1.position.y + entity1.height > entity2.position.y
    );
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
        // Get true index of the entity in the entities array
        const entityFound = entities.find(entity => entity === detail);
        if (entityFound) {
            entities.splice(entities.indexOf(entityFound), 1);
        }
    }, 0);
})

// Spawn a player
const player = new Player();
eventHelper.sendEvent("addEntity", player);

// Start the game
requestAnimationFrame(update);