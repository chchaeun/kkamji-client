import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MyPoint } from "../../types/Point";
import { fetchData } from "../utils/fetchData";
import { MY_POINT } from "./paths";

const useMyPointQuery = () => {
  return useQuery<MyPoint, AxiosError, number>(
    [MY_POINT],
    () => fetchData({ url: MY_POINT }),
    {
      select: (data) => data.point,
    }
  );
};
export { useMyPointQuery };
