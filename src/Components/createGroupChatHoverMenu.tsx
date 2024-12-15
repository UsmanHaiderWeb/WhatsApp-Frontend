import React, { memo } from 'react'
import DottedMenu from './DottedMenu'
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog';
import CreateGroupChatPortal from './CreateGroupChatPortal';
import { Group, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Link } from 'react-router-dom';



const createGroupChatHoverMenu = ({userId, refetch}: {userId:string, refetch: any}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='p-2'>
          <DottedMenu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-[#2A3942] w-80 micro:w-[90vw] outline-none border-opacity-15 border-[1px] border-[#dadada] mr-5'>
        <div className='px-3 py-1'>Provided Actions</div>
        <DropdownMenuSeparator className='opacity-20' />
        <AlertDialog>
          <AlertDialogTrigger className='flex items-center gap-x-2 opacity-80 hover:opacity-100 px-2 py-0.5'>
            <Group size={20} opacity={.8} />
            <div className='text-[14px] text-white'>Create group chat</div>
          </AlertDialogTrigger>
          <CreateGroupChatPortal userId={userId} />
        </AlertDialog>
        <DropdownMenuSeparator className='opacity-20' />
        <Link to='/profile' className='flex items-center gap-x-2 opacity-80 hover:opacity-100 px-2 text-[14px] text-white py-0.5'>
          <UserCircle size={20} opacity={.8} />Profile
        </Link>
        <DropdownMenuSeparator className='opacity-20' />
        <div className='px-2 text-[13px] opacity-60 py-1'>These actions cannot be undone. Click on your own behalf.</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(createGroupChatHoverMenu)