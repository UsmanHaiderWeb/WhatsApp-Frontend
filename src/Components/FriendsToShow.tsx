import React, { Fragment, memo } from 'react'
import SkeletonOfFriendToShoe from './SkeletonOfFriendToShoe';
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';
import { useSelector } from 'react-redux';
import { Skeleton } from './ui/skeleton';



const FriendsToShow = ({searchedUsers}:{searchedUsers: [getAllUsersInterface]}) => {
    const getAllChats = useSelector((state: any) => state.getAllChats);

return (<>
    {getAllChats ?
        <div className='allUser listFriends w-full h-[calc(100%-224px)] micro:h-[calc(100%-330px)] overflow-auto pb-5 mt-1'>
            {(getAllChats && !searchedUsers) && getAllChats?.map((i: any, idx: number) => (<Fragment  key={`${i}, ${idx}`}>
                <SkeletonOfFriendToShoe chatID={i?._id} admin={i?.admin} latestMessage={i?.latestMessage} isGroupChat={i?.isGroupChat} chatName={i?.chatName} chatDP={i?.dp} />
            </Fragment>))}
            {(getAllChats && !searchedUsers) && getAllChats?.length == 0 &&
                <div className='text-[15px] text-center px-5 opacity-60'>You have no friends.<br />Go to cummunity tab, and explore other users.</div>
            }
            {(getAllChats && searchedUsers) && searchedUsers.map((i: any, idx: number) => (<Fragment  key={`${i}, ${idx}`}>
                <SkeletonOfFriendToShoe key={`${i}, ${idx}`} chatID={i?._id} admin={i?.admin} latestMessage={i?.latestMessage} isGroupChat={i?.isGroupChat} chatName={i?.chatName} />
            </Fragment>))}
            {searchedUsers && searchedUsers?.length == 0 &&
                <div className='text-[15px] text-center px-5 opacity-60'>No friend related to search<br />Go to cummunity tab, and explore other users.</div>
            }
        </div>
    :
    <div className='flex justify-center items-center flex-col mt-1'>
        {['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'].map((o, odx) => (
            <FriendsToShowSkeleton key={`${o}, ${odx}`} />
        ))}
    </div>
    }
</>)}

export default memo(FriendsToShow)



export const FriendsToShowSkeleton = () => {
  return (
    <div className='w-full flex justify-center items-center h-12 gap-x-3 my-1'>
        <Skeleton className='w-12 rounded-full h-12 bg-[#222E35]' />
        <div className='w-[calc(100%-86px)] flex justify-center items-center flex-col gap-y-1'>
            <Skeleton className='w-full h-4 bg-[#222E35]' />
            <Skeleton className='w-full h-4 bg-[#222E35]' />
        </div>
    </div>
  )
}