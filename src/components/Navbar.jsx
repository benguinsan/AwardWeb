import { useRef, useState, useEffect } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';

const navItems = [
  'Nexus', 'Vault', 'Prologue', 'About', 'Contact'
]


const Navbar = () => {

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const toggleAudioIndicator = () => {
    // Change state of audio and indicator true <=> false
    setIsPlayingAudio((prev) => !prev);
    setIndicatorActive((prev) => !prev);

  }

  // useEffect to handle audio play/pause when state changes
  useEffect(() => {
    if(isPlayingAudio) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  },[isPlayingAudio])

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolue top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          
          {/* logo & product button (left navbar) */}
          <div className='flex items-center gap-7'>
            <img src="img/logo.png" alt="logo" className='h-10' />

            <Button 
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation items (right navbar) */}
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item, index) => (
                <a className='nav-hover-btn' key={index} href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* button for play audio */}
          <button className='ml-10 flex items-center space-x-0.5'>
              <audio 
                ref={audioElementRef} 
                src="audio/loop.mp3"
                loop={true}
                className='hidden'
              >
              {[1, 2, 3, 4].map((bar) => (
                // Style delay to create wave effect/audio visualization
                // bar = 1 → delay = 0.1s
                // bar = 2 → delay = 0.2s  
                // bar = 3 → delay = 0.3s
                // bar = 4 → delay = 0.4s
                <div key={bar} className={`indicator-line ${indicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}}/>
              ))}
              </audio>
          </button>              

        </nav>
      </header>
    </div>
  )
}

export default Navbar