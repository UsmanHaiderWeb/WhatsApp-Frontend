import { BellOff, MessageSquarePlus } from 'lucide-react'
import React, { Fragment, memo } from 'react'
import CreateGroupChatHoverMenu from './createGroupChatHoverMenu'
import { useSelector } from 'react-redux'
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers'
import UnBlockBtn from './UnBlockBtn'
import { FriendsToShowSkeleton } from './FriendsToShow'
import ShowNotification from './showNotification'

const UsersBlockedPage = () => {
  const userData = useSelector(({userData}: {userData: any}) => userData);
  const blockedUsers = useSelector(({blockedUsers}: {blockedUsers: any}) => blockedUsers);

  return (
    <div className='h-screen'>
      <div className='w-full h-30 mt-5'>
        <div className='pl-5 mobile:pl-3 micro:pl-2 pr-5 pb-2 flex justify-between items-center'>
          <h1 className='text-[19px] opacity-80 font-bold'>BlockedUsers</h1>
          <div className='flex justify-between items-center gap-x-6 micro:gap-x-4'>
            <ShowNotification />
            <CreateGroupChatHoverMenu userId={userData?._id} refetch={false} />
          </div>
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
      {(blockedUsers && userData) ?
        <div className='allUser listFriends w-full h-[calc(100%-125px)] overflow-x-hidden overflow-y-auto pb-5 mt-2'>
            {blockedUsers?.map((i: getAllUsersInterface | any, idx: number) => (
              <Fragment  key={`${i}, ${idx}`}>
                {(i?._id != userData?._id) &&
                  <div className='w-full flex items-center justify-start micro:justify-between'>
                    <div className='w-20 px-4 micro:w-14 micro:px-2 mobile:w-16 mobile:px-2'>
                      <img src={i.dp || "/banner.jpeg"} alt="user" className='w-12 h-12 micro:w-10 micro:h-10 rounded-full object-cover'/>
                    </div>
                    <div className='w-[calc(100%-80px)] micro:w-[calc(100%-64px)] mobile:w-[calc(100%-64px)] border-t-[#dadada] border-t-solid border-t-[1px] border-opacity-10 py-3 flex justify-between items-center pr-6 mobile:pr-3 micro:pr-2'>
                      <div className='w-full'>
                        <h1 className='text-[17px] micro:text-[14px] opacity-90'>{i.username}</h1>
                        <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-[13px] micro:text-[12px] opacity-60 pr-6'>{i.email}</p>
                      </div>
                      <UnBlockBtn id={i._id} />
                    </div>
                  </div>
                }
              </Fragment>
            ))}
            {blockedUsers?.length == 0 && 
              <div className='text-center opacity-35'>No user was blocked by you.</div>
            }
        </div>
      :
        <div className='allUser listFriends w-full h-[calc(100%-125px)] overflow-hidden pb-5 mt-2'>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((o: number, odx: number) => (
            <FriendsToShowSkeleton key={`${o}, ${odx}`} />
          ))}
        </div>
      }
    </div>
  )
}

export default memo(UsersBlockedPage)