export class Room {
    #name;

    /**
     * @param {string} name 
     */
    constructor(name) {

        this.#name = name;

    }

    getName() {
        return this.#name;
    }
}