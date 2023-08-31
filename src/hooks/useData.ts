import apiClient from "../services/api-client";
import { useState, useEffect } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  //   I add two argument here, one for query string and another for dependency
  requestConfig?: AxiosRequestConfig,
  //   I insert an array of dependencies, so if in the future I wanna add another item to this array, it would be so easy.
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      return () => controller.abort();
    },
    //   Type 'any[] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator. Because I set this as an optional value, it could be undefined. It means I could not spread an undefine object. So I should do a conditional here
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
