import axios from "axios";

export const getSubs = async () =>
  await axios.get(`https://bananauyu-api.onrender.com/api/subs`);

export const getSub = async (slug) =>
  await axios.get(`https://bananauyu-api.onrender.com/api/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`https://bananauyu-api.onrender.com/api/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`https://bananauyu-api.onrender.com/api/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`https://bananauyu-api.onrender.com/api/sub`, sub, {
    headers: {
      authtoken,
    },
  });
