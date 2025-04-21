import * as THREE from "three";
import { Entity } from "./entity.js";
import { createTextLabelPlane } from './utils.js';

export class Floor extends Entity {
    #roomsArray;     // important for visual representation of room and for displaying details

    constructor(name, roomsArray, optionalX, optionalY) {
        let geometry;
        if (optionalX !== undefined && optionalY !== undefined) {
            geometry = new THREE.BoxGeometry(optionalX, 1, optionalY);
        } else {
            geometry = new THREE.BoxGeometry(2.8, 1, 5.8);
        }
        const material = new THREE.MeshStandardMaterial({ color: 0xC4D4DF, flatShading: true, transparent: true, opacity: 0.7 });
        const mesh = new THREE.Mesh(geometry, material);
        super(name, geometry, material, mesh);
        this.#roomsArray = roomsArray;

        const label = createTextLabelPlane(name);
        const label2 = createTextLabelPlane(name);
        if (optionalX !== undefined && optionalY !== undefined) {
            label.position.set(optionalX / 2 + 0.15, 0, 0);
            label.rotateY(Math.PI / 2);
            label2.position.set(-optionalX / 2 - 0.15, 0, 0);
            label2.rotateY(-Math.PI / 2);
        } else {
            label.position.set(1.51, 0, 0);
            label.rotateY(Math.PI / 2);
            label2.position.set(-1.51, 0, 0);
            label2.rotateY(-Math.PI / 2);
        }

        mesh.add(label);
        mesh.add(label2);
    }

    getRooms() {
        return this.#roomsArray;
    }
}