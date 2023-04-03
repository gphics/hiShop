import { createSlice } from '@reduxjs/toolkit'

const initialState:{isLoading:boolean} = {isLoading:false}
const main = createSlice({
    name: "defaultSlice",
    initialState,
    reducers:{}
})

export const {reducer: defaultSlice, actions:defaultSliceActions} = main