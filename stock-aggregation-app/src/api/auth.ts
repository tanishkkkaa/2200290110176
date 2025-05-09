import axios from "axios";

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

export const getAccessToken = async () => {
  const response = await axios.post(AUTH_URL, {
    email: process.env.REACT_APP_EMAIL,
    name: process.env.REACT_APP_NAME,
    rollNo: process.env.REACT_APP_ROLLNO,
    accessCode: process.env.REACT_APP_ACCESS_CODE,
    clientID: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET
  });
  return response.data.access_token;
};
