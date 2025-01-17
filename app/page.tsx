"use client"

import { TileType } from '@/components/p5/Grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResType, useUserStore } from '@/store/user';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  const {
    startX,
    startY,
    endX,
    endY,
    money,
    cutMoney,
    setResidents,
    residents,
    currentCard,
    cards,
    setCards,
    addCard,
    setCurrentCard,
    resetCard,
    hoverPipe,
    hoveredPipes,
    occupiedPipes,
    occupyPipe,
    countMoney,
  } = useUserStore((state) => state);

  useEffect(() => {
    setResidents()
    setCards()
  }, [setCards, setResidents])

  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-8">Pipe workers</h1>
      <p>
        total money: {money}
      </p>
      <div className='flex flex-row'>{/* pipes */}
        {
          cards.map((card, i) => {
            if (card === TileType.cross) {
              return <Card key={i}>
                <Image src="/cross.png" alt="cross" width={100} height={100} />
                <Button onClick={() => {
                  cutMoney(400)
                  setCurrentCard(card)
                }}>
                  pay 400 to use it
                </Button>
              </Card>
            }

            if (card === TileType.horizontal) {
              return <Card key={i}>
                <Image src="/h.png" alt='horizontal' width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(200)
                    setCurrentCard(card)
                  }
                }>
                  pay 200 to use it
                </Button>
              </Card>
            }

            if (card === TileType.vertical) {
              return <Card key={i}>
                <Image src="/v.png" alt="verical" width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(200)
                    setCurrentCard(card)
                  }
                }>
                  pay 200 to use it
                </Button>
              </Card>
            }

            if (card === TileType.arc1) {
              return <Card key={i}><Image src="/t1.png" alt="tri-1" width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(150)
                    setCurrentCard(card)
                  }
                }>
                  pay 150 to use it
                </Button>
              </Card>
            }

            if (card === TileType.arc2) {
              return <Card key={i}><Image src="/t2.png" alt="tri-2" width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(150)
                    setCurrentCard(card)
                  }
                }>
                  pay 150 to use it
                </Button>
              </Card>
            }

            if (card === TileType.arc3) {
              return <Card key={i}><Image src="/t3.png" alt="tri-3" width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(150)
                    setCurrentCard(card)
                  }
                }>
                  pay 150 to use it
                </Button>
              </Card>
            }

            if (card === TileType.arc4) {
              return <Card key={i}><Image src="/t4.png" alt="tri-4" width={100} height={100} />
                <Button onClick={
                  () => {
                    cutMoney(150)
                    setCurrentCard(card)
                  }
                }>
                  pay 150 to use it
                </Button>
              </Card>
            }
          })
        }
      </div>

      <Button onClick={addCard}>-100 to buy a new card</Button>

      <div>{/* user's card */}
        <h2>Current Card</h2>
        {currentCard && <Card>
           {(currentCard === TileType.cross) && (
                <Image src="/cross.png" alt="cross" width={100} height={100} />
           )}

            {(currentCard === TileType.horizontal) && (
                <Image src="/h.png" alt='horizontal' width={100} height={100} />
              )}

           {(currentCard === TileType.vertical) && (
                <Image src="/v.png" alt="verical" width={100} height={100} />
                )}

            {(currentCard === TileType.arc1) && (<Image src="/t1.png" alt="tri-1" width={100} height={100} />)}

            {(currentCard === TileType.arc2) && (<Image src="/t2.png" alt="tri-2" width={100} height={100} />)}

            {(currentCard === TileType.arc3) && (<Image src="/t3.png" alt="tri-3" width={100} height={100} />)}

            {(currentCard === TileType.arc4) && (<Image src="/t4.png" alt="tri-4" width={100} height={100} />)}
          </Card>}
      </div>

      <div className='flex flex-row'> {/* workers */}
        {residents.map((res, i) => {
          if (res === ResType.civilian) {
            return <Card key={i}>
              <Image src="/civilan.png" alt="arc1" width={100} height={100} />
              <p>
                every turn money +10
              </p>
            </Card>
          }
          if (res === ResType.worker) {
            return <Card key={i}><Image src="/worker.png" alt="arc1" width={100} height={100} />
              <p>
                every turn money +100
              </p>
            </Card>
          }
          if (res === ResType.scientist) {
            return <Card key={i}><Image src="/scientist.png" alt="arc1" width={100} height={100} />
              <p>
                every turn double what you get
              </p>
            </Card>
          }
        })}
      </div>

      <div className='grid-sketch'>
        {Array(20).fill(0).map((_, i) => {
          return  <div key={i} className='row'>
            {Array(20).fill(0).map((_, j) => {
              const isStart = i === startY && j === startX
              const isEnd = i === endX && j === endY
              const { isHovered } = {
                get isHovered() {
                  if (!hoveredPipes) return false
                  return hoveredPipes.some(p => p.x === j && p.y === i)
                }
              }

              const occupied = occupiedPipes.find(p => p.x === j && p.y === i)

              const { cellClass } = {
                get cellClass() {
                  let name = "cell "

                  if (isStart) name += "start "

                  if (isEnd) name += "end "

                  if (isHovered) name += "hovered "

                  if (occupied) {
                    name += "occupied "

                    if (occupied.t) name += "top "
                    if (occupied.r) name += "right "
                    if (occupied.b) name += "bottom "
                    if (occupied.l) name += "left "

                    if (occupied.connected) name += "connected "
                  }

                  return name
                }
              }

              return <div key={j} className={cellClass}
                onMouseEnter={() => hoverPipe({x: j, y: i})}
                onClick={() => { 
                  occupyPipe()
                  resetCard()
                  countMoney()
                }}
                ></div>
            })}
          </div>
        })}
      </div>
    </main>
  );
}
