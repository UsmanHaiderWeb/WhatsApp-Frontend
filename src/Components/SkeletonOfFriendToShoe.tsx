import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { storeType } from './ReduxStore/Store';
import { notificationInter } from './ReduxStore/Slices/NotificationsSlice';

export interface User {
    _id: string;
    username: string;
    email: string;
}

interface friendSkeletonInterface {
    chatID: string,
    admin: [User],
    latestMessage: {
        content: string;
        sentBy?: any
    },
    isGroupChat: boolean,
    chatName: string
    chatDP: string
}


const SkeletonOfFriendToShoe = ({chatID, admin, latestMessage, isGroupChat, chatName, chatDP}: friendSkeletonInterface) => {
    const userData = useSelector((state: storeType) => state.userData);
    const notifications = useSelector((state: storeType) => state.notifications);
    const [ username, setName ] = useState<{} | {username: string, dp: string}>({});
    const [ relatedNotifications, setRelatedNotification ] = useState<[notificationInter] | []>([]);

    useEffect(() => {
        if(notifications){
            let newArray: any = notifications.filter((notify: notificationInter) => {
                return ((notify?.chatID == chatID || notify?.chatID?._id == chatID) && !notify.isNotifiedMessage)
            });
            console.log("newArray: ", newArray);
            setRelatedNotification(newArray);
        }
        if (userData && !isGroupChat) {
            if (admin.length == 1) {
                setName({
                    username: admin[0]?.username,
                    dp: admin[0]?.dp
                })
            } else {
                let newArray = admin.filter((i: User, idx: number) => {
                    return i?._id != userData?._id
                })
                setName({
                    username: newArray[0]?.username,
                    dp: newArray[0]?.dp
                })
            }
        }
    }, [admin, userData, notifications])

return (
    <NavLink to={chatID} end className='w-full flex items-center justify-start relative'>
        <div className='w-20 px-4 micro:px-2 mobile:px-2 mobile:w-16 micro:w-14'>
            <img src={isGroupChat ? chatDP : username.dp} className='w-12 h-12 micro:w-10 micro:h-10 rounded-full object-cover' />
        </div>
        <div className='w-[calc(100%-80px)] mobile:w-[calc(100%-80px)] micro:w-[calc(100%-60px)] border-t-[#dadada] border-t-solid border-t-[1px] border-opacity-10 py-3'>
            <div className='w-full flex justify-between items-center pr-6'>
                <h1 className='text-[17px] micro:text-[14px] opacity-90'>{isGroupChat ? chatName : username.username}</h1>
                <div className='opacity-60 text-[13px] micro:text-[11px]'>8:56 AM</div>
            </div>
            <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-[13px] opacity-60 pr-6'>
                {latestMessage ? '' : 'No Message yet'}
                {latestMessage && <>
                    {(latestMessage?.sentBy?._id == userData?._id) ?
                        <span>(You)&nbsp;:&nbsp;</span>
                    :
                        <span>{latestMessage?.sentBy?.username}&nbsp;:&nbsp;</span>
                    }
                </>}
                {latestMessage?.content}
            </p>
        </div>
        {(notifications && relatedNotifications.length > 0) &&
            <div className='text-[10px] bg-[#e40606] rounded-full absolute top-1/2 -translate-y-1/2 right-5 flex justify-center items-center w-4 h-4'>{relatedNotifications.length}</div>
        }
    </NavLink>
  )
}

export default memo(SkeletonOfFriendToShoe)