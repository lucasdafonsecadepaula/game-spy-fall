'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context/global'

export default function Home() {
  const [ name, setName ] = useState('');
  const { createARoom } = useContext(GlobalContext)

  const onClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    createARoom({ name })
  }

  return (
    <form onSubmit={onClick}>
      <input className='text-black' placeholder="seu nome" onChange={(e) => setName(e.target.value)} />
      <button type='submit'>Criar sala</button>
    </form>
  )
}
