import { Player } from './Player.js';

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas);

function update() {
    requestAnimationFrame(update);
    player.update(canvasContext);
}

update();