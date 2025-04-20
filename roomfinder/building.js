import * as THREE from "three";
import { Entity } from "./entity.js";
import { createTextLabelPlane } from './utils.js';

export class Building extends Entity {
    #floors;        // important for visual representation of box height
    #floorArray;    // important for finding rooms

    constructor(name, floors, floorArray, optionalX, optionalY) {
        let geometry;
        if(optionalX !== undefined && optionalY !== undefined){
            
            geometry = new THREE.BoxGeometry(optionalX, floors, optionalY);
        }else{
            
            geometry = new THREE.BoxGeometry(3, floors, 6);
        }
        
        const material = new THREE.MeshStandardMaterial({ color: 0x249ef0, flatShading: true, transparent: true, opacity: 0.3, depthWrite: false });
        const mesh = new THREE.Mesh(geometry, material);
        super(name, geometry, material, mesh);
        this.#floors = floors;
        this.#floorArray = floorArray;

        const label = createTextLabelPlane(name);
        const label2 = createTextLabelPlane(name);
        label2.rotateY(Math.PI);
        if(optionalX !== undefined && optionalY !== undefined){
            label.position.set(0,0,optionalY/2);
            label2.position.set(0,0,-optionalY/2);
        }else{
            label.position.set(0,0,3);
            label2.position.set(0,0,-3);
        }
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