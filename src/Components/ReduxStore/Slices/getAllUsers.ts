import { createSlice } from "@reduxjs/toolkit";

export interface getAllUsersInterface{
    _id: string;
    username: string;
    email: string;
    dp: string;
}

type getAllUsersType = {
    payload: [getAllUsersInterface]
}

const initialState: null | [getAllUsersInterface] = null;

const getAllUsers = createSlice({
    name: 'getAllUsers',
    initialState,
    reducers: {
        update: (state: any, action: getAllUsersType | any) => action.payload
    }
})


export const getAllUsersActions = getAllUsers.actions;
export default getAllUsers;