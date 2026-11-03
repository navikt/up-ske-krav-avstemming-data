import useSWRImmutable from "swr/immutable";
import { axiosFetcher } from "./config/apiConfig";
import type {DateRange} from "../pages/AvstemmingDataPage";
import type {KravDto} from "../types/schema/Avstemmingsgrunnlag";

const BASE_URI = {
	BACKEND_API: "/ske-krav/api/v1",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
	return {
		fetcher,
		suspense: true,
		revalidateOnFocus: false,
		refreshInterval: 600000,
	};
}
function toLocalISODate(date = new Date()) {
	// Gjør dette fordi datoen vi får fra Aksel er i lokal tid, 
	// slik at vi ender opp med (kl. 23:00) dagen før vi egentlig ønsker dersom det er vintertid 
	const pad = (num:number) => String(num).padStart(2, '0');

	const YYYY = date.getFullYear();
	const MM = pad(date.getMonth() + 1); // Months are 0-indexed
	const DD = pad(date.getDate());

	return `${YYYY}-${MM}-${DD}`;
}
export function useGetAvstemmingsdata(dateRange:DateRange|null, shouldFetch:boolean) {
	const { data, error, isLoading } = useSWRImmutable<Array<KravDto>>(
		!shouldFetch ? null : `/rapporter/avstemming/oversikt/${toLocalISODate(dateRange?.from)}/${toLocalISODate(dateRange?.to)}`,
		swrConfig<Array<KravDto>>((url) =>
			axiosFetcher<Array<KravDto>>(BASE_URI.BACKEND_API, url),
		),
	);
	return {data: data ?? [], error, isLoading };
}
