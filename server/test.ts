import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'

const randomCutieImages = [
  'https://random.dog/8c9dd457-5907-4fd4-a825-f8c576fe1284.jpeg',
  'https://random.dog/5384c2a7-9b73-478e-9f32-9af9f264da1d.jpg',
  'https://random.dog/347b464b-31a8-4ccd-9c96-a2dfae0b7f08.jpeg',
  'https://random.dog/07c4e089-a7da-430a-ac09-a0da419efefa.JPG',
  'https://random.dog/ede1f022-4085-4b11-a6b2-21316d2b19cf.jpg',
  'https://random.dog/bc21dfb7-db3b-4d66-93d8-7bb4809ec1b8.jpg',
  'https://random.dog/1e8ff2fc-6a85-42c4-b9d8-a81bcf36dd98.jpg',
  'https://random.dog/9826-9348-20028.jpg',
  'https://random.dog/fd66efed-7054-4a2a-ae6b-423a52070635.jpg',
  'https://random.dog/c2ef8b9e-4ebe-4148-9684-bfa84111298f.PNG',
  'https://random.dog/8adc2518-3d07-4d05-abf5-7206aba4989c.jpg',
  'https://random.dog/441dc47a-b99b-4a74-bfe9-5159ddd1b9bf.jpg',
  'https://random.dog/e561e443-34ad-4ba2-8fad-a9cc9df4cdc5.jpg',
  'https://random.dog/2ee86ac3-9bc3-49bb-998d-1bb7a1a913e9.jpg',
  'https://random.dog/a4524eeb-972f-4b5e-8560-32c7151808ef.jpg',
  'https://random.dog/0f476473-2d8b-415e-b944-483768418a95.jpg',
  'https://random.dog/7a11e477-52ee-4167-a1a1-92ffcd6dd8ed.jpg',
  'https://random.dog/a62ccc75-2b8b-48d1-9110-b6e8d5687c07.jpg',
  'https://random.dog/6a205164-9440-4805-bd1d-63c08444dd50.jpg',
  'https://random.dog/9c5d2539-7f49-470d-96a8-6b83595ee7dc.jpg',
  'https://random.dog/075bfcba-f13c-43a9-983c-740bcce9d876.png',
  'https://random.dog/bc1d0b93-34bb-4ce7-8b15-5adad0359213.jpg',
]

export const getRandomCutieProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * randomCutieImages.length)
  return randomCutieImages[randomIndex]
}

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 8000

const PLACES = [
  'asilo',
  'autodromo',
  'balada',
  'biblioteca',
  'casamento',
  'cemiterio',
  'clubedejazz',
  'convencaodejogos',
  'estadio',
  'exposicaodegatos',
  'fabricadedoces',
  'metro',
  'minadecarvao',
  'museudearte',
  'nacoesunidas',
  'obra',
  'onibusturistico',
  'parquedediversoes',
  'patinacaonogelohockey',
  'portonaval',
  'postodegasolina',
  'prisao',
  'showderock',
  'vinicola',
  'zoologico',
]

