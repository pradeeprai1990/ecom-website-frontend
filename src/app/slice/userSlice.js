import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null ,
  token: Cookies.get("TOKEN") ?  Cookies.get("TOKEN") : ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userData: (state,reqData) => {
        let {payload}=reqData  //{user:res.data.user}
        state.user=payload.user
        state.token=payload.token
        Cookies.set('USER', JSON.stringify(state.user))
        Cookies.set('TOKEN',state.token)
    },
    logOut: (state) => {
        state.user=null
        state.token=''
        Cookies.remove('USER')
        Cookies.remove('TOKEN')
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { userData, logOut } = loginSlice.actions

export default loginSlice.reducer