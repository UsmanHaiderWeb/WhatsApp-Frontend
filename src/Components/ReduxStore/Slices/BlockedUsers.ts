import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const blockedUsers = createSlice({
    name: 'blockedUsers',
    initialState,
    reducers: {
        update: (state: any, action: any) => action.payload,
        removeUser: (state: any, action: any) => {
            let newState = state?.filter(element => {
                return element._id != action.payload;
            });
            return newState;
        },
        addUser: (state: any, action: any) => {
            state.unshift(action.payload);
            return state;
        }
    }
})


export const blockedUsersActions = blockedUsers.actions;
export default blockedUsers;