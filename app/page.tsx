"use client"

import GridSketch from '@/components/GridSketch';
import { TileType } from '@/components/p5/Grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResType, useUserStore } from '@/store/user';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  const money = useUserStore((state) => state.money);
  const setResidents = useUserStore((state) => state.setResidents);
  const residents = useUserStore((state) => state.residents);
  const cards = useUserStore((state) => state.cards);
  const setCards = useUserStore((state) => state.setCards);

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
              </Card>
            }

            if (card === TileType.horizontal) {
              return <Card key={i}>
                <Image src="/h.png" alt='horizontal' width={100} height={100} />
              </Card>
            }

            if (card === TileType.vertical) {
              return <Card key={i}>
                <Image src="/v.png" alt="verical" width={100} height={100} />
              </Card>
            }

            if (card === TileType.arc1) {
              return <Card key={i}><Image src="/t1.png" alt="tri-1" width={100} height={100} />
              </Card>
            }

            if (card === TileType.arc2) {
              return <Card key={i}><Image src="/t2.png" alt="tri-2" width={100} height={100} />
              </Card>
            }

            if (card === TileType.arc3) {
              return <Card key={i}><Image src="/t3.png" alt="tri-3" width={100} height={100} />
              </Card>
            }

            if (card === TileType.arc4) {
              return <Card key={i}><Image src="/t4.png" alt="tri-4" width={100} height={100} />
              </Card>
            }
          })
        }
      </div>

      <Button onClick={() => { }}>-100 to buy a new card</Button>

      <div className='flex flex-row'>
        {residents.map((res, i) => {
          if (res === ResType.civilian) {
            return <Card key={i}>
              <Image src="/civilan.png" alt="arc1" width={100} height={100} />
              <p>
                every turn money +1 
              </p>
            </Card>
          }
          if (res === ResType.worker) {
            return <Card key={i}><Image src="/worker.png" alt="arc1" width={100} height={100} />
              <p>
                every turn money +10 
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
      <GridSketch />
    </main>
  );
}
