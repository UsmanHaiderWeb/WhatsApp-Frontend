import { createSlice } from "@reduxjs/toolkit";
import { string } from "zod";

type chatIDType = {
    _id: string
}

export interface notificationInter {
    _id: string;
    content: string;
    chatID: chatIDType | string;
    isNotifiedMessage: boolean
}

const initialState: [] | [notificationInter] = [];

const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        update: (state: any, action: any) => action.payload,
        removeNotification: (state: any, {payload}: {payload: string}) => {
            let newState = state?.filter(element => {
                return element._id != payload;
            });
            return newState;
        },
        addNotification: (state: any, action: {payload: notificationInter}) => {
            state.unshift(action.payload);
            return state;
        },
    }
})


export const notificationsActions = notifications.actions;
export default notifications;