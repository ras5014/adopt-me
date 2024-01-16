import { useQuery } from "react-query";
import fetchBreedList from "./fetchBreedList";

export const useBreedList = (animal) => {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status];
};
