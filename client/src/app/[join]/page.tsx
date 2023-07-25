'use client'
import { useContext, useState } from 'react'
import { GlobalContext } from '@/context/global'
import { useParams } from 'next/navigation'

export default function Home() {
    const params = useParams()
    const [name, setName] = useState('');
    const { joinARoom } = useContext(GlobalContext)

    const onClick = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        joinARoom({ name, roomId: params.join as string })
    }

    return (
        <form onSubmit={onClick}>
            <input className='text-black' placeholder="seu nome" onChange={(e) => setName(e.target.value)} />
            <button type='submit'>Entrar na Sala</button>
        </form>
    )
}
