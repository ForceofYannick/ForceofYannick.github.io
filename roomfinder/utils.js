import * as THREE from 'three';
import { Building } from "./building.js";
import { Floor } from "./floor.js";
export function createTextLabelPlane(message, scale = 1) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    context.fillStyle = 'white';
    context.font = 'bold 100px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(1.5 * scale, 0.75 * scale);
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

export function createBuilding(name, floorData, position = { x: 0, y: 0, z: 0 }, scene, optionalX, optionalY) {
    const floors = [];
    
    for (let i = 0; i < floorData.length; i++) {
        const floorNumber = i + 1;
        const roomList = floorData[i];
        var floor;
        if(optionalX !== undefined && optionalY !== undefined){
            floor = new Floor(floorNumber, roomList, optionalX-0.2, optionalY-0.2);
        }else{
            floor = new Floor(floorNumber, roomList);
        }
        
        floor.getMesh().position.set(0, i - (floorData.length - 1) / 2, 0); // zentriert
        floor.getMesh().renderOrder = 1;
        floors.push(floor);
    }

    var building;
    if(optionalX !== undefined && optionalY !== undefined){
        building = new Building(name, floorData.length, floors, optionalX, optionalY);
    }else{
        building = new Building(name, floorData.length, floors);
    }
    const buildingMesh = building.getMesh();
    buildingMesh.position.set(position.x, position.y, position.z);
    buildingMesh.renderOrder = 0;

    scene.add(buildingMesh);

    for (const floor of floors) {
        scene.add(floor.getMesh());
        buildingMesh.add(floor.getMesh());
    }

    return { building, floors };
}
