import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const subscriptionReducer = createReducer(
    {}, 
    {
    buySubscriptionRequest:state=>{
        state.loading = true;
    },

    buySubscriptionSuccess:(state, action)=>{
        state.loading = false;
        state.subscriptionId = action.payload;
    },

    buySubscriptionFail:(state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: state => {
        state.message = null;
    },
    clearMessage: state => {
        state.message = null;
    },
})


export const buySubscription = () => async dispatch => {
    try {
        dispatch({type: 'buySubscriptionRequest'});

        const { data } = await axios.get(
            `http://localhost:5000/api/users/subscribe`,
            
            {
               
                withCredentials: true,
            }
        );
        dispatch({type: 'buySubscriptionSuccess', payload: data.subscriptionId});
    } catch (error) {
        dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message})
        
    }
}