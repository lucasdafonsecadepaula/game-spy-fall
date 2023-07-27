import Image from 'next/image'
import asiloImg from '../../imgs/asilo.png'
import autodromoImg from '../../imgs/autodromo.png'
import baladaImg from '../../imgs/balada.png'
import bibliotecaImg from '../../imgs/biblioteca.png'
import casamentoImg from '../../imgs/casamento.png'
import cemiterioImg from '../../imgs/cemiterio.png'
import clubedefazzImg from '../../imgs/clubedefazz.png'
import convencaodejogosImg from '../../imgs/convencaodejogos.png'
import estadioImg from '../../imgs/estadio.png'
import exposicaodegatosImg from '../../imgs/exposicaodegatos.png'
import fabricadedocesImg from '../../imgs/fabricadedoces.png'
import metroImg from '../../imgs/metro.png'
import minadecarvaoImg from '../../imgs/minadecarvao.png'
import museudearteImg from '../../imgs/museudearte.png'
import nacoesunidasImg from '../../imgs/nacoesunidas.png'
import obraImg from '../../imgs/obra.png'
import onibusturisticoImg from '../../imgs/onibusturistico.png'
import parquedediversoesImg from '../../imgs/parquedediversoes.png'
import patinacaonogelohockeyImg from '../../imgs/patinacaonogelohockey.png'
import portonavalImg from '../../imgs/portonaval.png'
import postodegasolinaImg from '../../imgs/postodegasolina.png'
import prisaoImg from '../../imgs/prisao.png'
import showderockImg from '../../imgs/showderock.png'
import vinicolaImg from '../../imgs/vinicola.png'
import zoologicoImg from '../../imgs/zoologico.png'
import spyManImg from '../../imgs/spy-m.png'
import spyWomImg from '../../imgs/spy-w.png'
import versoImg from '../../imgs/verso.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const CARD_KEY_IMG = {
  asilo: asiloImg,
  autodromo: autodromoImg,
  balada: baladaImg,
  biblioteca: bibliotecaImg,
  casamento: casamentoImg,
  cemiterio: cemiterioImg,
  clubedejazz: clubedefazzImg,
  convencaodejogos: convencaodejogosImg,
  estadio: estadioImg,
  exposicaodegatos: exposicaodegatosImg,
  fabricadedoces: fabricadedocesImg,
  metro: metroImg,
  minadecarvao: minadecarvaoImg,
  museudearte: museudearteImg,
  nacoesunidas: nacoesunidasImg,
  obra: obraImg,
  onibusturistico: onibusturisticoImg,
  parquedediversoes: parquedediversoesImg,
  patinacaonogelohockey: patinacaonogelohockeyImg,
  portonaval: portonavalImg,
  postodegasolina: postodegasolinaImg,
  prisao: prisaoImg,
  showderock: showderockImg,
  vinicola: vinicolaImg,
  zoologico: zoologicoImg,
}

const SPY_CARD = {
  0: spyManImg,
  1: spyWomImg,
}

type GetSrcProps = keyof typeof CARD_KEY_IMG | 'spy'

export interface CardProps {
  type: GetSrcProps
  label: string
}

function getSrc(type: GetSrcProps) {
  if (type === 'spy') {
    const zeroOrOne = Math.floor(Math.random() * 2) as 0 | 1
    return SPY_CARD[zeroOrOne]
  }

  return CARD_KEY_IMG[type] ?? ''
}

export function Card({ type, label }: CardProps) {
  const [isVisible, setIsVisible] = useState(true)
  const src = useMemo(() => getSrc(type), [type])
  const timeoutToHideCardRef = useRef<null | NodeJS.Timer>(null)

  useEffect(() => {
    timeoutToHideCardRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }, [])

  const flipCard = () => {
    const newValue = !isVisible
    if (timeoutToHideCardRef.current) {
      clearTimeout(timeoutToHideCardRef.current)
    }
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    setIsVisible(newValue)
  }

  const text = label === 'spy' ? 'Você é o espião!' : `Você é o ${label}`

  return (
    <div
      className="flex flex-col relative items-center justify-center"
      onClick={flipCard}
    >
      <div className="px-2 relative">
        {isVisible ? (
          <Image className="w-full h-full" src={src} alt="" />
        ) : (
          <Image className="w-[343px] h-[240x]" src={versoImg} alt="" />
        )}
      </div>

      <h1
        className={twMerge(
          'text-2xl text-center pt-4 text-white',
          isVisible ? '' : 'pb-4',
        )}
      >
        {isVisible ? text : 'Virar a carta'}
      </h1>
    </div>
  )
}
