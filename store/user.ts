import { TileType } from '@/components/p5/Grid'
import { create } from 'zustand'

export enum ResType {
    civilian,
    worker,
    scientist
}

const allResTypes = [ResType.civilian, ResType.worker, ResType.scientist]
const allCardTypes = [
    TileType.cross, 
    TileType.horizontal, 
    TileType.vertical, 
    TileType.arc1, TileType.arc2, TileType.arc3, TileType.arc4
]

export const useUserStore = create<{
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    hoveredPipes: {x: number, y: number}[] | null,
    occupiedPipes: {x: number, y: number}[],
    money: number, 
    residents: ResType[],
    cards: TileType[],
    currentCard: TileType | null,
    setResidents: () => void,
    setCards: () => void,
    addCard: () => void,
    setCurrentCard: (card: TileType) => void,
    resetCard: () => void,
    cutMoney: (amount: number) => void,
    hoverPipe: (pos: {x: number, y: number}) => void
}>((set) => ({
    money: 1000,
    startX: 5,
    startY: 5,
    endX: 15,
    endY: 15,
    hoveredPipes: null,
    occupiedPipes: [{x: 5, y: 5}],
    occupyPipe: () => {},
    residents: [],
    cards: [],
    currentCard: null,
    setResidents: () => set((state) => ({
        ...state,
        residents: [
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)]
        ]
    })),
    cutMoney: (amount: number) => set((state) => ({
        ...state,
        money: state.money - amount, 
    })),
    setCards: () => set((state) => ({
        ...state,
        cards: [
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
        ] 
    })),
    addCard: () => set((state) => ({
        ...state,
        money: state.money - 100,
        cards: [...state.cards, 
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
        ]
    })),
    setCurrentCard: (card: TileType) => set((state) => ({
        ...state,
        currentCard: card,
    })),
    resetCard: () => set((state) => ({
        ...state,
        currentCard: null,
    })),
    hoverPipe: (pos: {x: number, y: number}) => {
        return set((state) => {
            const { currentCard } = state

            if (currentCard === TileType.cross) {
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x + 1, y: pos.y},
                    {x: pos.x - 1, y: pos.y},
                    {x: pos.x, y: pos.y + 1},
                    {x: pos.x, y: pos.y - 1},
                ]

                return {
                    ...state,
                    hoveredPipes,
                }
            }

            if (currentCard === TileType.horizontal) {
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x + 1, y: pos.y},
                    {x: pos.x - 1, y: pos.y},
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.vertical) {
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x, y: pos.y + 1},
                    {x: pos.x, y: pos.y - 1},
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc1) {// top left
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x - 1, y: pos.y},
                    {x: pos.x, y: pos.y - 1},
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc2) {// top right
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x + 1, y: pos.y},
                    {x: pos.x, y: pos.y - 1},
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc3) {// bottom left
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x - 1, y: pos.y},
                    {x: pos.x, y: pos.y + 1},
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc4) {// bottom right
                const hoveredPipes = [
                    {x: pos.x, y: pos.y},
                    {x: pos.x + 1, y: pos.y},
                    {x: pos.x, y: pos.y + 1},
                ]
                return {...state, hoveredPipes}
            }

            return state
        })
    },
    occupyPipe: () => {
        return set((state) => {
            const { hoveredPipes, occupiedPipes } = state
            if (!hoveredPipes) return state

            return {
                ...state,
                hoveredPipes: null,
                occupiedPipes: [...occupiedPipes, ...hoveredPipes]
            }
        })
    },
}))