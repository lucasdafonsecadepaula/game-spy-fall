import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'

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
  points: number
}

type StatusProps =
  | 'waiting-room'
  | 'playing'
  | 'voting'
  | 'spy-voting'
  | 'waiting-next-round'

class Game {
  id: string
  users: Map<string, UserProps>
  status: StatusProps
  place: keyof typeof OCCUPATION_BY_PLACE | null
  config: {
    timerInS: number
    howMuchSpys: 1 | 2
  }

  currentInterval: NodeJS.Timer | null
  currentTimer: number
  currentVotes: { whoVoted: string; whoWasVoted: string }[]
  currentWinner: string | null
  currentPersonThatPauseRight: string | null

  roundsPlayed: number

  constructor() {
    this.id = v4()
    this.users = new Map()
    this.status = 'waiting-room'
    this.place = null
    this.config = {
      timerInS: 60 * 5, // 5 min
      howMuchSpys: 1,
    }
    this.currentInterval = null
    this.currentTimer = 0
    this.currentVotes = []
    this.currentWinner = null
    this.currentPersonThatPauseRight = null
    this.roundsPlayed = 0
  }

  getGameId() {
    return this.id
  }

  join({ name, socket }: { name: string; socket: Socket }) {
    const newUserSessionId = v4()
    const userData: UserProps = {
      id: newUserSessionId,
      name,
      card: null,
      points: 0,
    }
    this.users.set(newUserSessionId, userData)

    socket.join(this.id)
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

    io.to(this.id).emit('users', { users: this.getUsers() })
  }

  getStatus() {
    return {
      status: this.status,
      config: this.config,
      whoPause: this.whoPause,
      whoWon: this.whoWon,
    }
  }

  getUsers() {
    return [...this.users].map(([key, value]) => value)
  }

  changeConfig({ timerInS, howMuchSpys }: Partial<typeof this.config>) {
    this.config.timerInS = timerInS ?? this.config.timerInS
    this.config.howMuchSpys = howMuchSpys === 1 ? 1 : 2

    io.to(this.getGameId()).emit('changed-config', {
      gameStatus: this.getStatus(),
    })
  }

  pickANewPlace() {
    const randomIndex = Math.floor(Math.random() * this.places.length)
    const [randomPlace] = this.places.splice(randomIndex, 1)
    return randomPlace
  }

  getPossibleCards(place) {
    const cards = []

    for (let i = 0; i < this.config.howMuchSpys; i++) {
      cards.push('spy')
    }

    const playersAmount = this.users.size - this.config.howMuchSpys

    const possiblePeople = [...this.peopleInPlaces[place]]

    for (let i = 0; i < playersAmount; i++) {
      const randomIndex = Math.floor(Math.random() * possiblePeople.length)
      const [randomPeople] = possiblePeople.splice(randomIndex, 1)
      cards.push(randomPeople)
    }

    return cards
  }

  setUsersCards(place) {
    const cards = this.getPossibleCards(place)

    const usersWithCards = [...this.users].map(([key, value]) => {
      const randomIndex = Math.floor(Math.random() * cards.length)
      const [randomCard] = cards.splice(randomIndex, 1)
      const newValue = { ...value, card: randomCard }
      return [key, newValue]
    })

    this.users = new Map(usersWithCards)
  }

  start() {
    const newPlace = this.pickANewPlace()

    this.setUsersCards(newPlace)

    this.status = {
      name: 'playing',
      place: newPlace,
    }
  }

  getInterval() {
    return this.interval
  }

  setInterval(value) {
    this.status = { ...this.status, name: 'playing' }
    this.interval = value
    return this.interval
  }

  clearGameInterval(id) {
    if (this.interval) {
      this.whoPause.push(id)
      this.status = { ...this.status, name: 'voting' }
      clearInterval(this.interval)
      this.interval = null
    }
  }

  decrementTimer() {
    this.timer -= 1
    return this.timer
  }

  resetTimer() {
    this.timer = 60 * 5
    return this.timer
  }

  vote(id) {
    this.voteAmount += 1

    if (this.votes[id]) {
      this.votes[id] += 1
    } else {
      this.votes = { ...this.votes, [id]: 1 }
    }

    const isDone = this.voteAmount === this.users.size

    if (isDone) {
      const unanimeVote = Object.entries(this.votes).find(
        (e) => e[1] >= this.users.size - 1,
      )

      this.status = {
        ...this.status,
        name: 'playing',
      }

      if (unanimeVote) {
        const user = this.users.get(unanimeVote[0])
        const isTheSpy = user.card === 'spy'

        this.status = {
          ...this.status,
          name: 'round-over',
        }

        if (isTheSpy) {
          this.whoWon = 'blue'

          const usersWithPoints = [...this.users].map(([key, value]) => {
            const isTheVoted = unanimeVote[0] === key

            if (isTheVoted) return [key, value]

            const plusPoint = this.firstToPauseRight === key ? 2 : 1

            const newPoints = value.points
              ? value.points + plusPoint
              : plusPoint
            const newValue = { ...value, points: newPoints }
            return [key, newValue]
          })

          this.users = new Map(usersWithPoints)
        } else {
          this.whoWon = 'red'

          const usersWithPoints = [...this.users].map(([key, value]) => {
            const isTheSpy = value.card === 'spy'

            if (!isTheSpy) return [key, value]

            const newPoints = value.points ? value.points + 1 : 1
            const newValue = { ...value, points: newPoints }
            return [key, newValue]
          })

          this.users = new Map(usersWithPoints)
        }
      }

      this.votes = {}
      this.voteAmount = 0
    }

    return { isDone, votes: this.votes }
  }

