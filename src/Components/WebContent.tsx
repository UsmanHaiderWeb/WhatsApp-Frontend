import { gql, useQuery } from '@apollo/client';
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userKeFriendAction } from './ReduxStore/Slices/userKeFriends';
import { getAllChatsActions } from './ReduxStore/Slices/AllChats';
import { blockedUsersActions } from './ReduxStore/Slices/BlockedUsers';
import SideBar from './SideBar';
import { Outlet, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { notificationInter, notificationsActions } from './ReduxStore/Slices/NotificationsSlice';
import { messagesAction } from './ReduxStore/Slices/Messages';
import { storeType } from './ReduxStore/Store';
import { sendMessageDataActions } from './ReduxStore/Slices/sendMessageData';
import { isTypingActions } from './ReduxStore/Slices/isOtherUserTyping';
import { allGroupsActions } from './ReduxStore/Slices/sliceAllGroups';
import { getAllUsersActions, getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';

const myFriendQuery = gql`
  query myFriendQuery ($id: ID!, $isToken: Boolean!) {
    getSingleUser(id: $id, isToken: $isToken){
      email
      username
      dp
      friends {
        dp
        _id
        username
        email
      }
      blockedUsers {
        dp
        _id
        username
        email
      }
      chats{
        _id
        chatName
        isGroupChat
        dp
        latestMessage{
          content
          sentBy{
            _id
            username
          }
        }
        admin{
          _id
          username
          email
          dp
        }
      }
    }
  }
`


const getUserNotification = gql`
    query getAllUserNotification($id: ID!, $isToken: Boolean!){
        getSingleUser(id: $id, isToken: $isToken){
            _id
            notifications {
                _id
                chatID {
                    _id
                }
                content
                isNotifiedMessage
            }
        }
    }
`

const searchUsersForGroupQuery = gql`
    query searchUsersForGroupQuery {
        getUsers{
            _id
            username
            email
            dp
        }
    }
`

const END_POINT = 'http://localhost:3000';
let socket: any;
  
const WebContent = () => {
    const token = localStorage.getItem('token');
    const param = useParams();
    const dispatch = useDispatch();
    const userData = useSelector((state: storeType) => state.userData);
    const chatData = useSelector((state: storeType) => state.chatdata);
    const sendMessageData = useSelector((state: storeType) => state.sendMessageData);
    const userKeFriends = useSelector((state: storeType) => state.userKeFriends);
    const blockedUsers = useSelector((state: storeType) => state.blockedUsers);
    
    const {data, refetch} = useQuery(myFriendQuery, {
        variables: {id: token, isToken: true},
        skip: (!token || token == '')
    });

    const notificationsResponse = useQuery(getUserNotification, {
        variables: {id: token, isToken: true},
        skip: !userData?._id || !token
    })

    const allUsersQueryResult = useQuery(searchUsersForGroupQuery, {
      skip: !token || token == ''
    });

    useEffect(() => {
        if (notificationsResponse.data) {
            dispatch(notificationsActions.update(notificationsResponse.data.getSingleUser?.notifications))
        }
    }, [notificationsResponse.data])

    useEffect(() => {
      socket = io(END_POINT);
      socket.emit('joinMember', token);
      
      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    }, [])
    
    useEffect(() => {
      if (data) {
          dispatch(userKeFriendAction.update(data?.getSingleUser?.friends));
          dispatch(getAllChatsActions.update(data?.getSingleUser?.chats));
          dispatch(blockedUsersActions.update(data?.getSingleUser?.blockedUsers));
      }
    }, [data])

    useEffect(() => {
        if (userData) {
            refetch();
        }
    }, [userData])

    useEffect(() => {
      if (socket && userData) {
        socket.on('receiveMessage', ({messageData, chatID, notification}: {messageData: any, chatID: string, notification: notificationInter}) => {
          if (param.id && (chatID == param.id || messageData.chatID == param.id)) {
            dispatch(messagesAction.add(messageData));
            socket.emit('clearNotification', {chatID: param?.id, userID: userData?._id});
            socket.emit('typing', {isTyping: false, chatID: param.id, userID: userData._id});
          } else {
            dispatch(notificationsActions.addNotification(notification));
          }
          dispatch(getAllChatsActions.changeLatestMessageSpecificChat({
            id: messageData.chatID,
            latestMessage: messageData
          }))
        });

        socket.on('filteredNotificationArray', ({notifications}) => {
          notificationsResponse.refetch();
        })

        socket.on('emitting new chat', ({chat, notification}) => {
          dispatch(getAllChatsActions.addChat(chat));
          dispatch(allGroupsActions.removeGroup(chat._id))
          notificationsResponse.refetch();
          allUsersQueryResult.refetch();
          refetch();
        })
        
        socket.on('remove Chat', ({chat, notification}) => {
          dispatch(getAllChatsActions.removeChat(chat._id));
          notificationsResponse.refetch();
          allUsersQueryResult.refetch();
          refetch();
        })

        socket.on('showTypingLoader', ({showTypingLoader, chatID}: {showTypingLoader: boolean, chatID: string}) => {
          console.log('working');
          console.log('showTypingLoader: ', showTypingLoader);
          if(chatID == param.id){
            dispatch(isTypingActions.update(showTypingLoader));
          } else dispatch(isTypingActions.update(false));
        });

        // Cleanup listener on unmount
        return () => {
            socket.off('receiveMessage');
            socket.off('showTypingLoader');
        };
      }
    }, [socket, dispatch, param.id]);

    useEffect(() => {
      if (sendMessageData) {
        socket.emit('newMessage', {messageData: sendMessageData});
        dispatch(sendMessageDataActions.update(''));
      }
  
    }, [sendMessageData, socket, param.id]);

    useEffect(() => {
      dispatch(getAllUsersActions.update(allUsersQueryResult?.data?.getUsers));
    }, [allUsersQueryResult.data, userKeFriends]);


  return (
        <div className='bg-[#222E35] w-full h-screen flex items-start'>
            <SideBar />
            <Outlet />
        </div>
  )
}

export default memo(WebContent)