import React, { Fragment, memo, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from './Footer'
import { Skeleton } from './ui/skeleton'
import { storeType } from './ReduxStore/Store'

interface mainMessageInter {
  isChatID?: boolean,
}


const MainMessage = ({isChatID = true}: mainMessageInter) => {
  const param = useParams();
  const main = useRef<HTMLElement>(null);

  const chatData = useSelector((state: storeType) => state.chatdata);
  const userData = useSelector((state: storeType) => state.userData);
  const messages = useSelector((state: storeType) => state.messages);
  
  useEffect(() => {
    if (main && main.current) {
      main.current.scrollTo({
        top: 100
      });
    }
    
  }, [messages, main, param.id])


  return (<>
    {(messages && userData) && <>
      <main ref={main} className='w-full h-[calc(100%-150px)] overflow-x-hidden overflow-y-auto relative bg-[#0B141A]'>
        <div className='absolute w-full h-full top-0 left-0 bg-[url("/bg.png")] opacity-5 z-[4]'></div>
        {(messages && userData) ?
          <div className={`allUser w-full h-full overflow-x-hidden overflow-y-auto flex justify-start items-center flex-col relative z-[5] pt-2 pb-5 px-5 mobile:px-2 micro:px-2 ${chatData?.isGroupChat ? 'gap-y-2' : 'gap-y-[2px]'}`}>
            {(!chatData || messages?.length == 0) ?
              <div className='w-full h-full flex flex-col justify-between items-center'>
                {!chatData?.isGroupChat &&
                  <div className='w-80 text-center px-3 py-2 text-[12px] bg-[#182229] rounded-xl text-orange-300'>Send a message now to create a conversational chat between you and this user.</div>
                }
                <div className='w-auto text-center px-3 py-2 text-[12px] bg-[#182229] rounded-xl text-orange-300'>Your messages are end-to-end encypted</div>
              </div>
            :<>
              {(userData && messages?.length > 0) && messages.map((mess: any, mdx: number) => (
                <Fragment key={`${mess}, ${mdx}`}>
                  {mess.isNotifiedMessage ?
                    <div className='mx-auto text-center px-3 py-2 text-[12px] bg-[#182229] rounded-lg text-zinc-400 uppercase'>{mess.content}</div>
                  :<>
                    {((mess.sentBy._id == userData?._id) || (mess.sentBy == userData?._id)) ?
                      <div className='w-full flex justify-end items-start self-end gap-x-2'>
                        <div className='lg:max-w-[500px] md:max-w-[400px] max-w-[80%] mobile:max-w-[90%] micro:max-w-[90%] bg-[#005C4B] px-3 py-2 text-[13px] rounded-lg flex justify-between items-center gap-x-2 flex-shrink-0 relative'>
                          <div>{mess.content}</div>
                          <div className='min-h-1 flex justify-start items-end text-nowrap w-14 relative'>
                          </div>
                          <div className='absolute bottom-1 right-3 text-[11px] font-["codePro"] opacity-60'>5:35 PM</div>
                        </div>
                      </div>
                    :
                      <div className='w-full flex justify-start items-start self-start gap-x-2'>
                        {chatData?.isGroupChat &&
                          <div className='w-10 h-10 mobile:w-8 mobile:h-8 micro:w-8 micro:h-8 rounded-full overflow-hidden -translate-y-2'>
                            <img src="/banner.jpeg" className='w-full h-full object-cover' />
                          </div>
                        }
                        <div className='lg:max-w-[450px] md:max-w-[400px] max-w-[80%] mobile:max-w-[calc(90%-60px)] micro:max-w-[calc(95%-60px)] bg-[#202C33] px-3 py-2 text-[13px] rounded-lg flex justify-between items-center gap-x-2 flex-shrink-0 relative'>
                          <div>{mess.content}</div>
                          <div className='min-h-1 flex justify-start items-end text-nowrap w-14 relative'>
                          </div>
                          <div className='absolute bottom-1 right-3 text-[11px] font-["codePro"] opacity-60'>5:34 PM</div>
                        </div>
                      </div>
                    }
                  </>}
                </Fragment>
              ))}
            </>}
          </div>
        :
            <div className='w-full h-full flex justify-start items-center flex-col pt-2 pb-5 px-5 gap-y-2 overflow-hidden'>
              {[1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 11, 12, 12, 13].map((o: number, odx: number) => (
                <div className={`flex items-center w-full ${o % 2 == 0 ? 'justify-start' : 'justify-end'}`}>
                  <MessageSkeleton key={`${o}, ${odx}`} />
                </div>
              ))}
            </div>
        }
      </main>
      <Footer isChatID={isChatID} />
    </>}
  </>)
}

export default memo(MainMessage)



export const MessageSkeleton = () => {
  return (
    <Skeleton className={`min-w-60 h-7 bg-[#222E35]`} style={{width: `${Math.floor(Math.random() * 100)}px`}} />
  )
}