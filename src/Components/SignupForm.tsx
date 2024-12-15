import React, { memo, useEffect, useRef, useState } from 'react'
import { Captions, Lock, Mail, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signupInterface } from './helper/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormFieldError from './FormFieldError'
import axios from 'axios'
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog'
import OTP_Dialogue from './OTP_Dialogue'
import { useNavigate } from 'react-router-dom'
import UploadFile from './UploadFile'

const SignupForm = () => {
    const [ userID, setID ] = useState<string | number>('');
    const [ imageURL, setImage ] = useState<any>('');
    const [ showOTP, toggleAlert ] = useState<boolean>(false);
    const [ OTPerror, setOTPerror ] = useState<string>('');
    const [ isOTPverified, toggleOTPverification ] = useState(false);
    const [ isOTP_Submiting, toggleOTP_Submiting ] = useState<boolean>(false);
    
    const otpDialogue = useRef<HTMLButtonElement>(null);
    let API_URL = useSelector(({API_URL}: {API_URL: string}) => API_URL);
    const navigate = useNavigate();

    let signupSchema = z.object({
        username: z.string().min(1, "Username is required."),
        email: z.string().min(1, "Email is required."),
        password: z.string().min(1, "Please enter password."),
        caption: z.string().min(1, "Caption is required."),
    })

    const { register, setError, reset, formState: {errors, isSubmitting}, handleSubmit, setValue} = useForm<signupInterface>({
        resolver: zodResolver(signupSchema),
    })

    useEffect(() => {
        if (showOTP) {
            otpDialogue?.current?.click();
            toggleAlert(false);
        }
    }, [showOTP])

    const submit: SubmitHandler<signupInterface> = async (data) => {
        try {
            if (Object.keys(data).length > 0) {
                let formData: FormData = new FormData();
                formData.append('dp', imageURL);
                formData.append('email', data.email);
                formData.append('password', data.password);
                formData.append('username', data.username);
                formData.append('caption', data.caption);
                let response = await axios.post(`${API_URL}/signup`, formData);
                console.log(response);
                if (response && response.data.status == 200) {
                    setID(response.data.id)
                    toggleAlert(true);
                } else if(response?.data?.error?.email) {
                    setError('email', {message: response?.data?.error?.email});
                } else if(response?.data?.error?.password) {
                    setError('password', {message: response?.data?.error?.password});
                } else {
                    setError('root', {message: 'Something went wrong.'})
                }
            }
        } catch (error) {
            console.log("SIGNING THE USER UP ERROR: ", error?.message);
            setError('root', {message: 'Something went wrong.'})
        }
    }

    async function checkOTP(OTPvalue: string) {
        let otp: string = OTPvalue;
        try {
            toggleOTP_Submiting(true);
            if(otp.length == 6 && userID != ''){
                let response = await axios.post(`${API_URL}/user/verification?id=${userID}`, {otp});
                console.log(response);
                if (response.data.status == 200) {
                    localStorage.setItem('whatsAppToken', response?.data?.token);
                    toggleOTPverification(true);
                    reset();
                    navigate('/', {replace: true});
                } else {
                    setOTPerror('Something went wrong');
                }
            }
        } catch (error) {
            console.log("VERIFYING THE OTP FROM SERVER ERROR: ", error.message);
        }
        toggleOTP_Submiting(false);
    }

    const setDpErrorFunc = async(a: string) => {
        setError('dp', {message: a});
    }

return (
    <form className='w-full border-none outline-none' onSubmit={handleSubmit(submit)}>
        <div className='w-full'>
            <div className='text-black text-[14px]'>Username:</div>
            <label htmlFor="username" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <User2 stroke='black' opacity={.8} />
                <input type="text" {...register('username')} id='username' name='username' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter username' />
            </label>
            <FormFieldError error={errors?.username?.message} />
        </div>
        <div className='w-full'>
            <div className='text-black text-[14px]'>Enter email:</div>
            <label htmlFor="email" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Mail stroke='black' opacity={.8} />
                <input type="email" {...register('email')} id='email' name='email' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter email address' />
            </label>
            <FormFieldError error={errors?.email?.message} />
        </div>
        <div className='w-full'>
            <div className='text-black text-[14px]'>Enter password:</div>
            <label htmlFor="password" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Lock stroke='black' opacity={.8} />
                <input type="password" {...register('password')} id='password' name='password' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter password' />
            </label>
            <FormFieldError error={errors?.password?.message} />
        </div>
        <div className='w-full'>
            <div className='text-black text-[14px]'>Write a Caption:</div>
            <label htmlFor="caption" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Captions stroke='black' opacity={.8} />
                <input type="text" {...register('caption')} id='caption' name='caption' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Write a caption' />
            </label>
            <FormFieldError error={errors?.caption?.message} />
        </div>
        <UploadFile fileError={errors?.dp?.message} setImage={setImage} setDpErrorFunc={setDpErrorFunc} />
        <p className='text-black text-[12px] font-["codePro"] text-center w-80 micro:w-[90%] mx-auto' onClick={() => console.log(errors)}>After you signup, you'll receive a verification email from us with an OTP</p>
        <FormFieldError error={errors?.root?.message} styles='text-center mt-1' />
        {isSubmitting ?
            <input type="button" value='Submitting' className='w-full mt-2 bg-[#0080ff] py-2 rounded-md mb-2 px-2 text-[14px]' />
        :
            <input type="submit" value='Submit' className='w-full mt-2 bg-[#0080ff] py-2 rounded-md mb-2 px-2 text-[14px]' />
        }
        <div>
            <AlertDialog>
                <AlertDialogTrigger ref={otpDialogue} className='hidden'>Open</AlertDialogTrigger>
                <OTP_Dialogue checkOTP={checkOTP} isOTPverified={isOTPverified} OTPerror={OTPerror} setOTPerror={setOTPerror} title='Please verify yourself' isOTP_Submiting={isOTP_Submiting} />
            </AlertDialog>
        </div>
    </form>
  )
}

export default memo(SignupForm)