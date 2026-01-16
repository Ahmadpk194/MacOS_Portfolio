import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

import { dockApps } from '#constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from '#store/window';


const Dock = () => {
    const {openWindow, closeWindow, windows} = useWindowStore()
    const dockRef = useRef(null)

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon')

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                // tighter, smoother falloff (mac-like)
                let intesity = Math.exp(-(distance * distance) / 3500);
                intesity = Math.min(intesity, 1);

                gsap.to(icon, {
                    scale: 1 + intesity * 0.45,   // max ~1.45
                    y: -22 * intesity,
                    duration: 0.12,
                    ease: 'power2.out'
                });
            });
        };


        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left)
        }

        const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
            scale: 1, y: 0, duration: 0.3, ease: 'power1.out'
        }))


        dock.addEventListener('mousemove', handleMouseMove)
        dock.addEventListener('mouseleave', resetIcons)
    }, [])


    const toggleApp = (app) => {
        if(!app.canOpen) return;

        const window = windows[app.id];

        if(window.isOpen){
            closeWindow(app.id)
        } else {
            openWindow(app.id)
        }

     }

    return (
        <section id="dock">
            <div ref={dockRef} className='dock-container'>
                {
                    dockApps.map(({ id, name, icon, canOpen }) => <div key={id} className='relative flex justify-center'>
                        <button type="button" className='dock-icon' aria-label={name} data-tooltip-id='dock-tooltip' data-tooltip-content={name} data-tooltip-delay-show={150} disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}>
                            <img src={`/images/${icon}`} alt={name} loading='lazy' className={canOpen ? '' : 'opacity-60'} />
                        </button>
                    </div>)
                }

                <Tooltip id='dock-tooltip' place='top' className='tooltip' />
            </div>
        </section>
    )
}

export default Dock