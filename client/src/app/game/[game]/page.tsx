'use client'
import { GlobalContext } from '@/context/global'
import { useContext, useEffect, useState } from 'react'
import { Card, CardProps } from '@/components/Card'

function getFormatedTimer(segundos: number) {
  if (segundos < 0) return '00:00'

  const minutos = Math.floor(segundos / 60)
  const segundosRestantes = segundos % 60

  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos.toString()
  const segundosFormatados =
    segundosRestantes < 10
      ? `0${segundosRestantes}`
      : segundosRestantes.toString()

  return `${minutosFormatados}:${segundosFormatados}`
}

export default function Room() {
  const { myCard, socket, gameStatus, sessionId } = useContext(GlobalContext)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    socket?.on('timer', (data: number) => {
      setTimer(data)
    })

    return () => {
      socket?.off('timer')
    }
  }, [socket])

  function stop() {
    socket?.emit('pause-game')
  }

  function resume() {
    socket?.emit('resume-game')
  }

  function nextRound() {
    socket?.emit('next-round')
  }

  const isShowingCard =
    gameStatus.status === 'playing' || gameStatus.status === 'stoped'
  const amIAdm = gameStatus.admId === sessionId
  const amITheSpy = myCard === 'spy'
  const cardType = amITheSpy ? myCard : gameStatus.place

  return (
    <div className="bg-zinc-900 min-h-screen overflow-hidden flex flex-col items-center justify-between text-black">
      {isShowingCard && (
        <>
          <h1 className="z-10 text-6xl mt-8 text-white">
            {getFormatedTimer(timer)}
          </h1>

          <Card type={cardType as CardProps['type']} label={myCard} />

          <div className="flex gap-8 mb-8 w-full px-8">
            {amIAdm && (
              <button
                onClick={nextRound}
                className="w-full bg-orange-600 rounded-md py-2 px-4 text-md font-bold text-white"
              >
                nextRound
              </button>
            )}

            {gameStatus.status === 'playing' && (
              <button
                className="w-full bg-blue-600 rounded-md py-2 px-4 text-md font-bold text-white"
                onClick={stop}
              >
                Pause
              </button>
            )}
            {gameStatus.status === 'stoped' && (
              <button
                className="w-full bg-green-600 rounded-md py-2 px-4 text-md font-bold text-white"
                onClick={resume}
              >
                Resume
              </button>
            )}
          </div>
        </>
      )}

      {gameStatus.status === 'preparing-next-round' && (
        <>
          <div />
          <h1 className="text-2xl text-white text-center">
            Se prepare para a proxima rodada
          </h1>
          <div />
        </>
      )}
    </div>
  )
}
