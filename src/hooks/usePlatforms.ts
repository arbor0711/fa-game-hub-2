import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import platforms from "../data/platforms";
import { Platform } from "../entities/Platform";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");
const usePlatforms = () =>
  useQuery({
    // I've got error "No overload matches this call."
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    // Here I can use ms library for easier time calculation. BUT whenever I use npm library or any other library, I am increasing my bundle volume. However, it is only few kilobytes but using a lot of libraries can result in a big bundle size. SO I should choose that which one is more beneficial for me. With ms my code is cleaner and more maintainable, however, it would take a bit longer to load for user.
    staleTime: 24 * 60 * 60 * 1000, //24h
    initialData: platforms,
  });

export default usePlatforms;
