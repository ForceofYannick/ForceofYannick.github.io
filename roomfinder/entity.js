export class Entity {
    #name;      // Name des Objekts
    #geometry;  // Geometrie des Objekts
    #material;  // Material des Objekts
    #mesh;      // Mesh (Visuelle Darstellung des Objekts)

    constructor(name, geometry, material, mesh) {
        this.#name = name;
        this.#geometry = geometry;
        this.#material = material;
        this.#mesh = mesh;
    }

    getName() {
        return this.#name;
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
