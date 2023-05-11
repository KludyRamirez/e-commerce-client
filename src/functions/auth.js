import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `https://bananauyu-server.onrender.com/api/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `https://bananauyu-server.onrender.com/api/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `https://bananauyu-server.onrender.com/api/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
