import React, { memo, useEffect } from 'react'
import Header from './Header'
import MainMessage from './MainMessage'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { chatDataActions } from './ReduxStore/Slices/chatData'
import { useDispatch } from 'react-redux'
import { messagesAction } from './ReduxStore/Slices/Messages'
import NoChatExist from './NoChatExist'

let isChatExistQuery = gql`
  query isChatExistCheck($id: ID!){
    isChatExist(id: $id){
      _id
      chatName
      isGroupChat
      dp
      messages{
        content
        sentBy{
          _id
          username
        }
        createdAt
      }
      members {
        _id
        username
        email
        dp
      }
      admin {
        _id
        username
        email
        dp
      }
      requests {
        _id
        username
        email
        dp
      }
    }
  }
`

const MessageBoxSender = () => {
  const param = useParams<string>();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const { data, refetch }  = useQuery(isChatExistQuery, {
    variables: {id: param.id},
    skip: (!param.id || !token || token == '')
  });

  console.log(data);
  

  useEffect(() => {
    if(data && data?.isChatExist){
      dispatch(chatDataActions.update(data?.isChatExist));
      dispatch(messagesAction.update(data.isChatExist.messages))
    }
  }, [data])

  console.log(data);
  
  useEffect(() => {
    refetch();
  }, [param.id])
  

  return (
    <div className='w-full h-full'>
      {(data && data?.isChatExist) ? <>
        <Header />
        <MainMessage />
      </> :
        <NoChatExist />
      }
    </div>
  )
}

export default memo(MessageBoxSender)

/*
function formatTimestamp(timestamp) {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes with leading zero if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // Format the time string
  const timeString = `${hours}:${minutesStr} ${ampm}`;
  return timeString;
}

// Example usage
const timestamp = 1730271628326; // example timestamp
const formattedTime = formatTimestamp(timestamp);
console.log(formattedTime); // Outputs the formatted time
*/