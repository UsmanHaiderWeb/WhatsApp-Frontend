import React, { memo } from 'react'
import DottedMenu from './DottedMenu'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useSelector } from 'react-redux'
import BlockUser from './BlockUser'
import UnfriendUser from './UnfriendUser'
import { useParams } from 'react-router-dom'
import AddNewMember from './AddNewMember'
import DeleteGroup from './DeleteGroup'
import RemoveMembers from './RemoveMembers'
import LeaveGroup from './LeaveGroup'
import UpdateGroupTitle from './UpdateGroupTitle'
  

const ProvidedChatActions = () => {
    const param = useParams<string>();
    let token = localStorage.getItem('token');
    const chatData = useSelector((state:any) => state.chatdata);
    const userData = useSelector((state: any) => state.userData);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='p-2'>
            <DottedMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-[#2A3942] w-80 micro:w-[90vw] outline-none border-opacity-15 border-[1px] border-[#dadada] mr-5'>
            <DropdownMenuLabel>{chatData?.isGroupChat ? 'Provided group actions' : 'Provided user actions'}</DropdownMenuLabel>
            <DropdownMenuSeparator className='opacity-20' />
            {chatData?.isGroupChat ? <>
                {(chatData.admin[0]?._id == userData?._id) ? <>
                    <AddNewMember />
                    <RemoveMembers />
                    <UpdateGroupTitle placeholder='Rename Group' previousValue={chatData?.chatName} />
                    <DeleteGroup />
                </>:<>
                    <LeaveGroup />
                </>}
            </>:<>
                <BlockUser />
                <UnfriendUser />
            </>}
            <DropdownMenuSeparator className='opacity-20' />
            <div className='px-2 text-[13px] opacity-60 py-1'>These actions cannot be undone. Click on your own behalf.</div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(ProvidedChatActions)