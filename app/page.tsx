import GridSketch from '@/components/GridSketch';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-8">Pipe workers</h1>
      <p>
        total money: 1000
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
        <Image src="/civilan.png" alt="arc1" width={100} height={100} />  
        <Image src="/worker.png" alt="arc1" width={100} height={100} />  
        <Image src="/scientist.png" alt="arc1" width={100} height={100} />  
      </div>
      <GridSketch />
    </main>
  );
}
