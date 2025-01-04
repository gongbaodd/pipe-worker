"use client"

import { TileType } from '@/components/p5/Grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResType, useUserStore } from '@/store/user';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  const money = useUserStore((state) => state.money);
  const cutMoney = useUserStore((state) => state.cutMoney);
  const setResidents = useUserStore((state) => state.setResidents);
  const residents = useUserStore((state) => state.residents);
  const cards = useUserStore((state) => state.cards);
  const setCards = useUserStore((state) => state.setCards);
  const addCard = useUserStore((state) => state.addCard);
  const setCurrentCard = useUserStore((state) => state.setCurrentCard);
  const currentCard = useUserStore((state) => state.currentCard);

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
      <div className='flex flex-row'>
        {
          cards.map((card, i) => {
            if (card === TileType.cross) {
              return <Card key={i}>
                <Image src="/cross.png" alt="cross" width={100} height={100} />
                <Button onClick={() => {
                  cutMoney(200)
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
                    cutMoney(100)
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
                    cutMoney(100)
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
                    cutMoney(100)
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
                    cutMoney(100)
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
                    cutMoney(100)
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

      <div>
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

      <div className='flex flex-row'>
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
      {/* <GridSketch /> */}

      <div className='grid-sketch'>
        {Array(20).fill(0).map((_, i) => {
          return  <div key={i} className='row'>
            {Array(20).fill(0).map((_, j) => {
              return <div key={j} className='cell'></div>
            })}
          </div>
        })}
      </div>
    </main>
  );
}
