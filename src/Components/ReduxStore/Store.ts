import { configureStore } from '@reduxjs/toolkit'
import API_URL from './Slices/API_URL'
import chatdata from './Slices/chatData';
import messages from './Slices/Messages';
import userData from './Slices/userData';
import addMembersToGroup from './Slices/AddMembersToGroup';
import userKeFriends from './Slices/userKeFriends';
import getAllUsers from './Slices/getAllUsers';
import getAllChats from './Slices/AllChats';
import blockedUsers from './Slices/BlockedUsers';
import allGroups from './Slices/sliceAllGroups';
import notifications from './Slices/NotificationsSlice';
import sendMessageData from './Slices/sendMessageData';
import isTyping from './Slices/isOtherUserTyping';


const ReduxStore = configureStore({
    reducer: {
        API_URL: API_URL.reducer,
        chatdata: chatdata.reducer,
        messages: messages.reducer,
        userData: userData.reducer,
        addMembersToGroup: addMembersToGroup.reducer,
        userKeFriends: userKeFriends.reducer,
        allGroups: allGroups.reducer,
        getAllUsers: getAllUsers.reducer,
        blockedUsers: blockedUsers.reducer,
        getAllChats: getAllChats.reducer,
        notifications: notifications.reducer,
        sendMessageData: sendMessageData.reducer,
        isTyping: isTyping.reducer,
    }
})


export type storeType = ReturnType<typeof ReduxStore.getState>;
export type dispatchType = typeof ReduxStore.dispatch;
export default ReduxStore;