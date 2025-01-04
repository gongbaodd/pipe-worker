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

type TPipe = {
    x: number,
    y: number,
    t: boolean,
    r: boolean,
    b: boolean,
    l: boolean,
    connected: boolean,
}

export const useUserStore = create<{
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    hoveredPipes: TPipe[] | null,
    occupiedPipes: TPipe[],
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
    hoverPipe: (pos: {x: number, y: number}) => void,
    occupyPipe: () => void
}>((set) => ({
    money: 1000,
    startX: 5,
    startY: 5,
    endX: 15,
    endY: 15,
    hoveredPipes: null,
    occupiedPipes: [{
        x: 5, y: 5,
        t: true, r: true, b: true, l: true,
        connected: true,
    }],
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
                    {
                        x: pos.x, y: pos.y,
                        t: true, r: true, b: true, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x + 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x - 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y + 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y - 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                ]

                return {
                    ...state,
                    hoveredPipes,
                }
            }

            if (currentCard === TileType.horizontal) {
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x + 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x - 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.vertical) {
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y + 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y - 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc1) {// top left
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: true, r: false, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x - 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y - 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc2) {// top right
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: true, r: true, b: false, l: false,
                        connected: false,
                    },
                    {
                        x: pos.x + 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y - 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc3) {// bottom left
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: false, r: false, b: true, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x - 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y + 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
                ]
                return {...state, hoveredPipes}
            }

            if (currentCard === TileType.arc4) {// bottom right
                const hoveredPipes = [
                    {
                        x: pos.x, y: pos.y,
                        t: false, r: true, b: true, l: false,
                        connected: false,
                    },
                    {
                        x: pos.x + 1, y: pos.y,
                        t: false, r: true, b: false, l: true,
                        connected: false,
                    },
                    {
                        x: pos.x, y: pos.y + 1,
                        t: true, r: false, b: true, l: false,
                        connected: false,
                    },
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

            const pipes = [...occupiedPipes, ...hoveredPipes]
            const startPipe = pipes.find(p => p.x === state.startX && p.y === state.startY)
            const occupiedP = [...traversePipe(startPipe as TPipe, pipes)].map(p => ({...p, connected: true}))
            const pipesOccupied = occupiedPipes.some(p => {
                return hoveredPipes.some(h => h.x === p.x && h.y === p.y)
            })

            return {
                ...state,
                hoveredPipes: null,
                occupiedPipes: [...occupiedP, ...(pipesOccupied ? [] : hoveredPipes)],
            }

            function traversePipe(start: TPipe, pipes: TPipe[]): Set<TPipe> {
                const stack = [start]
                const visited = new Set<TPipe>()
                while (stack.length) {
                    const pipe = stack.pop() as TPipe
                    if (visited.has(pipe)) continue
                    visited.add(pipe)

                    if (pipe.t) {
                        const nextPipe = pipes.find(p => p.x === pipe.x && p.y === pipe.y - 1)
                        if (nextPipe && nextPipe.b) stack.push(nextPipe)
                    }

                    if (pipe.r) {
                        const nextPipe = pipes.find(p => p.x === pipe.x + 1 && p.y === pipe.y)
                        if (nextPipe && nextPipe.l) stack.push(nextPipe)
                    }

                    if (pipe.b) {
                        const nextPipe = pipes.find(p => p.x === pipe.x && p.y === pipe.y + 1)
                        if (nextPipe && nextPipe.t) stack.push(nextPipe)
                    }

                    if (pipe.l) {
                        const nextPipe = pipes.find(p => p.x === pipe.x - 1 && p.y === pipe.y)
                        if (nextPipe && nextPipe.r) stack.push(nextPipe)
                    }
                }

                return visited
            }
        })
    },
}))