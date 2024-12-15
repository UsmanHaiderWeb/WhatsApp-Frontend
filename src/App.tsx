import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userDataActions } from './Components/ReduxStore/Slices/userData'
import WebContent from './Components/WebContent'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./Components/ui/context-menu"
import { useNavigate } from 'react-router-dom'
import MessageBoxIntro from './Components/MessageBoxIntro'

const App = () => {
  const API_URL = useSelector((state:any) => state.API_URL);
  const [isLoading, setLoading] = useState<boolean>(true)
  let token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ;(async function () {
      let response = await axios.get(`${API_URL}/user/isloggedin?token=${token}`);
      console.log(response);
      if (response.data.status == 200) {
        setLoading(false);
        dispatch(userDataActions.update(response.data.user));
      } else {
        setLoading(false);
        navigate('/signup', {replace: true});
      }
    })();
  }, [])


  return (<>
    {isLoading ?
      <div className='w-full h-screen bg-[#182229]'>
        <MessageBoxIntro />
      </div>
    :
      <ContextMenu>
        <ContextMenuTrigger className='w-[100vw]'>
          <WebContent />
        </ContextMenuTrigger>
        <ContextMenuContent className='w-72 border-[1px] border-[#dadada] border-solid border-opacity-15'>
          <ContextMenuItem onClick={() => navigate('/')}>Home page</ContextMenuItem>
          <ContextMenuItem onClick={() => navigate('/profile')}>Go to Profile</ContextMenuItem>
          <ContextMenuItem onClick={() => navigate('/users')}>Go to People</ContextMenuItem>
          <ContextMenuItem onClick={() => navigate('/groups')}>View All Groups</ContextMenuItem>
          <ContextMenuItem onClick={() => navigate('/users/blocked')}>View Blocked Users</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    }
  </>)
}

export default memo(App)