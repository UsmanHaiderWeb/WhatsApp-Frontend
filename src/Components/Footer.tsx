import axios from 'axios';
import { Mic, Send, Smile } from 'lucide-react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { sendMessageDataActions } from './ReduxStore/Slices/sendMessageData';
import { storeType } from './ReduxStore/Store';


const END_POINT = 'http://localhost:3000';
let socket: any;

const Footer = ({isChatID}: {isChatID: boolean}) => {
  const message = useRef<HTMLInputElement>(null);
  const API_URL: string = useSelector((state: storeType) => state.API_URL);
  const userData: any = useSelector((state: storeType) => state.userData);
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  let param = useParams();

  useEffect(() => {
    socket = io(END_POINT);
    return () => {
      socket.disconnect();
    };
  }, []);


  const typing = async (e: any) => {
    let messageCurrentValue = message?.current?.value;
    socket.emit('typing', {isTyping: true, chatID: param.id, userID: userData._id});
    setTimeout(() => {
      let messageLaterValue = message?.current?.value;
      if(messageLaterValue == messageCurrentValue){
        socket.emit('typing', {isTyping: false, chatID: param.id, userID: userData._id});
      }
    }, 3000);
  }

  useEffect(() => {
    socket.emit('clearNotification', {chatID: param?.id, userID: token});
  }, [param])

  const sendMessage = async () => {
    try {
      if (token && token != '' && message.current.value != '') {
        let response = await axios.post(`${API_URL}/message/create?token=${token}&id=${param.id}`, {content: message?.current?.value});
        if (response.data.status == 200) {
          dispatch(sendMessageDataActions.update(response.data.messageData));
          message.current.value = '';
          message.current.blur();
        }
      } else {
      }
    } catch (error) {
      console.log("SENDING THE MESSAGE ERROR: ", error.message);
    }
  }


  return (
    <footer className='w-full px-5 h-16 pt-2'>
      <div className='w-full h-full flex justify-center items-center gap-x-5'>
        <label htmlFor='message' className='w-[100%] bg-[#2A3942] py-3 rounded-md flex justify-center items-center pl-5 pr-7'>
          <Smile opacity={0.6} className='hover:opacity-100 mr-5' size={25} />
          <input type="text" ref={message} name='message' id='message' className='w-full bg-transparent text-[14px] pr-2' placeholder='Type a message' onChange={(e) => typing(e)} />
          <div className='border-l-[1px] border-l-solid border-l-[#dadada] border-opacity-30 pl-5' onClick={() => sendMessage()}>
            <Send opacity={0.6} className='hover:opacity-100' size={22} />
          </div>
        </label>
        <Mic opacity={0.6} className='hover:opacity-100 mobile:hidden micro:hidden' size={27} />
      </div>
    </footer>
  )
}

export default memo(Footer)