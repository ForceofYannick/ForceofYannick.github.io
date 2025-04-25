export class Building {
    #name;
    #floors;

    /**
     * 
     * @param {string} name 
     * @param {Floor[]} floors 
     */
    constructor(name, floors) {
        this.#name = name;
        this.#floors = floors;

    }
    getName() {
        return this.#name;
    }

    getFloors() {
        return this.#floors;
    }
}