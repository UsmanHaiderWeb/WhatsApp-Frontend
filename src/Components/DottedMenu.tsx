import React, { memo } from 'react'

const DottedMenu = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-y-[2px] opacity-60'>
        <div className='w-[4px] h-[4px] rounded-full bg-white ' />
        <div className='w-[4px] h-[4px] rounded-full bg-white ' />
        <div className='w-[4px] h-[4px] rounded-full bg-white ' />
    </div>
  )
}

export default memo(DottedMenu)