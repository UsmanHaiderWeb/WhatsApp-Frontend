import React, { memo } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import GroupMembers from './GroupMembers';
import AllGroupRequests from './AllGroupRequests';

const AboutGroup = ({children}) => {
    const chatData = useSelector((state: any) => state.chatdata);
    const userData = useSelector((state: any) => state.userData);
    

    const handleDialogue = (e) => {
        if (!chatData?.isGroupChat) {
            e.preventDefault();
        }
    }

return (
    <AlertDialog>
        <AlertDialogTrigger className='text-left' onClick={(e: any) => handleDialogue(e)}>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0 micro:px-2 mobile:px-2'>
            <AlertDialogHeader>
                <AlertDialogTitle className='w-full flex items-center gap-x-2'>
                    <div className='w-16 h-16 micro:w-14 micro:h-14 rounded-full overflow-hidden'>
                        <img src={chatData && (chatData.dp || "/banner.jpeg")} loading='lazy' className='w-full h-full object-cover' />
                    </div>
                    <div>
                        <h1 className='text-left micro:text-[15px]'>{chatData?.chatName}</h1>
                        <h4 className='text-[13px] micro:text-[12px] leading-[15px] opacity-60 font-["codePro"] text-left'>{chatData?.caption || (chatData?.isGroupChat && `(Admin):  ${chatData?.admin[0].username}`)}</h4>
                    </div>
                </AlertDialogTitle>
                <AlertDialogDescription className='pb-2 micro:text-[12px]'>Here are listed those users which are the members of this group. Only admin have the authority to remove a member, or add any other user to the group.</AlertDialogDescription>
            </AlertDialogHeader>
            {(chatData?.isGroupChat && (chatData.admin[0] == userData?._id.toString() || chatData.admin[0]?._id == userData?._id.toString())) ?
                <Tabs defaultValue="groupMembers" className="w-full rounded-md min-h-40 flex justify-start flex-col items-center overflow-hidden px-5 pt-3 micro:px-0 mobile:px-0">
                    <TabsList className='bg-[#cacaca] mb-2 outline-none border-none'>
                        <TabsTrigger value="groupMembers" className='px-10 micro:px-7 outline-none border-none py-3 data-[state=active]:bg-[#333] data-[state=active]:text-white'>Members</TabsTrigger>
                        <TabsTrigger value="grouprequests" className='px-10 micro:px-7 outline-none border-none py-3 data-[state=active]:bg-[#333] data-[state=active]:text-white'>Requests</TabsTrigger>
                    </TabsList>
                    <TabsContent value="groupMembers" className='w-full'>
                        <GroupMembers />
                    </TabsContent>
                    <TabsContent value="grouprequests" className='w-full'>
                        <AllGroupRequests />
                    </TabsContent>
                </Tabs>
            :<>
                <h1 className='pb-2'>Group Members</h1>
                <GroupMembers />
            </>}
            <AlertDialogFooter>
                <AlertDialogCancel className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45'>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    
  )
}

export default memo(AboutGroup);