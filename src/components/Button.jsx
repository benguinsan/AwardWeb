import React from 'react'

const Button = ({title, id, containerClass, leftIcon, rightIcon}) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 rounded-full px-7 py-3 ${containerClass}`}>
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general-sans text-xs uppercase">
        <div>
          {title}
        </div>
      </span>
      {rightIcon}
    </button>   
  )
}

export default Button