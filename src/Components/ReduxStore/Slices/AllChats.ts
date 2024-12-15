import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const getAllChats = createSlice({
    name: 'getAllChats',
    initialState,
    reducers: {
        update: (state: any, action: any) => action.payload,
        removeChat: (state: any, {payload}: {payload: string}) => {
            let newState = state?.filter(element => {
                return element._id != payload;
            });
            return newState;
        },
        replaceChat: (state: any, action: any) => {
            let index: number;
            state?.forEach((element:any, idx: number) => {
                if (element._id == action.payload._id) {
                    index = idx;
                }
            });
            if (index >= 0) {
                state.splice(index, 1, action.payload);
            }
            return state;
        },
        addChat: (state: any, action: any) => {
            state.unshift(action.payload);
            return state;
        },
        renameSpecificChat: (state: any, {payload}: {payload: {id: string, chatName: string}}) => {
            let newState = state.map((chat: any) => {
                if(chat._id == payload.id && chat.isGroupChat){
                    let newChat = {...chat, chatName: payload.chatName};
                    return newChat;
                } else return chat;
            })
            return newState;
        },
        changeLatestMessageSpecificChat: (state: any, {payload}: {payload: {id: string, latestMessage: any}}) => {
            let newState = state.map((chat: any) => {
                if(chat._id == payload.id){
                    let newChat = {...chat, latestMessage: payload.latestMessage};
                    return newChat;
                } else return chat;
            })
            return newState;
        }
    }
})


export const getAllChatsActions = getAllChats.actions;
export default getAllChats;