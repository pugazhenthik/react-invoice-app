import useSWR, { useSWRConfig } from "swr";
import axiosClient from "../axios";

export default function useFetch(url) {
    const fetcher = async url => await axiosClient.get(url).then(res => res.data);
    const { data, isLoading, isValidating } = useSWR(url, fetcher);
    const { mutate } = useSWRConfig();
    return { data, mutate, isLoading, isValidating}
}