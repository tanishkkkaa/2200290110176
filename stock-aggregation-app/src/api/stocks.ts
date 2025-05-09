// src/api/stocks.ts
import axios from 'axios';

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

let token: string | null = null;

const getToken = async () => {
  if (token) return token;

  const res = await axios.post(AUTH_URL, {
    email: "tanishka.2226csit112@kiet.edu",
    name: "tanishka agarwal",
    rollNo: "2200290110176",
    accessCode: "SxVeja",
    clientID: "8458e085-4c5c-46d7-ac56-8e2596d66b27",
    clientSecret: "FXKtPqxVDNbZXvGt"
  });

  token = res.data.access_token;
  return token;
};

export const fetchStocks = async () => {
  const token = await getToken();
  const response = await axios.get("http://20.244.56.144/evaluation-service/stocks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchStockHistory = async (ticker: string, minutes: number) => {
  const token = await getToken();
  const response = await axios.get(
    `http://20.244.56.144/evaluation-service/stocks/${ticker}/history?duration=${minutes}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
