"use client"

import GridSketch from '@/components/GridSketch';
import { Button } from '@/components/ui/button';
import { ResType, useUserStore } from '@/store/user';
import Image from 'next/image';

export default function Home() {
  const money = useUserStore((state) => state.money);
  const setResidents = useUserStore((state) => state.setResidents);
  const residents = useUserStore((state) => state.residents);

  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-8">Pipe workers</h1>
      <p>
        total money: {money}
      </p>
      <div className='flex flex-row'>
        <Image src="/cross.png" alt="cross" width={100} height={100} />
        <Image src="/h.png" alt='horizontal' width={100} height={100} />
        <Image src="/v.png" alt="verical" width={100} height={100} />
        <Image src="/t1.png" alt="tri-1" width={100} height={100} />
        <Image src="/t2.png" alt="tri-2" width={100} height={100} />
        <Image src="/t3.png" alt="tri-3" width={100} height={100} />
        <Image src="/t4.png" alt="tri-4" width={100} height={100} />
        <Image src="/boom.png" alt="tri-4" width={100} height={100} />
      </div>
      <div className='flex flex-row'>
        {residents.length === 0 && <Button onClick={setResidents}>Get Residents</Button>}
        {residents.map(res => {
          if (res === ResType.civilian) {  
            return <Image src="/civilan.png" alt="arc1" width={100} height={100} />
          }
          if (res === ResType.worker) {
            return <Image src="/worker.png" alt="arc1" width={100} height={100} />
          }
          if (res === ResType.scientist) {
            return <Image src="/scientist.png" alt="arc1" width={100} height={100}/>
          }
        })}
      </div>
      <GridSketch />
    </main>
  );
}
