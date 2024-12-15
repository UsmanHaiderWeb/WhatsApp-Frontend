import { BellOff, MessageSquarePlus } from 'lucide-react'
import React, { Fragment, memo, useEffect, useState } from 'react'
import CreateGroupChatHoverMenu from './createGroupChatHoverMenu'
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers'
import { gql, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import SendRequestToGroup from './SendRequestToGroup'
import { allGroupsActions } from './ReduxStore/Slices/sliceAllGroups'
import { FriendsToShowSkeleton } from './FriendsToShow'
import ShowNotification from './showNotification'

const gettingAllGroupsQuery = gql`
    query gettingAllGroups {
        getAllGroups {
            chatName
            dp
            _id
            admin{
              _id
              username
            }
            members {
              _id
              username
              email
            }
            requests {
              _id
              username
              email
            }
        }
    }
`

const allGroups = () => {
    const [ showKrneWaleGroups, setShowGroups ] = useState([]);
    const userData = useSelector(({userData}: {userData: any}) => userData);
    const token = localStorage.getItem('token');
    const allGroups = useSelector(({allGroups}: {allGroups: any}) => allGroups);
    const dispatch = useDispatch();

    const { data } = useQuery(gettingAllGroupsQuery, {
        skip: !token || token == ''
    })

    useEffect(() => {
        if(data && data?.getAllGroups){
            dispatch(allGroupsActions.update(data.getAllGroups))
            let filteredChatArray = data?.getAllGroups.filter(group => {
                return !userData?.chats.some(chat => chat.toString() == group._id);
            })
            setShowGroups(filteredChatArray);
        }
    }, [data])

  return (
    <div className='h-screen micro:pb-28 mobile:pb-28'>
      <div className='w-full h-30 mt-5'>
        <div className='pl-5 micro:pl-2 mobile:pl-3 pr-5 pb-2 flex justify-between items-center'>
          <h1 className='text-[19px] opacity-80 font-bold'>Public Groups</h1>
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
      {(allGroups && userData) ? 
        <div className='allUser listFriends w-full h-[calc(100%-125px)] overflow-x-hidden overflow-y-auto pb-5 mt-2'>
            {showKrneWaleGroups?.map((i: getAllUsersInterface | any, idx: number) => (
              <Fragment  key={`${i}, ${idx}`}>
                {(i?._id != userData?._id) &&
                  <div className='w-full flex items-center justify-start'>
                    <div className='w-20 px-4 mobile:w-16 mobile:px-2 micro:w-14 micro:px-2'>
                      <img src={i.dp || "/banner.jpeg"} alt="user" className='w-12 h-12 micro:w-10 micro:h-10 rounded-full object-cover'/>
                    </div>
                    <div className='w-[calc(100%-80px)] mobile:w-[calc(100%-64px)] micro:w-[calc(100%-56px)] border-t-[#dadada] border-t-solid border-t-[1px] border-opacity-10 py-3 flex justify-between items-center pr-6'>
                      <div className='w-full'>
                        <h1 className='text-[17px] micro:text-[13px] opacity-90'>{i.chatName}</h1>
                        <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-[13px] micro:text-[12px] opacity-60 pr-6'>{i?.admin[0]?.username} (admin)</p>
                      </div>
                      <SendRequestToGroup id={i._id} allRequests={i.requests} />
                    </div>
                  </div>
                }
              </Fragment>
            ))}
            {showKrneWaleGroups?.length == 0 && 
              <div className='text-center opacity-35'>There is no group or channel to show you.</div>
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

export default memo(allGroups)