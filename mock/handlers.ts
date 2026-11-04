import { HttpResponse, http } from "msw";
import kravliste from "./kravliste.json";

export const handlers = [
	http.get("/ske-krav/rapporter/avstemming/oversikt/:from/:to", () => {
		return HttpResponse.json(
			kravliste,
			{ status: 200 },
		);
	}),
];
