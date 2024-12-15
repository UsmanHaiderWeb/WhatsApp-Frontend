import { createSlice } from "@reduxjs/toolkit";

interface addMembersToGroupInterface {
    _id: string;
    username: string
}

const initialState: Array<addMembersToGroupInterface> = [];


const addMembersToGroup = createSlice({
    name: 'addMembersToGroup',
    initialState,
    reducers: {
        update: (state, {payload}: {payload: [addMembersToGroupInterface] | []}) => payload,
        add: (state, {payload}: {payload: addMembersToGroupInterface}): Array<addMembersToGroupInterface> => {
            let isexist: boolean = false;
            state.forEach((i:addMembersToGroupInterface) => {
                if (i._id == payload._id) {
                    isexist = true;
                }
            })
            if(!isexist){
                state.push(payload);
            }
            return state;
        },
        remove: (state, {payload}: {payload: addMembersToGroupInterface
        }) => {
            console.log(payload);
            let isexist: boolean = false;
            let index : number = -2;
            state.forEach((i:addMembersToGroupInterface, idx: number) => {
                if (i._id == payload._id) {
                    isexist = true;
                    index = idx;
                }
            })
            if(isexist && index != -2){
                state.splice(index, 1);
            }
            return state;
        }
    }
})


export const addMembersToGroupActions = addMembersToGroup.actions;
export default addMembersToGroup;