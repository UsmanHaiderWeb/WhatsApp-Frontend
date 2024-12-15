import React, { memo } from 'react'
import CreateGroupChatHoverMenu from './createGroupChatHoverMenu'
import { useSelector } from 'react-redux'
import SearchUsers from './SearchUsers'
import ShowNotification from './showNotification';



interface UsersBoxHeadInterface {
    refetch?: any,
    headName: string,
    searchUsers?: any,
    setSearchedUsers?: any,
    filterFriends?: boolean;
    onlyFriends: boolean
}


const UsersBoxHeadComponent = ({refetch, headName, searchUsers, setSearchedUsers, filterFriends, onlyFriends}: UsersBoxHeadInterface) => {
    const userData = useSelector((state: any) => state.userData);

return (<>
    <div className='pl-5 mobile:pl-3 micro:pl-2 pr-5 flex justify-between items-center'>
        <h1 className='text-[20px] opacity-80 font-bold'>{headName}</h1>
        <div className='flex justify-between items-center gap-x-6 micro:gap-x-4'>
            <ShowNotification />
            <CreateGroupChatHoverMenu userId={userData?._id} refetch={false} />
        </div>
    </div>
    <div className='px-3 w-full mt-5'>
    <SearchUsers onlyFriends={onlyFriends} searchUsers={searchUsers} setSearchedUsers={setSearchedUsers} filterFriends={filterFriends} />
    </div>
</>)}

export default memo(UsersBoxHeadComponent)