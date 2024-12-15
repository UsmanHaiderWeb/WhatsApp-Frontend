import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import ShowUserWithDP_Email from './ShowUserWithDP_Email';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import FormFieldError from './FormFieldError';
import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import { storeType } from './ReduxStore/Store';


let socket: any;
const NewChatWithUserTemplate = (i: {dp?: string, _id: string, username: string, email: string, add: boolean}) => {
    const API_URL = useSelector((state: storeType) => state.API_URL);
    const userData = useSelector((state: storeType) => state.userData);
    const cancelDialogue = useRef<HTMLButtonElement>(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm();

    useEffect(() => {
        socket = io('http://localhost:3000');
    }, [])

    const createChat = async (data: {password: string}) => {
        try {
            if(token && token != ''){
                let response = await axios.post(`${API_URL}/chat/create?token=${token}&id=${i._id}`, data);
                console.log("response.data.message: ", response.data.message);
                if (response.data?.status == 200) {
                    dispatch(getAllChatsActions.addChat(response.data.chat));
                    cancelDialogue?.current?.click();
                    socket.emit('new chat created', {
                        chatID: response.data.chat._id || response.data.chat,
                        userID: userData._id
                    });
                    navigate(`/${response.data.chat._id}`);
                } else if (response.data?.error) {
                    setError('password', {message: response.data?.error?.password});
                } else if (response.data?.status == 404) {
                    setError('root', {message: response.data?.message});
                }
            }
        } catch (error) {
            console.log("CREATING NEW CHAT ERROR:", error.message);
        }
    }

return (
    <AlertDialog>
        <AlertDialogTrigger className='w-full'>
            <div className='w-full'>
                <ShowUserWithDP_Email username={i.username} email={i.email} dp={i.dp} showAddBTN={i.add} />
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0'>
            <form onSubmit={handleSubmit(createChat)}>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-center sm:hidden'>Create Chat Room with<br />{i.username}</AlertDialogTitle>
                    <AlertDialogTitle className='hidden sm:block'>Create Chat Room with {i.username}</AlertDialogTitle>
                    <AlertDialogDescription>If you want to chat with this user, you would have to create a chatroom between you and this user. Atfer the room is created, you will be redirected to the home page.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className='w-full mb-4'>
                    <div className='text-[14px] mb-1 mt-2'>Enter password</div>
                    <label htmlFor="password" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                        <Lock stroke='black' opacity={.8} />
                        <input type="text" {...register('password', {required: 'This is required field.'})} id='password' name='password' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter password' />
                    </label>
                    <FormFieldError error={errors?.password?.message.toString()} />
                    <FormFieldError error={errors?.root?.message.toString()} />
                </div>
                <AlertDialogFooter className='mt-2'>
                    <AlertDialogCancel ref={cancelDialogue} className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45'>Cancel</AlertDialogCancel>
                    {isSubmitting ?
                        <AlertDialogAction onClick={(e: any) => e.preventDefault()}>Creating</AlertDialogAction>
                    :
                    <label htmlFor='submit' className='sm:w-auto w-full inline-block'>
                        <input type="submit" id='submit' name='submit' className='hidden' onClick={() => console.log('input')} />
                        <AlertDialogAction className='w-full pointer-events-none' onClick={(e: any) => {
                            e.preventDefault();
                        }}>Create Room</AlertDialogAction>
                    </label>
                    }
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(NewChatWithUserTemplate)