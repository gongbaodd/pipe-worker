import Entity from "./Entity";

export default class System {
    entities: Entity[]

    constructor(e: Entity[]) {
        this.entities = e
    }
}