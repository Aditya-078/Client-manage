import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { buySubscription } from '../../redux/features/payment/userReducer';


const Subscribe = ({user}) => {
 
    const dispatch = useDispatch();
    const [key, setKey]= useState("");

    const {loading, error, subscriptionId} = useSelector(state => state.subscription)

    const subscribeHandler = async() => {
       const {data:{
        key
       }} =await axios.get(`http://localhost:5000/api/users/razorpaykey`)

       setKey(key);

       dispatch(buySubscription())
    };

    useEffect(() => {
        if(error){
          toast.error(error);
          dispatch({type:"clearError"})
        }

        if(subscriptionId){
            const openPopUp = () => {
            
                const options = {  

                    key,
                    name:"Inventory Management PRO",
                    description:"Get access to all feature for inventory management",
                    subscription_id: subscriptionId,
                    callback_url:`http://localhost:5000/api/users/razorpaykey`,
                    prefill:{
                       
                        contact:""

                    },
                    notes:{
                        address:"For any issues, please contact us at :infispec1@gmail.com"
                    },
                    theme:{
                        color:"#5c85aa"
                    }

                };

                const razor = new window.Razorpay(options);
                razor.open()

            }
            openPopUp()
        }

    }, [dispatch, error ,  key,subscriptionId])

  return (
    <div>
      
      <button className="--btn --btn-primary " onClick={subscribeHandler}>Subscribe to use all features</button>
    </div>
  );
};

export default Subscribe;
