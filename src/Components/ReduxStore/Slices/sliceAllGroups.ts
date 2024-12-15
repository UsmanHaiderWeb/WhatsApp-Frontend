import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const allGroups = createSlice({
    name: 'allGroups',
    initialState,
    reducers: {
        update: (state: any, action: any) => action.payload,
        removeGroup: (state: any, {payload}: {payload: string}) => {
            let newState = state?.filter(element => {
                return element._id != payload;
            });
            return newState;
        },
        addGroup: (state: any, action: any) => {
            state.unshift(action.payload);
            return state;
        },
        replaceGroup: (state: any, action: any) => {
            let index: number;
            state?.forEach((element: any, edx: number) => {
                if(element._id == action.payload._id){
                    index = edx;
                }
            });
            state.splice(index, 1, action.payload);
            return state;
        },
    }
})


export const allGroupsActions = allGroups.actions;
export default allGroups;