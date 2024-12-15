import { SearchSlash, UserCircle } from 'lucide-react';
import React, { memo, useEffect, useRef, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { addMembersToGroupActions } from './ReduxStore/Slices/AddMembersToGroup';
import { useDispatch, useSelector } from 'react-redux';
import MarkedMembers from './MarkedMembers';
import ShowUserWithDP_Email from './ShowUserWithDP_Email';
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';
import arrayShuffle from 'array-shuffle';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import { chatDataActions } from './ReduxStore/Slices/chatData';
import { io } from 'socket.io-client';
import { storeType } from './ReduxStore/Store';

let socket: any;
const AddNewMember = () => {
    const token = localStorage.getItem('token');
    const param = useParams();
    const closeDialogue = useRef<HTMLButtonElement>(null)
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState(null);
    const dispatch = useDispatch();
    const addMembersToGroup = useSelector((state: storeType) => state.addMembersToGroup);
    const getAllUsers = useSelector((state: storeType) => state.getAllUsers);
    const userData = useSelector((state: storeType) => state.userData);
    const chatData = useSelector((state: storeType) => state.chatdata);
    const API_URL = useSelector((state: storeType) => state.API_URL);
    const blockedUsers = useSelector((state: storeType) => state.blockedUsers);
    const getAllChats = useSelector((state: storeType) => state.getAllChats);

    const addToGroup = (e: any) => {
        e.target.checked = true;
        if(e.target.checked){
            dispatch(addMembersToGroupActions.add({
                _id: e.target.value.toString(),
                username: e.target.name
            }));
        }
    }

    useEffect(() => {
        let memberFilteredArray = getAllUsers?.filter((user: any) => {
            return !chatData.members.some(member => member._id === user._id)
        })

        let filteredFromBlockedUser = memberFilteredArray.filter((user: getAllUsersInterface) => {
            return !blockedUsers?.some(friend => friend._id === user._id)
        })
        let shuffledArray = arrayShuffle(filteredFromBlockedUser);
        setAllUsers(shuffledArray);
    }, [getAllUsers, chatData, getAllChats])
    
    
    const searchKroUsers = (e: any) => {
        console.log("allUsers: ", allUsers);
        let newArray = allUsers?.filter((user: getAllUsersInterface | any, udx: number)=> {
            return user?.username.toLowerCase().includes(e.target.value);
        })
        console.log("newArray: ", newArray);

        let shuffledArray = arrayShuffle(newArray);
        setSearchedUsers(shuffledArray);
    }

    useEffect(() => {
        socket = io('http://localhost:3000');
    }, [])

    const addMembers = async () => {
        try {
            let memberArrayWithIds = addMembersToGroup.map(member => {
                return member._id
            })
            
            let response = await axios.post(`${API_URL}/chat/group/addmember?token=${token}&id=${param.id}`, {
                newMembers: memberArrayWithIds
            })
            console.log(response);
            if (response.data.status == 200) {
                console.log("{...response.data.chat, latestMessage: {...response.data.latestMessage}}", {...response.data.chat, latestMessage: {...response.data.latestMessage}});
                dispatch(addMembersToGroupActions.update([]));
                dispatch(getAllChatsActions.replaceChat({
                    ...response.data.chat,
                    latestMessage: response.data.latestMessage ? {...response.data.latestMessage} : null
                }));
                dispatch(chatDataActions.updateMembers(response.data.chat.members));
                setSearchedUsers(null);
                closeDialogue?.current?.click();
                socket.emit('addMembers', {
                    chatID: response.data.chat._id,
                    userID: userData._id,
                    members: memberArrayWithIds
                });
            }
        } catch (error) {
            console.log("ADDING GROUP MEMBERS ERROR: ", error.message);
        }
    }


return (
    <AlertDialog>
        <AlertDialogTrigger>
            <div className='w-full px-2 pt-1 flex justify-start items-center gap-x-2 opacity-80 hover:opacity-100 text-[14px]'>
                <UserCircle size={20} />
                Add new Member
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0 mobile:px-3 micro:px-2'>
            <AlertDialogHeader>
                <AlertDialogTitle>Add new Members</AlertDialogTitle>
                <AlertDialogDescription>Here are listed those users which are not already the member of this group, or are not blocked by you.</AlertDialogDescription>
            </AlertDialogHeader>
            <div>
                <div className='w-full mt-2'>
                    <h1>Search users to add</h1>
                    <label htmlFor='search' className='flex justify-start items-center bg-[#202C33] py-2 rounded-xl gap-x-5 px-3 mt-1'>
                        <SearchSlash size={19} className='opacity-60' />
                        <input type="text" name='search' id='search' placeholder='Search' className='w-full border-none outline-none bg-transparent text-[14px]' onChange={(e: any) => searchKroUsers(e)} />
                    </label>
                </div>
                {(addMembersToGroup && addMembersToGroup.length > 0) &&
                    <MarkedMembers addMembersToGroup={addMembersToGroup} />
                }
                <div className='allUser list w-full max-h-56 overflow-auto mt-3'>
                    {(getAllUsers && !searchedUsers) && allUsers?.map((i: any, idx: number) => (
                        <label htmlFor={`${i}, ${idx}`} key={`${i}, ${idx}`}>
                            {(i._id != userData._id && i != 'others') && <>
                                <input type="checkbox" className='hidden'  id={`${i}, ${idx}`} name={i.username} value={i._id} onChange={e => addToGroup(e)} />
                                <ShowUserWithDP_Email username={i.username} email={i.email} dp={i.dp} />
                            </>}
                        </label>
                    ))}
                    {(getAllUsers && searchedUsers && searchedUsers?.length > 0) && searchedUsers?.map((i: any, idx: number) => (
                        <label htmlFor={`${i}, ${idx}`} key={`${i}, ${idx}`}>
                            {(i._id != userData._id && i != 'others') && <>
                                <input type="checkbox" className='hidden'  id={`${i}, ${idx}`} name={i.username} value={i._id} onChange={e => addToGroup(e)} />
                                <ShowUserWithDP_Email username={i.username} email={i.email} dp={i.dp} />
                            </>}
                        </label>
                    ))}
                    {(getAllUsers && searchedUsers && searchedUsers?.length == 0) && 
                        <div  className='text-[15px] text-center px-5 opacity-60'>No related search</div>
                    }
                    {(getAllUsers && allUsers?.length == 0) && 
                        <div  className='text-[15px] text-center px-5 opacity-60'>No user to add</div>
                    }
                </div>
            </div>
            <AlertDialogFooter className='mt-3'>
                <AlertDialogCancel ref={closeDialogue} className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45' onClick={() => dispatch(addMembersToGroupActions.update([]))}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e: any) => {
                    e.preventDefault();
                    addMembers();
                }}>Add</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    
  )
}

export default memo(AddNewMember);