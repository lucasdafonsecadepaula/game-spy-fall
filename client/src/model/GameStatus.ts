type StatusProps =
  | 'waiting-room'
  | 'playing'
  | 'preparing-next-round'
  | 'stoped'

type UserProps = {
  id: string
  name: string
  card: string | null
  profileImg: string
}

export type GameStatusProps = {
  admId: string
  status: StatusProps
  config: {
    timerInS: number
    howMuchSpys: number
  }
  place: string | null
  users: UserProps[]
}