  nextRound() {
    this.status = { ...this.status, name: 'playing' }
    this.resetTimer()
    this.whoWon = null
    this.whoPause = []
    this.roundsPlayed += 1
    this.firstToPauseRight = null
  }

  checkIfWillGetDoblePoints(myId, votedId) {
    if (this.firstToPauseRight) return
    const lastThatPauses = this.whoPause[this.whoPause.length - 1]
    if (lastThatPauses !== myId) return
    const guyThatIVoted = this.users.get(votedId)
    if (guyThatIVoted.card === 'spy') {
      this.firstToPauseRight = myId
    }
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

  socket.on('join-room', ({ name, roomId }) => {
    if (!name || !roomId) return
    const game = cache.get(roomId)
    if (!game) {
      socket.emit('reset')
      return
    }
    game.join({ name, socket })
  })

  socket.on('change-config', ({ config }) => {
    const { name, roomId, sessionId } = socket.data
    if (!name || !roomId || !sessionId) return

    const game = cache.get(roomId)
    if (!game) {
      socket.emit('reset')
      return
    }

    game.changeConfig(config)
  })

  socket.on('start-game', () => {
    const { name, roomId, sessionId } = socket.data
    if (!name || !roomId || !sessionId) return

    const game = cache.get(roomId)

    game.start()

    const newInterval = setInterval(() => {
      io.to(game.getId()).emit('tick', game.decrementTimer())
    }, 1000)

    game.setInterval(newInterval)

    io.to(game.getId()).emit('started-game', {
      ...game.getStatus(),
      users: game.getUsers(),
    })
  })

  //   socket.on('start-tick', () => {
  //     const { name, roomId, sessionId } = socket.data
  //     if (!name || !roomId || !sessionId) return

  //     const game = cache.get(roomId)
  //     if (!game.getInterval()) {
  //       const newInterval = setInterval(() => {
  //         io.to(game.getId()).emit('tick', game.decrementTimer())
  //       }, 1000)

  //       game.setInterval(newInterval)
  //     }

  //     io.to(game.getId()).emit('changed-config', {
  //       gameStatus: game.getStatus(),
  //     })
  //   })

  //   socket.on('pause-tick', () => {
  //     const { name, roomId, sessionId } = socket.data
  //     if (!name || !roomId || !sessionId) return

  //     const game = cache.get(roomId)
  //     game.clearGameInterval(sessionId)

  //     io.to(game.getId()).emit('changed-config', {
  //       gameStatus: game.getStatus(),
  //     })
  //   })

  //   socket.on('reset-tick', () => {
  //     const { name, roomId, sessionId } = socket.data
  //     if (!name || !roomId || !sessionId) return

  //     const game = cache.get(roomId)
  //     game.resetTimer()
  //   })

  socket.on('vote', (id) => {
    const { name, roomId, sessionId } = socket.data
    if (!name || !roomId || !sessionId) return

    const game = cache.get(roomId)

    game.checkIfWillGetDoblePoints(sessionId, id)

    const { isDone, votes } = game.vote(id)

    io.to(game.getId()).emit('someone-voted', {
      votes,
    })

    if (isDone) {
      io.to(game.getId()).emit('changed-config', {
        gameStatus: game.getStatus(),
      })
      io.to(game.getId()).emit('vote-ended')

      const isPlaying = game.getStatus().status.name === 'playing'

      if (isPlaying) {
        if (!game.getInterval()) {
          const newInterval = setInterval(() => {
            io.to(game.getId()).emit('tick', game.decrementTimer())
          }, 1000)

          game.setInterval(newInterval)
        }
      }
    }
  })

  socket.on('next-round', () => {
    const { name, roomId, sessionId } = socket.data
    if (!name || !roomId || !sessionId) return

    const game = cache.get(roomId)

    game.nextRound()

    game.start()

    if (!game.getInterval()) {
      const newInterval = setInterval(() => {
        io.to(game.getId()).emit('tick', game.decrementTimer())
      }, 1000)

      game.setInterval(newInterval)
    }

    io.to(game.getId()).emit('started-game', {
      ...game.getStatus(),
      users: game.getUsers(),
    })
  })
})

server.listen(PORT, () => {
  console.log('listening on: ', PORT)
})
