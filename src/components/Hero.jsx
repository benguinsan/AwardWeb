import React, { useState, useRef, useEffect } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
    const [hasClickedMiniVideo, setHasClickedMiniVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMiniVideos, setLoadedMiniVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    // Modulo operator for loop from 1 to 4  
    // 1 % 4 => 1 + 1 => 2 (upCommingVideoIndex)
    // 2 % 4 => 2 + 1 => 3 (upCommingVideoIndex)
    // 3 % 4 => 3 + 1 => 4 (upCommingVideoIndex)
    // 4 % 4 => 0 + 1 => 1 (upCommingVideoIndex)
    const upCommingVideoIndex = (currentVideoIndex % totalVideos) + 1;

    // useEffect to handle loading state
    useEffect(() => {
        if(loadedMiniVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedMiniVideos])

    const handleMiniVideoClick = () => {
        setHasClickedMiniVideo(true);
        setCurrentVideoIndex(upCommingVideoIndex);
    }

    const handleVideoLoad = () => {
        setLoadedMiniVideos((prve) => prve + 1);
    }

    // useGSAP hook to handle animation dive when change video index - Animation definition, lifecycle of animations
    useGSAP(() => {
        if(hasClickedMiniVideo) {

            // When click mini video, set the next video to visible
            gsap.set('#full-video', {visibility: 'visible',})

            // When click mini video (next video) -> scale up to 100% (play video) 
            gsap.to('#full-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            })

            // When click mini video (next video) -> scale from 0 to current video (mini video)
            gsap.from('#mini-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, {dependencies: [currentVideoIndex], revertOnUpdate: true})

    // useGSAP to set Animation rectangle for video-frame when scroll down
    useGSAP(() => {
        // Set (final trapezoid) for video-frame (after scroll down)
        const trapezoidVideoFrame = {clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)", borderRadius: "0 0 40% 10%"}
        gsap.set("#video-frame", trapezoidVideoFrame)

        // Set (initial rectangle) for video-frame (before scroll down)
        const rectangleFullVideoFrame = {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }}
        gsap.from('#video-frame', rectangleFullVideoFrame)
    }) 


    const getVideoSource = (index) => `videos/hero-${index}.mp4`;
      
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {/* Loading Screen */}
        {isLoading && (
            <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                <div className='three-body'>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>
                </div>
            </div>
        )}
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-50'>
            <div>
                {/* Mini Video Player => Click to change video (index) */}
                <div className='mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video 
                            ref={nextVideoRef} 
                            src={getVideoSource(upCommingVideoIndex)} 
                            loop={true}
                            muted={true}
                            id='mini-video'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>

                {/* Used to created transition when click mini video  => change video index */}
                {/* when clicked miniVideo currentVideoIndex has been updated  */}
                <video
                    ref={nextVideoRef}
                    src={getVideoSource(currentVideoIndex)}
                    loop={true}
                    muted={true}
                    id='full-video'
                    className='absolute-center invisible size-64 z-20 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />

                {/* Display current video playing (full video) */}
                <video
                    ref={nextVideoRef}
                    src={getVideoSource(currentVideoIndex)}
                    autoPlay={true} 
                    loop={true}
                    muted={true}
                    className='absolute-center left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />

                {/* Heading of Video */}
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        {/* Heading */}
                        <h1 className='special-font hero-heading text-blue-100'>
                            redef<b>n</b><b>e</b>
                        </h1>
                        {/* Sologan? */}
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter the Metagame Layer 
                            <br />
                            Unleash the Play Economy
                        </p>

                        {/* Button */}
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-center gap-1' />

                    </div>
                </div>

                {/* Bottom of Video (1) */}
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    G<b>a</b>ming
                </h1>
            </div>
        </div>

        {/* Used for animation transition from (1) to (2) when slide (video-frame) -> below */}
        {/* (2) */}
        <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
            G<b>a</b>ming
        </h1>

    </div>          
  ) 
}

export default Hero