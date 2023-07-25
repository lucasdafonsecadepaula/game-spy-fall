'use client'
import { GlobalContext } from '@/context/global'
import { useContext, useEffect, useState } from 'react'
import { Card } from '@/components/Card'
import { twJoin } from 'tailwind-merge'

function getFormatedTimer(segundos: number) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
  
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos.toString();
    const segundosFormatados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes.toString();
  
    return `${minutosFormatados}:${segundosFormatados}`;
  }
  


export default function Room() {
    const { myCard, socket, gameStatus, users, sessionId } = useContext(GlobalContext)
    const [myVote, setMyVote] = useState<null | string>(null)
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [votes, setVotes] = useState<any>({});
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        socket?.on('tick', (timer: any) => {
            setTimer(timer)
        });

        socket?.on('someone-voted', ({ votes: newVotes }: any) => {
            setVotes(newVotes)
        });

        socket?.on('vote-ended', () => {
            setMyVote(null)
            setAlreadyVoted(false)
            setVotes({})
        })

    }, [socket])

    function start() {
        socket?.emit('start-tick')
    }

    function stop() {
        socket?.emit('pause-tick')
    }

    function reset() {
        socket?.emit('reset-tick')
    }

    function confirmVote() {
        if (!myVote) return
        socket?.emit('vote', myVote)
        setAlreadyVoted(true);
    }

    function nextRound() {
        socket?.emit('next-round')
    }

    const alreadyPauseTheGame = !!sessionId && !!gameStatus.whoPause.some(e => e === sessionId)

    return (
        <div>

            {gameStatus.status.name}

            {gameStatus.status.name === 'playing' && (
                <div>
                    <h1>{getFormatedTimer(timer)}</h1>
                    <h1>POINTS: {users.find(e => e.id === sessionId).points ?? 0}</h1>
                    {/* <button onClick={start} className='p-3 bg-green-600'>Start</button> */}
                    {!alreadyPauseTheGame && <button onClick={stop} className='p-3 bg-green-600'>Pause</button>}
                    {/* <button onClick={reset} className='p-3 bg-green-600'>Rset</button> */}
                    <Card type={myCard.place ?? myCard.card as any} label={myCard.card} />
                </div>
            )}

            {gameStatus.status.name === 'voting' && (
                <>
                    <div className='flex flex-wrap gap-4'>
                        {users.map((e) => (
                            <div onClick={() => setMyVote(e.id)}
                                className={twJoin(
                                    'py-4 px-8 border border-black',
                                    myVote === e.id && 'border-green-900 bg-green-800',
                                )}
                                key={e.id}
                            >
                                {e.name}
                                <div>
                                    {`${votes[e.id] ?? 0}/${users.length}`}
                                </div>
                            </div>
                        ))}
                    </div>

                    {alreadyVoted ? <h1>Aguarde os outros votarem</h1> : <button className='p-3 bg-green-600 mt-8' onClick={confirmVote}>Confirm Vote</button>}
                </>
            )}

            {gameStatus.status.name === 'round-over' && (
                <>
                    <h1 className='text-6xl'>
                        TIME {gameStatus.whoWon} PONTUOU!
                    </h1>

                    <button className='p-3 bg-green-600 mt-8' onClick={nextRound}>Continuar</button>
                </>
            )}
        </div>
    )
}