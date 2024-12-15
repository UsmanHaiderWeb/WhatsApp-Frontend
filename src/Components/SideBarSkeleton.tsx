import React, { memo } from 'react'
import { Skeleton } from './ui/skeleton';

const SideBarSkeleton = () => {

  return (
    <div className='w-16 h-screen flex justify-between items-center flex-col py-5 micro:hidden mobile:hidden'>
      <div className='flex justify-start items-center flex-col gap-y-2'>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
      </div>
      <div className='flex justify-start items-center flex-col gap-y-2'>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
        <div className='w-10 h-10 rounded-full flex justify-center items-center'>
            <SideBarSkeletonIcon />
        </div>
      </div>
    </div>
  )
}

export default memo(SideBarSkeleton)


export const SideBarSkeletonIcon = () => {
  return (
    <Skeleton className='w-10 rounded-full h-10 bg-[#192429]' />
  )
}
