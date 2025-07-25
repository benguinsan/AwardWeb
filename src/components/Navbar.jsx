import { useRef, useState, useEffect } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = [
  'Nexus', 'Vault', 'Prologue', 'About', 'Contact'
]

const Navbar = () => {

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);



  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  // Get current scroll position
  const { y: currentScrollY } = useWindowScroll();

  // Handle scroll event (logic scroll handling navbar)
  useEffect(() => {
    if(currentScrollY === 0) {
      setIsNavbarVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if(currentScrollY > lastScrollY) {
      // Scroll down
      setIsNavbarVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if(currentScrollY < lastScrollY) {
      // Scroll up
      setIsNavbarVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY])

  // Animation Navbar visible smoothly (animation handling navbar)
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavbarVisible])

  const toggleAudioIndicator = () => {
    // Change state of audio and indicator true <=> false
    setIsPlayingAudio((prev) => !prev);
    setIndicatorActive((prev) => !prev);
  }

  // useEffect to handle audio play/pause when state changes (logic audio handling)
  useEffect(() => {
    if(isPlayingAudio) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  },[isPlayingAudio])

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
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
          <button className='ml-10 flex items-center space-x-0.5 cursor-pointer' onClick={toggleAudioIndicator}>
              <audio 
                ref={audioElementRef} 
                src="audio/loop.mp3"
                loop={true}
                className='hidden'
              />
              {[1, 2, 3, 4].map((bar) => (
                // Style delay to create wave effect/audio visualization
                // bar = 1 → delay = 0.1s
                // bar = 2 → delay = 0.2s  
                // bar = 3 → delay = 0.3s
                // bar = 4 → delay = 0.4s
                <div key={bar} className={`indicator-line ${indicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}} />
              ))}
          </button>              
        </nav>
      </header>
    </div>
  )
}

export default Navbar