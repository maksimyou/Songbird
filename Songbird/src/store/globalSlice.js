import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoader: 0,
}

export const globalSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIsLoader: (state, action) => {
            state.isLoader = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLoader } = globalSlice.actions

export default globalSlice.reducer