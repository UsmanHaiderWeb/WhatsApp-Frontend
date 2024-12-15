import React, { memo } from 'react'
import ShowUserWithDP_Email from './ShowUserWithDP_Email'
import { useSelector } from 'react-redux';
import AcceptRequest from './AcceptRequest';

const AllGroupRequests = () => {
    const chatData = useSelector((state: any) => state.chatdata);

    
return (
    <div className='allUser list w-full h-[30vh] max-h-56 overflow-auto pb-5 mb-5'>
        {chatData && chatData?.requests?.map((i: any, idx: number) => (
            <label key={`${i}, ${idx}`}>
                <div className='w-full flex items-center justify-start'>
                    <div className='w-20 px-4 micro:w-14 micro:px-2 mobile:w-16 mobile:px-2'>
                        <img src={i.dp || "/banner.jpeg"} alt="user" className='w-12 h-12 micro:w-10 micro:h-10 rounded-full object-cover'/>
                    </div>
                    <div className='w-[calc(100%-80px)] micro:w-[calc(100%-64px)] mobile:w-[calc(100%-64px)] border-t-[#dadada] border-t-solid border-t-[1px] border-opacity-10 py-3 flex justify-between items-center pr-6 mobile:pr-2 micro:pr-0'>
                        <div className='w-full'>
                            <h1 className='text-[17px] micro:text-[14px] opacity-90'>{i.username}</h1>
                            <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-[13px] micro:text-[12px] opacity-60 pr-6'>{i.email}</p>
                        </div>
                        <AcceptRequest id={i._id} />
                    </div>
                </div>
            </label>
        ))}
    </div>
  )
}

export default memo(AllGroupRequests)