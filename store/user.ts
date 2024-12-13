import { create } from 'zustand'

export enum ResType {
    civilian,
    worker,
    scientist
}

const allResTypes = [ResType.civilian, ResType.worker, ResType.scientist]

export const useUserStore = create<{
    money: number, residents: ResType[]
    setResidents: () => void,
}>((set) => ({
    money: 1000,
    residents: [],
    setResidents: () => set((state) => ({
        money: state.money,
        residents: [
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)],
            allResTypes[Math.floor(Math.random() * allResTypes.length)]
        ]
    })),
    cutMoney: (amount: number) => set((state) => ({ money: state.money - amount })),
}))