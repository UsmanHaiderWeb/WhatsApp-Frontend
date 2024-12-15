import React, { memo, useEffect, useRef, useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginInterface } from './helper/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormFieldError from './FormFieldError'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog'
import OTP_Dialogue from './OTP_Dialogue'
import { useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
    const [ userID, setID ] = useState<string | number>('');
    const [ showOTPAlert, toggleAlert ] = useState<boolean>(false);
    const [ OTPerror, setOTPerror ] = useState<string>('');
    const [ isOTPverified, toggleOTPverification ] = useState<boolean>(false);
    const [ isOTP_Submiting, toggleOTP_Submiting ] = useState<boolean>(false);

    const otpDialogue = useRef<HTMLButtonElement>(null);
    let API_URL = useSelector(state => state.API_URL);
    const navigate = useNavigate();

    let loginSchema = z.object({
        email: z.string().min(1, "Email is required."),
        password: z.string().min(1, "Password is required."),
    })

    const { register, handleSubmit, formState: {errors, isSubmitting}, reset, setError} = useForm<loginInterface>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    });

    useEffect(() => {
        if (showOTPAlert) {
            otpDialogue?.current?.click();
            toggleAlert(false);
        }
    }, [showOTPAlert])


    const submit: SubmitHandler<loginInterface> = async (data) => {
        try {
            if (Object.keys(data).length > 0) {
                let response = await axios.post(`${API_URL}/login`, data);
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
            console.log("LOGGING THE USER IN ERROR: ", error?.message);
            setError('root', {message: 'Something went wrong.'})
        }
    }

    async function checkOTP(OTPvalue: string) {
        let otp: string = OTPvalue;
        try {
            if(otp.length == 6 && userID != ''){
                toggleOTP_Submiting(true);
                let response = await axios.post(`${API_URL}/user/login/verification?id=${userID}`, {otp});
                console.log(response);
                if (response.data.status == 200) {
                    localStorage.setItem('token', response?.data?.token);
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


  return (
    <form action="" className='w-full' onSubmit={handleSubmit(submit)}>
        <div className='w-full'>
            <div className='text-black text-[14px]'>Enter email:</div>
            <label htmlFor="email" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <Mail stroke='black' opacity={.8} />
                <input type="email" {...register('email')} id='email' name='email' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Enter email address' />
            </label>
            <div className='text-[orangered] text-[13px]'></div>
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
        <FormFieldError error={errors?.root?.message} styles='text-center' />
        {isSubmitting ?
            <input type="button" value='Submitting' className='w-full mt-2 bg-[#0080ff] py-2 rounded-md mb-2 px-2 text-[14px]' />
        :
            <input type="submit" value='Submit' className='w-full mt-2 bg-[#0080ff] py-2 rounded-md mb-2 px-2 text-[14px]' />
        }
        <div>
            <AlertDialog>
                <AlertDialogTrigger ref={otpDialogue} className='hidden'>Open</AlertDialogTrigger>
                <OTP_Dialogue checkOTP={checkOTP} isOTPverified={isOTPverified} title='Please verify yourself'  OTPerror={OTPerror} setOTPerror={setOTPerror} isOTP_Submiting={isOTP_Submiting} />
            </AlertDialog>
        </div>
    </form>
  )
}

export default memo(LoginForm)