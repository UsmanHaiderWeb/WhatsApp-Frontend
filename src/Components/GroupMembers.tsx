import React, { memo } from 'react'
import ShowUserWithDP_Email from './ShowUserWithDP_Email'
import { useSelector } from 'react-redux';

const GroupMembers = () => {
    const userData = useSelector((state: any) => state.userData);
    const chatData = useSelector((state: any) => state.chatdata);

    
return (
    <div className='allUser list w-full h-[30vh] max-h-56 overflow-auto pb-5 mb-5'>
        {chatData && chatData?.members?.map((i: any, idx: number) => (
            <label key={`${i}, ${idx}`}>
                {(i._id == userData._id) ?
                    <ShowUserWithDP_Email username={i.username} email={i.email} dp={i.dp} writeAdmin={true} />
                :
                    <ShowUserWithDP_Email username={i.username} email={i.email} dp={i.dp} />
                }
            </label>
        ))}
    </div>
  )
}

export default memo(GroupMembers)