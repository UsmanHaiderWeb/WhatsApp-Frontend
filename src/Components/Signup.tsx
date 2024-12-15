import React, { memo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Signup = () => {
  return (
    <div className='w-full min-h-screen bg-[#222E35] flex items-center justify-center flex-col relative duration-150'>
      <div className='absolute top-0 left-0 w-full h-full bg-[url("/bg.png")] opacity-15 blur-[2px] z-[4]'></div>
      <div className='flex justify-center py-5 mobile:py-0 micro:py-0 h-[calc(100%-144px)] overflow-y-auto overflow-x-hidden items-start relative z-[5]'>
        <Tabs defaultValue="password" className="w-[500px] mini:w-[90%] mini:min-w-[440px] mobile:w-[calc(100vw-20px)] micro:w-[calc(100vw-10px)] bg-white rounded-md min-h-40 flex justify-start flex-col items-center overflow-hidden py-5 px-5 micro:px-3">
            <h1 className='text-black text-center text-[25px] micro:text-[19px] micro:leading-[25px]'>Welcome To WhatsUp</h1>
            <p className='text-black text-[13px] opacity-60 text-center mx-auto mb-7'>Signup or login to your WhatsUp account, to enjoy our service</p>
            <TabsList className='bg-[#cacaca] mb-2 outline-none border-none'>
                <TabsTrigger value="password" className='px-10 outline-none border-none py-3 data-[state=active]:bg-[#222] data-[state=active]:text-white'>Signup</TabsTrigger>
                <TabsTrigger value="account" className='px-10 outline-none border-none py-3 data-[state=active]:bg-[#222] data-[state=active]:text-white'>Login</TabsTrigger>
            </TabsList>
            <TabsContent value="password" className='w-full'>
                <SignupForm />
            </TabsContent>
            <TabsContent value="account" className='w-full'>
                <LoginForm />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(Signup)