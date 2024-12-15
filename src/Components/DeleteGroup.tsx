import axios from 'axios';
import { Ban } from 'lucide-react'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import { storeType } from './ReduxStore/Store';
import { io } from 'socket.io-client';


let socket: any;
const DeleteGroup = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = useSelector((state: storeType) => state.API_URL);
  const userData = useSelector((state: storeType) => state.userData);

  useEffect(() => {
    socket = io('http://localhost:3000');
  }, [])

  const deleteKroGroup = async () => {
    if (token && token.length > 20) {
      try {
        let response = await axios.put(`${API_URL}/chat/group/delete?token=${token}&id=${param.id}`)
        console.log(response);
        if (response.data.status == 200) {
          dispatch(getAllChatsActions.removeChat(response.data.deletedGroup._id));
          socket.emit('unfriend User', {
            userID: userData._id,
            chat: response.data.deletedGroup,
          });
          navigate('/', {replace: true});
        }
      } catch (error) {
        console.log("DELETING THE GROUP ERROR: ", error.message);
      }
    }
  }

  return (
    <div className='w-full px-2 pb-1 flex justify-start items-center gap-x-2 opacity-80 hover:opacity-100 text-[14px]' onClick={() => deleteKroGroup()}>
        <Ban size={20} />
        Delete group permanently
    </div>
  )
}

export default memo(DeleteGroup)