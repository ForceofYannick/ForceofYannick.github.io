export class Size {
    #width;
    #height;
    #depth;

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */
    constructor(width, height, depth) {
        this.#width = width;
        this.#height = height;
        this.#depth = depth;
    }

    getWidth() {
        return this.#width
    }
    getHeight() {
        return this.#height
    }
    getDepth() {
        return this.#depth
    }
}