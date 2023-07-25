'use client'
import { GlobalContext } from '@/context/global'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Card } from '@/components/Card'


export default function Room() {
    const params = useParams()
    const { users, changeGameConfig, gameStatus, startGame } = useContext(GlobalContext)

    const [minutos, setMinutos] = useState('5')
    const [howMuchSpys, setHowMuchSpys] = useState('1')
    const [rodadas, setRodadas] = useState('5')


    function salvar() {
        const timerInS = Number(minutos) * 60;
        changeGameConfig({ howMuchSpys: Number(howMuchSpys), rodadas: Number(rodadas), timerInS })
    }

    return (
        <div className='flex'>
            <div className='w-1/2'>
                {users.length === 0 ? <h1>Aguardando jogadores</h1> : <h1>Jogadores:</h1>}
                <ul>
                    {users.map((e) => <li key={e.id}>{e.name}</li>)}
                </ul>
            </div>

            <div className='w-1/2'>
                <div>
                    Atual Config:
                    <div>timerInMinutes: {gameStatus.config.timerInS / 60}</div>
                    <div>howMuchSpys: {gameStatus.config.howMuchSpys}</div>
                    <div>rodadas: {gameStatus.config.rodadas}</div>
                </div>
                <div className='flex flex-col gap-4 py-4'>
                    <div>
                        <label>timerInMinutes</label>
                        <input className='text-black' type='number' value={minutos} onChange={(e) => setMinutos(e.target.value)} />
                    </div>
                    <div>
                        <label>howMuchSpys</label>
                        <input className='text-black' type='number' value={howMuchSpys} onChange={(e) => setHowMuchSpys(e.target.value)} />
                    </div>
                    <div>
                        <label>rodadas</label>
                        <input className='text-black' type='number' value={rodadas} onChange={(e) => setRodadas(e.target.value)} />
                    </div>
                    <button className='p-2 bg-blue-800' onClick={salvar}>Salvar</button>
                </div>
            </div>

            <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${params.room}`)}>COPIAR ULR</button>

            <button onClick={() => startGame()}>START GAME</button>

        </div>
    )
}