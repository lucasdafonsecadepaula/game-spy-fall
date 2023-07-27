'use client'
import { GlobalContext } from '@/context/global'
import { useContext, useState } from 'react'
import Image from 'next/image'
import bgImage from '../../../imgs/spyfall.jpg'
import { useParams } from 'next/navigation'

export default function Room() {
  const params = useParams()
  const { gameStatus, sessionId, changeGameConfig, startGame } =
    useContext(GlobalContext)

  const [timeInMinutes, setTimeInMinutes] = useState('10')
  const [howMuchSpys, setHowMuchSpys] = useState('1')

  function salvar() {
    const timerInS = Number(timeInMinutes) * 60
    changeGameConfig({
      howMuchSpys: Number(howMuchSpys),
      timerInS,
    })
  }

  const users = gameStatus.users

  const amIAdm = gameStatus.admId === sessionId

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-center p-2 overflow-hidden">
      <div className="absolute top-0 bottom-0 right-0 left-0">
        <Image
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-[top]"
        />
      </div>

      <div className="z-10 py-6 px-4 w-full glass">
        <h2 className="text-black font-bold text-xl pb-4">Jogadores:</h2>
        <ul className="flex flex-col gap-4">
          {users.map((e) => (
            <li
              className="px-4 py-2 text-black text-xl truncate flex items-center gap-2"
              key={e.id}
            >
              <Image
                src={e.profileImg}
                alt=""
                width={100}
                height={100}
                quality={100}
                className="w-10 h-10 object-cover object-center rounded-full"
              />
              {e.name}
            </li>
          ))}
        </ul>

        <h3 className="text-black font-bold text-md pt-4 text-center">
          Aguardando jogadores
        </h3>
      </div>

      <button
        className="bg-blue-600 rounded-md py-2 px-4 text-md font-bold w-full z-10 my-8"
        onClick={() =>
          navigator.clipboard.writeText(`http://localhost:3000/${params.room}`)
        }
      >
        🔗 COPIAR ULR
      </button>

      {amIAdm && (
        <div className="z-10 py-6 px-4 w-full glass mt-4 text-black">
          <h2 className="text-black font-bold">Configuração Atual:</h2>
          <div className="pl-4">
            Tempo dos rounds em minutos: {gameStatus.config.timerInS / 60}
          </div>
          <div className="pl-4 pb-4">
            Quantidade de Espião: {gameStatus.config.howMuchSpys}
          </div>

          <div className="flex flex-col gap-4 py-4">
            <div>
              <label>Tempo do round em minutos</label>
              <input
                className="py-1 px-2 rounded-md w-full focus-visible:outline-orange-600"
                type="number"
                value={timeInMinutes}
                onChange={(e) => setTimeInMinutes(e.target.value)}
              />
            </div>
            <div>
              <label>Quantos Espiões</label>
              <input
                className="py-1 px-2 rounded-md w-full focus-visible:outline-orange-600"
                type="number"
                value={howMuchSpys}
                onChange={(e) => setHowMuchSpys(e.target.value)}
              />
            </div>

            <button
              className="text-white bg-slate-600 rounded-md py-2 px-4 font-bold"
              onClick={salvar}
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {amIAdm && (
        <button
          className="bg-orange-600 rounded-md py-2 px-4 text-md font-bold w-full z-10 my-8"
          onClick={() => startGame()}
        >
          Começar o jogo
        </button>
      )}
    </main>
  )
}
