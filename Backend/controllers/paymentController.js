const protect  = require('../middleWare/authMiddleware')
const catchAsyncError  = require ('../middleWare/catchAsyncError.js')
const errorHandler = require("../middleWare/errorMiddleware");
const express = require("express");
const User = require('../models/userModel');
const app = express();
const Razorpay = require('razorpay')
const payment = require('../routes/paymentRoutes')
const crypto = require('crypto')
const Payment = require("../models/Payment")


 const instance = new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET,
});


const buySubscription = app.use(catchAsyncError(async (req, res ) => {
   

  const user = await User.findById(req.user._id);
    
    const plan_id = process.env.PLAN_ID || "plan_Mv6af0vFurvzUy"
     
    

   const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify: 1,
        total_count: 12,
        
        
      })
    user.subscription.id = subscription.id;

    user.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
        success: true,
        subscriptionId:subscription.id,
    })
    
}))


//----------------PAYMENT------------------


const paymentverification = app.use(catchAsyncError(async (req, res, next ) => {
   
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } = req.body


  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
  .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
  .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
  .digest("hex")
  
  
  const isAuthentic = generated_signature === razorpay_signature;
   
  if(!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);


  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id
  });

  user.subscription.status= "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`  
  )
  
  
  
  }));

  const getRazorPayKey = app.use(catchAsyncError(async(req, res, next) => {
    

    res.status(200).json({
      success:true,
      key:process.env.RAZORPAY_API_KEY,
    })
  }))





const cancelSubscription = app.use(catchAsyncError(async(req, res, next) => {
  
  const user = await User.findById(req.user._id);
   
  const subscriptionId = user.subscription.id;

  let refund = false;

  await instance.subscriptions.cancel(subscriptionId);

  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  const gap = Date.now()- payment.createdAt;

  const refundTime = process.env.REFUND_DAYS *24*60*60*1000;

  if(refundTime > gap){
    
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;

  }

  await payment.remove();
  user.subscription.id = undefined
  user.subscription.status = undefined
  await user.save()
  
  res.status(200).json({
    success:true,
    message:
    refund?"Subscription cancelled, You will recieve full refund within 7 days."
    :"Subscription cancelled, No refund initiated as subscription was cancelled after 7 days.",
  })
}))




module.exports=buySubscription;
module.exports = paymentverification;
module.exports = getRazorPayKey;
module.exports = cancelSubscription;