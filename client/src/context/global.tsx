'use client'
import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation'

const urlSocket = process.env.SOCKET || 'http://localhost:8000';

const gameStatusDefault = {
  status: {
    name: 'waiting-room'
  },
  config: {
    timerInS: 360,
    howMuchSpys: 1,
    rodadas: 5
  },
  whoPause: [] as string[],
  whoWon: null as null | string,
}

type MyCardProps = {
  place: null | string;
  card: string;
}

type SocketInstanceProps = Socket | null;

interface Global {
  name: string;
  setName: (value: string) => void;
  createARoom: ({ name }: { name: string }) => void;
  joinARoom: ({ name, roomId }: { name: string, roomId: string }) => void;
  socket: SocketInstanceProps;
  users: any[];
  changeGameConfig: (config: { timerInS: number, howMuchSpys: number, rodadas: number }) => void;
  gameStatus: typeof gameStatusDefault;
  startGame: () => void;
  myCard: MyCardProps;
  sessionId: string | null
}

export const GlobalContext = createContext<Global>({
  name: '',
  setName: (value: string) => { },
  createARoom: ({ name }: { name: string }) => { },
  joinARoom: ({ name, roomId }: { name: string, roomId: string }) => { },
  socket: null,
  users: [],
  changeGameConfig: (config: { timerInS: number, howMuchSpys: number, rodadas: number }) => { },
  gameStatus: gameStatusDefault,
  startGame: () => {},
  myCard: {
    place: null,
    card: ''
  },
  sessionId: null,
});

export function GlobalProvider({ children }: any) {
  const [socket, setSocket] = useState<SocketInstanceProps>(null);
  const router = useRouter()
  const [name, setName] = useState<string>(() => {
    let localName;
    if (typeof window !== 'undefined') {
      localName = localStorage.getItem('name');
    }
    return localName ?? '';
  });
  const [sessionId, setSessionId] = useState<null | string>(() => {
    let localSession;
    if (typeof window !== 'undefined') {
      localSession = localStorage.getItem('sessionId');
    }
    return localSession ?? null;
  });
  const [roomId, setRoomId] = useState<null | string>(() => {
    let localRoomId;
    if (typeof window !== 'undefined') {
      localRoomId = localStorage.getItem('roomId');
    }
    return localRoomId ?? null;
  });
  const [myCard, setMyCard] = useState({
    place: null,
    card: '',
  })
  const [users, setUsers] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState(gameStatusDefault);

  useEffect(() => {
    const socketInstance = io(urlSocket);

    setSocket(socketInstance)
  }, []);

  useEffect(() => {
    socket?.on('joined-room', ({ sessionId: newSessionId, roomId: newRoomId }: { sessionId: string, roomId: string }) => {
      console.log("TEST AKII", newSessionId)
      setSessionId(newSessionId);
      localStorage.setItem('sessionId', newSessionId);

      setRoomId(newRoomId);
      localStorage.setItem('roomId', newRoomId);
      router.push(`/room/${newRoomId}`);
    });

    socket?.on('users', ({ users }: { users: any[] }) => {
      setUsers(users)
    });

    socket?.on('changed-config', ({ gameStatus }: any) => {
      setGameStatus(gameStatus)
    });

    socket?.on('started-game', (data: any) => {
      setGameStatus({
        status: data.status,
        config: data.config,
        whoPause: data.whoPause,
        whoWon: data.whoWon
      });
      setUsers(data.users);

      const my = data.users.find((e: any) => e.id === sessionId);

      setMyCard({
        card: my.card,
        place: my.card === 'spy' ? null : data.status.place
      })

      router.push(`/game/${roomId}`);
    });

    return () => {
      socket?.off('joined-room');
      socket?.off('users');
      socket?.off('changed-config');
      socket?.off('started-game');
    }

  }, [socket, router, sessionId, roomId]);


  const createARoom = ({ name: newName }: { name: string }) => {
    if (socket) {
      setName(newName);
      socket.emit('create-room', { name: newName });
    }
  }

  const joinARoom = ({ name: newName, roomId: newRoomId }: { name: string, roomId: string }) => {
    if (socket) {
      setName(newName);
      socket.emit('join-room', { name: newName, roomId: newRoomId });
    }
  }

  const changeGameConfig = (config: { timerInS: number, howMuchSpys: number, rodadas: number }) => {
    if (socket) {
      socket.emit('change-config', { config });
    }
  }

  const startGame = () => {
    if (socket) {
      socket.emit('start-game');
    }
  }

  return (
    <GlobalContext.Provider value={{ name, setName, socket, createARoom, joinARoom, users, changeGameConfig, gameStatus, startGame, myCard,sessionId }}>
      {children}
    </GlobalContext.Provider>
  );
}