import { DownloadCloudIcon, Image } from 'lucide-react'
import React, { memo, useRef } from 'react'
import FormFieldError from './FormFieldError'

interface uploadFileInter {
    fileError: string,
    setImage: any,
    setDpErrorFunc: (a: string) => void;
    darkMode?: boolean
    showHeading?: boolean
    showError?: boolean
}

const UploadFile = ({fileError, setImage, setDpErrorFunc, darkMode, showHeading = true, showError = true}: uploadFileInter) => {
    const file = useRef<HTMLInputElement>(null);
    const getFile = async (e: any) => {
        try {
            console.log(e.target.files[0].type.includes('image/'));
            if(e.target.files[0].type.includes('image/')){
                setImage(e.target.files[0]);
                setDpErrorFunc('');
            } else {
                setImage('');
                file.current.value = '';
                setDpErrorFunc('File should be of type image');
            }
        } catch (error) {
            console.log("UPLOADING FILE COMPONENT ERROR: ", error.message);
        }
    }

  return (
    <div className='w-full'>
        {showHeading &&
            <div className={`${!darkMode && 'text-black'} text-[14px]`}>Upload profile Photo:</div>
        }
        {darkMode ?
            <label htmlFor='file' className='flex justify-start items-center bg-[#202C33] py-2 rounded-xl gap-x-5 px-3 mb-2'>
                <Image size={19} className='opacity-60' />
                <input type="file" ref={file} id='file' name='file' placeholder='Group Logo / Front Photo' className='w-full border-none outline-none bg-transparent text-[14px]' onChange={(e) => getFile(e)} />
            </label>
        :
            <label htmlFor="file" className='w-full bg-zinc-200 flex justify-center items-center mb-2 gap-x-2 px-3'>
                <DownloadCloudIcon stroke='black' opacity={.8} />
                <input type="file" ref={file} id='file' name='file' className='text-black placeholder:text-zinc-700 bg-transparent w-full py-2 rounded-md text-[14px]' placeholder='Choose file' onChange={(e) => getFile(e)} />
            </label>
        }
        {showError &&
            <FormFieldError error={fileError} />
        }
    </div>
  )
}

export default memo(UploadFile)