import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#gameCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Player Cube
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeo, playerMat);
scene.add(player);
player.position.z = -5;

// Obstacle
const obstacles = [];
function spawnObstacle() {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set((Math.random() - 0.5) * 10, 5, -5);
  scene.add(mesh);
  obstacles.push(mesh);
}

// Controls
let moveLeft = false, moveRight = false;
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') moveLeft = true;
  if (e.key === 'ArrowRight') moveRight = true;
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') moveLeft = false;
  if (e.key === 'ArrowRight') moveRight = false;
});

camera.position.y = 5;
camera.lookAt(0, 0, -5);

// Game Loop
let lastSpawn = 0;
function animate(time) {
  requestAnimationFrame(animate);
  const t = time * 0.001;

  if (t - lastSpawn > 1) {
    spawnObstacle();
    lastSpawn = t;
  }

  // Move player
  if (moveLeft) player.position.x -= 0.1;
  if (moveRight) player.position.x += 0.1;

  // Move obstacles
  obstacles.forEach(o => {
    o.position.y -= 0.1;
    if (o.position.y < -5) {
      scene.remove(o);
    }

    // Collision detection
    if (Math.abs(o.position.x - player.position.x) < 1 &&
        Math.abs(o.position.y - player.position.y) < 1) {
      alert('Game Over!');
      window.location.reload();
    }
  });

  renderer.render(scene, camera);
}
animate();
