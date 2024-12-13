export enum CardType {
    boom,
    straight,
    turn,
    cross,
}

export interface ICard {
    type: CardType
    pos: { x: number, y: number }
}

export default class Card {
    cards = []
    pick() {
        
    }
}