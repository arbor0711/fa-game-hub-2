// import useData from "./useData";
import { useQuery } from "@tanstack/react-query";
import genre from "../data/genre";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Genre>("/genres");
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    initialData: { count: genre.length, results: genre },
  });

export default useGenres;
