import axios from "axios";
const BASE_URL = `http://localhost:3333`;

export const login = (user: Object) => {
   return axios.post(`${BASE_URL}/auth/login`, user);
};
export const signup = (user: Object) => {
   return axios.post(`${BASE_URL}/auth/signup`, user);
};
export const getUser = (user: Object) => {
   return axios.post(`${BASE_URL}/user/me`, user);
};
