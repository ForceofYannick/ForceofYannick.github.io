import * as THREE from "three";
import { Size } from "./size.js";
export class Room {
    #name;
    #material;
    #mesh;

    /**
     * 
     * @param {string} name 
     * @param {number} x 
     * @param {number} y 
     * @param {Size} size (Optional)
     */
    constructor(name, x, y, size) {

        this.#name = name;

        const width = size.getWidth() || 1;
        const height = size.getHeight() || 1;
        const depth = size.getDepth() || 1;

        // 2D Visuals
        const geometry = new THREE.BoxGeometry(width, height, depth);
        this.#material = new THREE.MeshStandardMaterial({ color: 0x249ef0 });
        this.#mesh = new THREE.Mesh(geometry, this.#material);
        this.#mesh.castShadow = true;
        this.#mesh.receiveShadow = true;
    }

    getName() {
        return this.#name;
    }

    getMaterial() {
        return this.#material;
    }
    getMesh() {
        return this.#mesh;
    }

}