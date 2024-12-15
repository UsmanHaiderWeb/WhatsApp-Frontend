import React, { memo } from 'react'

const NoChatExist = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center opacity-30 text-[25px]'>
      This chat is no longer available
    </div>
  )
}

export default memo(NoChatExist)