import * as THREE from "three";
export class Corridor {
    #p1;
    #p2;
    #p3;
    #p4;
    #material;
    #mesh;

    /**
     * 
     * @param {Position} p1 
     * @param {Position} p2 
     * @param {Position} p3 
     * @param {Position} p4 
     */
    constructor(p1, p2, p3, p4) {

        this.#p1 = p1;
        this.#p2 = p2;
        this.#p3 = p3;
        this.#p4 = p4;

        const geometry = this.#create3dRectangle(p1, p2, p3, p4);
        this.#material = new THREE.MeshStandardMaterial({ color: 0x249ef0 });
        this.#mesh = new THREE.Mesh(geometry, material);


    }

    getP1() {
        return this.#p1;
    }

    getP2() {
        return this.#p2;
    }

    getP3() {
        return this.#p3;
    }

    getP4() {
        return this.#p4;
    }

    getMaterial(){
        return this.#material;
    }

    getMesh(){
        return this.#mesh;
    }

    #create3dRectangle(p1, p2, p3, p4) {
        const geometry = new THREE.BufferGeometry();

        // Define two triangles: (p1, p2, p3) and (p1, p3, p4)
        const vertices = new Float32Array([
            p1.x, p1.y, p1.z,
            p2.x, p2.y, p2.z,
            p3.x, p3.y, p3.z,

            p1.x, p1.y, p1.z,
            p3.x, p3.y, p3.z,
            p4.x, p4.y, p4.z
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals(); // optional: for lighting

        return geometry;
    }


}