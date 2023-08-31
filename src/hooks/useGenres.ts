// import useData from "./useData";
import genres from "../data/genre";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";
import genre from "../data/genre";
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<FetchResponse<Genre>>("/genres").then((res) => res.data),
    // With below line I say the browser to keep the data 24h in its cache and then refresh it
    staleTime: 24 * 60 * 60 * 1000, //24h
    // I can provide initial data, So I don't have to go to the backend and show to user a spinner. I can set the initial data to genres that I provided before
    // Now I have compilation error ===> I solve this like below
    initialData: { count: genres.length, results: genres },
  });

export default useGenres;
