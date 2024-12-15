import React, { memo } from 'react'
import { addMembersToGroupActions } from './ReduxStore/Slices/AddMembersToGroup';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';

const MarkedMembers = ({addMembersToGroup}: {addMembersToGroup: [{_id:string, username: string}]}) => {
    const dispatch = useDispatch();

  return (
    <div className='allUser max-h-20 flex justify-start items-center gap-x-2 gap-y-1 flex-wrap mt-2 overflow-x-hidden overflow-y-auto'>
        {addMembersToGroup?.map((mem, mdx) => (
            <div key={`${mem}, ${mdx}`} className='flex justify-center items-center bg-purple-600 rounded-xl px-2 py-1 gap-x-2 text-[13px]'>
                <div>{mem.username}</div>
                <div onClick={() => {
                    dispatch(addMembersToGroupActions.remove({
                        _id: mem._id,
                        username: mem.username
                    }));
                }}>
                    <Cross1Icon />
                </div>
            </div>
        ))}
    </div>
  )
}

export default memo(MarkedMembers)