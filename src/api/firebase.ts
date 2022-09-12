import axios from "axios";
export const firebase = axios.create({
  baseURL: "https://stock-trader-7efb4-default-rtdb.firebaseio.com",
});
