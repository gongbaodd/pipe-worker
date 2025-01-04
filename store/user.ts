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
    money: number, 
    residents: ResType[],
    cards: TileType[],
    currentCard: TileType | null,
    setResidents: () => void,
    setCards: () => void,
    addCard: () => void,
    setCurrentCard: (card: TileType) => void,
    resetCard: () => void,
    cutMoney: (amount: number) => void
}>((set) => ({
    money: 1000,
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
    }))
}))