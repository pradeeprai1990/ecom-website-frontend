import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  cart: [] ,
 
}

export const cartSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    cartData: (state,reqData) => {
        let {payload}=reqData
        state.cart.push(payload.cart)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { cartData } = cartSlice.actions

export default cartSlice.reducer