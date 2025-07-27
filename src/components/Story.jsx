import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import RoundedConers from './RoundedConers'
import { useRef } from 'react'
import { gsap } from 'gsap'
import Button from './Button'

const Story = () => {

    const frameRef = useRef(null)

    const handleMouseMove = (e) => {
        if(!frameRef.current) return;
        const element = frameRef.current;

        const {clientX, clientY} = e;

        const rect = element.getBoundingClientRect();
        const xPos = clientX - rect.left;
        const yPos = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((yPos - centerY) / centerY) * -10;
        const rotateY = ((xPos - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: "power1.inOut",
        });
    }

    const handleMouseLeave = () => {
        const element = frameRef.current;

        if (element) {
          gsap.to(element, {
           duration: 0.3,
           rotateX: 0,
           rotateY: 0,
           ease: "power1.inOut",
          });
        }
    }

  return (
    <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            <p className='font-general-sans text-xs uppercase md:text-[20px]'> 
                the multiver ip world
            </p>

            <div className='relative size-full'>
                <AnimatedTitle
                   title="the st<b>o</b>ry of <br/> a hidden real<b>m</b>"
                   containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                />

                {/* Clip-path masker defined in index.css */}
                <div className='story-img-container'>
                    <div className='story-img-mask'>
                        <div className='story-img-content'>
                            <img
                                ref={frameRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseLeave}
                                onMouseEnter={handleMouseLeave}
                                src="img/entrance.webp"
                                alt="entrance.webp"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <RoundedConers />
                </div>

                <div className="-mt-70 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center font-circular-web text-blue-50 md:text-start">
                            Where realms converge, lies Zentry and the boundless pillar.
                            Discover its secrets and shape your fate amidst infinite
                            opportunities.
                        </p>

                        <Button
                            id="realm-btn"
                            title="discover prologue"
                            containerClass="mt-5 text-black"
                        />
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Story