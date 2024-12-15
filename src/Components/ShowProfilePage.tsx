import React, { memo } from 'react'
import MessageBoxIntro from './MessageBoxIntro'
import ProfileToBeChange from './ProfileToBeChange'

const ShowProfilePage = () => {
  return (
    <>
        <div className='md:w-[410px] sm:w-[370px] w-full h-screen overflow-hidden bg-[#111B21]'>
          <ProfileToBeChange />
        </div>
        <div className='md:w-[calc(100vw-474px)] sm:w-[calc(100vw-434px)] h-screen sm:block hidden'>
            <MessageBoxIntro />
        </div>
    </>
  )
}

export default memo(ShowProfilePage)