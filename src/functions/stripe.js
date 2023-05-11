import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `https://bananauyu-api.onrender.com/api/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
