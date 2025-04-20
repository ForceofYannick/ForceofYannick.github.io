import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import { createBuilding } from './utils.js';
import { buildingsData } from "./buildingData.js";

// Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75; //degrees
const aspect = w/h;
const near = 0.1;
const far=100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


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
camera.position.set(3,30,30);
controls.target.set(-10,5,5);
controls.update();


// Construct visual buildings
const buildingArray = [];

for (const data of buildingsData) {
  const { name, floors, position, size } = data;
  const optionalX = size?.x;
  const optionalY = size?.y;
  const { building } = createBuilding(name, floors, position, scene, optionalX, optionalY);
  buildingArray.push(building);
}

// ready function for jquery operators
$(document).ready(() => {

  // button onclick function
  function findRoom() {
    const inputRoom = $("#roomInput").val().trim().toUpperCase();
    let outputText = "";
    let roomFound = false;
  
    // reset all floor colors
    for (const building of buildingArray) {
      for (const floor of building.getFloors()) {
        floor.getMaterial().color.set(0xC4D4DF); // basic color
      }
    }
  
    // find and highlight matching room
    for (const building of buildingArray) {
      for (const floor of building.getFloors()) {
        for (const room of floor.getRooms()) {
          if (inputRoom === room.toUpperCase()) {
            floor.getMaterial().color.set(0xff0000);
            outputText = `${building.getName()}-Bau ${floor.getName()}. Stock`;
            console.log("✅", outputText);
            roomFound = true;
            break;
          }
        }
        if (roomFound) break;
      }
      if (roomFound) break;
    }
  
    $("#outputElement").text(outputText || "Raum nicht gefunden");
  }
  
  // make function global to work in index.html
  window.findRoom = findRoom;
});

// Scene Light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

// animate
function animate(t = 0){
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
  controls.update();
}

// call animate function to work
animate();