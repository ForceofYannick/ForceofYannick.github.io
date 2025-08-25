import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { createBuildings } from "./utils.js";

// Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75; //degrees
const aspect = w / h;
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Global vars for smooth transition to new target
let smoothTarget = new THREE.Vector3();
let targetTarget = new THREE.Vector3();


// Handle window resizing
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xCCCCC9);

// Orbit controls to move with mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Startposition of camera
camera.position.set(20, 20, 35);
controls.target.set(-10, 5, 5);
controls.update();


// Create ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3ca66b, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.position.y = -0.5;
groundMesh.renderOrder = 0;
scene.add(groundMesh);


// Create buildings
let buildingsArray = [];
buildingsArray = createBuildings();

// Add Floor mesh to scene
for (const building of buildingsArray) {
  building.getFloors().forEach(floor => {
    scene.add(floor.getMesh());
  });
}


// Scene Light
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10,20,10);
sun.castShadow = true;
sun.shadow.camera.left = -50;
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;
sun.shadow.camera.near = 0.1;
sun.shadow.camera.far = 300;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;
scene.add(sun);

// For JQuery Operators
$(document).ready(() => {

  // Enter-key triggerer in room input field
  $("#roomInput").on("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      findRoom();
    }
  });


  // "Suchen" Button onclick function
  function findRoom() {

    // Get input room
    const inputRoom = $("#roomInput").val().trim().toUpperCase();
    let outputText = "";
    let roomFound = false;

    // Reset all floor colors
    for (const building of buildingsArray) {
      for (const floor of building.getFloors()) {
        floor.getMaterial().color.set(0x249ef0); // basic color 0xC4D4DF
        floor.getMaterial().opacity =0.8;
        floor.getMaterial().emissive.set(0x000000);
        floor.getMaterial().emissiveIntensity= 0;
        floor.renderOrder = 1;
      }
    }

    // Find and highlight matching room, set building as new camera target
    for (const building of buildingsArray) {
      for (const floor of building.getFloors()) {
        for (const room of floor.getRooms()) {
          if (inputRoom === room.getName().toUpperCase()) {
            
            // Let the matching floor "glow"
            floor.getMaterial().opacity =1;
            floor.getMaterial().color.set(0xff0000);
            floor.getMaterial().emissive.set(0xff0000);
            floor.getMaterial().emissiveIntensity= 1;
            floor.renderOrder = 2;

            outputText = `Gebäude ${building.getName()}, Stockwerk ${floor.getName()}`;
            
            roomFound = true;

            console.log(floor.getPosition());
            const targetX = floor.getPosition().getX();
            const targetY = floor.getPosition().getY();
            const targetZ = floor.getPosition().getZ();

            targetTarget.set(targetX, targetY, targetZ);
            break;
          }
        }
        if (roomFound) break;
      }
      if (roomFound) break;
    }

    $("#outputElement").text(outputText || `Raum ${inputRoom} nicht gefunden`);
  }

  // Make findRoom function global to work in index.html
  window.findRoom = findRoom;
});

// Render Scene
function render(t = 0) {
  requestAnimationFrame(render);

  if (
    Math.round(smoothTarget.x) !== Math.round(targetTarget.x) ||
    Math.round(smoothTarget.y) !== Math.round(targetTarget.y) ||
    Math.round(smoothTarget.z) !== Math.round(targetTarget.z)
  ) {
    swingToTarget();
  }

  controls.update();
  renderer.render(scene, camera);
  
}

function swingToTarget() {
  smoothTarget.lerp(targetTarget, 0.05); // 5% approach per frame
  controls.target.copy(smoothTarget);
}


// call render function to work
render();