import { Cross2Icon } from '@radix-ui/react-icons'
import axios from 'axios';
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, storeType } from './ReduxStore/Store';
import { notificationsActions } from './ReduxStore/Slices/NotificationsSlice';

const TemplateNotification = ({id, content, index}: {id: string, content: string, index: number}) => {
  const API_URL = useSelector((state: storeType) => state.API_URL);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch<dispatchType>();

  const deleteNotification = async () => {
    try {
      if (!token) return;
      let response = await axios.post(`${API_URL}/notification/delete?token=${token}&id=${id}`)
      if( response.data.status == 200) {
        dispatch(notificationsActions.removeNotification(id));
      }
    } catch (error) {
      console.log("DELETING SINGLE NOTIFICATION ERROR: ", error.message);
      
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-[1px] border-b-[#dadada] border-solid border-opacity-15'>
        <div className='w-[calc(100%-20px)] text-[15px] micro:text-[12px] text-nowrap opacity-80 text-ellipsis'>{index + 1}. {content}</div>
        <Cross2Icon onClick={() => deleteNotification()} />
    </div>
  )
}

export default memo(TemplateNotification)