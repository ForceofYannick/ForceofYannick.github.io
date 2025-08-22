import * as THREE from "three";
import { Size } from "./size.js";
import { Room } from "./room.js";
import { Position } from "./position.js";
import { createTextLabelPlane } from "./utils.js";
export class Floor {
    #name;
    #level;
    #position;
    #rooms;
    #size;
    #geometry;
    #material;
    #mesh;

    /**
     * 
     * @param {string} name 
     * @param {Size} size 
     * @param {number} level 
     * @param {Position} pos 
     * @param {Room[]} rooms 
     */
    constructor(name, size, level, position, rooms) {

        this.#name = name;
        this.#level = level;
        this.#position = position;
        this.#rooms = rooms;
        this.#size = size;


        this.#geometry = new THREE.BoxGeometry(size.getWidth(), 1, size.getDepth());
        this.#material = new THREE.MeshStandardMaterial({ color: 0x249ef0, flatShading: true, transparent: true, opacity: 0.8 });
        this.#mesh = new THREE.Mesh(this.#geometry, this.#material);
        this.#mesh.castShadow = true;
        this.#mesh.receiveShadow = true;

        this.#mesh.position.set(position.getX(), position.getY(), position.getZ()); 

        // Outlines
        const edges = new THREE.EdgesGeometry(this.#geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.#mesh.add(line);

        // Floor Label
        const label = createTextLabelPlane(this.getName());
        const label2 = createTextLabelPlane(this.getName());
        label.rotateY(Math.PI / 2);
        label2.rotateY(-Math.PI / 2);
        label.position.set(size.getWidth()/2+0.01, 0, 0);
        label2.position.set(-size.getWidth()/2-0.01, 0, 0);
        this.#mesh.add(label);
        this.#mesh.add(label2);
    }

    getName() {
        return this.#name;
    }

    getLevel() {
        return this.#level;
    }
    
    getPosition(){
        return this.#position;
    }

    getRooms() {
        return this.#rooms;
    }

    getSize() {
        return this.#size;
    }

    getGeometry() {
        return this.#geometry;
    }

    getMaterial() {
        return this.#material;
    }

    getMesh() {
        return this.#mesh;
    }

}