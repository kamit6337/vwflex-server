import axios from "axios";
import { environment } from "../environment.js";

const BASE_URL = "https://api.themoviedb.org/3";

export const getReq = async (path, { params } = {}) => {
  const response = await axios.get(`${BASE_URL}${path}`, {
    params: params,
    headers: {
      Authorization: `Bearer ${environment.TMDB_ACCESS_TOKEN}`, // Include your access token here
      "Content-Type": "application/json", // Include other headers as needed
    },
  });

  return response?.data;
};
