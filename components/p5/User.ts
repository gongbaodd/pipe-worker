export default class User {
    id = "1"
    x: number | null = null
    y: number | null = null
    constructor() {
    }
    setPos(x: number, y: number) {
        this.x = x
        this.y = y

        console.log("user occupy", this.x, this.y)
    }
}