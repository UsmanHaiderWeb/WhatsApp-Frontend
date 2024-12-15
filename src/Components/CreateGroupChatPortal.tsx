import React, { memo, useEffect, useRef, useState } from 'react'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import FormFieldError from './FormFieldError'
import { Group } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addMembersToGroupActions } from './ReduxStore/Slices/AddMembersToGroup'
import axios from 'axios'
import SearchUsers from './SearchUsers'
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers'
import ShowUserWithDP_Email from './ShowUserWithDP_Email'
import arrayShuffle from 'array-shuffle'
import MarkedMembers from './MarkedMembers'
import { getAllChatsActions } from './ReduxStore/Slices/AllChats'
import { allGroupsActions } from './ReduxStore/Slices/sliceAllGroups'
import { io } from 'socket.io-client'
import { storeType } from './ReduxStore/Store'
import UploadFile from './UploadFile'


let socket: any;
const CreateGroupChatPortal = ({userId}: {userId: string}) => {
    const [ imageURL, setImage ] = useState<any>('');
    const [AllUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState<null | [getAllUsersInterface]>(null);
    const [dpError, setDpError] = useState<string>('');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const userKeFriends = useSelector((state: storeType) => state.userKeFriends);
    const addMembersToGroup = useSelector((state: storeType) => state.addMembersToGroup);
    const getAllUsers = useSelector((state: storeType) => state.getAllUsers);
    const blockedUsers = useSelector((state: storeType) => state.blockedUsers);
    const API_URL = useSelector((state: storeType) => state.API_URL);
    const userData = useSelector((state: storeType) => state.userData);
    const closeDialogue = useRef<HTMLButtonElement>(null);
    
        
    useEffect(() => {
        socket = io('http://localhost:3000');
    }, [])


    useEffect(() => {
        if (getAllUsers && getAllUsers.length > 0 && userKeFriends.length > 0) {
            const newArray = getAllUsers.filter((user: getAllUsersInterface) => !userKeFriends.some(friend => friend._id === user._id)
            );
            
            let filteredFromBlockedUser = newArray.filter((user: getAllUsersInterface) => {
                return !blockedUsers?.some(friend => friend._id === user._id)
            })
            let shuffledArray = arrayShuffle(filteredFromBlockedUser);
            setAllUsers(shuffledArray);
        } else {
            if (getAllUsers && getAllUsers.length > 0) {
                let filteredFromBlockedUser = getAllUsers.filter((user: getAllUsersInterface) => {
                    return !blockedUsers?.some(friend => friend._id === user._id)
                })
                let shuffledArray = arrayShuffle(filteredFromBlockedUser);
                setAllUsers(shuffledArray);
            }
        }
    }, [getAllUsers, userKeFriends]);

    const { register, handleSubmit, formState: {errors, isSubmitting}, setError } = useForm();

    const addToGroup = (e: any) => {
        e.target.checked = true;
        if(e.target.checked){
            dispatch(addMembersToGroupActions.add({
                _id: e.target.value.toString(),
                username: e.target.name
            }));
        }
    }
    
    const createGroup:SubmitHandler<{groupName: string}> = async(data : {groupName: string}) => {
        try {
            if(!imageURL || dpError){
                setDpError('Please select an image');
                return 
            }

            let memberArrayWithIds: string[] = addMembersToGroup.map(member => {
                return member._id
            })
            
            let formData: FormData = new FormData();
            formData.append('dp', imageURL);
            formData.append('chatName', data.groupName);
            formData.append('members', memberArrayWithIds.toString());


            let response = await axios.post(`${API_URL}/chat/group/create?token=${token}`, formData)
            console.log(response);
            if (response.data.status == 200) {
                dispatch(getAllChatsActions.addChat(response.data.chat));
                dispatch(allGroupsActions.addGroup(response.data.chat));
                dispatch(addMembersToGroupActions.update([]));
                setSearchedUsers(null);
                closeDialogue?.current?.click();
                socket.emit('new chat created', {
                    chatID: response.data.chat._id || response.data.chat,
                    userID: userData._id
                });
            } else {
                setError('root', {message: response.data.message});
            }
        } catch (error) {
            console.log("CREATING GROUP CHAT ERROR: ", error.message);
            setError('root', {message: "Something went wrong."})
        }
    }

    const setDpErrorFunc = async(a: string) => {
        setDpError(a);
    }

  return (
    <AlertDialogContent className='gap-y-1 micro:px-3'>
        <AlertDialogHeader>
            <AlertDialogTitle>Create Group Chat</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <form className='w-full' onSubmit={handleSubmit(createGroup)}>
            <label htmlFor='groupName' className='flex justify-start items-center bg-[#202C33] py-2 rounded-xl gap-x-5 px-3 mb-2'>
                <Group size={19} className='opacity-60' />
                <input type="text" {...register('groupName', {required: 'Group name is required'})} name='groupName' id='groupName' placeholder='Group name' className='w-full border-none outline-none bg-transparent text-[14px]' />
            </label>
            <UploadFile fileError={errors?.dp?.message.toString()} setImage={setImage} setDpErrorFunc={setDpErrorFunc} showHeading={false} showError={false} darkMode={true} />
            <FormFieldError error={dpError || errors.groupName?.message.toString()} styles='-translate-y-2' />
            <div className='w-full'>
                <h1>Search users to add</h1>
                <SearchUsers onlyFriends={false} filterFriends={false} searchUsers={getAllUsers} setSearchedUsers={setSearchedUsers} />
            </div>
            {(addMembersToGroup && addMembersToGroup.length > 0) &&
                <MarkedMembers addMembersToGroup={addMembersToGroup} />
            }
            <div className='allUser list w-full h-[30vh] max-h-56 overflow-auto pb-5 my-5'>
                {(userKeFriends.length > 0 && !searchedUsers) && <div>Friends:</div>}
                {(getAllUsers && AllUsers && !searchedUsers) && [...userKeFriends, 'others', ...AllUsers].map((i: any, idx: number) => (
                    <label htmlFor={`${i}, ${idx}`} key={`${i}, ${idx}`}>
                        {(i == 'others' && AllUsers?.length > 0) && <div className='mb-1'>Other Users:</div>}
                        {(i._id != userId && i != 'others') && <>
                            <input type="checkbox" className='hidden'  id={`${i}, ${idx}`} name={i.username} value={i._id} onChange={e => addToGroup(e)} />
                            <ShowUserWithDP_Email username={i.username} email={i.email} />
                        </>}
                    </label>
                ))}
                {(getAllUsers && AllUsers && searchedUsers) && searchedUsers.map((i: any, idx: number) => (
                    <label htmlFor={`${i}, ${idx}`} key={`${i}, ${idx}`}>
                        {(i._id != userId) && <>
                            <input type="checkbox" className='hidden'  id={`${i}, ${idx}`} name={i.username} value={i._id} onChange={e => addToGroup(e)} />
                            <ShowUserWithDP_Email username={i.username} email={i.email} />
                        </>}
                    </label>
                ))}
                {searchedUsers && searchedUsers?.length == 0 &&
                    <div className='text-[15px] text-center px-5 opacity-60'>No related search</div>
                }
            </div>
            <FormFieldError error={errors?.root?.message} styles='-translate-y-2' />
            <AlertDialogFooter className='w-full'>
                <AlertDialogCancel ref={closeDialogue} className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45' onClick={() => dispatch(addMembersToGroupActions.update([]))}>Cancel</AlertDialogCancel>
                {isSubmitting ?
                    <AlertDialogAction onClick={(e: any) => e.preventDefault()}>Creating</AlertDialogAction>
                :
                    <label htmlFor='submit' className='sm:w-auto w-full inline-block'>
                        <input type="submit" id='submit' name='submit' className='hidden' />
                        <AlertDialogAction className='w-full pointer-events-none' onClick={(e: any) => {
                            e.preventDefault();
                        }}>Create</AlertDialogAction>
                    </label>
                }
            </AlertDialogFooter>
        </form>
    </AlertDialogContent>
  )
}

export default memo(CreateGroupChatPortal)