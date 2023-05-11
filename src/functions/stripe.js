import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `https://bananauyu-server.onrender.com/api/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
