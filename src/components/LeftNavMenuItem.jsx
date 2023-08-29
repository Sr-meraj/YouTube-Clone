import React from 'react'

function LeftNavMenuItem({text,icon,action, className}) {

  return (
    <div className={"text-black dark:text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-black/10 dark:hover:bg-white/[0.15] " + className }
    onClick={action}>
      <span className='text-xl mr-5'>{icon}</span>
      {text}
    </div>
  )
}

export default LeftNavMenuItem
