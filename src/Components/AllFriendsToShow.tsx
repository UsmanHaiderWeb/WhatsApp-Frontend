import React, { memo } from 'react'

const AllFriendsToShow = () => {
  return (
    <div className='w-full'>
        <h1 className='text-center'>All your friends are listed below:</h1>
        <div className='flex justify-center items-center flex-wrap gap-x-5 gap-y-2 w-full mt-5'>
            {['kjck', 'gjhsck', 'kjck', 'gjhsck'].map((i, idx) => (
                <div className='flex justify-center items-center gap-x-4 px-2'>
                    <div>
                        <img src="/banner.jpeg" alt="user whom to send message" className='w-12 h-12 object-cover rounded-full' />
                    </div>
                    <div>
                        <h1>Usman Haider</h1>
                        <h4 className='text-[13px] opacity-60 font-["codePro"]'>usmanhaiderweb@gmail.com</h4>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(AllFriendsToShow)