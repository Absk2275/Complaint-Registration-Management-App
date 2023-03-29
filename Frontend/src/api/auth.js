import axios from "axios";

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "https://cms-backend-wwk3.onrender.com/api/auth/signup",
    data,
    config
  );
  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "https://cms-backend-wwk3.onrender.com/api/auth/signin",
    data,
    config
  );

  return response;
};

export const postcomp = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "https://cms-backend-wwk3.onrender.com/api/auth/postcomp",
    data,
    config
  );

  return response;
};