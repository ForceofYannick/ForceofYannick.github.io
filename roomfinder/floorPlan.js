export class FloorPlan {

    #rooms;
    #corridors;
    #geometry;
    #material;
    #mesh;

    /**
     * 
     * @param {Room[]} rooms 
     * @param {Corridor[]} corridors 
     */
    constructor(rooms, corridors) {

        this.#rooms = rooms;
        this.#corridors = corridors;
    }

    getRooms() {
        return this.#rooms;
    }

    getCorridors() {
        return this.#corridors;
    }
}