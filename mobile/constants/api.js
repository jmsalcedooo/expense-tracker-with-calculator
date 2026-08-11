//export const API_URL = "https://expense-tracker-api-bz17.onrender.com/api";

//export const API_URL = "http://192.168.8.152:5001/api";

const LOCAL_API = "http://192.168.8.152:5001/api";
const PROD_API = "https://expense-tracker-api-bz17.onrender.com/api";

export const API_URL =
  process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API;
