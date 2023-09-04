// import useData from "./useData";
import { useQuery } from "@tanstack/react-query";
// This library is written in pure JS and doesn't include the type declaration that a TSC compiler needs so I have to install them separately.
// So back to the terminal lets install @types/ms BUT THE NOTE IS THAT I need types only during development, not for production. So I'm not going to ship them with our application to the client. SO I have to install this as a development dependency ====>
// npm i --save-dev @types/ms
// npm i D @types/ms
import ms from "ms";
import genres from "../data/genres";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Genre>("/genres");
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    // I've got error "No overload matches this call." ===>There is really nothing wrong with the key, the problem is somewhere else. MOST OF THE TIME with queryFn or initialData. In here when I comment out the initialData line, the error goes away. If I look up the type of initial data, obviously this type is not compatible with my fetchResponse. Because I added next property to that but here in initialData I did not do the same. As soon as adding the next property to initialData, the error goes away.
    // BUT IT IS LIKE A HACK. WHAT IF tomorrow I want to add another property to fetchResponse. So, the better approach is to modify my static data, genre, and make it exactly like the response that I get from the backend. ===> to do so, first comment out the initialData line. So I get the data from backend. Then I store it in my data file. from network tab>response>copy the object and export it from genre.ts.
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: genres,
  });

export default useGenres;
