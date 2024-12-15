import axios from 'axios';
import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { allGroupsActions } from './ReduxStore/Slices/sliceAllGroups';

const sendrequestMutation = gql`
    mutation sendRequest($token: String!, $id: ID!){
        sendRequestToGroup(token: $token, id: $id){
            chatName
            _id
            admin{
                _id
                username
            }
            members {
                _id
                username
                email
            }
            requests {
                _id
                username
                email
            }
        }
    }
`

const SendRequestToGroup = ({id, allRequests}: {id: string, allRequests: any}) => {
    const token = localStorage.getItem('token');
    const [isSubmitting, setSubmittingState] = useState<boolean>(false);
    const [isExist, setExistingState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.userData);

    const [sendRequestFunc] = useMutation(sendrequestMutation);

    useEffect(() => {
        let result = allRequests.some((request: any) => userData._id == request._id);
        setExistingState(result);
    }, [allRequests])

    const sendRequest = async () => {
        if (token && token != '') {
            try {
                setSubmittingState(true);
                let {data} = await sendRequestFunc({variables: {
                    token: token,
                    id: id
                }})
                console.log("SEND REQUEST RESPONSE: ", data);
                if (data?.sendRequestToGroup) {
                    setSubmittingState(false);
                    dispatch(allGroupsActions.replaceGroup(data.sendRequestToGroup))
                }
            } catch (error) {
                console.log("SEND REQUEST BTN ERROR: ", error.message);
                setSubmittingState(false);
            }
        }
    }

  return (<>
    {isExist ?
        <div className='opacity-60 text-[13px] border-[1px] border-solid bg-[#55555555] border-[#dadada] border-opacity-20 rounded-md px-3 py-2'>Sent</div>
    :
        <div className='opacity-60 text-[13px] border-[1px] border-solid border-[#dadada] border-opacity-20 rounded-md px-3 micro:px-2 py-2 micro:py-1 hover:text-[black] hover:bg-white duration-150' onClick={() => sendRequest()}>{isSubmitting ? 'Requesting' : 'Request'}</div>
    }
  </>
  )
}

export default memo(SendRequestToGroup)