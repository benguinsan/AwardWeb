import React, { useState, useRef } from 'react'

const Hero = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
    const [hasClickedMiniVideo, setHasClickedMiniVideo] = useState(false);
    const [isLoadingMiniVideo, setIsLoadingMiniVideo] = useState(true);
    const [loadedMiniVideos, setLoadedMiniVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    // Modulo operator để lặp từ 1 đến 4    
    // 1 % 4 => 1 + 1 => 2 (upCommingVideoIndex)
    // 2 % 4 => 2 + 1 => 3 (upCommingVideoIndex)
    // 3 % 4 => 3 + 1 => 4 (upCommingVideoIndex)
    // 4 % 4 => 0 + 1 => 1 (upCommingVideoIndex)
    const upCommingVideoIndex = (currentVideoIndex % totalVideos) + 1;

    console.log("upCommingVideoIndex", upCommingVideoIndex)
    console.log("currentVideoIndex", currentVideoIndex)
    
    const handleMiniVideoClick = () => {
        setHasClickedMiniVideo(true);
        setCurrentVideoIndex(upCommingVideoIndex);
    }

    const handleVideoLoad = () => {
        setLoadedMiniVideos((prve) => prve + 1);
    }

    const getVideoSource = (index) => `videos/hero-${index}.mp4`;
      
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-50'>
            <div>
                {/* Mini Video Player */}
                <div className='mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video 
                            ref={nextVideoRef} 
                            src={getVideoSource(upCommingVideoIndex)} 
                            loop={true}
                            muted={true}
                            id='current-video'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>

                <video
                    ref={nextVideoRef}
                    src={getVideoSource(currentVideoIndex)}
                    loop={true}
                    muted={true}
                    id='next-video'
                    className='absolute-center invisible size-64 z-20 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />

                {/* Current Video Playing */}
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
                    </div>
                </div>

                {/* Bottom of Video */}
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    G<b>a</b>ming
                </h1>
            </div>
        </div>
    </div>          
  ) 
}

export default Hero