import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {token: null},
    reducers:{
        setCredentials: (state,action) =>{
            const {accessToken} = action.payload
            state.token = accessToken
        },
        logout: (state, action) =>{
            state.token = null
        }
    }
})

export default authSlice.reducer
export const {setCredentials, logout} = authSlice.actions