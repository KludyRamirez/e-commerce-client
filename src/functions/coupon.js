import axios from "axios";

export const getCoupons = async () =>
  await axios.get(`https://bananauyu-api.onrender.com/api/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(
    `https://bananauyu-api.onrender.com/api/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `https://bananauyu-api.onrender.com/api/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
