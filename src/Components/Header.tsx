import React, { memo, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { User } from './SkeletonOfFriendToShoe'
import { io } from 'socket.io-client'
import ProvidedChatActions from './ProvidedChatActions'
import AboutGroup from './AboutGroup'
import { Skeleton } from './ui/skeleton'
import { storeType } from './ReduxStore/Store'
import { ArrowLeft } from 'lucide-react'

let socket: any;

const Header = () => {
  const chatData = useSelector((state: storeType) => state.chatdata);
  const userData = useSelector((state: storeType) => state.userData);
  const [ usernameEmail, setName ] = useState<{username?: string; email?: string, dp?: string}>({});
  const isTyping = useSelector((state: storeType) => state.isTyping);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (chatData && userData && !chatData?.isGroupChat) {
      if (chatData?.admin?.length == 1) {
        setName({username: `${chatData?.admin[0]?.username} ( You )`, email: chatData?.admin[0]?.email, dp: chatData?.admin[0]?.dp})
      } else {
        let newArray = chatData.admin.filter((i: User, idx: number) => {
          return i._id != userData._id
        })
        console.log("newArray: ", newArray);
        setName({username: newArray[0]?.username, email: newArray[0]?.email, dp: newArray[0]?.dp})
      }
    }
  }, [chatData, userData])


  return (
    <div className='flex justify-between items-center px-5 md:pl-5 sm:pl-0 mobile:pl-2 micro:pl-2 py-3 h-[76px]'>
      <AboutGroup>
        {userData ?
          <div className='flex justify-center items-center gap-x-4 mobile:gap-x-2 micro:gap-x-1.5'>
            <div onClick={() => navigate('/', {replace: true})}><ArrowLeft opacity={.8} className='sm:hidden block' /></div>
            <div>
              <img src={chatData?.isGroupChat ? chatData.dp : (usernameEmail.dp || "/banner.jpeg")} alt="user whom to send message" className='w-12 h-12 mobile:w-11 mobile:h-11 micro:w-9 micro:h-9 object-cover rounded-full' />
            </div>
            <div className='mobile:w-[60vw] micro:w-[60vw]'>
              <h1 className='micro:text-[13px]'>{chatData?.isGroupChat ? chatData?.chatName : usernameEmail?.username}</h1>
              {isTyping ? 
                <div className='text-[13px] micro:text-[12px] opacity-60 font-["codePro"]'>typing....</div>
              :
                <p className='sm:w-40 mobile:w-40 micro:w-36 md:w-auto text-ellipsis overflow-hidden text-[13px] micro:text-[12px] opacity-60 font-["codePro"]'>{chatData?.isGroupChat ? `(Admin):  ${chatData?.admin[0].username}` : (usernameEmail?.email)}</p>
              }
            </div>
          </div>
        :
          <div className='flex justify-center items-center h-14 gap-x-3 my-1'>
              <Skeleton className='w-14 rounded-full h-14 bg-[#192429]' />
              <div className='flex justify-center items-start flex-col gap-y-1'>
                  <Skeleton className='w-40 h-4 bg-[#192429]' />
                  <Skeleton className='w-60 h-4 bg-[#192429]' />
              </div>
          </div>
        }
      </AboutGroup>
      <div className='flex justify-center items-center gap-x-8'>
        <ProvidedChatActions />
      </div>
    </div>
  )
}

export default memo(Header)