const OCCUPATION_BY_PLACE = {
  asilo: [
    'Enfermeira',
    'Cozinheiro',
    'Cego',
    'Enfermeiro',
    'Idosa',
    'Idoso',
    'Jogador de Damas',
    'Parente',
    'Psicólogo',
    'Zelador',
  ],
  autodromo: [
    'Comentarista',
    'Apostador',
    'Dono de Time',
    'Engenheiro',
    'Espectador',
    'Espectador',
    'Juíz',
    'Mecânico',
    'Piloto',
    'Vendedor de Comida',
  ],
  balada: [
    'Bombadinho',
    'Bêbado',
    'Bartender',
    'Cliente',
    'Dançarina',
    'DJ',
    'Segurança',
    'Party Girl',
    'Modelo',
    'Timido',
  ],
  biblioteca: [
    'Bibliotecário',
    'Cara que Fala Alto',
    'Escritor',
    'Estudante',
    'Fanático por Livros',
    'Idoso',
    'Jornalista',
    'Nerd',
    'Sabe-tudo',
    'Voluntário',
  ],
  casamento: [
    'Fotógrafo',
    'Garotinha das Flores',
    'Noiva',
    'Noivo',
    'Oficial de Matrimônio',
    'Padrinho',
    'Pai da Noiva',
    'Parente',
    'Penetra',
    'Porta-Alianças',
  ],
  cemiterio: [
    'Coveiro',
    'Garota Gótica',
    'Ladrão de COvas',
    'Morto',
    'Padre',
    'Parente',
    'Pessoa de Luto',
    'Poeta',
    'Porteiro',
    'Vendedor de Flores',
  ],
  clubedejazz: [
    'Barman',
    'Baterista',
    'Cantor',
    'Dançarina',
    'Fãzaço de Jazz',
    'Garçom',
    'Pianista',
    'Saxofonista',
    'Segurança',
    'VIP',
  ],
  convencaodejogos: [
    'Celebridade',
    'Blogger',
    'Criança',
    'Cosplayer',
    'Colecionador',
    'Jogador',
    'Geek',
    'Expositor',
    'Tímido',
    'Segurança',
  ],
  estadio: [
    'Arremessador de Martelo',
    'Atleta',
    'Comentarista',
    'Espectador',
    'Juiz',
    'Médico',
    'Saltador com Vara',
    'Segurança',
    'Velocista',
    'Vendedor de Comida',
  ],
  exposicaodegatos: [
    'Amante dos Animais',
    'Cuidador',
    'Dono de Gatos',
    'Gato',
    'Gato',
    'Juíz',
    'Segurança',
    'Treinador',
    'Velha Louca dos Gatos',
    'Veterinário',
  ],
  fabricadedoces: [
    'Chocólatra',
    'Confeiteiro',
    'Dênis Pimentinha',
    'Funcionário do Depósito',
    'Inspetor',
    'Oompa Loompa',
    'Operador de Maquinário',
    'Provador',
    'Provador',
    'Visitante',
  ],
  metro: [
    'Batedor de Carteiras',
    'Caixa',
    'Grávida',
    'Homem Cego',
    'Homem de Negócios',
    'Inspetor',
    'Operador de Trem',
    'Senhora de Idade',
    'Turista',
    'Zelador',
  ],
  minadecarvao: [
    'Coordenador',
    'Engenheiro de Explosão',
    'Engenheiro de Resíduos Sólidos',
    'Inspetor de Segurança',
    'Minerador',
    'Minerador',
    'Motorista de Caminhão',
    'Operador de Escavadeira',
    'Supervisor',
    'Trabalhador',
  ],
  museudearte: [
    'Caixa',
    'Colecionador de Arte',
    'Crítico',
    'Estudante',
    'Fotógrafo',
    'Pintor',
    'Professor',
    'Segurança',
    'Turista',
    'Visitante',
  ],
  nacoesunidas: [
    'Diplomata',
    'Homem Exaltado',
    'Jornalista',
    'Lobbysta',
    'Orador',
    'Participante Sonolento',
    'Secretário de Estado',
    'Secretário Geral',
    'Tradutor',
    'Turista',
  ],
  obra: [
    'Arquiteto',
    'Criança Perdida',
    'Dono do Terreno',
    'Eletricista',
    'Engenheiro',
    'Fiscal de Segurança',
    'Invasor',
    'Operador de Escavadeira',
    'Pedreiro',
    'Pedreiro',
  ],
  onibusturistico: [
    'Criança Birrenta',
    'Criança Birrenta',
    'Fotógrafo',
    'Guia Turístico',
    'Idoso',
    'Motorista',
    'Pessoa Perdida',
    'Turista Solitário',
    'Turista',
    'Turista',
  ],
  parquedediversoes: [
    'Adolescente',
    'Criança Feliz',
    'Criança Birrenta',
    'Caixa',
    'Mãe de Familia',
    'Pai de Familia',
    'Operador de Brinquedo',
    'Zelador',
    'Vendedor de Comida',
    'Segurança',
  ],
  patinacaonogelohockey: [
    'Goleiro',
    'Fã de Hockey',
    'Espectador',
    'Juiz',
    'Jogadora',
    'Jogador',
    'Técnico',
    'Segurança',
    'Médico',
    'Vendedor de Comida',
  ],
  portonaval: [
    'Capitão',
    'Carregador',
    'Carregador',
    'Contrabandista',
    'Exportador',
    'Inspetor de Cargas',
    'Marujo',
    'Pescador',
    'Pirata Fajuto',
    'Supervisor o Porto',
  ],
  postodegasolina: [
    'Ativista do Meio-Ambiente',
    'Caixa',
    'Cliente',
    'Cliente',
    'Fascinado por Carros',
    'Frentista',
    'Frentista',
    'Gerente',
    'Operador de Lava-Jato',
    'Vendedor',
  ],
  prisao: [
    'Zelador',
    'Visitante',
    'Operador de CCTV',
    'Oficial',
    'Maníaco',
    'Inocente Preso po Engano',
    'Guarda',
    'Carcereiro',
    'Bandido',
    'Advogado',
  ],
  showderock: [
    'Vocalista',
    'Técnico de som',
    'Segurança',
    'Roadie',
    'Mergulhador de Palco',
    'Guitarrista',
    'Fã',
    'Dançarina',
    'Baterista',
    'Baixista',
  ],
  vinicola: [
    'Vinicultor',
    'Sommelier',
    'Ricaço',
    'Provador',
    'Mordomo',
    'Gerente da Vinícola',
    'Guia de Visitação',
    'Jardineiro',
    'Exportador',
    'Enólogo',
  ],
  zoologico: [
    'Criança',
    'Caixa',
    'Fotógrafo',
    'Pesquisador',
    'Tratadora de Animais',
    'Veterinário',
    'Visitante',
    'Turista',
    'Vendedor de Comida',
    'Tratadora de Animais',
  ],
}

