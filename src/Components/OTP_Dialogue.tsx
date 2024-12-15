import React, { memo, useEffect, useRef, useState } from 'react'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog"
import OTP_Shower from './OTP_Shower'
import FormFieldError from './FormFieldError'


interface parent{
  checkOTP: (OTPvalue: string) => void;
  isOTPverified: boolean;
  isOTP_Submiting: boolean;
  title?: string;
  OTPerror: string;
  setOTPerror: any
}


const OTP_Dialogue = ({checkOTP, isOTPverified, title, OTPerror, setOTPerror, isOTP_Submiting}: parent) => {
  let [ OTP, setOTP] = useState<string>('');
  let closeDialogue = useRef<HTMLButtonElement>(null);

  let sendOTPtoParent = (e: any): string => {
    e.preventDefault();
    if (OTP.length == 6) {
      checkOTP(OTP);
      return OTP;
    } else {
      setOTPerror('OTP is incomplete.')
    }
  }

  useEffect(() => {
    if(isOTPverified){
      closeDialogue?.current?.click();
    }
  }, [isOTPverified])

  return (<>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{title || 'Please verify your account'}</AlertDialogTitle>
            <AlertDialogDescription>Please enter the OTP that we just have sent to your entered email address. Please make sure to write the correct OTP.</AlertDialogDescription>
            <div>
              <OTP_Shower setOTP={setOTP} />
            </div>
        </AlertDialogHeader>
        <FormFieldError error={OTPerror && OTPerror} styles='-translate-y-2' />
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-transparent border-[#dadada] border-[1px] border-solid border-opacity-45'>Cancel</AlertDialogCancel>
          <AlertDialogCancel ref={closeDialogue} className='hidden'>Cancel</AlertDialogCancel>
          {isOTP_Submiting ?
            <AlertDialogAction onClick={(e: any) => e.preventDefault()}>Submitting</AlertDialogAction>
          :
            <AlertDialogAction onClick={(e: any) => sendOTPtoParent(e)}>Submit</AlertDialogAction>
          }
        </AlertDialogFooter>
    </AlertDialogContent>
  </>)
}

export default memo(OTP_Dialogue)