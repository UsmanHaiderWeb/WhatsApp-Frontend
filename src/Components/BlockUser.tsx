import { Ban, Lock } from 'lucide-react'
import React, { memo, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useForm } from 'react-hook-form';
import FormFieldError from './FormFieldError';
import { io } from 'socket.io-client';
import { storeType } from './ReduxStore/Store';


let socket: any;
const BlockUser = () => {
  const closeDialogue = useRef<HTMLButtonElement>(null);
  let token = localStorage.getItem('token');
  let param = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = useSelector((state: storeType) => state.API_URL);
  const userData = useSelector((state: storeType) => state.userData);

  const { register, formState: {errors, isSubmitting}, handleSubmit, setError} = useForm();

  useEffect(() => {
    socket = io('http://localhost:3000');
  }, [])

  const blockUserFunc = async (data: {password: string}) => {
    if(token && token != ''){
      try {
        let response = await axios.post(`${API_URL}/user/block?token=${token}&id=${param.id}`, data);
        console.log("BLOCK USER RESPONSE: ", response);
        if(response.data?.status == 200) {
          dispatch(getAllChatsActions.removeChat(response.data.chatID));
          closeDialogue?.current?.click();
          socket.emit('unfriend User', {
            userID: userData._id,
            chat: response.data.chat,
          });
        } else if (response?.data?.error?.password) {
          setError('password', {message: response?.data?.error?.password});
        } else setError('root', {message: 'Something went wrong.'});
      } catch (error) {
        console.log("BLOCK THE USER ERROR: ", error.message);
        setError('root', {message: 'Something went wrong.'});
      }
    } else navigate('/', {replace: true})
  }


  return (
    <div className='w-full flex justify-between items-center'>
      <AlertDialog>
        <AlertDialogTrigger className='w-full flex justify-start items-center px-2 gap-x-2 opacity-80 hover:opacity-100 text-[14px] py-1'>
          <Ban size={17} />Block this User
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0'>
          <AlertDialogHeader>
              <AlertDialogTitle>Block this user</AlertDialogTitle>
              <AlertDialogDescription>If you want to block this user, you have to enter your password. We are just making it sure that it is you.</AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(blockUserFunc)}>
            <div className='w-full mb-4'>
              <div className='text-[14px] mb-1 mt-2'>Enter password</div>
              <label htmlFor="password" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Lock stroke='black' opacity={.8} />
                <input type="text" {...register('password', {required: 'This is required field.'})} id='password' name='password' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter password' />
              </label>
              <FormFieldError error={errors?.password?.message.toString()} />
              <FormFieldError error={errors?.root?.message.toString()} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel ref={closeDialogue} className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45'>Cancel</AlertDialogCancel>
              {isSubmitting ?
                <AlertDialogAction onClick={(e: any) => e.preventDefault()}>Submitting</AlertDialogAction>
              :
              <label htmlFor='submit' className='sm:w-auto w-full inline-block'>
                <input type="submit" id='submit' name='submit' className='hidden' />
                <AlertDialogAction className='w-full pointer-events-none' onClick={(e: any) => {
                    e.preventDefault();
                    console.log('submit')
                }}>Submit</AlertDialogAction>
              </label>
              }
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default memo(BlockUser)