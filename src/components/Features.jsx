import React from 'react'
import BentoCard from './Bento/BentoCard'
import BentoTilt from './Bento/BentoTilt'
import { TiLocationArrow } from 'react-icons/ti'

const Features = () => {
  return (
    <section className='bg-black pb-52'>
        <div className='container mx-auto px-3 md:px-10'>
            <div className='px-5 py-32'>
                {/* Heading of Features */}
                <p className='font-circular-web text-lg text-blue-50'>Into the Metagame layer</p>
                <p className='mb-7 max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
                    Immerse yourself in a rich and ever-expanding universe where a vibrant
                    array of products converge into an interconnected overlay experience
                    on your world
                </p>

                {/* BentoCard */}
                <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard
                      src="videos/feature-1.mp4"
                      title={<>radi<b>n</b>t</>}
                      description="A cross-platform metagame app, turning your activities arcross Web2 and Web3 game into rewarding adventures."
                    />
                </BentoTilt>

                {/* Grid of Features */}
                <div className='grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7'>
                    <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={<>zig<b>m</b>a</>}
                            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_1 row-span-1 ms-8 md:col-span-1 md:ms-0'>
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={<>n<b>e</b>xus</>}
                            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_1 row-span-1 me-4 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={<>az<b>u</b>l</>}
                            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_2'>
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </h1>

                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_2'>
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>
                 
                </div>


            </div>

        </div>

    </section>
  )
}

export default Features