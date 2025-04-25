export class Position {
    #x;
    #y;
    #z;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    getX() {
        return this.#x
    }
    getY() {
        return this.#y
    }
    getZ() {
        return this.#z
    }
}