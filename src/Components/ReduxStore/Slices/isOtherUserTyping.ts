import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const isTyping = createSlice({
    name: 'isTyping',
    initialState,
    reducers: {
        update: (state: any, {payload}: {payload: boolean}) => payload,
    }
})


export const isTypingActions = isTyping.actions;
export default isTyping;