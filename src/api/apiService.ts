import useSWRImmutable from "swr/immutable";
import type {DateRange} from "../pages/AvstemmingDataPage";
import type {KravDto} from "../types/schema/Krav";
import { axiosFetcher } from "./config/apiConfig";
import {toLocalISODate} from "../utils/dates";

const BASE_URI = {
	BACKEND_API: "/ske-krav",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
	return {
		fetcher,
		suspense: true,
		revalidateOnFocus: false,
		refreshInterval: 600000,
	};
}



export function useGetAvstemmingsdata(dateRange:DateRange|null, shouldFetch:boolean) {
	const { data, error, isLoading } = useSWRImmutable<Array<KravDto>>(
		shouldFetch ? `/rapporter/avstemming/oversikt/${toLocalISODate(dateRange?.from)}/${toLocalISODate(dateRange?.to)}` : null,
		swrConfig<Array<KravDto>>((url) =>
			axiosFetcher<Array<KravDto>>(BASE_URI.BACKEND_API, url),
		),
	);
	return {data: data ?? [], error, isLoading };
}
