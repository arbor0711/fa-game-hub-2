import { FetchResponse } from "./useData";
import { GameQuery } from "./../App";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

//TODO:I have the same interface in usePlatforms. But the point is that now I do not distracted from my own job. I should have a notebook on my side and when I see a bug or sth to fix, I just write it to do not forget it later, and then I'll come back and resolve it.
// FIXME: Fix this duplication
export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  genres: string;
}
const useGames = (gameQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data),
  });

export default useGames;
