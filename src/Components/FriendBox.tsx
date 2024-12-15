import { BellOff} from 'lucide-react'
import React, { memo, useState } from 'react'
import FriendsToShow from './FriendsToShow';
import UsersBoxHeadComponent from './UsersBoxHeadComponent';
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';
import { useSelector } from 'react-redux';


const FriendBox = () => {
  const [ searchedUsers, setSearchedUsers ] = useState<null | [getAllUsersInterface]>(null);
  const chatData = useSelector((state: any) => state.chatdata);

  return (<>
    <div className='w-full h-60 mt-5'>
      <UsersBoxHeadComponent headName="Chats" searchUsers={chatData} setSearchedUsers={setSearchedUsers} filterFriends={false} onlyFriends={true} />
      <div className='flex justify-start items-center gap-x-3 px-5 my-2'>
        <div className='bg-[#0A332C] px-3 py-2 rounded-full text-[13px]'><span className='opacity-60'>All</span></div>
        <div className='bg-[#202C33] px-3 py-2 rounded-full text-[13px]'><span className='opacity-60'>Unread</span></div>
        <div className='bg-[#202C33] px-3 py-2 rounded-full text-[13px]'><span className='opacity-60'>Groups</span></div>
      </div>
      <div className='w-full bg-[#182229] flex items-center h-24'>
        <div className='bg-[#53BDEB] w-12 h-12 mx-4 rounded-full flex justify-center items-center'>
          <BellOff size={20} className='fill-[#182229] stroke-[#182229]' />
        </div>
        <div className='w-[calc(100%-80px)]'>
          <div>
            <h1 className='text-[15px]'>Want to mute notifications</h1>
            <p className='text-[12px] opacity-60'>If you want to mute the email notification, go to setting,then to notifications.</p>
          </div>
        </div>
      </div>
    </div>
    <FriendsToShow searchedUsers={searchedUsers} />
  </>)
}

export default memo(FriendBox)