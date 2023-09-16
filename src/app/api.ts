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
export const createGame = (game: Object) => {
   return axios.post(`${BASE_URL}/game`, game);
};

export const getGames = () => {
   return axios.get(`${BASE_URL}/game`);
};

export const getGameById = (id: number) => {
   return axios.get(`${BASE_URL}/game/${id}`);
};

export const editGameById = (id: number, game: Object) => {
   return axios.patch(`${BASE_URL}/game/${id}`, game);
};

export const deleteGameById = (id: number) => {
   return axios.delete(`${BASE_URL}/game/${id}`);
};
