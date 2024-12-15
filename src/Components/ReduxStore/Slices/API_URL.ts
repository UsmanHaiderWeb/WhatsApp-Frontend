import { createSlice } from "@reduxjs/toolkit";

let initialState: string = 'http://localhost:3000/api';


const API_URL = createSlice({
    name: 'API_URL',
    initialState: initialState,
    reducers: {}
})


export default API_URL;