type UserProps = {
  id: string
  name: string
  card: string | null
  profileImg: string
}

type PlaceProps = keyof typeof OCCUPATION_BY_PLACE

type StatusProps =
  | 'waiting-room'
  | 'playing'
  | 'stoped'
  | 'preparing-next-round'

class Game {
  id: string
  admId: string
  users: Map<string, UserProps>
  status: StatusProps
  place: PlaceProps | null
  config: {
    timerInS: number
    howMuchSpys: 1 | 2
  }

  currentInterval: NodeJS.Timer | null
  currentTimer: number

  constructor() {
    this.id = v4()
    this.admId = ''
    this.users = new Map()
    this.status = 'waiting-room'
    this.place = null
    this.config = {
      timerInS: 60 * 10, // 5 min
      howMuchSpys: 1,
    }
    this.currentInterval = null
    this.currentTimer = 0
  }

  sendStatus() {
    io.to(this.id).emit('status', this.getStatus())
  }

  getGameId() {
    return this.id
  }

  join({
    name,
    socket,
    sessionId,
  }: {
    name: string
    socket: Socket
    sessionId?: string
  }) {
    if (sessionId) {
      socket.join(this.id)
      socket.join(sessionId)
      const userData = this.users.get(sessionId)
      if (!userData) {
        socket.emit('reset')
        return
      }
      socket.data = {
        sessionId,
        roomId: this.id,
        name,
      }
      socket.emit('joined-room', {
        sessionId,
        roomId: this.id,
        name,
      })
      this.sendStatus()
      io.to(sessionId).emit('card', userData.card)
      return
    }

    const newUserSessionId = v4()

    if (!this.admId) this.admId = newUserSessionId

    const userData: UserProps = {
      id: newUserSessionId,
      name,
      card: null,
      profileImg: getRandomCutieProfileImage(),
    }

    this.users.set(newUserSessionId, userData)

    socket.join(this.id)
    socket.join(newUserSessionId)

    socket.data = {
      sessionId: newUserSessionId,
      roomId: this.id,
      name,
    }
    socket.emit('joined-room', {
      sessionId: newUserSessionId,
      roomId: this.id,
      name,
    })

    this.sendStatus()
  }

  getStatus() {
    return {
      admId: this.admId,
      status: this.status,
      config: this.config,
      place: this.place,
      users: this.getUsers(),
    }
  }

  getUsers() {
    return [...this.users].map(([, value]) => value)
  }

  changeConfig({ timerInS, howMuchSpys }: Partial<typeof this.config>) {
    this.config.timerInS = timerInS ?? this.config.timerInS
    this.config.howMuchSpys = howMuchSpys === 1 ? 1 : 2

    this.sendStatus()
  }

  pickANewPlace() {
    const placesCopied = [...PLACES]
    const randomIndex = Math.floor(Math.random() * placesCopied.length)
    const [randomPlace] = placesCopied.splice(randomIndex, 1)
    return randomPlace as PlaceProps
  }

