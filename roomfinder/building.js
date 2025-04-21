import * as THREE from "three";
import { Entity } from "./entity.js";
import { createTextLabelPlane, createBuildingOutline } from './utils.js';

export class Building extends Entity {
    #floors;        // important for visual representation of box height
    #floorArray;    // important for finding rooms

    constructor(name, floors, floorArray, groundLvlHeight = 0, optionalX, optionalY) {
        let geometry;
        if (optionalX !== undefined && optionalY !== undefined) {

            geometry = new THREE.BoxGeometry(optionalX, floors, optionalY);
        } else {

            geometry = new THREE.BoxGeometry(3, floors, 6);
        }

        const material = new THREE.MeshStandardMaterial({ color: 0x249ef0, flatShading: true, transparent: true, opacity: 0.3, depthWrite: false });
        const mesh = new THREE.Mesh(geometry, material);
        super(name, geometry, material, mesh);
        this.#floors = floors;
        this.#floorArray = floorArray;

        // add labels to the building
        const label = createTextLabelPlane(name);
        const label2 = createTextLabelPlane(name);

        label2.rotateY(Math.PI);
        if (optionalX !== undefined && optionalY !== undefined) {
            label.position.set(0, 0, optionalY / 2 + 0.01);
            label2.position.set(0, 0, -optionalY / 2 - 0.01);
        } else {
            label.position.set(0, 0, 3.01);
            label2.position.set(0, 0, -3.01);
        }

        // add outlines to the building
        const sizeX = optionalX !== undefined ? optionalX : 3;
        const sizeY = this.#floors;
        const sizeZ = optionalY !== undefined ? optionalY : 6;

        // standard groundLvlHeight is 0, but can be changed
        const outline = createBuildingOutline(sizeX, sizeY, sizeZ, groundLvlHeight);
        mesh.add(outline);

        mesh.add(label);
        mesh.add(label2);
    }

    getFloorCount() {
        return this.#floors;
    }

    getFloors() {
        return this.#floorArray;
    }

    addFloor(floorName) {
        this.#floorArray.push(floorName);
    }

    getRoom(floorName) {
        return this.#floorArray.find(floor => floor.getName() === floorName);
    }


}