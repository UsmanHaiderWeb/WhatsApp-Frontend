import { createSlice } from "@reduxjs/toolkit";



const initialState: Array<{_id: string}> = []

const userKeFriends = createSlice({
    name: 'userKeFriends',
    initialState,
    reducers: {
        update: (state: any, {payload}) => payload,
        removeFriend: (state: any, action: any) => {
            let newState = state?.filter(element => {
                return element._id != action.payload;
            });
            return newState;
        },
        addFriend: (state: any, action: any) => {
            state.unshift(action.payload);
            return state;
        }
    }
})

export const userKeFriendAction = userKeFriends.actions;
export default userKeFriends;