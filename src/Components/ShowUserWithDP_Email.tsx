import React, { memo } from 'react'

const ShowUserWithDP_Email = ({dp, username, email, writeAdmin, showAddBTN}: {dp?: string, username: string, email: string, writeAdmin?: boolean, showAddBTN?: boolean}) => {
  return (
    <div className='w-full flex items-center justify-start'>
        <div className='w-20 px-4 micro:px-2 micro:w-14 mobile:px-2 mobile:w-16'>
            <img src={dp || "/banner.jpeg"} alt="user" className='w-12 h-12 micro:w-10 micro:h-10 rounded-full object-cover'/>
        </div>
        <div className='w-[calc(100%-80px)] micro:w-[calc(100%-72px)] border-t-[#dadada] border-t-solid border-t-[1px] border-opacity-10 py-3 flex justify-between items-center pr-6 micro:pr-0'>
          <div className='flex justify-between items-center flex-col'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-[17px] micro:text-[13px] opacity-90'>{username}</h1>
            </div>
            <div className='w-full flex justify-between items-center'>
              <p className='w-48 text-ellipsis overflow-hidden whitespace-nowrap text-[13px] opacity-60 pr-6 text-start'>{email}</p>
              {writeAdmin &&
                <p className='w-full overflow-hidden whitespace-nowrap text-[13px] opacity-60 pr-6 text-start'>{writeAdmin && ' (admin)'}</p>
              }
            </div>
          </div>
          {showAddBTN &&
            <div className='opacity-60 text-[13px] border-[1px] border-solid border-[#dadada] border-opacity-20 rounded-md px-3 py-2 hover:text-[black] hover:bg-white duration-150'>Add</div>
          }
        </div>
    </div>
  )
}

export default memo(ShowUserWithDP_Email)