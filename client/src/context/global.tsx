/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'
import { GameStatusProps } from '@/model/GameStatus'

const urlSocket = process.env.SOCKET || 'http://localhost:8000'

const gameStatusDefault: GameStatusProps = {
  admId: '',
  status: 'waiting-room',
  config: {
    howMuchSpys: 0,
    timerInS: 0,
  },
  place: null,
  users: [],
}

type SocketInstanceProps = Socket | null

interface Global {
  name: string
  myCard: string
  gameStatus: typeof gameStatusDefault
  sessionId: string | null
  socket: SocketInstanceProps
  createARoom: ({ name }: { name: string }) => void
  joinARoom: ({ name, roomId }: { name: string; roomId: string }) => void
  changeGameConfig: (config: { timerInS: number; howMuchSpys: number }) => void
  startGame: () => void
}

export const GlobalContext = createContext<Global>({
  name: '',
  myCard: '',
  gameStatus: gameStatusDefault,
  sessionId: null,
  socket: null,
  createARoom: ({ name }: { name: string }) => {},
  joinARoom: ({ name, roomId }: { name: string; roomId: string }) => {},
  changeGameConfig: (config: { timerInS: number; howMuchSpys: number }) => {},
  startGame: () => {},
})

type SocketResJoinedRoom = { sessionId: string; roomId: string; name: string }

type GlobalProviderProps = {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const router = useRouter()
  const [socket, setSocket] = useState<SocketInstanceProps>(null)
  const [name, setName] = useState<string>(() => {
    let localName
    if (typeof window !== 'undefined') {
      localName = localStorage.getItem('name')
    }
    return localName ?? ''
  })
  const [sessionId, setSessionId] = useState<null | string>(() => {
    let localSession
    if (typeof window !== 'undefined') {
      localSession = localStorage.getItem('sessionId')
    }
    return localSession ?? null
  })
  const [roomId, setRoomId] = useState<null | string>(() => {
    let localRoomId
    if (typeof window !== 'undefined') {
      localRoomId = localStorage.getItem('roomId')
    }
    return localRoomId ?? null
  })
  const [myCard, setMyCard] = useState('')
  const [gameStatus, setGameStatus] = useState(gameStatusDefault)

  useEffect(() => {
    const socketInstance = io(urlSocket)
    setSocket(socketInstance)

    const localSessionId = localStorage.getItem('sessionId')
    const localRoomId = localStorage.getItem('roomId')
    const localName = localStorage.getItem('name')

    if (localSessionId && localRoomId && localName) {
      socketInstance.emit('join-room', {
        name: localName,
        roomId: localRoomId,
        sessionId: localSessionId,
      })
    }
  }, [])

  useEffect(() => {
    socket?.on('joined-room', (data: SocketResJoinedRoom) => {
      setName(data.name)
      localStorage.setItem('name', data.name)

      setSessionId(data.sessionId)
      localStorage.setItem('sessionId', data.sessionId)

      setRoomId(data.roomId)
      localStorage.setItem('roomId', data.roomId)
    })

    socket?.on('status', (data: GameStatusProps) => {
      if (data.status === 'playing') {
        router.push(`/game/${roomId}`)
      }

      if (data.status === 'waiting-room') {
        router.push(`/room/${roomId}`)
      }
      setGameStatus(data)
    })

    socket?.on('card', (data: string) => {
      setMyCard(data)
    })

    socket?.on('reset', () => {
      localStorage.clear()
      setName('')
      setSessionId('')
      setRoomId('')
      setMyCard('')
      setGameStatus(gameStatusDefault)
      router.push('/')
    })

    return () => {
      socket?.off('joined-room')
      socket?.off('status')
      socket?.off('card')
      socket?.off('reset')
    }
  }, [socket, router, sessionId, roomId])

  const createARoom = ({ name: newName }: { name: string }) => {
    if (socket) {
      socket.emit('create-room', { name: newName })
    }
  }

  const joinARoom = ({
    name: newName,
    roomId: newRoomId,
  }: {
    name: string
    roomId: string
  }) => {
    if (socket) {
      socket.emit('join-room', { name: newName, roomId: newRoomId })
    }
  }

  const changeGameConfig = (config: {
    timerInS: number
    howMuchSpys: number
  }) => {
    if (socket) {
      socket.emit('change-config', { config })
    }
  }

  const startGame = () => {
    if (socket) {
      socket.emit('start-game')
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        name,
        myCard,
        gameStatus,
        sessionId,
        socket,
        createARoom,
        joinARoom,
        changeGameConfig,
        startGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
