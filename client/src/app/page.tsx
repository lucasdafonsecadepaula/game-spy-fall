'use client'
import { useContext, useState } from 'react'
import { GlobalContext } from '@/context/global'
import Image from 'next/image'
import bgImage from '../imgs/spyfall.jpg'

export default function Home() {
  const [name, setName] = useState('')
  const { createARoom } = useContext(GlobalContext)

  const onClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name) return
    createARoom({ name })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-gray-700 overflow-hidden">
      <div className="absolute top-0 bottom-0 right-0 left-0">
        <Image
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-[top]"
        />
      </div>
      <form
        onSubmit={onClick}
        className="glass z-10 py-6 px-4 flex flex-col gap-6 w-full sm:w-1/2"
      >
        <label className="text-2xl font-bold text-black">Digite seu nome</label>
        <input
          className="text-black py-2 px-4 rounded-md text-md focus-visible:outline-orange-600"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-600 rounded-md py-2 px-4 text-md font-bold"
        >
          Criar sala
        </button>
      </form>
    </main>
  )
}
