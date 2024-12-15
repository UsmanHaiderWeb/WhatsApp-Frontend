import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMembersToGroupActions } from './ReduxStore/Slices/AddMembersToGroup';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import { chatDataActions } from './ReduxStore/Slices/chatData';
import { io } from 'socket.io-client';
import { storeType } from './ReduxStore/Store';

let socket: any;
const AcceptRequest = ({id}: {id: string}) => {
    const token = localStorage.getItem('token');
    const param = useParams();
    const [isSubmitting, setSubmittingState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const API_URL = useSelector((state: storeType) => state.API_URL);
    const userData = useSelector((state: storeType) => state.userData);

    useEffect(() => {
        socket = io('http://localhost:3000');
    }, [])

    const acceptRequestFunc = async () => {
        if(token){
            try {
                setSubmittingState(true);
                let response = await axios.post(`${API_URL}/chat/group/addmember?token=${token}&id=${param.id}`, {
                    newMembers: [id]
                })
                if (response.data.status == 200) {
                    dispatch(addMembersToGroupActions.update([]));
                    dispatch(getAllChatsActions.replaceChat({
                        ...response.data?.chat,
                        latestMessage: response.data?.latestMessage ? {...response.data?.latestMessage} : null
                    }));
                    dispatch(chatDataActions.updateMembers(response.data?.chat?.members));
                    dispatch(chatDataActions.updateRequests(response.data?.chat?.requests));
                    socket.emit('addMembers', {
                        chatID: response.data.chat._id,
                        userID: userData._id,
                        members: [id],
                        isRequest: true
                    });
                    setSubmittingState(false);
                }
            } catch (error) {
                console.log("ACCEPTING REQUESTS GROUP MEMBERS ERROR: ", error.message);
                setSubmittingState(false);
            }
        }
    }

return (
    <div className='opacity-60 text-[13px] micro:text-[10px] border-[1px] border-solid border-[#dadada] border-opacity-20 rounded-md px-3 py-2 hover:text-[black] hover:bg-white duration-150 text-center' onClick={() => acceptRequestFunc()}>{isSubmitting ? 'Adding' : 'Add Member'}</div>
  )
}

export default memo(AcceptRequest)