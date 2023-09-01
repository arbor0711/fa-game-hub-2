import { GameQuery } from "./../App";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Platform } from "./usePlatforms";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Game>("/games");
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  genres: string;
}
const useGames = (gameQuery: GameQuery) =>
  // To implement infinite queries, first I should replace useQuery with useInfiniteQuery
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    // Then queryFn should receive the page number as a parameter. So here I add a parameter and destructure it to grab pageParam property that react-query passes here. I should initialize it to 1. So I get the data for the first page property.
    // Now I should check the rawg API to see how it support pagination
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          // Here I pass the page parameter to the backend and set it to pageParam
          page: pageParam,
        },
      }),

    // Next I should implement a function called "getNextPageParam". React Query calls this function to compute the next page number. This function should take two parameters.
    getNextPageParam: (lastPage, allPages) => {
      // allPages contains the data for each pages that I retrieve. So to compute the next page number ==>
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

export default useGames;
