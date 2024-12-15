import React, { memo, useRef, useState } from 'react'
import { Captions, DownloadCloudIcon, Lock, Mail, PencilOffIcon, User2 } from 'lucide-react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userDataActions } from './ReduxStore/Slices/userData'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import FormFieldError from './FormFieldError'
import { useForm } from 'react-hook-form'
import UploadFile from './UploadFile'


const UpdateUserData = ({previousValue, updateWhichOne, placeholder}: {previousValue: string, updateWhichOne: string, placeholder: string}) => {
  const API_URL = useSelector(({API_URL}: {API_URL: string}) => API_URL);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const [ imageURL, setImage ] = useState<any>('');
  const [ dpError, setDpError] = useState<string>('');
  const closeDialogue = useRef<HTMLButtonElement>(null);
  const dp = useRef<HTMLInputElement>(null);
  const { register, formState: {errors, isSubmitting}, handleSubmit, setError} = useForm();

  const update = async (data: {updatedValue: string, oldPassword: string}) => {
    try {
      console.log({
        ...data,
        updateWhichOne
      });
      if (token && token != '' && dpError == '') {
        if (updateWhichOne == 'dp' && dp && dp?.current && dp?.current?.value == '') {
          setDpError('Please upload file')
        }
        let formData = new FormData();
        updateWhichOne == 'dp' && formData.append('dp', imageURL);
        updateWhichOne == 'dp' && formData.append('updateWhichOne', updateWhichOne);
        updateWhichOne == 'dp' && formData.append('oldPassword', data?.oldPassword);
        let response = await axios.post(`${API_URL}/user/edit/profile?token=${token}`, 
          updateWhichOne == 'dp' ? formData : {...data, updateWhichOne}
        )
        console.log("UPDATING RESPONSE: ", response);
        if (response.data.status == 200) {
          dispatch(userDataActions.update(response.data.user));
          closeDialogue?.current.click();
        } else if (response?.data?.error?.updatedValue) {
          setError('updatedValue', {message: response?.data?.error?.updatedValue});
        } else if (response?.data?.error?.oldPassword) {
          setError('oldPassword', {message: response?.data?.error?.oldPassword});
        }
      }
    } catch (error) {
      console.log("UPDATING USER DATA ERROR: ", error.message);
    }
  }

  return (
    <div className='w-full flex justify-between items-center mb-5 mt-3'>
      <h3 className='text-[14px] opacity-85'>{previousValue}</h3>
      <AlertDialog>
        <AlertDialogTrigger>
          <PencilOffIcon size={20} opacity={.6} />
        </AlertDialogTrigger>
        <AlertDialogContent className='gap-y-0'>
          <AlertDialogHeader>
              <AlertDialogTitle>{previousValue}</AlertDialogTitle>
              <AlertDialogDescription>If you want to update any data of your profile, you have to enter your previous password.</AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(update)}>
            {updateWhichOne == 'dp' ?
              <UploadFile fileError={dpError} setImage={setImage} setDpErrorFunc={setDpError} darkMode={true} />
            :
            <div className='w-full'>
                <div className='text-[14px] mb-1 mt-2'>
                  {updateWhichOne == 'username' && 'Enter new username'}
                  {updateWhichOne == 'email' && 'Enter new email'}
                  {updateWhichOne == 'caption' && 'Enter new caption'}
                  {updateWhichOne == 'password' && 'Enter new password'}
                </div>
                <label htmlFor="updatedValue" className='w-full bg-zinc-200 flex justify-center items-center gap-x-2 px-3'>
                  {updateWhichOne == 'username' && <User2 stroke='black' opacity={.8} />}
                  {updateWhichOne == 'email' && <Mail stroke='black' opacity={.8} />}
                  {updateWhichOne == 'password' && <Lock stroke='black' opacity={.8} />}
                  {updateWhichOne == 'caption' && <Captions stroke='black' opacity={.8} />}
                  <input type="text" {...register('updatedValue', {required: 'This is required field.'})} id='updatedValue' name='updatedValue' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder={placeholder} onChange={(e) => getFile(e)} />
                </label>
            </div>
            }
            {(errors && errors?.updatedValue) && 
              <FormFieldError styles='mt-1' error={(errors?.updatedValue ? errors?.updatedValue.message.toString() : '')} />
            }
            <div className='w-full mb-2'>
              <div className='text-[14px] mb-1 mt-2'>{updateWhichOne == 'password' ? 'Enter old Password' : 'Enter password'}</div>
              <label htmlFor="oldPassword" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Lock stroke='black' opacity={.8} />
                <input type="text" {...register('oldPassword', {required: 'This is required field.'})} id='oldPassword' name='oldPassword' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder={updateWhichOne == 'password' ? 'Enter old Password' : 'Enter password'} onChange={(e) => getFile(e)} />
              </label>
            </div>
            <FormFieldError error={`${errors?.oldPassword?.message}`} />
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

export default memo(UpdateUserData)