import React, { memo, useRef } from 'react'
import { Lock, PencilOffIcon } from 'lucide-react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import FormFieldError from './FormFieldError'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { chatDataActions } from './ReduxStore/Slices/chatData'
import { getAllChatsActions } from './ReduxStore/Slices/AllChats'


const UpdateGroupTitle = ({previousValue, updateWhichOne, placeholder}: {previousValue: string, updateWhichOne?: string, placeholder: string}) => {
  const API_URL = useSelector(({API_URL}: {API_URL: string}) => API_URL);
  const param = useParams();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const closeDialogue = useRef<HTMLButtonElement>(null);

  const { register, formState: {errors, isSubmitting}, handleSubmit, setError} = useForm();


  const update = async (data: {chatName: string, password: string}) => {
    try {
      if (token && token != '') {
        let response = await axios.post(`${API_URL}/chat/group/rename?token=${token}&id=${param.id}`, data);
        console.log("response.data.chat.chatName: ", response.data.chat.chatName);
        if (response.data.status == 200) {
          dispatch(chatDataActions.rename(response.data.chat.chatName));
          dispatch(getAllChatsActions.renameSpecificChat({
            id: response.data.chat._id,
            chatName: response.data.chat.chatName
          }));
          closeDialogue?.current.click();
        } else if (response?.data?.error?.chatName) {
          setError('chatName', {message: response?.data?.error?.chatName});
        } else setError('root', {message: 'Something went wrong.'});
      }
    } catch (error) {
      console.log("UPDATING USER DATA ERROR: ", error.message);
    }
  }

  return (
    <div className='w-full flex justify-between items-center mt-1 mb-3'>
      <AlertDialog>
        <AlertDialogTrigger className='w-full flex justify-start items-center px-2 gap-x-2 opacity-80 hover:opacity-100'>
          <PencilOffIcon size={20} />
          <h3 className='text-[14px]'>Rename group</h3>
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0'>
          <AlertDialogHeader>
              <AlertDialogTitle>Rename the Group</AlertDialogTitle>
              <AlertDialogDescription>If you want to rename the group, you have to enter your password.</AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(update)}>
            <div className='w-full mb-2'>
              <div className='text-[14px] mb-1 mt-2'>Enter group name</div>
              <label htmlFor="chatName" className='w-full bg-zinc-200 flex justify-center items-center gap-x-2 px-3'>
                <input type="text" {...register('chatName', {required: 'This is required field.'})} id='chatName' name='chatName' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter Chatname' />
              </label>
            </div>
            {(errors && errors?.chatName) &&
              <FormFieldError styles='mt-1' error={(errors?.chatName ? errors?.chatName.message.toString() : '')} />
            }
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
                <input type="submit" id='submit' name='submit' className='hidden' onClick={() => console.log('input')} />
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

export default memo(UpdateGroupTitle)