import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const chatdata = createSlice({
    name: 'chatdata',
    initialState,
    reducers: {
        update: (state, action) => action.payload,
        updateMembers: (state: any, action: any) => {
            state.members = action.payload;
            return state;
        },
        updateRequests: (state: any, action: any) => {
            state.requests = action.payload;
            return state;
        },
        rename: (state, action) => {
            state.chatName = action.payload;
            return state;
        }
    }
})


export const chatDataActions = chatdata.actions;
export default chatdata;