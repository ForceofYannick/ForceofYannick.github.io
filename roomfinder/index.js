import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { createBuilding } from "./utils.js";
import { buildingData } from "./buildingData.js";

// Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type= THREE.PCFSoftShadowMap;
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75; //degrees
const aspect = w / h;
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


// Listen for window size to rescale the 3D window
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
camera.position.set(9, 5, 30);
controls.target.set(-10, 5, 5);
controls.update();

// Make ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3ca66b, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.position.y = -4.5;
scene.add(groundMesh);


// Construct visual buildings
const buildingArray = [];

for (const data of buildingData) {
  const { name, floors, position, size, groundLvlHeight } = data;
  const optionalX = size?.x;
  const optionalY = size?.y;
  const { building } = createBuilding(name, floors, position, scene, groundLvlHeight, optionalX, optionalY);
  buildingArray.push(building);
}


// Global vars for smooth transition to new target
let smoothTarget = new THREE.Vector3();
let targetTarget = new THREE.Vector3();

// Ready function for jquery operators
$(document).ready(() => {

  // Enter-key triggerer in html input field
  $("#roomInput").on("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      findRoom();
    }
  });

  // Button onclick function for html
  function findRoom() {

    // Get input room
    const inputRoom = $("#roomInput").val().trim().toUpperCase();
    let outputText = "";
    let roomFound = false;

    // Reset all floor colors
    for (const building of buildingArray) {
      for (const floor of building.getFloors()) {
        floor.getMaterial().color.set(0xC4D4DF); // basic color
      }
    }

    // Find and highlight matching room, set building as new camera target
    for (const building of buildingArray) {
      for (const floor of building.getFloors()) {
        for (const room of floor.getRooms()) {
          if (inputRoom === room.toUpperCase()) {
            floor.getMaterial().color.set(0xff0000);
            outputText = `Gebäude ${building.getName()}, Stockwerk ${floor.getName()}`;
            console.log("✅", outputText);
            roomFound = true;

            const data = buildingData.find(b => b.name === building.getName());

            const targetX = data?.position?.x;
            const targetY = data?.position?.y;
            const targetZ = data?.position?.z;

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

// Scene Light
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10,30,10);
sun.castShadow = true;
scene.add(sun);

sun.shadow.camera.left = -50;
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;
sun.shadow.camera.near = 0.1;
sun.shadow.camera.far = 300;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

/*
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);
*/

// Animate
function animate(t = 0) {
  requestAnimationFrame(animate);
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
/**
 * Swings the camera smooth from the current point to a target point 
 */
function swingToTarget() {
  smoothTarget.lerp(targetTarget, 0.05); // 5% approach per frame
  controls.target.copy(smoothTarget);
}

// Call animate function to work
animate();