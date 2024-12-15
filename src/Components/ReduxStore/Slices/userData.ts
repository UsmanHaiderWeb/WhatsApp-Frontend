import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        update: (state, action) => action.payload
    }
})


export const userDataActions = userData.actions;
export default userData;