  getPossibleCards(place: PlaceProps) {
    const cards: string[] = []

    for (let i = 0; i < this.config.howMuchSpys; i++) {
      cards.push('spy')
    }

    const playersAmount = this.users.size - this.config.howMuchSpys

    const possibleOcupation = [...OCCUPATION_BY_PLACE[place]]

    for (let i = 0; i < playersAmount; i++) {
      const randomIndex = Math.floor(Math.random() * possibleOcupation.length)
      const [randomPeople] = possibleOcupation.splice(randomIndex, 1)
      cards.push(randomPeople)
    }

    return cards
  }

  setUsersCards(place: PlaceProps) {
    const cards = this.getPossibleCards(place)

    const usersWithCards = [...this.users].map(([key, value]) => {
      const randomIndex = Math.floor(Math.random() * cards.length)
      const [randomCard] = cards.splice(randomIndex, 1)
      const newValue = { ...value, card: randomCard }
      return [key, newValue]
    }) as [string, UserProps][]

    this.users = new Map(usersWithCards)

    this.users.forEach((user) => {
      io.to(user.id).emit('card', user.card)
    })
  }

  start() {
    const newPlace = this.pickANewPlace()

    this.setUsersCards(newPlace)

    this.status = 'playing'
    this.place = newPlace

    io.to(this.id).emit('game-started', this.id)

    this.startInterval()
    this.sendStatus()
  }

  startInterval() {
    this.currentTimer = this.config.timerInS
    this.resetInterval()
    const newInterval = setInterval(() => {
      io.to(this.id).emit('timer', this.decrementTimer())
    }, 1000)

    this.currentInterval = newInterval
  }

  pauseInterval() {
    this.status = 'stoped'
    this.sendStatus()
    if (this.currentInterval) {
      clearInterval(this.currentInterval)
    }
  }

  resumeInterval() {
    this.status = 'playing'
    this.sendStatus()
    const newInterval = setInterval(() => {
      io.to(this.id).emit('timer', this.decrementTimer())
    }, 1000)

    this.currentInterval = newInterval
  }

  resetInterval() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval)
      this.currentInterval = null
    }
  }

  decrementTimer() {
    this.currentTimer -= 1
    return this.currentTimer
  }

  nextRound() {
    this.resetInterval()
    this.status = 'preparing-next-round'
    this.sendStatus()
    setTimeout(() => {
      this.start()
    }, 5000)
  }
}

const cache = new Map() as Map<string, Game>

io.on('connection', (socket) => {
  socket.on('create-room', ({ name }: { name: string }) => {
    const game = new Game()
    const roomId = game.getGameId()

    game.join({ name, socket })
    cache.set(roomId, game)
  })

  socket.on('join-room', ({ name, roomId, sessionId }) => {
    const game = cache.get(roomId)
    if (!game || !name || !roomId) {
      socket.emit('reset')
      return
    }

    game.join({ name, socket, sessionId })
  })

  socket.on('change-config', ({ config }) => {
    const { name, roomId, sessionId } = socket.data
    const game = cache.get(roomId)

    if (!game || !name || !roomId || !sessionId) {
      socket.emit('reset')
      return
    }

    game.changeConfig(config)
  })

  socket.on('start-game', () => {
    const { name, roomId, sessionId } = socket.data
    const game = cache.get(roomId)

    if (!game || !name || !roomId || !sessionId) {
      socket.emit('reset')
      return
    }

    game.start()
  })

  socket.on('pause-game', () => {
    const { name, roomId, sessionId } = socket.data
    const game = cache.get(roomId)
    if (!game || !name || !roomId || !sessionId) {
      socket.emit('reset')
      return
    }

    game.pauseInterval()
  })

  socket.on('resume-game', () => {
    const { name, roomId, sessionId } = socket.data
    const game = cache.get(roomId)

    if (!game || !name || !roomId || !sessionId) {
      socket.emit('reset')
      return
    }

    game.resumeInterval()
  })

  socket.on('next-round', () => {
    const { name, roomId, sessionId } = socket.data
    const game = cache.get(roomId)

    if (!game || !name || !roomId || !sessionId) {
      socket.emit('reset')
      return
    }

    game.nextRound()
  })
})

server.listen(PORT, () => {
  console.log('listening on: ', PORT)
})
