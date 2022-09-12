import axios from "axios";
export const authenticationApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});
