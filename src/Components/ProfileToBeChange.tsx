import React, { memo } from 'react'
import UpdateUserData from './UpdateUserData'
import { useSelector } from 'react-redux'
import Logout from './Logout'


const ProfileToBeChange = () => {
    const userData = useSelector((state: any) => state.userData);

return (<>
    {userData &&
        <div className='w-full h-screen overflow-hidden bg-[#111B21] mobile:pb-14 micro:pb-14'>
            <div className='allUser w-full px-5 micro:px-3 h-full overflow-x-hidden overflow-y-auto py-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-[20px] opacity-80 font-bold'>Profile</h1>
                    <Logout />
                </div>
                <div className='flex justify-center items-center mt-10 flex-col'>
                    <div className='w-48 h-48 rounded-full overflow-hidden'>
                        {/* <img src="/proSnip.PNG" alt="snip" /> */}
                        <img src={userData && (userData.dp || "/banner.jpeg")} alt="profilePhoto" loading='lazy' className='w-full h-full object-cover' />
                    </div>
                    <div>
                        <div className='text-[#00A884] text-[13px]'>Profile Photo:</div>
                        <UpdateUserData placeholder='Enter new username' updateWhichOne='dp' previousValue='Update profile Photo' />
                        <p className='text-[13px] opacity-45 mb-7'>This photo will be displayed as your profile photo to other WhatsUp users, and also to your friends.</p>
                    </div>
                </div>
                <div>
                    <div className='text-[#00A884] text-[13px]'>Your name:</div>
                    <UpdateUserData placeholder='Enter new username' updateWhichOne='username' previousValue={userData?.username || 'Usman Haider'} />
                    <p className='text-[13px] opacity-45 mb-7'>This name will be visible to your friends and other WhatsUp users, and also to your group members.</p>
                </div>
                <div>
                    <div className='text-[#00A884] text-[13px]'>Your Caption:</div>
                    <UpdateUserData placeholder='Enter new caption' updateWhichOne='caption' previousValue={userData?.caption || 'No calls, WhatsUp only.'} />
                    <p className='text-[13px] opacity-45 mb-7'>This name will alse be visible to your friends and other WhatsUp users, andalsoto your group members.</p>
                </div>
                <div>
                    <div className='text-[#00A884] text-[13px]'>Your Email Address:</div>
                    <UpdateUserData placeholder='Enter new email' updateWhichOne='email' previousValue={userData?.email || 'usmanhaider@gmail.com'} />
                    <p className='text-[13px] opacity-45 mb-7'>If you want to change your email address, first an email will be sent to this email address to verify you, if it is you.</p>
                </div>
                <div>
                    <div className='text-[#00A884] text-[13px]'>Your password:</div>
                    <UpdateUserData placeholder='Enter new password' updateWhichOne='password' previousValue='..........' />
                    <p className='text-[13px] opacity-45 mb-7'>If you want to change your password, we will send you an email to verify you that if it is you.</p>
                </div>
            </div>
        </div>
    }
</>)}

export default memo(ProfileToBeChange)