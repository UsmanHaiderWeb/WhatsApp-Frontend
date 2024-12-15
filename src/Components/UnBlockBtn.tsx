import axios from 'axios';
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { blockedUsersActions } from './ReduxStore/Slices/BlockedUsers';

const UnBlockBtn = ({id}: {id: string}) => {
    const token = localStorage.getItem('token');
    const API_URL = useSelector(({API_URL}: {API_URL: string}) => API_URL);
    const dispatch = useDispatch();

    const unblockFunc = async () => {
        if (token && token != '') {
            try {
                let response = await axios.put(`${API_URL}/user/unblock?token=${token}&id=${id}`)
                console.log("UNBLOCK RESPONSE: ", response);
                if (response.data.status == 200) {
                    dispatch(blockedUsersActions.removeUser(response.data.otherUser._id.toString()));
                }
            } catch (error) {
                console.log("UNBLOCK USER BTN ERROR: ", error.message);
                
            }
        }
    }

  return (
    <div className='opacity-60 text-[13px] micro:text-[11px] border-[1px] border-solid border-[#dadada] border-opacity-20 rounded-md px-3 py-2 hover:text-[black] hover:bg-white duration-150' onClick={() => unblockFunc()}>Unblock</div>
  )
}

export default memo(UnBlockBtn)