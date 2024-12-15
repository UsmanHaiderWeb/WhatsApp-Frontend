import React, { memo } from 'react'

const AllGroupsToShow = () => {
  return (
    <div className='w-full'>
        <h1 className='text-center'>All the groups in which you're a member</h1>
        <div className='flex justify-center items-center flex-wrap gap-x-5 gap-y-2 w-full mt-5'>
            {['kjck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck', 'gjhsck', 'kjck', 'gjhsck'].map((i, idx) => (
                <div className='flex justify-center items-center gap-x-4 px-2'>
                    <div>
                        <img src="/banner.jpeg" alt="user whom to send message" className='w-12 h-12 object-cover rounded-full' />
                    </div>
                    <div>
                        <h1>Gup shup</h1>
                        <h4 className='text-[13px] opacity-60 font-["codePro"]'>Total members: almost 20</h4>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(AllGroupsToShow)