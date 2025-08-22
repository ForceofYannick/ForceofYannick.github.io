import { Building } from "./building.js";
import { Size } from "./size.js";
import { Floor } from "./floor.js";
import { Position } from "./position.js";
import { buildingData } from './buildingData.js';
import { Room } from "./room.js";
import * as THREE from "three";

let lastFloorInBuilding = false;

/**
 * 
 * @param {string} buildingName 
 * @param {Floor[]} floors 
 * @param {Size} buildingSize 
 * @param {Position} buildingPosition 
 */
export function createBuildings() {
    const buildingArray = [];
    for (const b of buildingData) {
        console.log("Building");
        console.log(b);
        // Construct building Object
        const building = new Building(b.name, createFloorArray(b.floors));
        buildingArray.push(building);
    }
    return buildingArray;
}

function createFloorArray(buildingDataFloors) {
    const floorArray = [];
    let index =0;
    for (const f of buildingDataFloors) {

        lastFloorInBuilding = (index == buildingDataFloors.length) ? true : false ;

        // console.log("Floor");
        // console.log(f);
        const floor = new Floor(f.name, f.size, f.level, f.position, createRoomArray(f.rooms));
        floorArray.push(floor);
        index++;
    }
    return floorArray;
}

function createRoomArray(buildingDataRooms) {
    const roomArray = [];
    for (const r of buildingDataRooms) {
        // console.log("Room");
        // console.log(r);
        const room = new Room(r.name, r.x, r.y, r.size)
        roomArray.push(room);
    }
    return roomArray;
}


export function createTextLabelPlane(message, scale = 1) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    context.fillStyle = 'white';
    context.font = 'bold 650px Arial';
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