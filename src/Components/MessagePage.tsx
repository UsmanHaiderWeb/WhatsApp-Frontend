import React, { memo } from 'react'
import FriendBox from './FriendBox'
import { Outlet, useLocation, useParams } from 'react-router-dom'

const MessagePage = () => {
  const url = useLocation();
  
  
  return (
    <>
      <div className={`md:w-[410px] sm:w-[370px] w-full ${url.pathname != '/' ? 'hidden sm:block' : 'block'} h-screen overflow-hidden bg-[#111B21]`}>
        <FriendBox />
      </div>
      <div className={`md:w-[calc(100vw-474px)] sm:w-[calc(100vw-434px)] w-full h-screen ${url.pathname == '/' ? 'hidden sm:block' : 'block'}`}>
        <Outlet />
      </div>
    </>
  )
}

export default memo(MessagePage)