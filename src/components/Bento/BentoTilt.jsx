import { useRef, useState } from 'react'


const BentoTilt = ({children, className=''}) => {
  const [transformStyle, setTransformStyle] = useState('')

  const itemRef = useRef(null)

  const  handleMouseMove = (e) => {
    if(!itemRef.current) return;

    const {width, height, left, top} = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('')
  }

  return (
    <div ref={itemRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{transform: transformStyle}}>
      {children}
    </div>
  )
}

export default BentoTilt