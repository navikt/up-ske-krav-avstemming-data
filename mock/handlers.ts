import { HttpResponse, http } from "msw";
import kravliste from "./kravliste.json";

export const handlers = [
                  //	/ske-krav/api/v1/rapporter/avstemming/oversikt/2026-10-14/2026-10-16
	http.get("/ske-krav/api/v1/rapporter/avstemming/oversikt/:from/:to", () => {
		return HttpResponse.json(
			kravliste,
			{ status: 200 },
		);
	}),
];
