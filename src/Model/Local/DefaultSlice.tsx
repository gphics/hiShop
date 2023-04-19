import { createSlice } from '@reduxjs/toolkit'

const initialState:{isLoading:boolean} = {isLoading:false}
const main = createSlice({
    name: "defaultSlice",
    initialState,
    reducers: {
        toggleIsLoading: (state: any) => {
            state.isLoading = !state.isLoading
        }, 
        setIsLoading: (state: any, action: any) => {
            state.isLoading = action.payload
        }
    }
})

export const {reducer: defaultSlice, actions:defaultSliceActions} = main