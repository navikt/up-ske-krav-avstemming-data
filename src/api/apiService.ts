import useSWRImmutable from "swr/immutable";
import { axiosFetcher } from "./config/apiConfig";
import {DateRange} from "../pages/AvstemmingDataPage";
import {AvstemmingsgrunnlagDto} from "../types/schema/Avstemmingsgrunnlag";

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

export function useGetAvstemmingsdata(dateRange:DateRange|null, shouldFetch:boolean) {
	const { data, error, isLoading } = useSWRImmutable<Array<AvstemmingsgrunnlagDto>>(
		!shouldFetch ? null : `/rapporter/avstemming/oversikt/${dateRange?.from.toISOString().slice(0,10)}/${dateRange.to?.toISOString().slice(0,10) ?? ""})`,
		swrConfig<Array<AvstemmingsgrunnlagDto>>((url) =>
			axiosFetcher<Array<AvstemmingsgrunnlagDto>>(BASE_URI.BACKEND_API, url),
		),
	);
	return {data: data ?? [], error, isLoading };
}
