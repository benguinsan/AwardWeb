import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // defined ScrollTrigger for clip-path animation. Start when scroll down to the center of the clip-path and End when scroll down 800px
    // If you scroll to div with id "#clip" when scroll to center of the div, the animation will trigger and start animation
    // After 800px from the center of the div, the animation will end and the clip-path will be full screen (100vw, 100vh)
    const clipAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '#clip',
            start: 'center center',
            end: '+=800 center',
            scrub: true,
            pin: true,
            pinSpacing: true,
        }  
    })

    // When scroll down, clip-path will be full screen (100vw, 100vh)
    clipAnimation.to('.mask-clip-path', {
        width: '100vw',
        height: '100vh',
        borderRadius: '0',
    })

  })

  return (
    <div id='about' className='min-h-screen w-screen overflow-x-hidden'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
            {/* Heading */}
            <h2 className='font-general-sans text-xs uppercase md:text-[20px]'>Welcome to Zentry</h2>

            <AnimatedTitle title="Disc<b>o</b>ver the world's <br/> l<b>a</b>rgest shared adventure" containerClass="mt-5 !text-black text-center" />

            {/* Subtext */}
            <div className='about-subtext'>
                <p>The Game of Games begins-your life, now an epic MMOOPG</p>
                <p>Zentry unites every player from countless games and platforms</p>
            </div>
        </div>

        {/* Clip-path */}
        <div id="clip" className='h-dvh w-screen'>
            <div className='mask-clip-path about-image'>
                <img
                    src="img/about.webp"
                    alt="background"
                    className='absolute left-0 top-0 size-full object-cover'
                />
            </div>
        </div>

    </div>
  )
}

export default About