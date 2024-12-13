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
    setResidents: () => void,
    setCards: () => void,
}>((set) => ({
    money: 1000,
    residents: [],
    cards: [],
    setResidents: () => set((state) => ({
        ...state,
        residents: [
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)]
        ]
    })),
    cutMoney: (amount: number) => set((state) => ({ money: state.money - amount })),
    setCards: () => set((state) => ({
        ...state,
        cards: [
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
            allCardTypes[Math.floor(Math.random() * allCardTypes.length)],
        ] 
    }))
}))