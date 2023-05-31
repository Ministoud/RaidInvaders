import { Player } from './Player.js';

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas);

function update() {
    requestAnimationFrame(update);
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    player.update(canvasContext);
}

update();

// Detect mouse mouvement and change player's position accordingly
addEventListener('mousemove', ({ clientX }) => {
    player.position.x = clientX - player.width / 2;
});