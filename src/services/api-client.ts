import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  // Whit this configuration this key will be included in the query string of every http request I'll send to my backend
  params: {
    key: "55d88e6322e74f74a4ef6bfa5b660721",
  },
});
