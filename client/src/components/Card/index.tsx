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
import { useMemo, useState } from 'react'

const CARD_KEY_IMG = {
    'asilo': asiloImg,
    'autodromo': autodromoImg,
    'balada': baladaImg,
    'biblioteca': bibliotecaImg,
    'casamento': casamentoImg,
    'cemiterio': cemiterioImg,
    'clubedejazz': clubedefazzImg,
    'convencaodejogos': convencaodejogosImg,
    'estadio': estadioImg,
    'exposicaodegatos': exposicaodegatosImg,
    'fabricadedoces': fabricadedocesImg,
    'metro': metroImg,
    'minadecarvao': minadecarvaoImg,
    'museudearte': museudearteImg,
    'nacoesunidas': nacoesunidasImg,
    'obra': obraImg,
    'onibusturistico': onibusturisticoImg,
    'parquedediversoes': parquedediversoesImg,
    'patinacaonogelohockey': patinacaonogelohockeyImg,
    'portonaval': portonavalImg,
    'postodegasolina': postodegasolinaImg,
    'prisao': prisaoImg,
    'showderock': showderockImg,
    'vinicola': vinicolaImg,
    'zoologico': zoologicoImg,
    'spy': {
        0: spyManImg,
        1: spyWomImg
    }
};

interface CardProps {
    type: keyof typeof CARD_KEY_IMG;
    label: string
}

function getSrc(type: CardProps['type']) {
    if (type === 'spy') {
        const zeroOrOne = Math.floor(Math.random() * 2) as 0 | 1;
        return CARD_KEY_IMG[type][zeroOrOne]
    }
    return CARD_KEY_IMG[type] ?? ''
}

export function Card({ type, label }: CardProps) {
    const [isVisible, setIsVisible] = useState(true);
    const src = useMemo(() => getSrc(type), [type]);

    return (
        <div className="" onClick={() => setIsVisible(prev => !prev)}>
            {isVisible ? <Image
                className='-rotate-90'
                src={src}
                alt="Picture of the author"
            /> : <Image
                className='rotate-90'
                src={versoImg}
                alt="Picture of the author"
            />}

            <h1 className='text-4xl'>{isVisible && label}</h1>

        </div>
    )
}