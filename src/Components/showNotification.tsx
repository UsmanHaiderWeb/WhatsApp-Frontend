import { Bell, Trash2 } from 'lucide-react'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchType, storeType } from './ReduxStore/Store'
import { notificationInter, notificationsActions } from './ReduxStore/Slices/NotificationsSlice'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import TemplateNotification from './TemplateNotification'
import axios from 'axios'


const showNotification = () => {
    const notifications = useSelector((state: storeType) => state.notifications);
    const [allFilteredNotifications , setFilteredNotifications] = useState<[notificationInter] | []>([]);
    const API_URL = useSelector((state: storeType) => state.API_URL);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch<dispatchType>();

    useEffect(() => {
        if(notifications){
            let newArray: any | [notificationInter] = notifications.filter((notify: notificationInter) => notify.isNotifiedMessage)
            setFilteredNotifications(newArray);
        }
    }, [notifications])

  
    const deleteAllNotification = async () => {
      try {
        if (!token) return;
        let response = await axios.post(`${API_URL}/notification/delete/many?token=${token}`, {
            notifications: allFilteredNotifications.map((notify: notificationInter) => notify._id),
        })
        if( response.data.status == 200 ) {
          console.log("response.data.deletedNotification._id: ", response.data.notifications);
          dispatch(notificationsActions.update(response.data.notifications));
        }
      } catch (error) {
        console.log("DELETING SINGLE NOTIFICATION ERROR: ", error.message);
      }
    }


return (
    <DropdownMenu>
        <DropdownMenuTrigger className='px-2'>
            <div className='flex justify-center items-center size-9 rounded-full relative'>
                <Bell className='opacity-60' size={20} />
                {(notifications && allFilteredNotifications.length > 0) &&
                    <div className='text-[10px] bg-[#e40606] rounded-full absolute top-0 right-0 flex justify-center items-center w-4 h-4'>{allFilteredNotifications.length}</div>
                }
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-[#2A3942] w-96 micro:w-[95vw] mobile:w-[85vw] outline-none border-opacity-15 border-[1px] border-[#dadada] mr-5'>
            <DropdownMenuLabel className='flex justify-between items-center flex-row opacity-90'>
                <div>Notifications</div>
                <Trash2 size={20} onClick={() => deleteAllNotification()} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='opacity-20' />
            {(allFilteredNotifications && allFilteredNotifications.length > 0) ?
                <div className='allNot w-full px-2 h-60 overflow-y-auto overflow-x-hidden flex items-start flex-col gap-y-1'>
                    {allFilteredNotifications.map((notification: notificationInter, ndx: number) => (
                        <TemplateNotification key={`${notification}, ${ndx}`} content={notification.content} id={notification._id} index={ndx} />
                    ))}
                </div>
            :
                <div className='px-2 py-1 text-[13px] micro:text-[12px] opacity-70'>No notification is there</div>
            }
            <DropdownMenuSeparator className='opacity-20' />
            <p className='px-2 py-1 text-[12px] micro:text-[10px] opacity-50 text-center'>Click on the trash icon to delete all the notifications, or click on the X icon to delete a specific notification.</p>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(showNotification);