import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char === " " ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll('span');
    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetters = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}` })
    }

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect()
            const distance = Math.abs(mouseX - (l - left + w / 2))
            const intesity = Math.exp(-(distance ** 2) / 20000)

            animateLetters(letter, min + (max - min) * intesity)
        })
    }


    const handleMouseLeave = () => letters.forEach((letter) => animateLetters(letter, base, 0.3))

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
    }
}

const Welcome = () => {

    const titleRef = useRef(null)
    const subtilteRef = useRef(null)

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, 'title')
        const subtitleCleanup = setupTextHover(subtilteRef.current, 'subtitle')

        return () => {
            subtitleCleanup();
            titleCleanup()
        }
    }, [])

    return (
        <section id='welcome'>
            <p ref={subtilteRef}>{renderText("Hey, I'm Ahmad! Welcome to my", 'text-3xl font-georama', 100)}</p>
            <h1 ref={titleRef} className='mt-7'>{renderText("portfolio", 'text-9xl italic font-georama', 100)}</h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktop/talet screens only.</p>
            </div>
        </section>
    )
}

export default Welcome 