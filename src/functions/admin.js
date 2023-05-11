import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`https://bananauyu-api.onrender.com/api/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `https://bananauyu-api.onrender.com/api/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
