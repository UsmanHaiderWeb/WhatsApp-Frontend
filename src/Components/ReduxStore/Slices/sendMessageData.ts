import { createSlice } from "@reduxjs/toolkit";

const initialState: any = '';

const sendMessageData = createSlice({
    name: 'sendMessageData',
    initialState,
    reducers: {
        update: (state: any, {payload}: {payload: any}) => payload,
    }
})


export const sendMessageDataActions = sendMessageData.actions;
export default sendMessageData;