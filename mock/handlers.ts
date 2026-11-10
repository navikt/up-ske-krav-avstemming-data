import { HttpResponse, http } from "msw";
import kravliste from "./kravliste.json";

export const handlers = [
	http.get("/ske-krav/api/up-tilbakekreving/:from/:to", () => {
		return HttpResponse.json(kravliste, { status: 200 });
	}),
];
