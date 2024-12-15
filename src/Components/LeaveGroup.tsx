import { ExitIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import axios from 'axios';

const LeaveGroup = () => {
    const token = localStorage.getItem('token');
    const param = useParams();
    const dispatch = useDispatch();
    const API_URL = useSelector(({API_URL}: {API_URL: string}) => API_URL);
    const navigate = useNavigate();

    const leaveGroup = async () => {
        try {
            let response = await axios.put(`${API_URL}/chat/group/exit?token=${token}&id=${param.id}`);
            console.log(response);
            if (response.data.status == 200) {
                response.data.exitGroup && dispatch(getAllChatsActions.removeChat(response.data.exitGroup._id));
                response.data.exitGroup && navigate('/', {replace: true});
            }
        } catch (error) {
            console.log("ADDING GROUP MEMBERS ERROR: ", error.message);
        }
    }


  return (
    <div className='w-full px-2 py-1 flex justify-start items-center gap-x-2 opacity-80 hover:opacity-100 text-[14px]' onClick={() => leaveGroup()}>
        <ExitIcon />
        Leave this group
    </div>
  )
}

export default memo(LeaveGroup)