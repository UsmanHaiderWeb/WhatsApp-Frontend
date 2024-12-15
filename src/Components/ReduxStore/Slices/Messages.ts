import { createSlice } from "@reduxjs/toolkit";

let initialState: [] | null = null;


const messages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        update: (state, action) => action.payload,
        add: (state: any, action: any) => {
            state.push(action.payload);
            return state;
        }
    }
})


export const messagesAction = messages.actions;
export default messages;